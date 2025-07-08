// src/pages/tools/istqb-mock-exam/script.js

// --- Configuration ---
const config = {
    totalQuestions: 40, examDuration: 60 * 60, passPercentage: 65,
    dataBasePath: './data/',
    defaultLang: 'tr', supportedLangs: ['tr', 'en'],
    examStructure: { '1': { 'K1': 2, 'K2': 6, 'K3': 0 }, '2': { 'K1': 2, 'K2': 4, 'K3': 0 }, '3': { 'K1': 2, 'K2': 2, 'K3': 0 }, '4': { 'K1': 0, 'K2': 6, 'K3': 5 }, '5': { 'K1': 1, 'K2': 5, 'K3': 3 }, '6': { 'K1': 1, 'K2': 1, 'K3': 0 } }
};

// --- UI String Translations ---
// translations objesi ana translations.js'ten gelecek (global kapsamda erişilebilir olmalı)


// --- State Variables ---
let allQuestions = {};
let state = {
    selectedQuestions: [], userAnswers: Array(config.totalQuestions).fill(null), currentQuestionIndex: 0,
    timeLeft: config.examDuration, timerInterval: null, examFinished: false,
    currentLanguage: localStorage.getItem('language') || config.defaultLang,
    reviewFilter: 'all'
};

// --- DOM Elements ---
let welcomeContainer, examMainContent, examContainer, questionsWrapper, resultContainer, questionReview,
    prevBtn, nextBtn, finishBtn, startExamBtn, currentQuestionDisplay, totalQuestionsDisplay,
    timerDisplay, progressBar, confirmModal, cancelFinishBtn, confirmFinishBtn, restartBtn,
    homepageBtn, scorePercent, passFail, correctCount, incorrectCount, scoreCircle,
    loadingIndicator, welcomeError, questionNavigatorContainer, questionNavigator;
let filterButtons = [];

// --- Function Definitions ---

function formatText(text) { if (!text) return ''; return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); }

function getDOMElements() {
    // Uygulama ana kapsayıcısını bul
    const appContainer = document.getElementById('istqb-app-container');
     if (!appContainer) {
         console.error("ISTQB App Container (#istqb-app-container) not found! Ensure it exists in your HTML.");
         return false; // Konteyner yoksa devam etme
     }

    // Konteyner içindeki elementleri seç
     welcomeContainer = appContainer.querySelector('#welcome-container');
     examMainContent = appContainer.querySelector('#exam-main-content');
     examContainer = appContainer.querySelector('#exam-container');
     questionsWrapper = appContainer.querySelector('#questions-wrapper');
     resultContainer = appContainer.querySelector('#result-container');
     questionReview = appContainer.querySelector('#question-review');
     prevBtn = appContainer.querySelector('#prev-btn');
     nextBtn = appContainer.querySelector('#next-btn');
     finishBtn = appContainer.querySelector('#finish-btn');
     startExamBtn = appContainer.querySelector('#start-exam');
     currentQuestionDisplay = appContainer.querySelector('#current-question');
     totalQuestionsDisplay = appContainer.querySelector('#total-questions');
     timerDisplay = appContainer.querySelector('#timer');
     progressBar = appContainer.querySelector('#progress-bar');
     confirmModal = appContainer.querySelector('#confirm-modal');
     // Modal içindeki butonları modal elementinden seçmek daha güvenli
     cancelFinishBtn = confirmModal ? confirmModal.querySelector('#cancel-finish') : null;
     confirmFinishBtn = confirmModal ? confirmModal.querySelector('#confirm-finish') : null;

     restartBtn = appContainer.querySelector('#restart-btn');
     homepageBtn = appContainer.querySelector('#homepage-btn');
     scorePercent = appContainer.querySelector('#score-percent');
     passFail = appContainer.querySelector('#pass-fail');
     correctCount = appContainer.querySelector('#correct-count');
     incorrectCount = appContainer.querySelector('#incorrect-count');
     scoreCircle = appContainer.querySelector('#score-circle');
     loadingIndicator = appContainer.querySelector('#loading-indicator'); // Loading indicator app container içinde olmalı
     welcomeError = appContainer.querySelector('#welcome-error');
     questionNavigatorContainer = appContainer.querySelector('#question-navigator-container');
     questionNavigator = appContainer.querySelector('#question-navigator');
     filterButtons = appContainer.querySelectorAll('.filter-button');

     // Temel elementlerin varlığını kontrol et
     if (!welcomeContainer || !examMainContent || !resultContainer || !loadingIndicator || !questionNavigator || !startExamBtn || !confirmModal || !cancelFinishBtn || !confirmFinishBtn || !prevBtn || !nextBtn || !finishBtn) {
         console.error("One or more essential ISTQB app elements not found within the container. Check IDs: #welcome-container, #exam-main-content, #result-container, #loading-indicator, #question-navigator, #start-exam, #confirm-modal, #cancel-finish, #confirm-finish, #prev-btn, #next-btn, #finish-btn");
         // Elementler bulunamazsa kullanıcıya hata mesajı göster
         if(welcomeContainer) {
              const lang = localStorage.getItem('language') || config.defaultLang;
              welcomeContainer.innerHTML = `<p style="color: red; text-align: center;">${translations[lang]?.loadError || translations['en'].loadError || 'Error loading application. Missing elements.'}</p>`;
         }
         showLoading(false); // Yükleniyor ekranını kapat
         if(startExamBtn) startExamBtn.disabled = true; // Başlat butonunu devre dışı bırak
         return false; // Elementler bulunamadı
     }
     return true; // Tüm temel elementler başarıyla bulundu
}

function showLoading(isLoading) {
    if (loadingIndicator) {
        // CSS'teki force-flex ve force-hidden class'larını kullan
        loadingIndicator.classList.toggle('force-flex', isLoading);
        loadingIndicator.classList.toggle('force-hidden', !isLoading);
    }
}

