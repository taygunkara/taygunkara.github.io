// src/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOM fully loaded and parsed');

    // --- Element Seçimleri ---
    const themeToggle = document.getElementById('theme-toggle');
    const languageToggle = document.getElementById('language-toggle');
    const currentYearSpan = document.getElementById('current-year');
    const body = document.body;
    const navbar = document.querySelector(".navbar");
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    // Sadece anasayfadaki section'ları dinlemek istiyoruz
    const mainSections = document.querySelectorAll('main section[id]');

    // --- Tema Değiştirme ---
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    function applyTheme(theme) {
        body.classList.remove('light-mode', 'dark-mode');
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            // Tema ikonunu güncelle
            if (themeToggle) {
                 themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            }
        } else {
            body.classList.add('light-mode');
            // Tema ikonunu güncelle
             if (themeToggle) {
                themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
             }
        }
         // Tema değiştiğinde, eğer araç scriptleri yüklüyse onların da tema güncellemelerini tetikle (isteğe bağlı, CSS ile çözülmeli genelde)
         // Eğer araç scriptlerinde tema ile ilgili özel JS logic'i varsa (çok olası değil)
         // if (window.IstqbApp && typeof window.IstqbApp.updateTheme === 'function') {
         //     window.IstqbApp.updateTheme(theme);
         // }
         // Diğer araçlar için de benzer kontrol
    }

    // Sayfa yüklendiğinde temayı ayarla
    applyTheme(currentTheme);

    // Tema değiştirme butonuna olay dinleyici ekle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    } else {
        console.warn("Theme toggle button not found!");
    }


    // --- Dil Değiştirme ---
    const defaultLang = 'tr';
    const initialLang = localStorage.getItem('language') || defaultLang;

    // Dil ayarlarını yapan ve çeviriyi uygulayan fonksiyon
    function setLanguage(lang) {
        // Geçerli bir dil mi kontrol et
        if (!translations[lang]) {
             console.warn(`Language "${lang}" not supported, falling back to English.`);
             lang = 'en'; // Varsayılan olarak İngilizceye dön
        }

        // Local Storage'ı güncelle
        localStorage.setItem('language', lang);
        // State'i güncelle (eğer araç scriptleri state'e erişiyorsa)
        // ISTQB scripti kendi state'ini yönettiği için orada da güncellenecek.

        // Translations.js dosyasının yüklendiğinden ve translatePage fonksiyonunun mevcut olduğundan emin ol
        if (typeof translations !== 'undefined' && typeof translatePage === 'function') {
            try {
                translatePage(lang);
                // Dil butonunun metnini güncelle
                if (languageToggle) {
                    // Gelecek dilin kısaltmasını göster (TR ise EN, EN ise TR)
                    const nextLangDisplay = lang === 'tr' ? 'EN' : 'TR';
                    languageToggle.textContent = nextLangDisplay;
                     languageToggle.setAttribute('title', lang === 'tr' ? 'Switch to English' : 'Türkçe\'ye Geç');
                }
                // console.log(`Language set to: ${lang}`);

                // --- Araç Uygulamalarına Dil Değişikliğini Bildir ---
                // Mevcut sayfanın URL'ini kontrol et
                const currentPath = window.location.pathname;

                // ISTQB Mock Exam sayfası için kontrol
                if (currentPath.includes('/istqb-mock-exam/')) {
                     // ISTQB uygulaması scriptinin yüklendiğinden ve metodun mevcut olduğundan emin ol
                     if (window.IstqbApp && typeof window.IstqbApp.loadQuestionsForLang === 'function') {
                         console.log(`Notifying ISTQB app of language change to ${lang}`);
                         // ISTQB uygulamasına soruları yeni dilde yüklemesini söyle
                         // Önce state'teki dili ISTQB scripti için de güncelle (eğer kendi state'i varsa)
                         // ISTQB scripti kendi state'indeki currentLanguage'ı localStorage'dan okuyor, bu yeterli olmalı.
                         window.IstqbApp.loadQuestionsForLang(); // ISTQB scripti kendi state'inden dili alacak

                     } else {
                         console.warn("ISTQB app script or loadQuestionsForLang method not found after language change.");
                     }
                }

                // Diğer araçlar için de benzer kontroller eklenebilir
                // if (currentPath.includes('/flashcard-glossary/')) { ... }
                // if (currentPath.includes('/flashcard-definitions/')) { ... }


            } catch (error) {
                console.error(`Error applying translation for language "${lang}":`, error);
            }
        } else {
            // translations.js henüz yüklenmediyse veya hata varsa bekle ve tekrar dene
            // Bu durum DOMContentLoaded içindeki ilk çağrı için daha olası
            console.warn('Translations object or translatePage function not ready yet. Retrying setLanguage...');
            setTimeout(() => setLanguage(lang), 100); // Kısa bir süre sonra tekrar dene
        }
    }

    // Sayfa yüklendiğinde başlangıç dilini ayarla
    setLanguage(initialLang);

    // Dil butonuna tıklama olayını ekle
    if (languageToggle) {
        languageToggle.addEventListener('click', () => {
            // Mevcut dili Local Storage'dan veya direkt al
            let currentLang = localStorage.getItem('language') || defaultLang;
            let nextLang = (currentLang === 'tr') ? 'en' : 'tr'; // TR ise EN, EN ise TR yap
            setLanguage(nextLang); // Yeni dili ayarla ve uygula
        });
    } else {
         console.warn("Language toggle button not found!");
    }

    // --- Footer Yılını Güncelle ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    } else {
         console.warn("Current year span not found!");
    }

    // --- Mobil Menü ---
    if (hamburger && navMenu && body) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            body.classList.toggle("no-scroll"); // Sayfa kaydırmayı engelle
        });

        // Menü linklerine tıklandığında menüyü kapat
        navLinks.forEach(link => link.addEventListener("click", (e) => {
            const href = link.getAttribute('href');
            // Eğer tıklanan link anasayfa içi bir section linkiyse (#about gibi)
            // ve mevcut sayfa anasayfa ise
            const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/src/') || window.location.pathname.endsWith('/src/index.html');
            const isSectionLink = href && href.startsWith('#');

            if (isHomePage && isSectionLink) {
                 // Mobil menüyü ve body scroll'u kapat
                 hamburger.classList.remove("active");
                 navMenu.classList.remove("active");
                 body.classList.remove("no-scroll");
                 // Tarayıcı otomatik olarak yumuşak kaydırma yapacaktır (CSS scroll-behavior: smooth sayesinde).
            } else {
                // Eğer #link değilse (başka sayfaya gidiyorsa) veya anasayfada değilsek (#link olsa bile)
                // Menüyü kapat ve normal sayfa yönlendirmesine izin ver.
                 hamburger.classList.remove("active");
                 navMenu.classList.remove("active");
                 body.classList.remove("no-scroll");
                 // e.preventDefault() YAPMA - sayfa yönlendirmesi gerçekleşmeli
            }
        }));
    } else {
         console.warn("Hamburger or nav menu elements not found!");
    }


     // --- Navbar Scroll Efekti ---
     // Navbar scroll efekti tüm sayfalarda aynı CSS ile çalışacak
     function handleScroll() {
        if (window.scrollY > 20) {
            navbar?.classList.add('scrolled'); // navbar null olabilir kontrolü
        } else {
            navbar?.classList.remove('scrolled'); // navbar null olabilir kontrolü
        }
     }
     // Sayfa yüklendiğinde ve scroll'da dinle
     window.addEventListener('scroll', handleScroll);
     handleScroll(); // Sayfa yüklenince ilk kez çalıştır

    // --- Aktif Navigasyon Linkini Vurgulama (Sadece Anasayfa İçin) ---
    // Bu özellik sadece anasayfada anlamlıdır.
    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/src/') || window.location.pathname.endsWith('/src/index.html');

    if (isHomePage && mainSections.length > 0 && 'IntersectionObserver' in window) {
        const observerOptions = {
          root: null,
          rootMargin: '0px 0px -40% 0px',
          threshold: 0
        };

        const observerCallback = (entries) => {
          let latestVisibleSectionId = null;

          entries.forEach(entry => {
            if (entry.isIntersecting) {
                 latestVisibleSectionId = entry.target.getAttribute('id');
            }
          });

          // Tüm linklerden aktif class'ını kaldır (sadece anasayfa section linkleri için)
           navLinks.forEach(link => {
               const href = link.getAttribute('href');
               if (href && href.startsWith('#')) {
                    link.classList.remove('active');
               }
           });

          // Bulunan section ID'sine ait anasayfa içi linki aktif yap
          if (latestVisibleSectionId) {
             const targetLink = document.querySelector(`.nav-menu .nav-link[href="#${latestVisibleSectionId}"]`);
             if (targetLink) {
                 targetLink.classList.add('active');
             }
          } else {
             // Eğer hiçbir section görünmüyorsa (sayfanın en üstü gibi), #home linkini aktif yap
              if (window.scrollY < window.innerHeight * 0.4) {
                 const homeLink = document.querySelector('.nav-menu .nav-link[href="#home"]');
                 if (homeLink) homeLink.classList.add('active');
              }
          }
        };

        // Observer'ı anasayfa section'larına ata
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        mainSections.forEach(section => {
          observer.observe(section);
        });

        // Sayfa yüklendiğinde ilk aktif linki ayarla (scroll pozisyonuna ve hash'e göre)
        if (window.location.hash) {
             // Hash varsa, ilgili linki aktif yap ve o bölüme kaydır (smooth scroll CSS tarafından yönetilmeli)
             const hashedLink = document.querySelector(`.nav-menu .nav-link[href="${window.location.hash}"]`);
             if (hashedLink) {
                navLinks.forEach(link => link.classList.remove('active'));
                hashedLink.classList.add('active');
                // Kaydırma işlemi için ek JS scrollIntoView eklenebilir
                // document.querySelector(window.location.hash).scrollIntoView({ behavior: 'smooth' });
             }
         } else if (window.scrollY < 100) { // Hash yok ve en üstteyse
             const homeLinkInitial = document.querySelector('.nav-menu .nav-link[href="#home"]');
             if (homeLinkInitial) {
                navLinks.forEach(link => link.classList.remove('active'));
                homeLinkInitial.classList.add('active');
             }
        }


    } else {
        // console.log("IntersectionObserver not needed on this page.");
        // Anasayfa dışında, aktif link HTML içinde manuel olarak ayarlanmalıdır (class="active").
    }

}); // End of DOMContentLoaded

// Not: `translations` objesi ve `translatePage` fonksiyonu `translations.js`'ten gelmelidir.
// `translations.js` bu scriptten önce yüklenmelidir.
// Araç scriptleri (örneğin ISTQB scripti) bu scriptten sonra yüklenmelidir ve `window.IstqbApp` gibi
// global objeleri bu scriptin erişimi için tanımlamalıdır.