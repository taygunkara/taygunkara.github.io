// --- START OF FILE script.js ---
// --- Configuration ---
const config = {
    dataBasePath: './data/',
    defaultLang: 'tr',
    supportedLangs: ['tr', 'en'],
    deckSize: 20, // Çalışma destesindeki maksimum kart sayısı
    intervals: { // Milisaniye cinsinden
        easy: 7 * 24 * 60 * 60 * 1000,       // 7 gün
        medium_base: 1 * 24 * 60 * 60 * 1000, // 1 gün (orta için temel)
        hard_base: 10 * 60 * 1000,           // 10 dakika (zor için temel)
        forgot_base: 5 * 60 * 1000,          // 5 dakika ("unuttum" için)
        new_card_bonus: 0.5,                 // Yeni kartlar için interval çarpanı (kısaltır)
        long_term_easy_review_threshold: 30 * 24 * 60 * 60 * 1000 // 30 gün (kolay kartların "yeni" modunda tekrar consideration'a girmesi için)
    },
    transitionDuration: 700, // Kart çevirme animasyon süresi (ms)
    postNavigationDelay: 50  // Kart değiştirme sonrası DOM güncellemesi için bekleme (ms)
};

// --- UI String Translations ---
const uiStrings = {
    appTitle: { tr: "ISTQB® Terim Kartları", en: "ISTQB® Glossary Flashcards" },
    mainTitle: { tr: "ISTQB® Terim Kartları", en: "ISTQB® Glossary Flashcards" },
    welcomeIntro: { tr: "ISTQB terimlerini ve tanımlarını etkili bir şekilde öğrenin. Sağ üstteki dil butonu ile arayüz ve kart dilini değiştirebilirsiniz.", en: "Effectively learn ISTQB terms and definitions. You can change the interface and card language with the language button in the top right." },
    startNewLearning: { tr: "Yeni Kartları Öğren", en: "Learn New Cards" },
    startReview: { tr: "Tekrar Et", en: "Review Cards" },
    statsTitle: { tr: "İstatistikler", en: "Statistics" },
    totalCardsLabel: { tr: "Toplam Kart:", en: "Total Cards:" },
    learnedCardsLabel: { tr: "Öğrenildi (Kolay):", en: "Learned (Easy):" },
    mediumCardsLabel: { tr: "Orta Seviye:", en: "Medium Level:" },
    hardCardsLabel: { tr: "Zor Seviye:", en: "Hard Level:" },
    dueForReviewLabel: { tr: "Bugün Tekrar Edilecek:", en: "Due for Review Today:" },
    allCardsReportTitle: { tr: "Tüm Kartları Listele", en: "List All Cards" },
    progressReportTitle: { tr: "Öğrenme Raporum", en: "My Learning Report" },
    resetSession: { tr: "Oturumu Sıfırla", en: "Reset Session" },
    loadingText: { tr: "Yükleniyor...", en: "Loading..." },
    flashcardTitle: { tr: "Flashcard", en: "Flashcard" },
    cardDisplay: { tr: "Kart", en: "Card" },
    easy: { tr: "Kolay", en: "Easy" },
    medium: { tr: "Orta", en: "Medium" },
    hard: { tr: "Zor", en: "Hard" },
    forgot: { tr: "Unuttum", en: "Forgot" },
    deckFinished: { tr: "Bu deste tamamlandı! Tebrikler!", en: "This deck is complete! Congratulations!" },
    deckFinishedNew: { tr: "Öğrenilecek yeni kart kalmadı veya mevcutlar henüz tekrar için uygun değil.", en: "No new cards to learn, or existing ones are not due for review yet." },
    deckFinishedReview: { tr: "Tekrar edilecek kart kalmadı. Harika iş!", en: "No cards left to review. Great job!" },
    homepage: { tr: "Ana Sayfa", en: "Homepage" },
    exitLearningTitle: { tr: "Çalışmayı Bitir", en: "Finish Session" },
    prevCardTitle: {tr: "Önceki Kart", en: "Previous Card"},
    nextCardTitle: {tr: "Sonraki Kart", en: "Next Card"},
    forgotCardTitle: {tr: "Bu kartı unuttum, tekrar başa al", en: "Forgot this card, review again soon"},
    confirmResetMessage: { tr: "Tüm öğrenme ilerlemeniz silinecektir. Emin misiniz?", en: "All your learning progress will be deleted. Are you sure?" },
    loadError: { tr: "Kartlar yüklenemedi.", en: "Could not load cards." },
    cardSourcePrefix: { tr: "Kaynak: ", en: "Source: " },
    tableColTerm: { tr: "Terim", en: "Term" },
    tableColDefinition: { tr: "Tanım", en: "Definition" },
    tableColDifficulty: { tr: "Zorluk", en: "Difficulty" },
    tableColLastReview: { tr: "Son Tekrar", en: "Last Review" },
    tableColNextReview: { tr: "Sıradaki Tekrar", en: "Next Review" },
    tableColCorrect: { tr: "Doğru", en: "Correct" },
    tableColIncorrect: { tr: "Yanlış", en: "Incorrect" },
    noCardsToReport: { tr: "Raporlanacak kart bulunamadı.", en: "No cards to report." },
    noProgressYet: { tr: "Henüz bir ilerleme kaydedilmemiş.", en: "No progress recorded yet." },
    footerCredits: {tr: "Taygun Kara tarafından geliştirilmiştir.", en: "Developed by Taygun Kara."}
};