function showFinishConfirmation() {
     if(confirmModal) {
         confirmModal.classList.remove('hidden'); // Modal'ı göster
         document.body.classList.add('no-scroll'); // Body scroll'unu engelle
     }
 }
 function hideFinishConfirmation() {
     if(confirmModal) {
         confirmModal.classList.add('hidden'); // Modal'ı gizle
         document.body.classList.remove('no-scroll'); // Body scroll'unu geri al
     }
 }

function goToHomepage() {
    // Sınav devam ediyorsa zamanlayıcıyı durdur
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
    // Sınav bitiş state'ini resetle ki navigator anasayfada renkli kalmasın
    state.examFinished = false;
    // Anasayfaya yönlendir
    window.location.href = '../../../index.html';
}

function goToPreviousQuestion() { if (!state.examFinished && state.currentQuestionIndex > 0) { showQuestion(state.currentQuestionIndex - 1); } }
function goToNextQuestion() { if (!state.examFinished && state.currentQuestionIndex < config.totalQuestions - 1) { showQuestion(state.currentQuestionIndex + 1); } }

// updateNavigationButtons fonksiyonunu dışarıya açıyoruz
// Bu fonksiyon hem initExam hem de showQuestion içinde çağrılıyor
const updateNavigationButtons = () => {
    if (!prevBtn || !nextBtn || !finishBtn) { console.warn("Navigation buttons not found in updateNavigationButtons."); return; }
    // Sınav bitmediyse butonları güncelle
    if (!state.examFinished) {
        prevBtn.disabled = state.currentQuestionIndex === 0;
        nextBtn.classList.toggle('hidden', state.currentQuestionIndex === config.totalQuestions - 1);
        finishBtn.classList.remove('hidden'); // Finish butonu sınav sırasında görünür
    } else {
        // Sınav bittiyse prev/next butonlarını gizle ve finish butonunu gizle
        prevBtn.disabled = true;
        nextBtn.classList.add('hidden');
        finishBtn.classList.add('hidden');
    }
};


function renderQuestionNavigator() {
    if (!questionNavigator) return;
    questionNavigator.innerHTML = '';
    for (let i = 0; i < config.totalQuestions; i++) {
        const navItem = document.createElement('div');
        navItem.classList.add('nav-item');
        navItem.textContent = i + 1;
        navItem.dataset.index = i;
        navItem.addEventListener('click', () => {
            if (!state.examFinished) {
                showQuestion(i);
            } else {
                 // Sınav bittiyse, sonuç değerlendirmedeki ilgili soruya kaydır (opsiyonel)
                 const reviewItem = questionReview?.querySelector(`[data-question-index="${i}"]`); // renderQuestionReview'de index eklendi
                 if (reviewItem) {
                      reviewItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                 } else {
                     console.log(`Exam finished, cannot navigate directly to question ${i+1}.`);
                 }
            }
        });
        questionNavigator.appendChild(navItem);
    }
    updateNavigator(); // Başlangıç durumunu güncelle
}

// Fix 3: Navigator Cevap Durumu Mantığı Güncellendi
function updateNavigator() {
    if (!questionNavigator) return;
    const navItems = questionNavigator.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const itemIndex = parseInt(item.dataset.index);
        // Tüm durum class'larını temizle
        item.classList.remove('current', 'answered', 'correct', 'incorrect');

        if (!state.examFinished) { // Sınav devam ediyorsa
             if (itemIndex === state.currentQuestionIndex) {
                 item.classList.add('current'); // Aktif soru
             }
             const answer = state.userAnswers[itemIndex];
             // Cevaplandı kontrolü: Cevap null veya undefined değil VE (array ise boş değil)
             const isAnswered = (answer !== null && answer !== undefined) && (!Array.isArray(answer) || (Array.isArray(answer) && answer.length > 0));

             if (isAnswered) {
                 item.classList.add('answered'); // Cevaplandı
             }
        } else { // Sınav bittiyse, sonuç renklerini göster
            const question = state.selectedQuestions[itemIndex];
            const userAnswer = state.userAnswers[itemIndex];
            const correctAnswer = question?.correctAnswer;

            let isCorrect = false;
            // Doğruluk kontrolü, sadece doğru cevap ve kullanıcı cevabı mevcutsa yapılır
            if (correctAnswer !== undefined && correctAnswer !== null && userAnswer !== null && userAnswer !== undefined) {
                 // Kullanıcı cevabı array ise ve boşsa (checkbox'ta hiçbir şey seçilmediyse), doğru değil
                 const userAnsweredMultipleButEmpty = Array.isArray(userAnswer) && userAnswer.length === 0;
                 // Kullanıcı cevabı tek ise ve null/undefined ise (radio'da seçilmediyse), doğru değil
                 const userAnsweredSingleButNull = !Array.isArray(userAnswer) && (userAnswer === null || userAnswer === undefined);

                 if (!userAnsweredMultipleButEmpty && !userAnsweredSingleButNull) { // Sadece *bir şey* cevaplandıysa doğruluğu kontrol et
                    if (Array.isArray(correctAnswer)) {
                        if (Array.isArray(userAnswer) && userAnswer.length === correctAnswer.length) {
                           const sortedUser = [...userAnswer].sort((a,b)=>a-b);
                           const sortedCorrect = [...correctAnswer].sort((a,b)=>a-b);
                           isCorrect = JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect);
                        } else {
                           isCorrect = false; // Çoktan seçmeli, ama kullanıcı cevabı eşleşen bir array değil
                        }
                    } else {
                        isCorrect = userAnswer === correctAnswer;
                    }
                 } else {
                     isCorrect = false; // Hiç cevaplanmadıysa veya boş array ise yanlış say
                 }
            } else {
                 // Doğru cevap eksikse VEYA kullanıcı cevabı eksikse (null/undefined), doğru değil say
                 isCorrect = false;
            }


            if (isCorrect) {
                item.classList.add('correct');
            } else {
                item.classList.add('incorrect'); // Doğru değilse yanlış olarak işaretle (cevaplanmamışları da içerir)
            }
        }
     });
 }

