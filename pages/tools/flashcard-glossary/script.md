// --- Configuration ---
const config = {
    dataBasePath: './data/', // Bu yol, flashcard-definitions klasörü içindeki data klasörüne göre doğru
    defaultFrontFaceLang: 'en',
    deckSize: 20,
    intervals: {
        easy: 7 * 24 * 60 * 60 * 1000,
        medium_base: 1 * 24 * 60 * 60 * 1000,
        hard_base: 10 * 60 * 1000,
        forgot_base: 5 * 60 * 1000,
        new_card_bonus: 0.5
    },
    transitionDuration: 700,
    postNavigationDelay: 20
};

const uiText = {
    mainTitleApp: "ISTQB® FL Kelime Kartları",
    welcomeIntroBase: "ISTQB Temel Seviye sınavı için anahtar kelimeleri ve kavramları etkili bir şekilde öğrenin.",
    welcomeIntroNote: "Not: Sağ üstteki <span class=\"font-semibold text-primary-light dark:text-primary-dark\">EN/TR</span> butonu ile kartların önce İngilizce mi yoksa Türkçe mi gösterileceğini seçebilirsiniz.",
    statsTitle: "İstatistikler",
    totalCardsLabel: "Toplam Kart:",
    learnedCardsLabel: "Öğrenildi (Kolay):",
    mediumCardsLabel: "Orta Seviye:",
    hardCardsLabel: "Zor Seviye:",
    dueForReviewLabel: "Bugün Tekrar Edilecek:",
    startNewLearning: "Yeni Kartları Öğren",
    startReview: "Tekrar Et",
    resetSession: "Oturumu Sıfırla",
    loadingText: "Yükleniyor...",
    flashcardTitle: "Flashcard",
    cardDisplay: "Kart",
    easy: "Kolay",
    medium: "Orta",
    hard: "Zor",
    forgot: "Unuttum",
    deckFinished: "Bu deste tamamlandı! Tebrikler!",
    allCardsReportTitle: "Tüm Kartlar Listesi",
    progressReportTitle: "Öğrenme Raporum",
    tableColWord: "Kelime",
    tableColDifficulty: "Zorluk",
    tableColLastReview: "Son Tekrar",
    tableColNextReview: "Sıradaki Tekrar",
    tableColCorrect: "Doğru",
    tableColIncorrect: "Yanlış",
    tableColEnglish: "İngilizce",
    tableColTurkish: "Türkçe",
    tableColExampleEN: "Örnek (EN)",
    tableColSource: "Kaynak",
    noCardsToReport: "Raporlanacak kart bulunamadı.",
    noProgressYet: "Henüz bir ilerleme kaydedilmemiş.",
    homepage: "Ana Sayfa",
    exitLearning: "Çalışmayı Bitir",
    confirmResetMessage: "Tüm öğrenme ilerlemeniz silinecektir. Emin misiniz?",
    loadError: "Kartlar yüklenemedi."
};

let allFlashcards = [];
let currentDeck = [];
let originalDeckForNav = [];
let currentCardIndexInOriginalDeck = -1;
let currentCardData = null;
let state = {
    frontFaceLanguage: config.defaultFrontFaceLang,
    cardFlipped: false,
    isTransitioningCard: false,
    currentLearningMode: null
};

// DOM elementleri - homeBtn ve toolsBtn tekrar eklendi
let loadingIndicator, welcomeContainer, flashcardMainContent, startNewCardsBtn, startReviewBtn, reviewCountBubble, resetSessionBtn, welcomeError;
let showAllCardsBtn, showProgressReportBtn, homeBtn, toolsBtn; // homeBtn ve toolsBtn tekrar eklendi
let allCardsReportContainer, progressReportContainer, closeAllCardsReportBtn, closeProgressReportBtn;
let allCardsTableBody, progressReportTableBody;
let flashcardOuterContainer, flashcardNavigationContainer, flashcardContainer, flashcardElement;
let flashcardFrontMainText, flashcardFrontExample, flashcardBackMainText, flashcardBackExample;
let difficultyButtonsContainer, forgotCardBtn, goToWelcomeBtn, exitLearningBtn, prevCardBtn, nextCardBtn;
let currentCardDisplay, totalCardsInDeckDisplay, deckFinishedMessage;
let totalCardsStat, learnedCardsStat, mediumCardsStat, hardCardsStat, dueForReviewStat;
let cardFaceLanguageToggle, themeToggles = [];
let welcomeIntroTextP, welcomeIntroNoteP;