let allFlashcards = [];
let currentDeck = [];
let originalDeckForNav = [];
let currentCardIndexInOriginalDeck = -1;
let currentCardData = null;
let state = {
    currentLanguage: config.defaultLang,
    cardFlipped: false,
    isTransitioningCard: false,
    currentLearningMode: null
};

let loadingIndicator, welcomeContainer, flashcardMainContent, startNewCardsBtn, startReviewBtn, reviewCountBubble, resetSessionBtn, welcomeError;
let showAllCardsBtn, showProgressReportBtn;
let allCardsReportContainer, progressReportContainer, closeAllCardsReportBtn, closeProgressReportBtn;
let allCardsTableBody, progressReportTableBody;
let flashcardOuterContainer, flashcardNavigationContainer, flashcardContainer, flashcardElement;
let flashcardTermP, flashcardSourceP, flashcardDefinitionP;
let difficultyButtonsContainer, forgotCardBtn, goToWelcomeBtn, exitLearningBtn, prevCardBtn, nextCardBtn;
let currentCardDisplay, totalCardsInDeckDisplay, deckFinishedMessage;
let totalCardsStat, learnedCardsStat, mediumCardsStat, hardCardsStat, dueForReviewStat;
let languageToggle, themeToggles = [];

function getDOMElements() {
    loadingIndicator = document.getElementById('loading-indicator');
    welcomeContainer = document.getElementById('welcome-container');
    flashcardMainContent = document.getElementById('flashcard-main-content');
    startNewCardsBtn = document.getElementById('start-new-cards-btn');
    startReviewBtn = document.getElementById('start-review-btn');
    reviewCountBubble = document.getElementById('review-count-bubble');
    resetSessionBtn = document.getElementById('reset-session-btn');
    welcomeError = document.getElementById('welcome-error');
    showAllCardsBtn = document.getElementById('show-all-cards-btn');
    showProgressReportBtn = document.getElementById('show-progress-report-btn');
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
    flashcardTermP = document.getElementById('flashcard-front')?.querySelector('.flashcard-term');
    flashcardSourceP = document.getElementById('flashcard-front')?.querySelector('.flashcard-source');
    flashcardDefinitionP = document.getElementById('flashcard-back')?.querySelector('.flashcard-definition');
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
    languageToggle = document.getElementById('language-toggle');
    themeToggles = [document.getElementById('theme-toggle-welcome'), document.getElementById('theme-toggle-flashcard')];
}