async function loadAllQuestions() {
     // getDOMElements çağrıldıktan sonra elementler mevcut olmalı
     // Elementlerin bulunup bulunmadığını kontrol et, bulunamadıysa buradan çık
     if (!getDOMElements()) {
         console.error("Essential elements not found at the start of loadAllQuestions. Cannot proceed.");
         showLoading(false);
         if(startExamBtn) startExamBtn.disabled = true;
         return; // Fonksiyonu sonlandır
     }

     // Başlangıç ekranlarını yönet
     welcomeContainer.style.display = 'block';
     examMainContent.style.display = 'none';
     resultContainer.style.display = 'none';
     confirmModal.classList.add('hidden'); // Modal'ı kesinlikle gizle
     showLoading(false); // Önce gizle, yüklenince göster

     state.currentLanguage = localStorage.getItem('language') || config.defaultLang; // Güncel dili LocalStorage'dan al

     showLoading(true); // Yükleniyor ekranını göster
     welcomeError.classList.add('hidden'); welcomeError.textContent = '';
     startExamBtn.disabled = true; // Butonu devre dışı bırak

     allQuestions = {}; let totalValidLoaded = 0; let loadErrors = []; const chapters = Object.keys(config.examStructure);
     const fetchPromises = chapters.map(chapter => {
         const lang = state.currentLanguage;
         const fileName = lang === 'en' ? `eng_chapter${chapter}.json` : `chapter${chapter}.json`;
         const url = `${config.dataBasePath}${fileName}`;
         return fetch(url)
             .then(response => { if (!response.ok) throw new Error(`HTTP ${response.status}`); return response.json(); })
             .then(data => {
                 if (!Array.isArray(data)) throw new Error(`Invalid JSON format in ${fileName}`);
                 allQuestions[chapter] = data.filter(q => {
                     const hasK = q.kLevel && ['K1', 'K2', 'K3'].includes(q.kLevel);
                     const hasOptions = Array.isArray(q.options) && q.options.length > 0;
                     const hasCorrectAnswer = q.correctAnswer !== undefined && q.correctAnswer !== null;

                      // Doğru cevap indexlerinin geçerliliğini kontrol et
                      let correctAnswersAreValid = true;
                      if (hasCorrectAnswer) {
                          if (Array.isArray(q.correctAnswer)) {
                              if (q.correctAnswer.some(ans => ans < 0 || ans >= q.options.length)) {
                                  correctAnswersAreValid = false;
                              }
                          } else {
                              if (q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
                                  correctAnswersAreValid = false;
                              }
                          }
                      } else {
                           correctAnswersAreValid = false; // correct answer yoksa geçerli değil
                      }


                      if (!hasK || !hasOptions || !correctAnswersAreValid) {
                         console.warn(`Invalid question data (missing kLevel, options, or invalid correctAnswer) in ${fileName}:`, q);
                      }
                     return hasK && hasOptions && correctAnswersAreValid; // Sadece geçerli soruları dahil et
                 });
                 totalValidLoaded += allQuestions[chapter].length;
             }).catch(error => {
                 console.error(`Error loading ${url}:`, error);
                 allQuestions[chapter] = []; loadErrors.push(`${fileName}: ${error.message}`);
             });
     });
     try {
         await Promise.all(fetchPromises);
         console.log(`Total valid Qs loaded for ${state.currentLanguage}: ${totalValidLoaded}`);

         let canFulfill = true;
         Object.keys(config.examStructure).forEach(ch => {
             Object.keys(config.examStructure[ch]).forEach(kl => {
                 const countNeeded = config.examStructure[ch][kl];
                 if (countNeeded > 0) {
                     const availableForGroup = allQuestions[ch]?.filter(q => q.kLevel === kl).length || 0;
                     if (availableForGroup < countNeeded) {
                         console.warn(`Insufficient questions for Chapter ${ch}, K-Level ${kl}. Needed: ${countNeeded}, Available: ${availableForGroup}.`);
                         canFulfill = false;
                     }
                 }
             });
         });
         const poolSize = Object.values(allQuestions).reduce((s, q) => s + q.length, 0);

         console.log(`Pool Size: ${poolSize}, Can Fulfill Structure: ${canFulfill}, Load Errors: ${loadErrors.length}`);

         // Sınavı başlat düğmesini etkinleştir veya devre dışı bırak
         if (poolSize >= config.totalQuestions && canFulfill && loadErrors.length === 0) {
             console.log("Enabling Start Button");
             startExamBtn.disabled = false;
         } else {
             console.log("Disabling Start Button");
             let errorMessages = [];
             const lang = state.currentLanguage;
             const loadErrorTrans = translations[lang]?.loadError || translations['en'].loadError;
             const selectionErrorTrans = translations[lang]?.selectionError || translations['en'].selectionError || 'Could not select questions.';


             if (loadErrors.length > 0) {
                  errorMessages.push(`${loadErrorTrans} <br> - ${loadErrors.join('<br> - ')}`);
             }
             if (!canFulfill) {
                 errorMessages.push(lang === 'tr' ? "Sınav yapısı için yeterli soru bulunamadı." : "Not enough questions found for the exam structure.");
             } else if (poolSize < config.totalQuestions) {
                  errorMessages.push(lang === 'tr' ? `Belirtilen toplam soru sayısı (${config.totalQuestions}) için yetersiz soru havuzu (Yüklenen: ${poolSize}).` : `Insufficient question pool for the total number of questions (${config.totalQuestions}) (Loaded: ${poolSize}).`);
             }
             if(welcomeError && errorMessages.length > 0) {
                 welcomeError.innerHTML = errorMessages.join('<br>');
                 welcomeError.classList.remove('hidden');
             }
             startExamBtn.disabled = true;
         }

         // Hoş Geldin ekranındaki bazı metinleri güncelle (sabit metinler translatePage tarafından güncellenir)
         updateWelcomeScreenDetails();

     } catch (error) {
         console.error("Error during question load:", error);
         startExamBtn.disabled = true;
          if(welcomeError){
             const lang = state.currentLanguage;
             const loadErrorText = translations[lang]?.loadError || translations['en'].loadError;
             welcomeError.textContent = `${loadErrorText} (Hata: ${error.message})`;
             welcomeError.classList.remove('hidden');
         }
     }
     finally {
         showLoading(false); // Yükleniyor ekranını gizle
         if (startExamBtn && startExamBtn.disabled) {
             console.warn("Start button is disabled after loading. Check console for warnings/errors.");
         }
     }
}


