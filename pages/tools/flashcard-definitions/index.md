<!DOCTYPE html>
<html lang="tr" class="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title data-translate="appTitle">ISTQB® Terim Kartları</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <script>
        tailwind.config = { darkMode: 'class', theme: { extend: { colors: { primary: { light: '#3b82f6', dark: '#60a5fa' }, secondary: { light: '#10b981', dark: '#34d399' }, danger: { light: '#ef4444', dark: '#f87171' }, easy: {light: '#22c55e', dark: '#4ade80'}, medium: {light: '#f97316', dark: '#fb923c'}, hard: {light: '#ef4444', dark: '#f87171'}, forgot: {light: '#f59e0b', dark: '#facc15'} } } } }
    </script>
</head>
<body class="bg-gray-100 dark:bg-gray-900 flex flex-col min-h-screen text-gray-900 dark:text-gray-100">

    <div id="loading-indicator" class="hidden fixed inset-0 bg-white/80 dark:bg-gray-900/80 z-50 items-center justify-center">
        <div class="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md flex items-center">
            <div class="spinner"></div>
            <span class="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300" data-translate="loadingText">Yükleniyor...</span>
        </div>
    </div>

    <div class="container mx-auto px-4 py-8 max-w-3xl w-full">
        <!-- Welcome Container -->
        <div id="welcome-container" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mx-auto">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-primary-light dark:text-primary-dark" data-translate="mainTitle">ISTQB® Terim Kartları</h1>
                <div class="flex space-x-2">
                    <button id="language-toggle" class="language-toggle p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 w-10 h-10 flex items-center justify-center font-semibold text-sm" title="Dili Değiştir">EN</button>
                    <button id="theme-toggle-welcome" class="theme-toggle p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 w-10 h-10 flex items-center justify-center" title="Temayı Değiştir">
                        <i class="fas fa-moon text-lg"></i><i class="fas fa-sun text-lg hidden"></i>
                    </button>
                </div>
            </div>
            <p id="welcome-intro-text" class="mb-6 text-gray-700 dark:text-gray-300" data-translate="welcomeIntro">ISTQB terimlerini ve tanımlarını etkili bir şekilde öğrenin. Sağ üstteki dil butonu ile arayüz ve kart dilini değiştirebilirsiniz.</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-6">
                <button id="start-new-cards-btn" class="w-full px-6 py-3 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50" disabled>
                    <i class="fas fa-lightbulb mr-2"></i> <span data-translate="startNewLearning">Yeni Kartları Öğren</span>
                </button>
                <button id="start-review-btn" class="w-full px-6 py-3 bg-secondary-light dark:bg-secondary-dark text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors disabled:opacity-50" disabled>
                    <i class="fas fa-redo-alt mr-2"></i> <span data-translate="startReview">Tekrar Et</span> <span id="review-count-bubble" class="ml-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full hidden">0</span>
                </button>
            </div>

            <div class="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 class="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-100" data-translate="statsTitle">İstatistikler</h3>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div><span data-translate="totalCardsLabel">Toplam Kart:</span> <span id="total-cards-stat" class="font-bold">0</span></div>
                    <div><span data-translate="learnedCardsLabel">Öğrenildi (Kolay):</span> <span id="learned-cards-stat" class="font-bold">0</span></div>
                    <div><span data-translate="mediumCardsLabel">Orta Seviye:</span> <span id="medium-cards-stat" class="font-bold">0</span></div>
                    <div><span data-translate="hardCardsLabel">Zor Seviye:</span> <span id="hard-cards-stat" class="font-bold">0</span></div>
                    <div class="col-span-2"><span class="font-semibold" data-translate="dueForReviewLabel">Bugün Tekrar Edilecek:</span> <span id="due-for-review-stat" class="font-bold">0</span> kart</div>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 mt-8">
                 <button id="show-all-cards-btn" class="flex-1 px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors text-sm">
                    <i class="fas fa-list-ul mr-2"></i> <span data-translate="allCardsReportTitle">Tüm Kartları Listele</span>
                </button>
                <button id="show-progress-report-btn" class="flex-1 px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors text-sm">
                    <i class="fas fa-chart-bar mr-2"></i> <span data-translate="progressReportTitle">Öğrenme Raporum</span>
                </button>
                <button id="reset-session-btn" class="flex-1 px-6 py-2 bg-danger-light dark:bg-danger-dark text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors text-sm">
                    <i class="fas fa-undo mr-2"></i> <span data-translate="resetSession">Oturumu Sıfırla</span>
                </button>
            </div>
            <p id="welcome-error" class="text-red-500 dark:text-red-400 text-sm mt-4 hidden"></p>
        </div>

        <!-- Flashcard Container -->
        <div id="flashcard-main-content" class="hidden mt-8">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-primary-light dark:text-primary-dark" data-translate="flashcardTitle">Flashcard</h2>
                <div class="flex items-center space-x-2">
                    <div class="text-sm text-gray-600 dark:text-gray-300">
                        <span data-translate="cardDisplay">Kart</span> <span id="current-card-display">1</span> / <span id="total-cards-in-deck-display">0</span>
                    </div>
                    <button id="theme-toggle-flashcard" class="theme-toggle p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 w-8 h-8 flex items-center justify-center text-xs" title="Temayı Değiştir">
                        <i class="fas fa-moon"></i><i class="fas fa-sun hidden"></i>
                    </button>
                     <button id="exit-learning-btn" class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 w-8 h-8 flex items-center justify-center text-xs" data-translate-title="exitLearningTitle" title="Çalışmayı Bitir">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>

            <div id="flashcard-outer-container" class="relative min-h-[250px] flex flex-col items-center justify-center">
                <div id="flashcard-navigation-container" class="w-full max-w-md flex justify-between items-center mb-2">
                    <button id="prev-card-btn" class="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark disabled:opacity-50" data-translate-title="prevCardTitle" title="Önceki Kart" disabled>
                        <i class="fas fa-chevron-left fa-lg"></i>
                    </button>
                    <div id="flashcard-container" class="w-full mx-2 h-60 cursor-pointer perspective">
                        <div id="flashcard" class="relative w-full h-full transform-style-3d transition-transform duration-700">
                            <div id="flashcard-front" class="flashcard-face absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-4 text-center">
                                <p class="flashcard-term text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100"></p>
                                <p class="flashcard-source text-xs text-gray-500 dark:text-gray-400 mt-4"></p>
                            </div>
                            <div id="flashcard-back" class="flashcard-face absolute w-full h-full backface-hidden transform rotate-y-180 flex flex-col items-center justify-center p-4 text-center">
                                <p class="flashcard-definition text-md md:text-lg text-gray-800 dark:text-gray-100 leading-relaxed"></p>
                            </div>
                        </div>
                    </div>
                     <button id="next-card-btn" class="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark disabled:opacity-50" data-translate-title="nextCardTitle" title="Sonraki Kart" disabled>
                        <i class="fas fa-chevron-right fa-lg"></i>
                    </button>
                </div>

                <div id="difficulty-buttons" class="mt-6 grid grid-cols-4 gap-3 w-full max-w-md hidden">
                    <button data-difficulty="easy" class="difficulty-btn px-3 py-3 bg-easy-light dark:bg-easy-dark text-white rounded-lg hover:opacity-80 transition-opacity text-sm">
                        <i class="fas fa-smile mr-1"></i> <span data-translate="easy">Kolay</span>
                    </button>
                    <button data-difficulty="medium" class="difficulty-btn px-3 py-3 bg-medium-light dark:bg-medium-dark text-white rounded-lg hover:opacity-80 transition-opacity text-sm">
                        <i class="fas fa-meh mr-1"></i> <span data-translate="medium">Orta</span>
                    </button>
                    <button data-difficulty="hard" class="difficulty-btn px-3 py-3 bg-hard-light dark:bg-hard-dark text-white rounded-lg hover:opacity-80 transition-opacity text-sm">
                        <i class="fas fa-frown mr-1"></i> <span data-translate="hard">Zor</span>
                    </button>
                    <button id="forgot-card-btn" class="difficulty-btn px-3 py-3 bg-forgot-light dark:bg-forgot-dark text-white rounded-lg hover:opacity-80 transition-opacity text-sm" data-translate-title="forgotCardTitle" title="Bu kartı unuttum, tekrar başa al">
                        <i class="fas fa-undo-alt mr-1"></i> <span data-translate="forgot">Unuttum</span>
                    </button>
                </div>
            </div>

             <p id="deck-finished-message" class="mt-6 text-center text-lg text-secondary-light dark:text-secondary-dark hidden" data-translate="deckFinished">Bu deste tamamlandı! Tebrikler!</p>
            <button id="go-to-welcome-btn" class="mt-4 w-full max-w-xs mx-auto px-6 py-3 bg-gray-500 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-600 dark:hover:bg-gray-500 transition-colors hidden flex justify-center">
                 <i class="fas fa-home mr-2"></i><span data-translate="homepage">Ana Sayfa</span>
            </button>
        </div>

        <!-- Report Modals/Containers -->
        <div id="all-cards-report-container" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-40 p-4">
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-3xl w-full shadow-2xl max-h-[80vh] flex flex-col">
                <div class="flex justify-between items-center mb-4">
                    <h3 id="all-cards-report-title-h3" class="text-xl font-bold text-gray-800 dark:text-gray-100" data-translate="allCardsReportTitle">Tüm Kartları Listele</h3>
                    <button id="close-all-cards-report-btn" class="p-2 text-gray-600 hover:text-danger-light dark:text-gray-400 dark:hover:text-danger-dark">
                        <i class="fas fa-times fa-lg"></i>
                    </button>
                </div>
                <div class="overflow-y-auto flex-grow">
                    <table id="all-cards-table" class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                        <thead class="bg-gray-50 dark:bg-gray-700">
                            <tr id="all-cards-table-header-row">
                                <!-- JS ile doldurulacak başlıklar -->
                            </tr>
                        </thead>
                        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"></tbody>
                    </table>
                </div>
            </div>
        </div>

        <div id="progress-report-container" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-40 p-4">
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-4xl w-full shadow-2xl max-h-[80vh] flex flex-col">
                 <div class="flex justify-between items-center mb-4">
                    <h3 id="progress-report-title-h3" class="text-xl font-bold text-gray-800 dark:text-gray-100" data-translate="progressReportTitle">Öğrenme Raporum</h3>
                    <button id="close-progress-report-btn" class="p-2 text-gray-600 hover:text-danger-light dark:text-gray-400 dark:hover:text-danger-dark">
                        <i class="fas fa-times fa-lg"></i>
                    </button>
                </div>
                 <div class="overflow-y-auto flex-grow">
                    <table id="progress-report-table" class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                        <thead class="bg-gray-50 dark:bg-gray-700">
                            <tr id="progress-report-table-header-row">
                                <!-- JS ile doldurulacak başlıklar -->
                            </tr>
                        </thead>
                        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <footer class="text-xs text-gray-500 dark:text-gray-400 text-center py-4 mt-auto border-t border-gray-200 dark:border-gray-700">
        <p data-translate="footerCredits">Taygun Kara tarafından geliştirilmiştir.</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>