function updateUIStrings() {
    const lang = state.currentLanguage;
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (uiStrings[key] && uiStrings[key][lang] !== undefined) {
            element.textContent = uiStrings[key][lang];
        } else if (uiStrings[key] && uiStrings[key][config.defaultLang] !== undefined) {
            element.textContent = uiStrings[key][config.defaultLang];
        }
    });
    document.querySelectorAll('[data-translate-title]').forEach(element => {
        const key = element.getAttribute('data-translate-title');
        if (uiStrings[key] && uiStrings[key][lang] !== undefined) {
            element.title = uiStrings[key][lang];
        } else if (uiStrings[key] && uiStrings[key][config.defaultLang] !== undefined) {
            element.title = uiStrings[key][config.defaultLang];
        }
    });

    document.documentElement.lang = lang;
    if (languageToggle) {
        languageToggle.textContent = lang === 'tr' ? 'EN' : 'TR';
        languageToggle.title = lang === 'tr' ? 'Switch to English' : 'Türkçe\'ye Geç';
    }
    const allCardsTitleH3 = document.getElementById('all-cards-report-title-h3');
    if(allCardsTitleH3 && uiStrings.allCardsReportTitle[lang]) allCardsTitleH3.textContent = uiStrings.allCardsReportTitle[lang];
    const progressTitleH3 = document.getElementById('progress-report-title-h3');
    if(progressTitleH3 && uiStrings.progressReportTitle[lang]) progressTitleH3.textContent = uiStrings.progressReportTitle[lang];

    const allCardsHeaderRow = document.getElementById('all-cards-table-header-row');
    if (allCardsHeaderRow && uiStrings.tableColTerm[lang] && uiStrings.tableColDefinition[lang]) {
        allCardsHeaderRow.innerHTML = `
            <th class="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-300">${uiStrings.tableColTerm[lang]}</th>
            <th class="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-300">${uiStrings.tableColDefinition[lang]}</th>
        `;
    }
    const progressHeaderRow = document.getElementById('progress-report-table-header-row');
    if (progressHeaderRow && uiStrings.tableColTerm[lang]) { // Check for existence of all keys
        progressHeaderRow.innerHTML = `
            <th class="px-3 py-2 text-left font-medium text-gray-500 dark:text-gray-300">${uiStrings.tableColTerm[lang]}</th>
            <th class="px-3 py-2 text-left font-medium text-gray-500 dark:text-gray-300">${uiStrings.tableColDifficulty[lang]}</th>
            <th class="px-3 py-2 text-left font-medium text-gray-500 dark:text-gray-300">${uiStrings.tableColLastReview[lang]}</th>
            <th class="px-3 py-2 text-left font-medium text-gray-500 dark:text-gray-300">${uiStrings.tableColNextReview[lang]}</th>
            <th class="px-3 py-2 text-left font-medium text-gray-500 dark:text-gray-300">${uiStrings.tableColCorrect[lang]}</th>
            <th class="px-3 py-2 text-left font-medium text-gray-500 dark:text-gray-300">${uiStrings.tableColIncorrect[lang]}</th>
        `;
    }
    const titleElement = document.querySelector('title');
    if(titleElement && uiStrings.appTitle[lang]) {
        titleElement.textContent = uiStrings.appTitle[lang];
    }
}