function selectExamQuestions() {
    const selected = [];
    const structure = config.examStructure;
    let possible = true;
    const availableQs = {};

    Object.keys(allQuestions).forEach(chapter => {
        if (Array.isArray(allQuestions[chapter])) {
             allQuestions[chapter].forEach(q => {
                  if (q.kLevel && ['K1', 'K2', 'K3'].includes(q.kLevel) && Array.isArray(q.options) && q.options.length > 0 && (q.correctAnswer !== undefined && q.correctAnswer !== null)) {
                     const key = `${chapter}-${q.kLevel}`;
                     if (!availableQs[key]) availableQs[key] = [];
                     availableQs[key].push(q);
                 }
             });
        }
    });

    for (const chapter of Object.keys(structure)) {
        if (!possible) break; // Exit outer loop if not possible
        for (const kLevel of Object.keys(structure[chapter])) {
             const countNeeded = structure[chapter][kLevel];
             if (countNeeded > 0) {
                 const key = `${chapter}-${kLevel}`;
                 const candidates = availableQs[key] ? [...availableQs[key]] : [];
                 const shuffled = candidates.sort(() => 0.5 - Math.random());

                 if (shuffled.length < countNeeded) {
                      console.error(`CRITICAL SELECTION ERROR: Not enough questions for Chapter ${chapter}, K-Level ${kl}. Needed: ${countNeeded}, Available: ${shuffled.length}.`);
                      possible = false;
                      return false; // Exit function early
                 } else {
                    const selectedForGroup = shuffled.slice(0, countNeeded);
                    selected.push(...selectedForGroup);
                    // Seçilen soruları havuzdan kaldır, böylece aynı soru tekrar seçilmez
                    if (availableQs[key]) {
                       availableQs[key] = availableQs[key].filter(q =>
                            !selectedForGroup.some(sel =>
                                sel.question === q.question &&
                                sel.kLevel === q.kLevel &&
                                sel.topic === q.topic // Tam eşleşme kontrolü için topic de eklendi
                            )
                       );
                   }
                }
             }
        }
    }


    if (selected.length !== config.totalQuestions || !possible) {
         console.error(`Failed to select exactly ${config.totalQuestions} questions. Selected count: ${selected.length}. Possible: ${possible}`);
         const lang = state.currentLanguage;
         const errorMsg = translations[lang]?.selectionError || translations['en'].selectionError || 'Could not select questions matching exam structure.';
         alert(errorMsg);
         return false;
     }

    state.selectedQuestions = selected.sort(() => 0.5 - Math.random()); // Seçilen soruları karıştır
    console.log(`Successfully selected and shuffled ${state.selectedQuestions.length} questions.`);
    return true;
}


function updateWelcomeScreenDetails() {
     const ruleDurationLi = document.querySelector('[data-translate="ruleDurationLabel"]')?.closest('li');
     const ruleNumQuestionsLi = document.querySelector('[data-translate="ruleNumQuestionsLabel"]')?.closest('li');
     const rulePassingLi = document.querySelector('[data-translate="rulePassingLabel"]')?.closest('li');
     const officialLinksTitle = document.querySelector('[data-translate="officialLinksTitle"]');
     const officialLinksUl = officialLinksTitle?.nextElementSibling;

    if (!ruleDurationLi || !ruleNumQuestionsLi || !rulePassingLi || !officialLinksTitle || !officialLinksUl) {
        console.warn("Welcome screen detail elements not found for update.");
        return;
    }

    const lang = state.currentLanguage;
    const ui = translations[lang] || translations['en'];

    ruleDurationLi.innerHTML = `<i class="fas fa-clock fa-fw"></i><span class="ml-2">${ui.ruleDurationLabel}</span><strong class="ml-1 dark:text-gray-100"> 60 ${ui.ruleDurationText}</strong>`;
    ruleNumQuestionsLi.innerHTML = `<i class="fas fa-list-ol fa-fw"></i><span class="ml-2">${ui.ruleNumQuestionsLabel}</span><strong class="ml-1 dark:text-gray-100"> 40</strong>`;
    rulePassingLi.innerHTML = `<i class="fas fa-percentage fa-fw"></i><span class="ml-2">${ui.rulePassingLabel}</span><strong class="ml-1 dark:text-gray-100"> %65 (26 ${ui.rulePassingText})</strong>`;

}