function getDOMElements() {
    loadingIndicator = document.getElementById('loading-indicator');
    welcomeContainer = document.getElementById('welcome-container');
    welcomeIntroTextP = document.getElementById('welcome-intro-text');
    welcomeIntroNoteP = document.getElementById('welcome-intro-note');
    flashcardMainContent = document.getElementById('flashcard-main-content');
    startNewCardsBtn = document.getElementById('start-new-cards-btn');
    startReviewBtn = document.getElementById('start-review-btn');
    reviewCountBubble = document.getElementById('review-count-bubble');
    resetSessionBtn = document.getElementById('reset-session-btn');
    welcomeError = document.getElementById('welcome-error');
    showAllCardsBtn = document.getElementById('show-all-cards-btn');
    showProgressReportBtn = document.getElementById('show-progress-report-btn');
    homeBtn = document.getElementById('home-btn'); // Tekrar eklendi
    toolsBtn = document.getElementById('tools-btn'); // Tekrar eklendi
    // tools-modal kaldırıldı
    allCardsReportContainer = document.getElementById('all-cards-report-container');
    progressReportContainer = document.getElementById('progress-report-container');
    closeAllCardsReportBtn = document.getElementById('close-all-cards-report-btn');
    closeProgressReportBtn = document.getElementById('close-progress-report-btn');
    allCardsTableBody = document.getElementById('all-cards-table')?.querySelector('tbody');
    progressReportTableBody = document.getElementById('progress-report-table')?.querySelector('tbody');
    flashcardOuterContainer = document.getElementById('flashcard-outer-container');
    flashcardNavigationContainer = document.getElementById('flashcard-navigation-container');
    flashcardContainer = document.getElementById('flashcard-container');
    flashcardElement = document.getElementById('flashcard');
    flashcardFrontMainText = document.getElementById('flashcard-front')?.querySelector('.flashcard-main-text');
    flashcardFrontExample = document.getElementById('flashcard-front')?.querySelector('.flashcard-example-sentence');
    flashcardBackMainText = document.getElementById('flashcard-back')?.querySelector('.flashcard-main-text');
    flashcardBackExample = document.getElementById('flashcard-back')?.querySelector('.flashcard-example-sentence');
    difficultyButtonsContainer = document.getElementById('difficulty-buttons');
    forgotCardBtn = document.getElementById('forgot-card-btn');
    goToWelcomeBtn = document.getElementById('go-to-welcome-btn');
    exitLearningBtn = document.getElementById('exit-learning-btn');
    prevCardBtn = document.getElementById('prev-card-btn');
    nextCardBtn = document.getElementById('next-card-btn');
    deckFinishedMessage = document.getElementById('deck-finished-message');
    currentCardDisplay = document.getElementById('current-card-display');
    totalCardsInDeckDisplay = document.getElementById('total-cards-in-deck-display');
    totalCardsStat = document.getElementById('total-cards-stat');
    learnedCardsStat = document.getElementById('learned-cards-stat');
    mediumCardsStat = document.getElementById('medium-cards-stat');
    hardCardsStat = document.getElementById('hard-cards-stat');
    dueForReviewStat = document.getElementById('due-for-review-stat');
    cardFaceLanguageToggle = document.getElementById('card-face-language-toggle');
    themeToggles = [document.getElementById('theme-toggle-welcome'), document.getElementById('theme-toggle-flashcard')];
}

// showToolsModal ve closeToolsModal fonksiyonları kaldırıldı

function initializeUIText() {
    document.title = uiText.mainTitleApp;
    if (welcomeContainer) {
        const h1 = welcomeContainer.querySelector('h1');
        if (h1) h1.textContent = uiText.mainTitleApp;
        if (welcomeIntroTextP) welcomeIntroTextP.innerHTML = uiText.welcomeIntroBase;
        if (welcomeIntroNoteP) welcomeIntroNoteP.innerHTML = uiText.welcomeIntroNote;
        const statsH3 = welcomeContainer.querySelector('h3');
        if (statsH3) statsH3.textContent = uiText.statsTitle;
        const statDivs = welcomeContainer.querySelectorAll('.grid.grid-cols-2.gap-4.text-sm > div');
        if (statDivs.length >= 5) {
            if(statDivs[0] && statDivs[0].childNodes.length > 0) statDivs[0].childNodes[0].nodeValue = uiText.totalCardsLabel + " ";
            if(statDivs[1] && statDivs[1].childNodes.length > 0) statDivs[1].childNodes[0].nodeValue = uiText.learnedCardsLabel + " ";
            if(statDivs[2] && statDivs[2].childNodes.length > 0) statDivs[2].childNodes[0].nodeValue = uiText.mediumCardsLabel + " ";
            if(statDivs[3] && statDivs[3].childNodes.length > 0) statDivs[3].childNodes[0].nodeValue = uiText.hardCardsLabel + " ";
            const dueStatSpan = statDivs[4]?.querySelector('span:first-child');
            if (dueStatSpan) dueStatSpan.textContent = uiText.dueForReviewLabel;
        }
        if(startNewCardsBtn) { const span = startNewCardsBtn.querySelector('span'); if(span) span.textContent = uiText.startNewLearning; }
        if(startReviewBtn) { const span = startReviewBtn.querySelector('span:not(#review-count-bubble)'); if(span) span.textContent = uiText.startReview; }
        const allCardsBtnElem = document.getElementById('show-all-cards-btn');
        if(allCardsBtnElem) allCardsBtnElem.innerHTML = `<i class="fas fa-list-ul mr-2"></i> ${uiText.allCardsReportTitle}`;
        const progressReportBtnElem = document.getElementById('show-progress-report-btn');
        if(progressReportBtnElem) progressReportBtnElem.innerHTML = `<i class="fas fa-chart-bar mr-2"></i> ${uiText.progressReportTitle}`;
        if(resetSessionBtn) { const span = resetSessionBtn.querySelector('span'); if(span) span.textContent = uiText.resetSession; }
    }
    if(loadingIndicator) { const span = loadingIndicator.querySelector('span'); if(span) span.textContent = uiText.loadingText; }
    if (flashcardMainContent) {
        const titleH2 = flashcardMainContent.querySelector('h2');
        if (titleH2) titleH2.textContent = uiText.flashcardTitle;
        const cardDisplayElem = flashcardMainContent.querySelector('#current-card-display');
        if (cardDisplayElem && cardDisplayElem.previousSibling && cardDisplayElem.previousSibling.nodeType === Node.TEXT_NODE) {
            cardDisplayElem.previousSibling.textContent = uiText.cardDisplay + " ";
        }
    }
    if (difficultyButtonsContainer) {
        const buttons = difficultyButtonsContainer.querySelectorAll('button.difficulty-btn');
        if (buttons.length >= 3) {
            const easySpan = buttons[0]?.querySelector('span'); if (easySpan) easySpan.textContent = uiText.easy;
            const mediumSpan = buttons[1]?.querySelector('span'); if (mediumSpan) mediumSpan.textContent = uiText.medium;
            const hardSpan = buttons[2]?.querySelector('span'); if (hardSpan) hardSpan.textContent = uiText.hard;
        }
        if (forgotCardBtn) { const span = forgotCardBtn.querySelector('span'); if (span) span.textContent = uiText.forgot; }
    }
    if (allCardsReportContainer) { const h3 = allCardsReportContainer.querySelector('h3#all-cards-report-title'); if (h3) h3.textContent = uiText.allCardsReportTitle; }
    if (progressReportContainer) { const h3 = progressReportContainer.querySelector('h3#progress-report-title'); if (h3) h3.textContent = uiText.progressReportTitle; }
    const allCardsHeaderRow = document.getElementById('all-cards-table-header-row');
    if (allCardsHeaderRow) {
        allCardsHeaderRow.innerHTML = `
            <th class="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-300">${uiText.tableColEnglish}</th>
            <th class="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-300">${uiText.tableColTurkish}</th>
        `;
    }
    const progressHeaderRow = document.getElementById('progress-report-table-header-row');
    if (progressHeaderRow) {
        progressHeaderRow.innerHTML = `
            <th class="px-3 py-2 text-left font-medium text-gray-500 dark:text-gray-300">${uiText.tableColWord}</th>
            <th class="px-3 py-2 text-left font-medium text-gray-500 dark:text-gray-300">${uiText.tableColDifficulty}</th>
            <th class="px-3 py-2 text-left font-medium text-gray-500 dark:text-gray-300">${uiText.tableColLastReview}</th>
            <th class="px-3 py-2 text-left font-medium text-gray-500 dark:text-gray-300">${uiText.tableColNextReview}</th>
            <th class="px-3 py-2 text-left font-medium text-gray-500 dark:text-gray-300">${uiText.tableColCorrect}</th>
            <th class="px-3 py-2 text-left font-medium text-gray-500 dark:text-gray-300">${uiText.tableColIncorrect}</th>
        `;
    }
    if (deckFinishedMessage) deckFinishedMessage.textContent = uiText.deckFinished;
    if (goToWelcomeBtn) { const span = goToWelcomeBtn.querySelector('span'); if (span) span.textContent = uiText.homepage; }
    if (exitLearningBtn) exitLearningBtn.title = uiText.exitLearning;
    const footerP = document.querySelector('footer p');
    if (footerP) footerP.textContent = "Eğitim amacıyla geliştirilmiştir.";
    if (cardFaceLanguageToggle) {
        cardFaceLanguageToggle.textContent = state.frontFaceLanguage.toUpperCase();
    }
}