function showLoading(isLoading) { if (loadingIndicator) loadingIndicator.style.display = isLoading ? 'flex' : 'none'; }
function toggleTheme() { const html = document.documentElement; html.classList.toggle('dark'); localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light'); updateThemeToggleIcons(); }
function updateThemeToggleIcons() { const isDark = document.documentElement.classList.contains('dark'); themeToggles.forEach(toggle => { if (toggle) { const moonIcon = toggle.querySelector('.fa-moon'); const sunIcon = toggle.querySelector('.fa-sun'); if (moonIcon && sunIcon) { moonIcon.style.display = isDark ? 'none' : 'inline-block'; sunIcon.style.display = isDark ? 'inline-block' : 'none'; } } }); }

async function loadFlashcards() {
    showLoading(true);
    if(startNewCardsBtn) startNewCardsBtn.disabled = true;
    if(startReviewBtn) startReviewBtn.disabled = true;
    if(welcomeError) welcomeError.classList.add('hidden');
    try {
        const lang = state.currentLanguage;
        const fileName = `flashcards_${lang}.json`;
        const response = await fetch(`${config.dataBasePath}${fileName}?v=${new Date().getTime()}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status} for ${fileName}`);
        const data = await response.json();
        const storedFlashcards = JSON.parse(localStorage.getItem('flashcardsProgressV2')) || {};
        allFlashcards = data.map(card => ({ ...card, isCompletedThisSession: false, ...(storedFlashcards[card.id] || { difficulty: null, lastReviewed: null, nextReview: null, timesCorrect: 0, timesIncorrect: 0, consecutiveCorrect: 0 }) }));
        if(startNewCardsBtn) startNewCardsBtn.disabled = false;
        if(startReviewBtn) startReviewBtn.disabled = false;
        updateStats();
    } catch (error) { console.error("Error loading flashcards:", error); if(welcomeError) { welcomeError.textContent = uiStrings.loadError[state.currentLanguage]; welcomeError.classList.remove('hidden'); } }
    finally { showLoading(false); }
}

function saveProgress() {
    const currentProgress = JSON.parse(localStorage.getItem('flashcardsProgressV2')) || {};
    allFlashcards.forEach(card => {
        currentProgress[card.id] = {
            difficulty: card.difficulty, lastReviewed: card.lastReviewed, nextReview: card.nextReview,
            timesCorrect: card.timesCorrect, timesIncorrect: card.timesIncorrect, consecutiveCorrect: card.consecutiveCorrect
        };
    });
    localStorage.setItem('flashcardsProgressV2', JSON.stringify(currentProgress));
    updateStats();
}

function updateStats() {
    if(!totalCardsStat) return;
    totalCardsStat.textContent = String(allFlashcards.length);
    learnedCardsStat.textContent = String(allFlashcards.filter(c => c.difficulty === 'easy').length);
    mediumCardsStat.textContent = String(allFlashcards.filter(c => c.difficulty === 'medium').length);
    hardCardsStat.textContent = String(allFlashcards.filter(c => c.difficulty === 'hard').length);
    const now = new Date().getTime();
    const dueCount = allFlashcards.filter(c => c.difficulty !== 'easy' && c.nextReview && c.nextReview <= now && !c.isCompletedThisSession).length;
    if(dueForReviewStat) dueForReviewStat.textContent = String(dueCount);
    if(reviewCountBubble){ if(dueCount > 0){ reviewCountBubble.textContent = String(dueCount); reviewCountBubble.classList.remove('hidden'); } else { reviewCountBubble.classList.add('hidden'); } }
}

function buildReviewDeck(mode = 'review') {
    const now = new Date().getTime();
    let tempDeck = [];
    allFlashcards.forEach(c => c.isCompletedThisSession = false);

    if (mode === 'new') {
        let unseen = allFlashcards.filter(card => !card.difficulty);
        tempDeck.push(...unseen);

        if (tempDeck.length < config.deckSize) {
            let potentialFillers = allFlashcards.filter(card =>
                !tempDeck.find(td => td.id === card.id) &&
                (
                    (card.difficulty !== 'easy' && card.difficulty !== null && (!card.nextReview || card.nextReview > now + (24*60*60*1000))) ||
                    (card.difficulty === 'easy' && card.nextReview && (now - (card.lastReviewed || 0) > config.intervals.long_term_easy_review_threshold))
                )
            );
            potentialFillers.sort(() => 0.5 - Math.random());
            tempDeck.push(...potentialFillers.slice(0, config.deckSize - tempDeck.length));
        }
        if (tempDeck.length > 0) {
            tempDeck.sort(() => 0.5 - Math.random());
        }
    } else { // mode === 'review'
        let dueHard = allFlashcards.filter(card => card.difficulty === 'hard' && card.nextReview && card.nextReview <= now);
        let dueMedium = allFlashcards.filter(card => card.difficulty === 'medium' && card.nextReview && card.nextReview <= now);
        dueHard.sort(() => 0.5 - Math.random());
        dueMedium.sort(() => 0.5 - Math.random());
        tempDeck.push(...dueHard, ...dueMedium);

        if (tempDeck.length < config.deckSize) {
            let notDueHard = allFlashcards.filter(c => c.difficulty === 'hard' && (!c.nextReview || c.nextReview > now) && !tempDeck.find(td => td.id === c.id));
            let notDueMedium = allFlashcards.filter(c => c.difficulty === 'medium' && (!c.nextReview || c.nextReview > now) && !tempDeck.find(td => td.id === c.id));
            notDueHard.sort(() => 0.5 - Math.random());
            notDueMedium.sort(() => 0.5 - Math.random());
            let potentialFillers = [...notDueHard, ...notDueMedium];
            potentialFillers.sort(() => 0.5 - Math.random());
            tempDeck.push(...potentialFillers.slice(0, config.deckSize - tempDeck.length));
        }
        if (tempDeck.length < config.deckSize) {
            let unseen = allFlashcards.filter(card => !card.difficulty && !tempDeck.find(td => td.id === card.id));
            unseen.sort(() => 0.5 - Math.random());
            tempDeck.push(...unseen.slice(0, config.deckSize - tempDeck.length));
        }
    }
    currentDeck = tempDeck.slice(0, config.deckSize);
    originalDeckForNav = [...currentDeck];
    currentCardIndexInOriginalDeck = -1;
}

function displayCurrentCard() {
    if (!currentCardData || !flashcardElement) return;
    flashcardElement.classList.remove('flipped'); state.cardFlipped = false;
    if(difficultyButtonsContainer) { difficultyButtonsContainer.classList.add('hidden');}

    if(flashcardTermP) flashcardTermP.textContent = currentCardData.term || "";
    if(flashcardSourceP) flashcardSourceP.textContent = currentCardData.source ? `${uiStrings.cardSourcePrefix[state.currentLanguage]}${currentCardData.source}` : "";
    if(flashcardDefinitionP) flashcardDefinitionP.textContent = currentCardData.definition || "";
    
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
function updateNavigationButtons() { if (!prevCardBtn || !nextCardBtn) return; prevCardBtn.disabled = currentCardIndexInOriginalDeck <= 0 || state.isTransitioningCard; nextCardBtn.disabled = currentCardIndexInOriginalDeck >= originalDeckForNav.length - 1 || state.isTransitioningCard;}

function flipCard() {
    if (!currentCardData || !flashcardElement || state.isTransitioningCard) return;
    state.isTransitioningCard = true;
    state.cardFlipped = !state.cardFlipped;
    flashcardElement.classList.toggle('flipped', state.cardFlipped);
    if (!currentCardData.isCompletedThisSession) {
        if (state.cardFlipped) { if(difficultyButtonsContainer) difficultyButtonsContainer.classList.remove('hidden');}
        else { if(difficultyButtonsContainer) difficultyButtonsContainer.classList.add('hidden');}
    } else { if(difficultyButtonsContainer) difficultyButtonsContainer.classList.add('hidden');}
    setTimeout(() => { state.isTransitioningCard = false; updateNavigationButtons(); }, config.transitionDuration);
}

function calculateNextReview(card, difficulty, isForgot = false) { const now = new Date().getTime(); let interval; if (isForgot) { interval = config.intervals.forgot_base; card.consecutiveCorrect = 0; card.difficulty = 'hard'; } else if (difficulty === 'easy') { interval = config.intervals.easy; card.consecutiveCorrect = (card.consecutiveCorrect || 0) + 1; } else if (difficulty === 'medium') { card.consecutiveCorrect = (card.consecutiveCorrect || 0) + 1; let baseInterval = config.intervals.medium_base * Math.pow(1.8, Math.max(0, card.consecutiveCorrect -1)); if(card.timesCorrect === 0 && card.timesIncorrect === 0 && !isForgot) baseInterval *= config.intervals.new_card_bonus; interval = baseInterval; } else { card.consecutiveCorrect = 0; interval = config.intervals.hard_base; if(card.timesCorrect === 0 && card.timesIncorrect === 0 && !isForgot) interval *= config.intervals.new_card_bonus; } card.nextReview = now + interval; }

function processCardAction(cardId, action, newDifficulty = null) { const cardInAll = allFlashcards.find(c => c.id === cardId); if (cardInAll) { cardInAll.lastReviewed = new Date().getTime(); if (action === 'forgot') { cardInAll.timesIncorrect = (cardInAll.timesIncorrect || 0) + 1; calculateNextReview(cardInAll, 'hard', true); } else { cardInAll.difficulty = newDifficulty; if(newDifficulty === 'hard') cardInAll.timesIncorrect = (cardInAll.timesIncorrect || 0) + 1; else cardInAll.timesCorrect = (cardInAll.timesCorrect || 0) + 1; calculateNextReview(cardInAll, newDifficulty, false); } cardInAll.isCompletedThisSession = true; } saveProgress(); currentDeck = currentDeck.filter(card => card.id !== cardId); prepareForCardChange(); setTimeout(() => { loadNextCardFromCurrentDeck(); }, config.postNavigationDelay); }
function handleDifficultySelection(e) { if (!currentCardData || state.isTransitioningCard || currentCardData.isCompletedThisSession) return; const difficulty = e.target.closest('.difficulty-btn').dataset.difficulty; processCardAction(currentCardData.id, 'difficulty', difficulty); }
function handleForgotCard() { if (!currentCardData || state.isTransitioningCard || currentCardData.isCompletedThisSession) return; processCardAction(currentCardData.id, 'forgot'); }
function loadNextCardFromCurrentDeck() { currentCardData = currentDeck.length > 0 ? currentDeck[0] : null; if (currentCardData) { currentCardIndexInOriginalDeck = originalDeckForNav.findIndex(card => card.id === currentCardData.id); displayCurrentCard(); finalizeCardChange(); } else { if(flashcardNavigationContainer) flashcardNavigationContainer.classList.add('hidden'); if(difficultyButtonsContainer) difficultyButtonsContainer.classList.add('hidden'); if(deckFinishedMessage && uiStrings.deckFinished[state.currentLanguage]) deckFinishedMessage.textContent = uiStrings.deckFinished[state.currentLanguage]; if(deckFinishedMessage) deckFinishedMessage.classList.remove('hidden'); if(goToWelcomeBtn) goToWelcomeBtn.classList.remove('hidden'); currentCardData = null; } updateNavigationButtons(); }

function startLearningSession(mode) {
    state.currentLearningMode = mode;
    if (welcomeContainer) welcomeContainer.style.display = 'none';
    if (flashcardMainContent) flashcardMainContent.style.display = 'block';
    buildReviewDeck(mode);
    if (currentDeck.length > 0) {
        currentCardData = currentDeck[0];
        currentCardIndexInOriginalDeck = originalDeckForNav.findIndex(card => card.id === currentCardData.id);
        prepareForCardChange();
        setTimeout(() => { displayCurrentCard(); finalizeCardChange(); }, config.postNavigationDelay);
    } else {
        if(flashcardNavigationContainer) flashcardNavigationContainer.classList.add('hidden');
        if(difficultyButtonsContainer) difficultyButtonsContainer.classList.add('hidden');
        if(deckFinishedMessage) {
            const msgKey = mode === 'new' ? 'deckFinishedNew' : 'deckFinishedReview';
            deckFinishedMessage.textContent = uiStrings[msgKey][state.currentLanguage] || "Deste tamamlandı.";
            deckFinishedMessage.classList.remove('hidden');
        }
        if(goToWelcomeBtn) goToWelcomeBtn.classList.remove('hidden');
    }
    updateNavigationButtons();
}

function confirmReset() {
    const lang = state.currentLanguage;
    if (confirm(uiStrings.confirmResetMessage[lang])) {
        localStorage.removeItem('flashcardsProgressV2');
        allFlashcards.forEach(card => {
            card.difficulty = null; card.lastReviewed = null; card.nextReview = null;
            card.timesCorrect = 0; card.timesIncorrect = 0; card.consecutiveCorrect = 0;
            card.isCompletedThisSession = false;
        });
        updateStats();
        if(startNewCardsBtn) startNewCardsBtn.disabled = false;
        if(startReviewBtn) startReviewBtn.disabled = false;
        alert(lang === 'tr' ? "İlerleme sıfırlandı." : "Progress reset.");
        if (flashcardMainContent && flashcardMainContent.style.display === 'block') {
           goToWelcomeScreen();
        }
    }
}

async function handleLanguageChange() {
    const newLang = state.currentLanguage === 'tr' ? 'en' : 'tr';
    state.currentLanguage = newLang;
    localStorage.setItem('flashcardAppLanguageV2', newLang);
    await loadFlashcards(); // Önce yeni dilin kartlarını yükle
    updateUIStrings();    // Sonra UI stringlerini güncelle
    
    if (flashcardMainContent && flashcardMainContent.style.display === 'block') {
        // Dil değiştiğinde mevcut öğrenme seansını sıfırlayıp baştan başlatmak en temizi olabilir.
        // Ya da mevcut kartın yeni dildeki karşılığını bulup göstermeye çalışabiliriz.
        // Şimdilik, ana ekrana dönelim ve kullanıcı yeni bir seans başlatsın.
        goToWelcomeScreen(); 
        // Alternatif: Aktif desteyi yeni dildeki kartlarla yeniden oluşturup devam et
        // buildReviewDeck(state.currentLearningMode || 'review');
        // loadNextCardFromCurrentDeck(); // Ya da ilk karttan başlat
    }
}

function goToWelcomeScreen() { if(flashcardMainContent) flashcardMainContent.style.display = 'none'; if(welcomeContainer) welcomeContainer.style.display = 'block'; updateStats(); }

function populateAllCardsTable() { if (!allCardsTableBody) return; allCardsTableBody.innerHTML = ''; if (allFlashcards.length === 0) { allCardsTableBody.innerHTML = `<tr><td colspan="2" class="px-4 py-3 text-center text-gray-500">${uiStrings.noCardsToReport[state.currentLanguage]}</td></tr>`; return; } const sortedCards = [...allFlashcards].sort((a, b) => a.term.toLowerCase().localeCompare(b.term.toLowerCase(), state.currentLanguage)); sortedCards.forEach(card => { const row = allCardsTableBody.insertRow(); row.insertCell().textContent = card.term; row.insertCell().textContent = card.definition; }); }
function populateProgressReportTable() { if (!progressReportTableBody) return; progressReportTableBody.innerHTML = ''; const reviewedCards = allFlashcards.filter(c => c.difficulty !== null); if (reviewedCards.length === 0) { progressReportTableBody.innerHTML = `<tr><td colspan="6" class="px-3 py-3 text-center text-gray-500">${uiStrings.noProgressYet[state.currentLanguage]}</td></tr>`; return; } reviewedCards.sort((a,b) => (a.lastReviewed || 0) - (b.lastReviewed || 0)); reviewedCards.forEach(card => { const row = progressReportTableBody.insertRow(); row.insertCell().textContent = card.term; let difficultyText = '-'; if (card.difficulty === 'easy') difficultyText = uiStrings.easy[state.currentLanguage]; else if (card.difficulty === 'medium') difficultyText = uiStrings.medium[state.currentLanguage]; else if (card.difficulty === 'hard') difficultyText = uiStrings.hard[state.currentLanguage]; row.insertCell().textContent = difficultyText; row.insertCell().textContent = card.lastReviewed ? new Date(card.lastReviewed).toLocaleDateString(state.currentLanguage + "-" + state.currentLanguage.toUpperCase()) : '-'; row.insertCell().textContent = card.nextReview ? new Date(card.nextReview).toLocaleDateString(state.currentLanguage + "-" + state.currentLanguage.toUpperCase()) : '-'; row.insertCell().textContent = card.timesCorrect || 0; row.insertCell().textContent = card.timesIncorrect || 0; }); }
function showReportModal(modalElement) { if(modalElement) modalElement.classList.remove('hidden'); }
function closeReportModal(modalElement) { if(modalElement) modalElement.classList.add('hidden'); }

document.addEventListener('DOMContentLoaded', () => { getDOMElements(); state.currentLanguage = localStorage.getItem('flashcardAppLanguageV2') || config.defaultLang; const savedTheme = localStorage.getItem('theme'); if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) { if(document.documentElement) document.documentElement.classList.add('dark'); } updateUIStrings(); updateThemeToggleIcons(); if(startNewCardsBtn) startNewCardsBtn.addEventListener('click', () => startLearningSession('new')); if(startReviewBtn) startReviewBtn.addEventListener('click', () => startLearningSession('review')); if(resetSessionBtn) resetSessionBtn.addEventListener('click', confirmReset); if (flashcardContainer) flashcardContainer.addEventListener('click', flipCard); if(goToWelcomeBtn) goToWelcomeBtn.addEventListener('click', goToWelcomeScreen); if (exitLearningBtn) exitLearningBtn.addEventListener('click', goToWelcomeScreen); if (prevCardBtn) prevCardBtn.addEventListener('click', showPrevCard); if (nextCardBtn) nextCardBtn.addEventListener('click', showNextCardManual); if(forgotCardBtn) forgotCardBtn.addEventListener('click', handleForgotCard); if(difficultyButtonsContainer) { difficultyButtonsContainer.querySelectorAll('button.difficulty-btn:not(#forgot-card-btn)').forEach(btn => { btn.addEventListener('click', handleDifficultySelection); }); } themeToggles.forEach(toggle => { if(toggle) toggle.addEventListener('click', toggleTheme); }); if (languageToggle) languageToggle.addEventListener('click', handleLanguageChange); if(showAllCardsBtn) showAllCardsBtn.addEventListener('click', () => { populateAllCardsTable(); showReportModal(allCardsReportContainer); }); if(showProgressReportBtn) showProgressReportBtn.addEventListener('click', () => { populateProgressReportTable(); showReportModal(progressReportContainer); }); if(closeAllCardsReportBtn) closeAllCardsReportBtn.addEventListener('click', () => closeReportModal(allCardsReportContainer)); if(closeProgressReportBtn) closeProgressReportBtn.addEventListener('click', () => closeReportModal(progressReportContainer)); loadFlashcards(); });