function initExam() {
     if (!getDOMElements()) {
          console.error("Failed to initialize exam due to missing DOM elements (initExam).");
          return;
     }

     const minQuestionsAvailable = Object.values(allQuestions).reduce((sum, chapterQs) => sum + (chapterQs?.length || 0), 0);
     if (minQuestionsAvailable === 0) {
         const lang = state.currentLanguage;
         const errorMsg = translations[lang]?.loadError || translations['en'].loadError;
         alert(errorMsg);
         goToHomepage();
         return;
     }

     state = {
         selectedQuestions: [],
         userAnswers: Array(config.totalQuestions).fill(null),
         currentQuestionIndex: 0,
         timeLeft: config.examDuration,
         timerInterval: null,
         examFinished: false,
         currentLanguage: localStorage.getItem('language') || config.defaultLang,
         reviewFilter: 'all'
     };

     if (!selectExamQuestions()) {
         goToHomepage();
         return;
     }

     if(totalQuestionsDisplay) totalQuestionsDisplay.textContent = config.totalQuestions;
     if(timerDisplay) timerDisplay.classList.remove('animate-pulse');
     updateTimerDisplay();

     renderQuestions();
     renderQuestionNavigator();
     // window.IstqbApp'in yüklendiğinden emin ol
     if (window.IstqbApp && typeof window.IstqbApp.updateNavigationButtons === 'function') {
        window.IstqbApp.updateNavigationButtons(); // updateNavigationButtons'ı IstqbApp objesi üzerinden çağır
     } else {
         console.warn("window.IstqbApp or updateNavigationButtons not available during exam initialization.");
         // Butonları manuel olarak güncellemeye çalış (yedek)
          if (!prevBtn || !nextBtn || !finishBtn) { console.warn("Navigation buttons not found for manual update in initExam."); } else {
              prevBtn.disabled = state.currentQuestionIndex === 0;
              nextBtn.classList.toggle('hidden', state.currentQuestionIndex === config.totalQuestions - 1);
              finishBtn.classList.remove('hidden');
          }
     }

     showQuestion(0);

     if(welcomeContainer) welcomeContainer.style.display = 'none';
     if(resultContainer) resultContainer.style.display = 'none';
     if(examMainContent) examMainContent.style.display = 'block';

     startTimer();
 }

function renderQuestions() {
    if (!questionsWrapper) { console.error("questionsWrapper not found!"); return; }
    questionsWrapper.innerHTML = '';
     state.selectedQuestions.forEach((question, index) => {
         const questionElement = document.createElement('div');
         questionElement.className = `question-container`;
         questionElement.dataset.index = index;

         const formattedQuestion = formatText(question.question);
         const isMultipleChoice = Array.isArray(question.correctAnswer); // Değişken renderQuestions içinde tanımlandı
         const inputType = isMultipleChoice ? 'checkbox' : 'radio';

         const selectMultipleText = translations[state.currentLanguage]?.selectMultiple || translations['en'].selectMultiple;

         questionElement.innerHTML = `
             <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">${index + 1}. ${formattedQuestion} ${isMultipleChoice && selectMultipleText ? `<span class='text-xs text-gray-500 dark:text-gray-400 mt-1 ml-2'>(${selectMultipleText})</span>` : ''}</h3>
             <div class="space-y-3 options-list">
                 ${question.options.map((option, optIndex) => `
                     <label class="option p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-gray-200 flex items-center space-x-3" data-option-index="${optIndex}">
                         <input type="${inputType}" name="q${index}" value="${optIndex}" class="form-${inputType} h-4 w-4 text-primary-light border-gray-300 focus:ring-primary-light dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-primary-dark shrink-0">
                         <span>${option}</span>
                     </label>
                 `).join('')}
             </div>
             ${isMultipleChoice && selectMultipleText ? `<p class="text-sm text-gray-500 dark:text-gray-400 mt-2">(${selectMultipleText})</p>` : ''}
         `;
         questionsWrapper.appendChild(questionElement);

         questionElement.querySelectorAll(`input[type="${inputType}"]`).forEach(input => { input.addEventListener('change', handleOptionChange); });
     });

     reapplySelections();
     updateProgressBar();
     updateNavigator();
 }

