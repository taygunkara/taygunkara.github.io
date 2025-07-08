/* Temel Stiller */
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
.container {
    flex-grow: 1;
}

/* Yükleme Göstergesi */
#loading-indicator {
    display: none; /* JS ile yönetilecek */
}
.spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: #3b82f6; /* primary-light */
    animation: spin 1s ease infinite;
}
.dark .spinner {
    border-left-color: #60a5fa; /* primary-dark */
}
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* Flashcard Stilleri */
.perspective {
    perspective: 1000px;
}
#flashcard-outer-container {
    margin-top: 1.5rem; /* Tailwind mt-6 */
}

#flashcard {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.7s cubic-bezier(0.4, 0.0, 0.2, 1);
}

#flashcard.flipped {
    transform: rotateY(180deg);
}

.flashcard-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden; /* Safari için */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem; /* Tailwind p-4 */
    text-align: center;
    border: 1px solid #e5e7eb; /* Tailwind gray-200 */
    border-radius: 0.75rem; /* Tailwind rounded-xl */
    background-color: #ffffff; /* Tailwind bg-white */
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* Tailwind shadow-lg */
}

.dark .flashcard-face {
    border-color: #374151; /* Tailwind dark:border-gray-700 */
    background-color: #1f2937; /* Tailwind dark:bg-gray-800 */
}

#flashcard-back {
    transform: rotateY(180deg);
}

.flashcard-example-sentence {
    margin-top: 1rem; /* Tailwind mt-4 */
    font-style: italic;
    max-width: 90%; /* Çok uzun cümlelerin taşmasını engellemek için */
}


/* Tema/Dil Değiştirme Butonları */
.theme-toggle, .language-toggle {
    transition: all 0.3s ease;
}
.theme-toggle .fa-sun {
    display: none;
}
.dark .theme-toggle .fa-sun {
    display: inline-block;
}
.dark .theme-toggle .fa-moon {
    display: none;
}

/* Raporlama Modal Pencereleri için Temel Stiller */
/* HTML'deki Tailwind sınıfları zaten çoğunu hallediyor,
   ama gerekirse ek özelleştirmeler buraya eklenebilir.
   Örneğin, scrollbar stilleri. */

#all-cards-report-container .overflow-y-auto::-webkit-scrollbar,
#progress-report-container .overflow-y-auto::-webkit-scrollbar {
    width: 8px;
}
#all-cards-report-container .overflow-y-auto::-webkit-scrollbar-track,
#progress-report-container .overflow-y-auto::-webkit-scrollbar-track {
    background: #f1f5f9; /* Tailwind slate-100 */
    border-radius: 10px;
}
#all-cards-report-container .overflow-y-auto::-webkit-scrollbar-thumb,
#progress-report-container .overflow-y-auto::-webkit-scrollbar-thumb {
    background: #94a3b8; /* Tailwind slate-400 */
    border-radius: 10px;
}
#all-cards-report-container .overflow-y-auto::-webkit-scrollbar-thumb:hover,
#progress-report-container .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #64748b; /* Tailwind slate-500 */
}

.dark #all-cards-report-container .overflow-y-auto::-webkit-scrollbar-track,
.dark #progress-report-container .overflow-y-auto::-webkit-scrollbar-track {
    background: #334155; /* Tailwind dark:slate-700 */
}
.dark #all-cards-report-container .overflow-y-auto::-webkit-scrollbar-thumb,
.dark #progress-report-container .overflow-y-auto::-webkit-scrollbar-thumb {
    background: #64748b; /* Tailwind dark:slate-500 */
}
.dark #all-cards-report-container .overflow-y-auto::-webkit-scrollbar-thumb:hover,
.dark #progress-report-container .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #94a3b8; /* Tailwind dark:slate-400 */
}

/* Footer */
footer {
    margin-top: auto;
}
footer a {
    text-decoration: underline;
    color: #3b82f6; /* primary-light */
    margin-left: 0.5rem;
    margin-right: 0.5rem;
}
.dark footer a {
    color: #60a5fa; /* primary-dark */
}