function showLoading(isLoading) { if (loadingIndicator) loadingIndicator.style.display = isLoading ? 'flex' : 'none'; }
function toggleTheme() { const html = document.documentElement; html.classList.toggle('dark'); localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light'); updateThemeToggleIcons(); }
function updateThemeToggleIcons() { const isDark = document.documentElement.classList.contains('dark'); themeToggles.forEach(toggle => { if (toggle) { const moonIcon = toggle.querySelector('.fa-moon'); const sunIcon = toggle.querySelector('.fa-sun'); if (moonIcon && sunIcon) { moonIcon.style.display = isDark ? 'none' : 'inline-block'; sunIcon.style.display = isDark ? 'inline-block' : 'none'; } } }); }
async function loadFlashcards() { showLoading(true); if(startNewCardsBtn) startNewCardsBtn.disabled = true; if(startReviewBtn) startReviewBtn.disabled = true; if(welcomeError) welcomeError.classList.add('hidden'); try { const response = await fetch(`${config.dataBasePath}flashcards_tr.json?v=${new Date().getTime()}`); if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`); const data = await response.json(); const storedFlashcards = JSON.parse(localStorage.getItem('flashcardsProgress')) || {}; allFlashcards = data.map(card => ({ ...card, isCompletedThisSession: false, ...(storedFlashcards[card.id] || { difficulty: null, lastReviewed: null, nextReview: null, timesCorrect: 0, timesIncorrect: 0, consecutiveCorrect: 0 }) })); if(startNewCardsBtn) startNewCardsBtn.disabled = false; if(startReviewBtn) startReviewBtn.disabled = false; updateStats(); } catch (error) { console.error("Error loading flashcards:", error); if(welcomeError) { welcomeError.textContent = uiText.loadError; welcomeError.classList.remove('hidden'); } } finally { showLoading(false); } }
function saveProgress() { const progressToStore = {}; allFlashcards.forEach(card => { progressToStore[card.id] = { difficulty: card.difficulty, lastReviewed: card.lastReviewed, nextReview: card.nextReview, timesCorrect: card.timesCorrect, timesIncorrect: card.timesIncorrect, consecutiveCorrect: card.consecutiveCorrect }; }); localStorage.setItem('flashcardsProgress', JSON.stringify(progressToStore)); updateStats(); }
function updateStats() { if(!totalCardsStat) return; totalCardsStat.textContent = allFlashcards.length; learnedCardsStat.textContent = allFlashcards.filter(c => c.difficulty === 'easy').length; mediumCardsStat.textContent = allFlashcards.filter(c => c.difficulty === 'medium').length; hardCardsStat.textContent = allFlashcards.filter(c => c.difficulty === 'hard').length; const now = new Date().getTime(); const dueCount = allFlashcards.filter(c => c.difficulty !== 'easy' && c.nextReview && c.nextReview <= now && !c.isCompletedThisSession).length; if(dueForReviewStat) dueForReviewStat.textContent = String(dueCount); if(reviewCountBubble){ if(dueCount > 0){ reviewCountBubble.textContent = String(dueCount); reviewCountBubble.classList.remove('hidden'); } else { reviewCountBubble.classList.add('hidden'); } } }

function buildReviewDeck(mode = 'review') {
    const now = new Date().getTime();
    let tempDeck = [];
    allFlashcards.forEach(c => c.isCompletedThisSession = false);
    if (mode === 'new') {
        let unseen = allFlashcards.filter(card => !card.difficulty);
        unseen.sort(() => 0.5 - Math.random());
        tempDeck.push(...unseen);
        if (tempDeck.length < config.deckSize) {
            let rarelySeen = allFlashcards.filter(c => c.difficulty !== 'easy' && c.difficulty !== null && !unseen.find(uc => uc.id === c.id))
                                     .sort((a,b) => (a.lastReviewed || 0) - (b.lastReviewed || 0));
            tempDeck.push(...rarelySeen.slice(0, config.deckSize - tempDeck.length));
        }
    } else { // review mode
        let due = allFlashcards.filter(card => card.difficulty !== 'easy' && card.nextReview && card.nextReview <= now);
        // Sort due cards: hard first, then by next review time (oldest first)
        due.sort((a,b) => {
            if (a.difficulty === 'hard' && b.difficulty !== 'hard') return -1;
            if (a.difficulty !== 'hard' && b.difficulty === 'hard') return 1;
            return (a.nextReview || 0) - (b.nextReview || 0);
        });
        tempDeck.push(...due);

        // If deck size is not reached, add some non-easy, non-due cards
        if (tempDeck.length < config.deckSize) {
            let notDueButNotEasy = allFlashcards.filter(c => c.difficulty !== 'easy' && c.difficulty !== null && (!c.nextReview || c.nextReview > now) && !due.find(dc => dc.id === c.id))
                                         .sort(() => 0.5 - Math.random()); // Randomize these
            tempDeck.push(...notDueButNotEasy.slice(0, config.deckSize - tempDeck.length));
        }

         // If deck size is still not reached, add some unseen cards
         if (tempDeck.length < config.deckSize) {
            let unseen = allFlashcards.filter(card => !card.difficulty && !tempDeck.find(td => td.id === card.id));
            unseen.sort(() => 0.5 - Math.random()); // Randomize these
            tempDeck.push(...unseen.slice(0, config.deckSize - tempDeck.length));
        }
    }
    currentDeck = tempDeck.slice(0, config.deckSize);
    originalDeckForNav = [...currentDeck]; // Navigasyon için orijinal desteyi sakla
    currentCardIndexInOriginalDeck = -1; // Başlangıçta kart yok
}


function displayCurrentCard() {
    if (!currentCardData || !flashcardElement) return;
    flashcardElement.classList.remove('flipped'); state.cardFlipped = false;
    if(difficultyButtonsContainer) { difficultyButtonsContainer.classList.add('hidden'); }

    const frontLang = state.frontFaceLanguage;
    const backLang = frontLang === 'en' ? 'tr' : 'en';
    if(flashcardFrontMainText) flashcardFrontMainText.textContent = currentCardData[frontLang === 'en' ? 'english' : 'turkish'];
    if(flashcardFrontExample) flashcardFrontExample.textContent = currentCardData[frontLang === 'en' ? 'exampleSentenceEN' : 'exampleSentenceTR'] || '';
    if(flashcardBackMainText) flashcardBackMainText.textContent = currentCardData[backLang === 'en' ? 'english' : 'turkish'];
    if(flashcardBackExample) flashcardBackExample.textContent = currentCardData[backLang === 'en' ? 'exampleSentenceEN' : 'exampleSentenceTR'] || '';

    if(deckFinishedMessage) deckFinishedMessage.classList.add('hidden');
    if(goToWelcomeBtn) goToWelcomeBtn.classList.add('hidden');
    if(flashcardNavigationContainer) flashcardNavigationContainer.classList.remove('hidden');
    flashcardElement.style.opacity = '1';

    const displayIndex = originalDeckForNav.indexOf(currentCardData);
    if(currentCardDisplay && displayIndex !== -1) currentCardDisplay.textContent = String(displayIndex + 1);
    else if(currentCardDisplay) currentCardDisplay.textContent = "?";

    if(totalCardsInDeckDisplay) totalCardsInDeckDisplay.textContent = String(originalDeckForNav.length);
    updateNavigationButtons();
}


function prepareForCardChange() { if (!flashcardElement) return; flashcardElement.style.transition = 'none'; flashcardElement.style.opacity = '0'; flashcardElement.classList.remove('flipped'); state.cardFlipped = false; if(difficultyButtonsContainer) { difficultyButtonsContainer.classList.add('hidden');} }
function finalizeCardChange() { if (!flashcardElement) return; requestAnimationFrame(() => { flashcardElement.style.transition = `transform ${config.transitionDuration}ms cubic-bezier(0.4, 0.0, 0.2, 1)`; }); }

function navigateToCard(targetIndexInOriginalDeck) {
    if (state.isTransitioningCard) return;
    if (targetIndexInOriginalDeck >= 0 && targetIndexInOriginalDeck < originalDeckForNav.length) {
        prepareForCardChange();
        setTimeout(() => {
            currentCardIndexInOriginalDeck = targetIndexInOriginalDeck;
            currentCardData = originalDeckForNav[currentCardIndexInOriginalDeck];
            displayCurrentCard();
            finalizeCardChange();
            updateNavigationButtons();
        }, config.postNavigationDelay);
    }
}


function showNextCardManual() { if (currentCardIndexInOriginalDeck < originalDeckForNav.length - 1) { navigateToCard(currentCardIndexInOriginalDeck + 1); } }
function showPrevCard() { if (currentCardIndexInOriginalDeck > 0) { navigateToCard(currentCardIndexInOriginalDeck - 1); } }
function updateNavigationButtons() { if (!prevCardBtn || !nextCardBtn) return;
    const isFirst = currentCardIndexInOriginalDeck <= 0;
    const isLast = currentCardIndexInOriginalDeck >= originalDeckForNav.length - 1;

    prevCardBtn.disabled = isFirst || state.isTransitioningCard;
    nextCardBtn.disabled = isLast || state.isTransitioningCard;

    // Eğer deck tamamlandıysa ve kart kalmadıysa navigasyon butonlarını gizle/devre dışı bırak
    if (!currentCardData || originalDeckForNav.length === 0) {
         if(prevCardBtn) prevCardBtn.disabled = true;
         if(nextCardBtn) nextCardBtn.disabled = true;
    }
}


function flipCard() {
    if (!currentCardData || !flashcardElement || state.isTransitioningCard) return;
    // Eğer kart oturumda tamamlandıysa, flip işlemine izin verme (veya sadece flip yap, butonları gösterme)
     if (currentCardData.isCompletedThisSession && state.cardFlipped) {
        // Zaten tamamlanmış ve ön yüzdeyse flip yapma, arka yüzdeyse ön yüze çevir
        if (flashcardElement.classList.contains('flipped')) {
             state.isTransitioningCard = true;
             state.cardFlipped = !state.cardFlipped;
             flashcardElement.classList.toggle('flipped', state.cardFlipped);
             if(difficultyButtonsContainer) difficultyButtonsContainer.classList.add('hidden'); // Butonları gizle
              setTimeout(() => { state.isTransitioningCard = false; updateNavigationButtons(); }, config.transitionDuration);
        }
         return; // Tamamlanmış kartın ön yüzündeyken başka bir şey yapma
    }


    state.isTransitioningCard = true;
    state.cardFlipped = !state.cardFlipped;
    flashcardElement.classList.toggle('flipped', state.cardFlipped);

    // Kart çevrilince zorluk butonlarını göster (eğer kart daha önce bu oturumda tamamlanmadıysa)
    if (!currentCardData.isCompletedThisSession) {
        if (state.cardFlipped) {
            if(difficultyButtonsContainer) difficultyButtonsContainer.classList.remove('hidden');
        } else {
            if(difficultyButtonsContainer) difficultyButtonsContainer.classList.add('hidden');
        }
    } else {
         // Kart tamamlandıysa her zaman gizle
         if(difficultyButtonsContainer) difficultyButtonsContainer.classList.add('hidden');
    }


    setTimeout(() => { state.isTransitioningCard = false; updateNavigationButtons(); }, config.transitionDuration);
}


// Sm2 (Spaced Repetition) algoritmasına dayalı interval hesaplama
function calculateNextReview(card, difficulty, isForgot = false) {
    const now = new Date().getTime();
    let interval;

    if (isForgot) {
        // Unutulan kartlar için küçük bir sabit interval, ardışık doğru sayısını sıfırla
        interval = config.intervals.forgot_base;
        card.consecutiveCorrect = 0;
        card.difficulty = 'hard'; // Genellikle unutulan kartları hard olarak işaretlemek mantıklıdır
    } else if (difficulty === 'easy') {
        // Easy için uzun, sabit veya giderek artan bir interval
        // Örnek: Easy basıldığında consecutiveCorrect'i artır ve interval'i buna göre büyüt
        card.consecutiveCorrect = (card.consecutiveCorrect || 0) + 1;
         // Çok basit bir Easy artışı (Örn: Her Easy'de intervali 2x artır, bir başlangıç değeriyle)
        const baseEasyInterval = config.intervals.medium_base * 3; // Medium'un 3 katı gibi bir başlangıç
         interval = baseEasyInterval * Math.pow(2, Math.max(0, card.consecutiveCorrect - 1)); // consecutiveCorrect 1 ise base, 2 ise 2x base, 3 ise 4x base
         card.difficulty = 'easy';
    } else if (difficulty === 'medium') {
        // Medium için ardışık doğru sayısına bağlı olarak artan interval
        card.consecutiveCorrect = (card.consecutiveCorrect || 0) + 1;
        let baseInterval = config.intervals.medium_base;
         // İlk doğru cevap (veya yeni kart bonusu)
         if(card.timesCorrect === 0 && card.timesIncorrect === 0) {
              baseInterval *= config.intervals.new_card_bonus; // Yeni kartlar için başlangıcı daha kısa yapabiliriz
         } else {
             // Daha sonraki medium cevapları için üstel artış (Sm2'nin temel prensibi)
             baseInterval = config.intervals.medium_base * Math.pow(1.6, Math.max(0, card.consecutiveCorrect -1)); // Örn: 1.6 faktörü
         }
         interval = baseInterval;
         card.difficulty = 'medium';
    } else { // difficulty === 'hard'
        // Hard için küçük, sabit veya az artan interval, ardışık doğru sayısını sıfırla
        card.consecutiveCorrect = 0;
        let baseInterval = config.intervals.hard_base;
         // İlk yanlış/hard cevap
         if(card.timesCorrect === 0 && card.timesIncorrect === 0) {
             baseInterval *= config.intervals.new_card_bonus; // Yeni kartlar için daha kısa
         }
         interval = baseInterval;
        card.difficulty = 'hard';
    }

    // Minimum interval süresi (örn: 1 dakika)
    const minInterval = 1 * 60 * 1000; // 1 dakika
    interval = Math.max(interval, minInterval); // En az 1 dakika sonra tekrar göster

    // Maksimum interval süresi (çok uzak tarihler olmaması için)
    const maxInterval = 365 * 24 * 60 * 60 * 1000; // 1 yıl
    interval = Math.min(interval, maxInterval);


    card.nextReview = now + interval;

    // Console log for debugging
    // console.log(`Card ID: ${card.id}, Action: ${isForgot ? 'Forgot' : difficulty}, Consecutive Correct: ${card.consecutiveCorrect}, Next Review: ${new Date(card.nextReview).toLocaleString()}`);
}

// Kartın zorluk seçimine göre işlem yap
function processCardAction(cardId, action, newDifficulty = null) {
    const cardInAll = allFlashcards.find(c => c.id === cardId);
    if (cardInAll) {
        cardInAll.lastReviewed = new Date().getTime();

        if (action === 'forgot') {
            cardInAll.timesIncorrect = (cardInAll.timesIncorrect || 0) + 1;
            calculateNextReview(cardInAll, 'hard', true); // Unutulduysa hard gibi işlem görsün interval için
        } else { // easy, medium, hard
            cardInAll.difficulty = newDifficulty;
            if(newDifficulty === 'hard') {
                cardInAll.timesIncorrect = (cardInAll.timesIncorrect || 0) + 1;
                cardInAll.consecutiveCorrect = 0; // Hard'a basılınca ardışık doğru sıfırlanır
            } else { // easy or medium
                 cardInAll.timesCorrect = (cardInAll.timesCorrect || 0) + 1;
                // calculateNextReview içinde consecutiveCorrect güncelleniyor
            }
            calculateNextReview(cardInAll, newDifficulty, false);
        }

        cardInAll.isCompletedThisSession = true; // Bu kart oturumda tamamlandı olarak işaretle
    }
    saveProgress(); // İlerlemeyi kaydet
    currentDeck = currentDeck.filter(card => card.id !== cardId); // Kartı desteden çıkar

    // Yeni kartı yüklemek için hazırlık yap
    prepareForCardChange();
    // Kısa bir gecikme sonrası bir sonraki kartı yükle
    setTimeout(() => {
        loadNextCardFromCurrentDeck();
    }, config.postNavigationDelay);
}

function handleDifficultySelection(e) {
    // Butonun veya içindeki span'ın tıklanmış olabileceği durumu ele al
    const button = e.target.closest('.difficulty-btn');
    if (!button || !currentCardData || state.isTransitioningCard || currentCardData.isCompletedThisSession) return;
    const difficulty = button.dataset.difficulty;
    processCardAction(currentCardData.id, 'difficulty', difficulty);
}

function handleForgotCard() {
    const button = event.target.closest('#forgot-card-btn');
     if (!button || !currentCardData || state.isTransitioningCard || currentCardData.isCompletedThisSession) return;
    processCardAction(currentCardData.id, 'forgot');
}


function loadNextCardFromCurrentDeck() {
     // Şu anki deck'teki ilk kartı al
    currentCardData = currentDeck.length > 0 ? currentDeck[0] : null;

    if (currentCardData) {
        // Yeni kartın orijinal destedeki indeksini bul
        currentCardIndexInOriginalDeck = originalDeckForNav.findIndex(card => card.id === currentCardData.id);
        // Kartı göster
        displayCurrentCard();
        // Geçiş animasyonunu tekrar etkinleştir
        finalizeCardChange();
    } else {
        // Deck bitti
        if(flashcardNavigationContainer) flashcardNavigationContainer.classList.add('hidden');
        if(difficultyButtonsContainer) difficultyButtonsContainer.classList.add('hidden');
        if(deckFinishedMessage) {
            // Mode'a göre bitiş mesajını güncelle
            const noMoreCardsText = state.currentLearningMode === 'new'
                ? "Öğrenilecek yeni kart bulunamadı veya mevcut deste bitti."
                : "Şu an tekrar edilecek kart yok veya mevcut deste bitti.";
             deckFinishedMessage.textContent = uiText.deckFinished + " " + noMoreCardsText + " Ana sayfaya dönebilirsiniz.";

            deckFinishedMessage.classList.remove('hidden');
        }
        if(goToWelcomeBtn) goToWelcomeBtn.classList.remove('hidden'); // İç Ana Sayfa butonu görünür
        currentCardData = null; // Kart verisini sıfırla
    }
     updateNavigationButtons(); // Navigasyon buton durumunu güncelle
}


function startLearningSession(mode) {
    state.currentLearningMode = mode; // Öğrenme modunu kaydet
    if (welcomeContainer) welcomeContainer.style.display = 'none';
    if (flashcardMainContent) flashcardMainContent.style.display = 'block';

    // <<< YENİ EKLENEN KOD >>>
    // Flaşkart ekranına geçerken üstteki ana navigasyon butonlarını gizle
    if(homeBtn) homeBtn.classList.add('hidden');
    if(toolsBtn) toolsBtn.classList.add('hidden');
    // <<< YENİ EKLENEN KOD SONU >>>


    buildReviewDeck(mode); // Yeni desteyi oluştur

    if (currentDeck.length > 0) {
        currentCardData = currentDeck[0]; // İlk kartı yükle
        currentCardIndexInOriginalDeck = originalDeckForNav.findIndex(card => card.id === currentCardData.id); // Orijinaldeki indeksini bul
        // Kart değişimi için hazırlık ve yükleme
        prepareForCardChange();
        setTimeout(() => {
            displayCurrentCard();
            finalizeCardChange();
        }, config.postNavigationDelay);
    } else {
        // Deck boşsa (başlanacak kart yoksa)
        if(flashcardNavigationContainer) flashcardNavigationContainer.classList.add('hidden');
        if(difficultyButtonsContainer) difficultyButtonsContainer.classList.add('hidden');
        if(deckFinishedMessage) {
            // Mode'a göre başlangıçta kart yok mesajını güncelle
            const noCardsToStartText = mode === 'new'
                ? "Öğrenilecek yeni kart bulunamadı."
                : "Şu an tekrar edilecek kart yok.";
            deckFinishedMessage.textContent = noCardsToStartText + " Ana sayfaya dönebilirsiniz.";
            deckFinishedMessage.classList.remove('hidden');
        }
        if(goToWelcomeBtn) goToWelcomeBtn.classList.remove('hidden'); // İç Ana Sayfa butonu görünür
        currentCardData = null; // Kart verisini sıfırla
    }
    updateNavigationButtons(); // Navigasyon buton durumunu güncelle (başlangıçta devre dışı olabilirler)
}


function confirmReset() {
    if (confirm(uiText.confirmResetMessage)) {
        localStorage.removeItem('flashcardsProgress');
        // allFlashcards array'ini de sıfırla
        allFlashcards.forEach(card => {
            card.difficulty = null;
            card.lastReviewed = null;
            card.nextReview = null;
            card.timesCorrect = 0;
            card.timesIncorrect = 0;
            card.consecutiveCorrect = 0;
            card.isCompletedThisSession = false; // Oturum durumunu da sıfırla
        });
        updateStats(); // İstatistikleri güncelle
        // Butonları tekrar etkinleştir (eğer devre dışı kaldılarsa yükleme sırasında)
        if(startNewCardsBtn) startNewCardsBtn.disabled = false;
        if(startReviewBtn) startReviewBtn.disabled = false;
        alert("İlerleme sıfırlandı.");
        // Eğer flashcard ekranındaysa hoş geldiniz ekranına dön
        if (flashcardMainContent && flashcardMainContent.style.display === 'block') {
           goToWelcomeScreen();
        }
    }
}

function toggleCardFaceLanguage() {
    if (state.isTransitioningCard) return; // Geçiş sırasında dil değiştirmeyi engelle
    state.frontFaceLanguage = state.frontFaceLanguage === 'en' ? 'tr' : 'en';
    localStorage.setItem('flashcardFrontFaceLang', state.frontFaceLanguage);
    // Dil butonunun metnini güncelle
    if (cardFaceLanguageToggle) cardFaceLanguageToggle.textContent = state.frontFaceLanguage.toUpperCase();
    // Eğer bir kart gösteriliyorsa, güncel dil ile tekrar göster
    if (currentCardData) {
        // Dil değişimi için de kısa bir "görünmezlik" geçişi yapabiliriz
        prepareForCardChange();
        setTimeout(() => {
            displayCurrentCard(); // Mevcut kartı yeni dilde tekrar göster
            finalizeCardChange();
        }, config.postNavigationDelay);
    }
}


// Bu fonksiyon sadece flashcard uygulaması içindeki hoş geldiniz ekranına döner
function goToWelcomeScreen() {
    if(flashcardMainContent) flashcardMainContent.style.display = 'none';
    if(welcomeContainer) welcomeContainer.style.display = 'block';

    // <<< YENİ EKLENEN KOD >>>
    // Hoş geldiniz ekranına dönerken üstteki ana navigasyon butonlarını göster
    if(homeBtn) homeBtn.classList.remove('hidden');
    if(toolsBtn) toolsBtn.classList.remove('hidden');
    // <<< YENİ EKLENEN KOD SONU >>>


    // Oturum tamamlanma mesajını ve butonu gizle
    if(deckFinishedMessage) deckFinishedMessage.classList.add('hidden');
    if(goToWelcomeBtn) goToWelcomeBtn.classList.add('hidden');
    // İstatistikleri güncelle
    updateStats();
    // Gerekirse flashcard ekranı için navigasyon ve zorluk butonlarını gizle
    if(flashcardNavigationContainer) flashcardNavigationContainer.classList.add('hidden');
    if(difficultyButtonsContainer) difficultyButtonsContainer.classList.add('hidden');
    // currentCardData'yı sıfırlayabiliriz veya null bırakabiliriz, yeni bir session başlayana kadar kullanılmayacak
    currentCardData = null;
    currentDeck = [];
    originalDeckForNav = [];
    currentCardIndexInOriginalDeck = -1;
    updateNavigationButtons(); // Navigasyon butonlarını sıfırla/devre dışı bırak
}


// Tüm kartları listeleme tablosunu doldur
function populateAllCardsTable() {
    if (!allCardsTableBody) return;
    allCardsTableBody.innerHTML = ''; // Mevcut içeriği temizle

    if (allFlashcards.length === 0) {
        allCardsTableBody.innerHTML = `<tr><td colspan="2" class="px-4 py-3 text-center text-gray-500">${uiText.noCardsToReport}</td></tr>`;
        return;
    }

    // İngilizce kelimeye göre sırala
    const sortedCards = [...allFlashcards].sort((a, b) => {
        const wordA = a.english.toLowerCase();
        const wordB = b.english.toLowerCase();
        if (wordA < wordB) return -1;
        if (wordA > wordB) return 1;
        return 0;
    });

    sortedCards.forEach(card => {
        const row = allCardsTableBody.insertRow();
        row.insertCell().textContent = card.english;
        row.insertCell().textContent = card.turkish;
    });
}

// Öğrenme raporu tablosunu doldur
function populateProgressReportTable() {
    if (!progressReportTableBody) return;
    progressReportTableBody.innerHTML = ''; // Mevcut içeriği temizle

    // En az bir kere gözden geçirilmiş kartları filtrele
    const reviewedCards = allFlashcards.filter(c => c.difficulty !== null);

    if (reviewedCards.length === 0) {
        progressReportTableBody.innerHTML = `<tr><td colspan="6" class="px-3 py-3 text-center text-gray-500">${uiText.noProgressYet}</td></tr>`;
        return;
    }

    // Son gözden geçirme tarihine göre sırala (en eski en üstte)
    reviewedCards.sort((a,b) => (a.lastReviewed || 0) - (b.lastReviewed || 0));


    reviewedCards.forEach(card => {
        const row = progressReportTableBody.insertRow();

        // Kart kelimesini ön yüze göre göster
        const wordToShow = state.frontFaceLanguage === 'en' ? card.english : card.turkish;
        row.insertCell().textContent = wordToShow;

        // Zorluk seviyesini metin olarak göster
        let difficultyText = '-';
        if (card.difficulty === 'easy') difficultyText = uiText.easy;
        else if (card.difficulty === 'medium') difficultyText = uiText.medium;
        else if (card.difficulty === 'hard') difficultyText = uiText.hard;
        row.insertCell().textContent = difficultyText;

        // Tarihleri formatlayarak göster
        row.insertCell().textContent = card.lastReviewed ? new Date(card.lastReviewed).toLocaleDateString() : '-';
        row.insertCell().textContent = card.nextReview ? new Date(card.nextReview).toLocaleDateString() : '-';

        row.insertCell().textContent = card.timesCorrect || 0;
        row.insertCell().textContent = card.timesIncorrect || 0;
    });
}

// Rapor modalını göster/gizle
function showReportModal(modalElement) { if(modalElement) modalElement.classList.remove('hidden'); }
function closeReportModal(modalElement) { if(modalElement) modalElement.classList.add('hidden'); }


// DOM yüklendiğinde çalışacak ana fonksiyon
document.addEventListener('DOMContentLoaded', () => {
    // DOM elementlerini al
    getDOMElements(); // homeBtn ve toolsBtn artık burada alınıyor

    // Kayıtlı dil ayarını yükle veya varsayılanı kullan
    state.frontFaceLanguage = localStorage.getItem('flashcardFrontFaceLang') || config.defaultFrontFaceLang;

    // Kayıtlı tema ayarını yükle veya sistem tercihini kullan
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }

    // UI metinlerini başlat
    initializeUIText();
    // Tema ikonlarını güncelle
    updateThemeToggleIcons();

    // Start Learning / Review butonları listener'ları
    if(startNewCardsBtn) startNewCardsBtn.addEventListener('click', () => startLearningSession('new'));
    if(startReviewBtn) startReviewBtn.addEventListener('click', () => startLearningSession('review'));

    // Oturumu Sıfırla butonu listener'ı
    if(resetSessionBtn) resetSessionBtn.addEventListener('click', confirmReset);

    // Flashcard tıklama listener'ı
    if (flashcardContainer) flashcardContainer.addEventListener('click', flipCard);

    // Flashcard ekranındaki navigasyon ve çıkış butonları listener'ları
    if(goToWelcomeBtn) goToWelcomeBtn.addEventListener('click', goToWelcomeScreen); // Internal Ana Sayfa butonu
    if (exitLearningBtn) exitLearningBtn.addEventListener('click', goToWelcomeScreen); // Çıkış butonu
    if (prevCardBtn) prevCardBtn.addEventListener('click', showPrevCard);
    if (nextCardBtn) nextCardBtn.addEventListener('click', showNextCardManual);
    if(forgotCardBtn) forgotCardBtn.addEventListener('click', handleForgotCard);

    // Zorluk butonları listener'ları
    if(difficultyButtonsContainer) {
        difficultyButtonsContainer.querySelectorAll('button.difficulty-btn:not(#forgot-card-btn)').forEach(btn => {
            btn.addEventListener('click', handleDifficultySelection);
        });
    }

    // Tema ve Dil değiştirme butonları listener'ları
    themeToggles.forEach(toggle => {
        if(toggle) toggle.addEventListener('click', toggleTheme);
    });
    if (cardFaceLanguageToggle) cardFaceLanguageToggle.addEventListener('click', toggleCardFaceLanguage);

    // Rapor butonları listener'ları
    if(showAllCardsBtn) showAllCardsBtn.addEventListener('click', () => {
        populateAllCardsTable();
        showReportModal(allCardsReportContainer);
    });
    if(showProgressReportBtn) showProgressReportBtn.addEventListener('click', () => {
        populateProgressReportTable();
        showReportModal(progressReportContainer);
    });
    if(closeAllCardsReportBtn) closeAllCardsReportBtn.addEventListener('click', () => closeReportModal(allCardsReportContainer));
    if(closeProgressReportBtn) closeProgressReportBtn.addEventListener('click', () => closeReportModal(progressReportContainer));

    // Başlangıçta kartları yükle ve istatistikleri göster
    loadFlashcards();

    // Uygulama başlangıçta hoş geldiniz ekranında olduğu için,
    // üstteki navigasyon butonları zaten görünür olmalıdır (HTML tarafından).
    // Flashcard ekranına geçildiğinde gizlenecekler, geri dönüldüğünde tekrar gösterilecekler.
});