function handleOptionChange(e) {
     if (state.examFinished) return;
     const input = e.target;
     const questionContainer = input.closest('.question-container');
     if (!questionContainer) return;

     const questionIndex = parseInt(questionContainer.dataset.index);
     const optionIndex = parseInt(input.value);

     if (input.type === 'radio') {
         state.userAnswers[questionIndex] = optionIndex;
         questionContainer.querySelectorAll('label.option').forEach(lbl => lbl.classList.remove('selected'));
         input.closest('label.option')?.classList.add('selected');

     } else if (input.type === 'checkbox') {
         const checkboxes = questionContainer.querySelectorAll('input[type="checkbox"]');
         let selectedOptions = [];
         checkboxes.forEach(cb => {
             if (cb.checked) {
                 selectedOptions.push(parseInt(cb.value));
             }
         });
         state.userAnswers[questionIndex] = selectedOptions.sort((a, b) => a - b);

         // Checkbox durumuna göre label'a selected class'ı ekle/kaldır
         input.closest('label.option')?.classList.toggle('selected', input.checked);
     }

     updateNavigator(); // Cevap değiştiğinde navigatörü güncelle
 }


 function reapplySelections() {
      if (!questionsWrapper) { console.error("questionsWrapper not found for reapplySelections!"); return; }
      state.userAnswers.forEach((answer, index) => {
          const questionEl = questionsWrapper.querySelector(`.question-container[data-index="${index}"]`);
          if (!questionEl) return;

          questionEl.querySelectorAll('label.option').forEach(lbl => lbl.classList.remove('selected'));
          questionEl.querySelectorAll('input').forEach(inp => inp.checked = false);

          if (answer !== null && answer !== undefined) {
              if (Array.isArray(answer)) {
                  answer.forEach(optIndex => {
                      const input = questionEl.querySelector(`input[type="checkbox"][value="${optIndex}"]`);
                      const label = questionEl.querySelector(`label[data-option-index="${optIndex}"]`);
                      if (input) input.checked = true;
                      if (label) label.classList.add('selected');
                  });
              } else {
                  const input = questionEl.querySelector(`input[type="radio"][value="${answer}"]`);
                  const label = questionEl.querySelector(`label[data-option-index="${answer}"]`);
                  if (input) input.checked = true;
                  if (label) label.classList.add('selected');
              }
          }
      });
 }


 // Fix 6: showQuestion'da scrollIntoView davranışı değiştirildi
 function showQuestion(index) {
      if (!questionsWrapper || !currentQuestionDisplay) { console.error("showQuestion elements not found!"); return; }

      if (index < 0 || index >= config.totalQuestions) {
           console.warn(`Invalid question index: ${index}`);
           return;
      }

      // Remove active class from all questions
      document.querySelectorAll('.question-container').forEach(q => q.classList.remove('active'));

      const targetQuestion = questionsWrapper.querySelector(`.question-container[data-index="${index}"]`);
      if (targetQuestion) {
          targetQuestion.classList.add('active');
          state.currentQuestionIndex = index;

          // Hedeflenen soruyu görüntü alanına kaydır.
          // block: 'start' yerine block: 'center' kullanarak daha yumuşak bir deneyim sağla.
          targetQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });

      } else {
          console.error(`Question with index ${index} not found in DOM.`);
      }

      currentQuestionDisplay.textContent = state.currentQuestionIndex + 1;

      // window.IstqbApp'in yüklenmiş ve updateNavigationButtons'ın tanımlı olduğundan emin ol
       if (window.IstqbApp && typeof window.IstqbApp.updateNavigationButtons === 'function') {
           window.IstqbApp.updateNavigationButtons();
       } else {
           console.warn("window.IstqbApp or updateNavigationButtons not available for navigation update.");
       }

      updateProgressBar();
      updateNavigator();
 }

 function startTimer() {
     clearInterval(state.timerInterval);
     state.timeLeft = config.examDuration;
     updateTimerDisplay();
     state.timerInterval = setInterval(() => {
         state.timeLeft--;
         updateTimerDisplay();
         if (state.timeLeft <= 0) {
             clearInterval(state.timerInterval);
             state.timerInterval = null;
             finishExam();
         }
     }, 1000);
 }
 function updateTimerDisplay() {
     if(!timerDisplay) return;
     const minutes = Math.floor(state.timeLeft / 60);
     const seconds = state.timeLeft % 60;
     timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
     timerDisplay.classList.toggle('animate-pulse', state.timeLeft <= 60 && state.timeLeft > 0);
     if (state.timeLeft <= 0) {
         timerDisplay.classList.remove('animate-pulse');
     }
 }
 function updateProgressBar() {
     if (!progressBar) return;
     // Progress bar sınav sırasında currentQuestionIndex'i, bittikten sonra totalQuestions'ı kullanmalı
     const current = state.examFinished ? config.totalQuestions : Math.min(state.currentQuestionIndex + 1, config.totalQuestions);
     const progress = (current / config.totalQuestions) * 100;
     progressBar.style.width = `${progress}%`;
 }


 function finishExam() {
      if (state.examFinished) return;
      clearInterval(state.timerInterval);
      state.timerInterval = null;
      state.examFinished = true;
      hideFinishConfirmation();

      let correctCountVal = 0;
      state.selectedQuestions.forEach((question, index) => {
          const userAnswer = state.userAnswers[index];
          const correctAnswer = question.correctAnswer;
          let isCorrect = false;

          // Sadece doğru cevap ve kullanıcı cevabı mevcutsa doğruluğu kontrol et
          if (correctAnswer !== undefined && correctAnswer !== null && userAnswer !== null && userAnswer !== undefined) {
              // Kullanıcı cevabı array ise ve boşsa (checkbox'ta hiçbir şey seçilmediyse), doğru değil
              const userAnsweredMultipleButEmpty = Array.isArray(userAnswer) && userAnswer.length === 0;
              // Kullanıcı cevabı tek ise ve null/undefined ise (radio'da seçilmediyse), doğru değil
              const userAnsweredSingleButNull = !Array.isArray(userAnswer) && (userAnswer === null || userAnswer === undefined);

              if (!userAnsweredMultipleButEmpty && !userAnsweredSingleButNull) { // Sadece *bir şey* cevaplandıysa doğruluğu kontrol et
                 if (Array.isArray(correctAnswer)) {
                     if (Array.isArray(userAnswer) && userAnswer.length === correctAnswer.length) {
                         const sortedUser = [...userAnswer].sort((a,b)=>a-b);
                         const sortedCorrect = [...correctAnswer].sort((a,b)=>a-b);
                         isCorrect = JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect);
                     } else {
                         isCorrect = false; // Çoktan seçmeli, ama kullanıcı cevabı eşleşen bir array değil
                     }
                 } else {
                     isCorrect = userAnswer === correctAnswer;
                 }
              } else {
                  isCorrect = false; // Hiç cevaplanmadıysa veya boş array ise yanlış say
              }
          } else {
              // Doğru cevap eksikse VEYA kullanıcı cevabı eksikse (null/undefined), doğru değil say
              console.warn(`Question ${index + 1} has no defined correct answer or user answer is missing.`);
              isCorrect = false;
          }

          if(isCorrect) {
              correctCountVal++;
          }
      });

      const incorrectAnswers = config.totalQuestions - correctCountVal;
      const percentage = Math.round((correctCountVal / config.totalQuestions) * 100);
      const passed = correctCountVal >= Math.round(config.passPercentage / 100 * config.totalQuestions);

      const lang = state.currentLanguage;
      const ui = translations[lang] || translations['en'];

      if (scorePercent) scorePercent.textContent = `${percentage}%`;
      if (passFail) {
           passFail.textContent = passed ? ui.passed : ui.failed;
           passFail.className = passed ? 'text-sm text-green-600 dark:text-green-400' : 'text-sm text-red-600 dark:text-red-400';
           passFail.setAttribute('data-translate', passed ? 'passed' : 'failed');
           // translatePage daha sonra çağrılırsa diye metni de doğrudan ayarlayalım
           passFail.textContent = passed ? (translations[lang]?.passed || translations['en'].passed) : (translations[lang]?.failed || translations['en'].failed);
       }
      if (correctCount) correctCount.textContent = correctCountVal;
      if (incorrectCount) incorrectCount.textContent = incorrectAnswers;

      if (scoreCircle) {
          const circumference = 2 * Math.PI * 40; // r="40"
          const offset = circumference - (percentage / 100) * circumference;
          scoreCircle.style.transition = 'none';
          scoreCircle.style.strokeDasharray = `${circumference} ${circumference}`;
          scoreCircle.style.strokeDashoffset = circumference;
          scoreCircle.getBoundingClientRect(); // Force redraw
          scoreCircle.style.transition = 'stroke-dashoffset 1s ease-out';
          scoreCircle.style.strokeDashoffset = offset;
      }

      // Sonuç ekranındaki metinleri güncelle (sabit metinler translatePage tarafından güncellenir)
       if (passFail) {
            const lang = state.currentLanguage;
            passFail.textContent = passed ? (translations[lang]?.passed || translations['en'].passed) : (translations[lang]?.failed || translations['en'].failed);
            passFail.setAttribute('data-translate', passed ? 'passed' : 'failed');
       }
       // Doğru/Yanlış etiketleri translatePage tarafından güncellenir.

      applyResultFilter(state.reviewFilter); // Default filtreyi uygula

      updateProgressBar(); // Progress bar'ı %100 yap

      if(finishBtn) finishBtn.classList.add('hidden');

      if (examMainContent) examMainContent.style.display = 'none';
      if (resultContainer) resultContainer.style.display = 'block';

      // Navigator'u sınav bitiş durumuna güncelle (renkler değişecek)
      updateNavigator();
  }

 function applyResultFilter(filterType) {
     if (!filterButtons.length || !questionReview) { console.warn("Filter buttons or question review container not found!"); return; }
     state.reviewFilter = filterType;

     filterButtons.forEach(button => {
         button?.classList.toggle('active', button.dataset.filter === filterType);
     });

     renderQuestionReview(filterType);
 }

 function renderQuestionReview(filter = 'all') {
    if (!questionReview) { console.error("questionReview container not found for rendering!"); return; }
    questionReview.innerHTML = '';
    const lang = state.currentLanguage;
    const ui = translations[lang] || translations['en'];

    let questionsDisplayed = 0;

    state.selectedQuestions.forEach((question, index) => {
        const userAnswer = state.userAnswers[index];
        const correctAnswer = question.correctAnswer;

        let isCorrect = false;
         // Doğruluk kontrolü, sadece doğru cevap ve kullanıcı cevabı mevcutsa yapılır
         if (correctAnswer !== undefined && correctAnswer !== null && userAnswer !== null && userAnswer !== undefined) {
             // Kullanıcı cevabı array ise ve boşsa (checkbox'ta hiçbir şey seçilmediyse), doğru değil
             const userAnsweredMultipleButEmpty = Array.isArray(userAnswer) && userAnswer.length === 0;
             // Kullanıcı cevabı tek ise ve null/undefined ise (radio'da seçilmediyse), doğru değil
             const userAnsweredSingleButNull = !Array.isArray(userAnswer) && (userAnswer === null || userAnswer === undefined);

             if (!userAnsweredMultipleButEmpty && !userAnsweredSingleButNull) { // Sadece *bir şey* cevaplandıysa doğruluğu kontrol et
                if (Array.isArray(correctAnswer)) {
                    if (Array.isArray(userAnswer) && userAnswer.length === correctAnswer.length) {
                       const sortedUser = [...userAnswer].sort((a,b)=>a-b);
                       const sortedCorrect = [...correctAnswer].sort((a,b)=>a-b);
                       isCorrect = JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect);
                    } else {
                       isCorrect = false; // Çoktan seçmeli, ama kullanıcı cevabı eşleşen bir array değil
                    }
                } else {
                    isCorrect = userAnswer === correctAnswer;
                }
             } else {
                 isCorrect = false; // Hiç cevaplanmadıysa veya boş array ise yanlış say
             }
         } else {
             // Doğru cevap eksikse VEYA kullanıcı cevabı eksikse (null/undefined), doğru değil say
             isCorrect = false;
         }


        if (filter === 'correct' && !isCorrect) return;
        if (filter === 'incorrect' && isCorrect) return;

        questionsDisplayed++;

        const questionElement = document.createElement('div');
        questionElement.className = 'mb-6 border-b pb-4 border-gray-200 dark:border-gray-700';
        questionElement.dataset.questionIndex = index;

        const formattedQuestion = formatText(question.question);
        const multipleAnswersExpected = Array.isArray(correctAnswer);

        questionElement.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-medium text-gray-800 dark:text-gray-100">${index + 1}. ${formattedQuestion} ${multipleAnswersExpected && ui.selectMultiple ? `<span class='text-xs text-gray-500 dark:text-gray-400 mt-1 ml-2'>(${ui.selectMultiple})</span>` : ''}</h4>
                <span class="px-2 py-1 rounded text-xs ${isCorrect ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'}">
                    ${isCorrect ? ui.reviewCorrect : ui.reviewIncorrect}
                </span>
            </div>
            <div class="space-y-2 mb-3">
                ${question.options.map((option, optIndex) => {
                    let optionBaseClasses = 'review-option p-2 border rounded text-sm flex justify-between items-center';
                    let optionColorClasses = '';
                    let userMarker = '';
                    let icon = '';

                    const isCorrectOption = multipleAnswersExpected ? (Array.isArray(correctAnswer) && correctAnswer.includes(optIndex)) : correctAnswer === optIndex;
                    const isUserSelection = multipleAnswersExpected ? (Array.isArray(userAnswer) && userAnswer.includes(optIndex)) : userAnswer === optIndex;
                     const isUserAnsweredThis = Array.isArray(userAnswer) ? userAnswer.includes(optIndex) : userAnswer === optIndex;


                    if (isCorrectOption) {
                        // Doğru cevap her zaman yeşil işaretlenir
                        optionColorClasses = ' correct';
                         icon = '<i class="fas fa-check ml-1"></i>';
                         // Doğru cevap aynı zamanda kullanıcı tarafından seçildiyse ek işaret yok
                    } else if (isUserAnsweredThis && !isCorrectOption) {
                        // Kullanıcı yanlış bir şıkkı seçtiyse kırmızı işaretlenir
                        optionColorClasses = ' incorrect-user';
                         icon = '<i class="fas fa-times ml-1"></i>';
                         userMarker = ` <span class="text-red-600 dark:text-red-400 text-xs italic">${ui.reviewYourAnswer}</span>`;
                    } else {
                        // Ne doğru ne de kullanıcı tarafından seçilmiş
                        optionColorClasses = ' plain';
                    }

                    return `<div class="${optionBaseClasses} ${optionColorClasses}"><span>${option}</span>${userMarker}${icon}</div>`;
                }).join('')}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mb-2 ml-1">
                 <i class="fas fa-tag mr-1"></i> ${ui.reviewTopic} ${question.topic || ui.noTopic}
            </div>
            <div class="explanation bg-gray-50 dark:bg-gray-700/30 p-3 rounded border border-gray-200 dark:border-gray-700">
                <div class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">${ui.reviewExplanation}</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">${question.explanation || ui.noExplanation}</div>
            </div>
        `;
       questionReview.appendChild(questionElement);
    });

    if (questionsDisplayed === 0) {
         questionReview.innerHTML = `<p class="text-center text-gray-500 dark:text-gray-400 italic">${lang === 'tr' ? 'Bu filtreyle eşleşen soru bulunamadı.' : 'No questions match this filter.'}</p>`;
    }

     // Sınav bittikten sonra navigator'u doğru/yanlış renklere güncelle
     updateNavigator();
 }

 // updateNavigationButtons'ı da dışarıya açıyoruz
 window.IstqbApp = {
     loadQuestionsForLang: loadAllQuestions,
     init: initExam,
     goToHomepage: goToHomepage,
     updateNavigationButtons: updateNavigationButtons // Fonksiyonu dışarıya açtık
 };

// --- Initialize on DOM Load ---
document.addEventListener('DOMContentLoaded', () => {
    // Elementleri seç ve eğer bulunamazsa uygulamayı başlatma
    if (!getDOMElements()) {
        console.error("ISTQB App cannot start due to missing DOM elements. Initialization halted.");
        return;
    }

     // İlk durum: welcome ekranı görünür, diğerleri gizli
     welcomeContainer.style.display = 'block';
     examMainContent.style.display = 'none';
     resultContainer.style.display = 'none';
     confirmModal.classList.add('hidden');
     showLoading(false); // Başlangıçta loading gizli olmalı

    // Olay Dinleyicilerini Ekle
    if(prevBtn) prevBtn.addEventListener('click', goToPreviousQuestion);
    if(nextBtn) nextBtn.addEventListener('click', goToNextQuestion);
    if(finishBtn) finishBtn.addEventListener('click', showFinishConfirmation);
    if(cancelFinishBtn) cancelFinishBtn.addEventListener('click', hideFinishConfirmation);
    if(confirmFinishBtn) confirmFinishBtn.addEventListener('click', finishExam);
    if(restartBtn) restartBtn.addEventListener('click', initExam);
    if(startExamBtn) startExamBtn.addEventListener('click', initExam);
    if(homepageBtn) homepageBtn.addEventListener('click', goToHomepage);

    filterButtons.forEach(button => button.addEventListener('click', () => applyResultFilter(button.dataset.filter)));

    // İlk veri yükleme
    // Ana scriptteki setLanguage fonksiyonu bu loadQuestionsForLang metodunu çağırır.
    // Bu nedenle burada tekrar çağırmak yerine, sayfa yüklendiğinde
    // ana scriptin setLanguage(initialLang) çağrısının bunu tetiklemesini bekliyoruz.
    // Ancak, eğer bu sayfa direk açılırsa ve ana scriptin loadQuestionsForLang'ı tetiklemesi
    // her zaman garanti değilse, burada bir başlangıç yüklemesi yapılabilir.
    // Şu anki setup'a göre ana scriptin setLanguage'i çağıracağını varsayıyoruz.
    // Yine de, development veya standalone test durumları için aşağıdaki satırı ekleyebiliriz.
    // loadAllQuestions().then(...).catch(...); // Eğer ana script tetiklemeyecekse bu satırı aktif edin.
    // Mevcut durumda DOMContentLoaded içinde zaten loadAllQuestions çağrılıyor, bu doğru.
    // Ana scriptin setLanguage'i çağırdığında da bu fonksiyon tekrar çağrılacak. Bu biraz tekrar oluyor.
    // Alternatif: Sadece ilk yüklemede loadAllQuestions çağır, setLanguage sadece translation.js yüklüyken çağrılsın ve
    // o çağrı sadece translatePage'i yapsın, question yüklemesini yapmasın.
    // Ancak, dil değişince soruların yeniden yüklenmesi (farklı dil verileri için) gerekiyorsa, setLanguage içindeki çağrı doğru.
    // Şu anki mantık (loadAllQuestions'ın dil değişince tekrar yükleme yapması) doğru görünüyor.
    // Orijinal kodda DOMContentLoaded içinde loadAllQuestions çağrılıyor, bu kalsın.
     loadAllQuestions().then(() => {
         // Translations yüklendiyse ve translatePage tanımlıysa
         if (typeof translations !== 'undefined' && typeof translatePage === 'function') {
             const initialLang = localStorage.getItem('language') || config.defaultLang;
             translatePage(initialLang); // Başlangıç dilini uygula
             // updateWelcomeScreenDetails zaten loadAllQuestions içinde çağrıldı.
             // startExamBtn'nin disabled durumu loadAllQuestions içinde ayarlandı.
         } else {
              console.warn("Translations or translatePage not available after initial load.");
         }
     }).catch(err => {
         console.error("Initial question load failed:", err);
         // loadAllQuestions içinde hata yönetimi yapılıyor, burada ekstra bir şey yapmaya gerek yok.
     });


}); // End of DOMContentLoaded

// Not: `translations` objesi ve `translatePage` fonksiyonu `translations.js`'ten gelmelidir.
// `translations.js` bu scriptten önce yüklenmelidir.
// Araç scriptleri (örneğin ISTQB scripti) bu scriptten sonra yüklenmelidir ve `window.IstqbApp` gibi
// global objeleri bu scriptin erişimi için tanımlamalıdır.
