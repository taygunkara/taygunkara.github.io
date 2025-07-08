// src/js/translations.js

// Çeviri Verileri
const translations = {
    // English Translations
    en: {
        // === Genel & Navigasyon (Portfolyo) ===
        pageTitle: "Taygun Kara - Test Automation Engineer",
        navLogo: "Taygun Kara",
        navHome: "Home",
        navAbout: "About",
        navSkills: "Skills",
        navEducation: "Education",
        navProjects: "Projects",
        navExperience: "Experience",
        navBlog: "Blog",
        navTools: "Tools",
        navContact: "Contact",
        footerText: "All rights reserved.",
        footerDisclaimer: "The information provided in blog posts and tools is for informational purposes only and may contain errors. Use at your own discretion. No liability is assumed.",

        // === Ana Sayfa Bölümleri (Portfolyo) ===
        homeTitle: "Hi, I'm Taygun Kara",
        homeSubtitle: "Test Automation Engineer",
        homeDescription: "I am a Test Engineer focused on enhancing software quality through the power of automation and a meticulous approach. With a keen eye for detail, I develop efficient and sustainable, user-experience-centric test solutions.",
        homeViewProjects: "View My Projects",

        // === Hakkımda Bölümü (Portfolyo) ===
        aboutTitle: "About Me",
        aboutText1: "I’m an ISTQB-certified professional who combines a background in Mechatronics Engineering with a strong passion for software testing. Through my experience as a co-founder of a startup and managing B2B/B2C e-commerce projects, I’ve specialized in building and automating test processes. I develop end-to-end test automation frameworks using Java, Selenium, and Rest Assured, and build sustainable architectures with the Page Object Model (POM).",
        aboutText2: "I continue developing independent projects on GitHub, writing technical blog posts, and contributing to syllabus review teams for respected institutions like ISTQB and TTB. My goal is to deliver user-focused, reliable test solutions that elevate software quality to the highest standards.",
        cvDownloadTitle: "My Resume",
        cvDownloadTR: "Download CV (TR)",
        cvDownloadEN: "Download CV (EN)",

        // === Yetenekler Bölümü (Portfolyo) ===
        skillsTitle: "Skills",
        skillsAbilities: "Abilities",

        // === Projeler Bölümü & Sayfası (Portfolyo) ===
        projectsTitle: "Featured Projects",
        projectsMainTitle: "Projects - Taygun Kara",
        allProjectsHeaderTitle: "All My Projects",
        allProjectsHeaderSubtitle: "Here are some of the projects I've worked on.",
        projectCardDetails: "Details",
        projectGitHub: "GitHub",
        projectsSeeAll: "View All Projects",
        projectCardSeleniumTitle: "Selenium Qacart Todo",
        projectCardSeleniumDesc: "A robust hybrid test framework combining Selenium (UI) and API testing to overcome flaky tests and dramatically increase execution speed.",
        projectCardRestAssuredTitle: "Restful-Booker API Automation",
        projectCardRestAssuredDesc: "A case study on building a maintainable and scalable API test framework with Rest Assured, focusing on clean architecture and reliability.",
        projectCardCucumberTitle: "My BDD Journey with Trendyol UI Testing",
        projectCardCucumberDesc: "A case study on evolving a BDD framework, learning from real-world mistakes to build a robust and reliable automation solution.",
        projectCardSpotifyTitle: "Spotify API Test Automation Framework",
        projectCardSpotifyDesc: "A project showcasing the evolution of a test framework, from initial code to a mature, modular, and reliable structure.",
        projectCardTrelloTitle: "End-to-End Trello API Automation",
        projectCardTrelloDesc: "From Postman to a CI/CD-ready suite, this project demonstrates a full end-to-end API testing process using Newman and structured collections.",

        // === Deneyim Bölümü (Portfolyo) ===
        experienceTitle: "Experience",
        expJob1Title: "Freelance Software Test Engineer",
        expJob1Company: "Professional Development and Independent Work",
        expJob1Location: "Remote / Istanbul",
        expJob1Dates: "June 2024 - Present",
        expJob1Resp: [
            "ISTQB & TTB 'CT-GenAI' Certification Syllabus Development - Beta Review Team Member",
            "Developing Independent Software Test Automation Projects on GitHub (Java, Selenium, Rest Assured),",
            "Building Supportive Web Applications for Testing Processes,",
            "Technical Blogging and Content Creation in the Field of Software Testing,",
            "Voluntary Alpha/Beta Testing Participation (Mobile & Web Apps) and Contributions to Open-Source Projects,"
        ],
        expJob2Title: "Software Test Engineer",
        expJob2Company: "Çağdaş Otomat (Sanitaryware E-Commerce)",
        expJob2Location: "Istanbul",
        expJob2Dates: "December 2023 - June 2024",
        expJob2Resp: [
            "Managing test processes, creating test plans and scenarios,",
            "Building a hybrid E2E test automation system using Java, Selenium (with POM), and Rest Assured, integrated with CI/CD via Jenkins,",
            "Preparing and executing smoke, regression, functional, API, responsive design, and mobile compatibility tests,",
            "Reporting test results and tracking bugs through the ticketing system (Trello),"
        ],
        expJob3Title: "Co-Founder & Software Test Engineer",
        expJob3Company: "Şen Otonom Elektrik Enerji (E-Commerce Marketplace)",
        expJob3Location: "Kırklareli",
        expJob3Dates: "September 2020 - January 2023",
        expJob3Resp: [
            "Creating and prioritizing test scenarios for the e-commerce marketplace,",
            "Conducting manual tests and evaluating system functionality,",
            "Reporting identified bugs in detail and communicating them to the development team,",
            "Performing confirmation tests after bug fixes to verify effectiveness,",
            "Initiating transition to UI and functional test automation using Selenium-Java,"
        ],

        // === Eğitim Bölümü (Portfolyo) ===
        educationTitle: "Education & Certifications",
        educationUni: "Eastern Mediterranean University, Cyprus",
        educationDegree: "B.Sc. in Mechatronics Engineering",
        educationUniDesc: "Completed core engineering courses with interdisciplinary projects; gained foundational programming and systems knowledge.",
        educationCert1: "ISTQB Foundation Level (Turkish Testing Board)",
        educationCertDate: "2023",
        educationSeeAll: "View All Certificates", // YENİ EKLENDİ

        // === Blog Bölümü & Sayfası (Portfolyo) ===
        blogTitle: "Recent Posts",
        allBlogPageTitle: "All Blog Posts - Your Name",
        allBlogHeaderTitle: "All My Blog Posts",
        blogReadMore: "Read More",
        blogSeeAll: "View All Posts",
        
        // === Araçlar Bölümü & Sayfası (Portfolyo) ===
        toolsTitle: "My Tools", 
        toolsIntro: "Some tools I've developed or made available to contribute to the software testing community:", 
        allToolsPageTitle: "Helper Tools - Your Name",
        allToolsHeaderTitle: "My Tools",
        toolMockExamTitle: "ISTQB Foundation Level Mock Exam",
        toolMockExamDesc: "An interactive mock exam app to prepare for the ISTQB FL exam online.",
        toolFlashcardTitle: "ISTQB Terms Flashcard (TR/EN)",
        toolFlashcardDesc: "Online flashcards to quickly learn and review key ISTQB terms in TR/EN.",
        toolFlashcardDefinitionsTitle: "ISTQB Glossary Flashcards",
        toolFlashcardDefinitionsDesc: "ISTQB Glossary Flashcards",
        toolAccess: "Open App",

        // === İletişim Bölümü (Portfolyo) ===
        contactTitle: "Get In Touch",
        contactText: "If I can help with your projects or if you just want to chat about test automation, feel free to reach out through the channels below.",
        contactEmail: "Send Email",
        contactLinkedIn: "LinkedIn",
        contactGitHub: "GitHub",

        // === Proje Detay Sayfaları (Portfolyo) ===
        
        // Proje 1: Selenium Hybrid Framework
        projectSeleniumTitle: "Selenium Qacart Todo Project - Taygun Kara",
        projectSeleniumTitleHeader: "🚀 A Robust Hybrid Testing Framework with Selenium + API to Tackle Flaky UI Tests",
        projectSeleniumIntro: "One of the most frustrating aspects of test automation for me was dealing with slow and constantly breaking (“flaky”) UI tests. This project is the result of that pursuit: a solid hybrid test framework that combines the speed of API testing with the end-user validation power of Selenium.",
        projectSeleniumArchTitle: "🔧 So, How Does This System Work? The Core Building Blocks",
        projectSeleniumArchPoints: [
            `<strong>Everything in Its Place: A Modular and Layered Architecture</strong><p>I designed the project with a layered structure: <code>/pages</code> for UI elements (POM), <code>/testcases</code> for test logic, <code>/apis</code> for API clients, and <code>/factory</code> for critical components like DriverFactory.</p>`,
            `<strong>Speed Meets Reliability: The Power of a Hybrid Approach</strong><p>Instead of logging in via the UI, a test user is created via an API call and its token is injected into the browser. This method made tests up to <strong>70% faster</strong> and immune to login form changes.</p>`,
            `<strong>Environment-Ready with One Command</strong><p>Running <code>mvn test -Denv=PRODUCTION</code> is enough. The <code>ConfigUtils</code> class automatically fetches the correct configuration for the selected environment.</p>`,
            `<strong>Reports That Speak for Themselves</strong><p>With <strong>Allure Report</strong>, test results are transformed into interactive reports that include every step, API call, and even screenshots on failure.</p>`
        ],
        projectSeleniumChallengeTitle: "⚠️ The Biggest Challenge (And Most Valuable Lesson)",
        projectSeleniumChallengeText: "The toughest problem was managing WebDriver instances in parallel tests. My initial Singleton approach caused chaos. This painful experience led me to adopt a <code>ThreadLocal</code>-based <code>DriverFactory</code>, a crucial lesson for stable parallel execution.",
        projectSeleniumFutureTitle: "📚 A Project Is Never Finished, Only Improved: What’s Next?",
        projectSeleniumFuturePoints: [
            `<strong>Smart Wait System: <code>WaitUtils</code></strong><p>I’ll replace scattered waits with a centralized utility class to offer readable methods, reduce code duplication, and simplify maintenance.</p>`,
            `<strong>Better Debugging Through Logging</strong><p>I’ll integrate <strong>SLF4J</strong> for structured logging to make it much easier to pinpoint what went wrong, especially in CI/CD environments.</p>`,
            `<strong>Improving Test Quality</strong><p>I’ll increase test coverage depth by verifying data persistence via API calls and introducing more negative and edge case scenarios.</p>`
        ],
        projectSeleniumGithubLink: "GitHub Repo",

        // Proje 2: Rest Assured API Framework
        projectRestAssuredTitle: "Restful-Booker API Automation - Taygun Kara",
        projectRestAssuredTitleHeader: "🏗️ Building a Sustainable and Scalable API Test Architecture with Rest Assured",
        projectRestAssuredIntro: "As I progressed in test automation, I realized that writing a working test is only the first step. The real challenge lies in building a structure that scales, is easy to maintain, and is so intuitive that even a new team member can understand and contribute within 30 minutes. This project is a case study I built from the ground up based on lessons learned.",
        projectRestAssuredArchTitle: "🔧 A Tour Through the Architecture: How This Framework Works",
        projectRestAssuredArchPoints: [
            `<strong>Layered Structure: Everyone Does Their Own Job</strong><p>The project is based on the Single Responsibility Principle (SRP), with separate layers for <code>/tests</code> (business logic), <code>/apis/applicationApi</code> (facade), <code>/apis/RestResources</code> (HTTP operations), and <code>/apis/SpecBuilder</code> (reusable specs).</p>`,
            `<strong>Golden Rule of Reliability: Atomic and Independent Tests</strong><p>Each test creates its own data (e.g., a new booking), performs the validation, and leaves no trace. This ensures that the entire test suite consistently produces reliable results without a domino effect.</p>`,
            `<strong>Dynamic Data and Comprehensive Coverage</strong><p>Thanks to the <strong>JavaFaker</strong> library, each test runs with realistic but unique data. My test suite includes all CRUD operations and a <code>HealthCheck</code> test.</p>`,
            `<strong>Readable and Insightful Reports</strong><p>Test results are turned into visual, step-by-step, interactive reports using <strong>Allure Report</strong>, making it easy to pinpoint issues within minutes.</p>`
        ],
        projectRestAssuredFutureTitle: "🚀 A Project is Never Done: My Roadmap for Future Improvements",
        projectRestAssuredFuturePoints: [
            `<strong>Observability: Making Debugging a Matter of Seconds</strong><p>My first task is to implement detailed logging using <strong>SLF4J</strong> to record every request and response, making debugging significantly easier.</p>`,
            `<strong>Architectural Refinement: Sharpening Responsibilities</strong><p>I’ll refine the structure by splitting helper classes into a <strong><code>TestDataFactory</code></strong> (for data generation) and <strong><code>BookingAssertions</code></strong> (for validations).</p>`,
            `<strong>Fluent Assertions: Making Code Speak for Itself</strong><p>I plan to replace standard asserts with the <strong>AssertJ</strong> library, allowing me to write assertions that read like plain English and validate whole objects in one line.</p>`
        ],
        projectRestAssuredGithubLink: "GitHub Repo",

        // Proje 3: BDD Cucumber
        projectCucumberTitle: "BDD Trendyol Project - Taygun Kara",
        projectCucumberTitleHeader: "📈 My BDD Journey with Trendyol UI Testing – The Evolution of a Project",
        projectCucumberIntro: "This project marks my first step into the world of Behavior-Driven Development (BDD). For me, this project is less a finished job and more a living lab where I learned the subtleties of automation and how 'bad habits' can make a project fragile.",
        projectCucumberInitialStateTitle: "The Starting Point: My First Encounter with BDD",
        projectCucumberInitialStatePoints: [
            "<strong>A Language Everyone Understands:</strong> Test scenarios are written in <code>.feature</code> files, using Gherkin’s simple <code>Given-When-Then</code> format.",
            "<strong>Basic Page Object Model (POM):</strong> Each page (<code>HomePage</code>, <code>ProductPage</code>) is represented by its own class, bringing UI elements and interactions together.",
            "<strong>Step Definitions Linked to Code:</strong> Each Gherkin step corresponds to a Java method inside the <code>/stepdefinitions</code> package."
        ],
        projectCucumberLessonsTitle: "Painful but Valuable Lessons: My Early Mistakes in Code",
        projectCucumberLessonsPoints: [
            "<strong>The <code>Thread.sleep()</code> Trap and Flaky Tests:</strong> I used <code>Thread.sleep()</code>, resulting in unreliable tests. <strong>Biggest lesson:</strong> Reliability means waiting smartly, not blindly.",
            "<strong>Domino Effect:</strong> My tests were chained, so when one broke, the entire suite failed. <strong>Second big lesson:</strong> Every test must stand on its own.",
            "<strong>Step Definitions Doing Everything:</strong> My Step Definition files handled everything, causing code duplication. <strong>Third big lesson:</strong> Step Definitions should be translators, not doers."
        ],
        projectCucumberVisionTitle: "My Vision: Transforming This Project Into a Modern Framework",
        projectCucumberVisionPoints: [
            `<strong>Smart Wait System: <code>WaitUtils</code></strong><p>I will remove all <code>Thread.sleep()</code> commands and build a centralized <strong><code>WaitUtils</code></strong> class using Selenium’s <code>WebDriverWait</code> for stability.</p>`,
            `<strong>Parallel-Ready, Fully Independent Tests</strong><p>I will implement a <strong><code>ThreadLocal</code></strong> based <strong><code>DriverFactory</code></strong> and use <strong>Cucumber Hooks (<code>@Before</code>/<code>@After</code>)</strong> to make each scenario self-sufficient.</p>`,
            `<strong>Deeper and Meaningful Assertions</strong><p>I will go beyond UI checks and verify data persistence via API calls, while also adding more negative and edge case scenarios.</p>`,
            `<strong>Logging for Easier Debugging</strong><p>I will add <strong>SLF4J</strong> logging to the project. Logs at critical steps will be a lifesaver when errors occur.</p>`
        ],
        projectCucumberGithubLink: "GitHub Repo",

        // Proje 4: Spotify API Test
        projectSpotifyTitle: "Spotify API Test Automation - Taygun Kara",
        projectSpotifyTitleHeader: "🎵 Spotify API Test Automation: Evolving from Scratch to a Modular Framework",
        projectSpotifyIntro: "This Spotify API test project became a hands-on workshop where I discovered how to conceptualize, build, and gradually mature a test framework from the ground up. This project is a living proof of my journey from writing 'good' code to building something excellent.",
        projectSpotifyTechMapTitle: "What’s Under the Hood? A Technical Tour of the Project",
        projectSpotifyTechMapPoints: [
            "<strong>Everything in Its Right Place: Layered Architecture</strong><p>I designed the project using a clean, layered architecture: `/api` for Spotify interactions, `/models` for JSON templates, and `/tests` for business logic. This separation ensures maintainability.</p>",
            "<strong>Smart Test Data Management</strong><p>Sensitive data is managed in a <code>config.properties</code> file, read by a <code>ConfigLoader</code>. For dynamic data, I use <strong>JavaFaker</strong> to generate unique playlist names, making tests reliable and repeatable.</p>",
            "<strong>Not Just Happy Paths: Negative Test Cases</strong><p>I automated key negative scenarios, such as creating a playlist with a missing name (expecting <code>400 Bad Request</code>) and attempting access with an invalid token (expecting <code>401 Unauthorized</code>).</p>",
            "<strong>Making Results Meaningful: Allure Reporting</strong><p>With <strong>Allure Report</strong> and annotations like <code>@Epic</code> and <code>@Feature</code>, I create rich, interactive reports that group tests by business needs and provide clear failure analysis.</p>"
        ],
        projectSpotifyLessonTitle: "The Most Important Lesson This Project Taught Me: Reliability Is Everything",
        projectSpotifyLessonText: "One of my biggest beginner mistakes was relying on a static ID. This hard lesson taught me automation’s golden rule: <strong>Each test must be self-contained. It should create its own data, validate it, and clean up without leaving a trace.</strong>",
        projectSpotifyFutureTitle: "The Road to Better: My Development Roadmap",
        projectSpotifyFuturePoints: [
            "<strong>Making Tests Truly Atomic</strong><p>My first priority is to rewrite every test to follow the golden rule. A test will create its own data, validate it, and then delete it afterward, making it fully independent.</p>",
            "<strong>Deeper Assertions</strong><p>I won’t just check status codes. I’ll also validate that the response body's content matches exactly what I sent in the request.</p>",
            "<strong>Pushing Boundaries with Edge Cases</strong><p>I’ll expand negative testing to include scenarios like sending overly long descriptions, using special characters, and testing rate limits (expecting <code>429</code>).</p>",
            "<strong>Architectural Refinements</strong><p>I’ll continue polishing the structure, such as converting utility classes to modern <code>enum</code>s and, most importantly, adding structured logging with <strong>SLF4J</strong>.</p>"
        ],
        projectSpotifyGithubLink: "GitHub Repo",

        // Proje 5: Trello API / Postman
        projectTrelloTitle: "Trello API Automation - Taygun Kara",
        projectTrelloTitleHeader: "🚀 From Postman to CI/CD: End-to-End Automation with Trello API",
        projectTrelloIntro: "I needed a concrete project that showed how I could carry a testing process from scratch all the way to CI/CD integration. This Trello project was born precisely for that purpose, evolving a few manual clicks in Postman into a full-fledged automated suite.",
        projectTrelloTechDetailsTitle: "What’s Inside the Collection? Technical Details",
        projectTrelloTechDetailsPoints: [
            "<strong>Workshop and Engine: The Postman & Newman Duo</strong><p>The project revolves around two core tools: <strong>Postman</strong> for designing and exploratory testing, and <strong>Newman</strong> as the automation engine to run the entire collection from the command line, ready for CI/CD.</p>",
            "<strong>A Clean Structure: Collection and Environment Management</strong><p>I structured requests into logical folders (`Boards`, `Lists`, `Cards`) and managed data using <strong>Global Variables</strong> for static credentials and <strong>Environment Variables</strong> for dynamic data like `boardId`.</p>",
            "<strong>Validation: 'It works' Isn’t Enough</strong><p>For each request, I use Postman’s JavaScript engine to write detailed assertions, checking not just the status code but also the response body and response time.</p>"
        ],
        projectTrelloLessonTitle: "The Hardest but Most Valuable Lesson: The Chain of Dependencies",
        projectTrelloLessonText: "In the first version, my tests were chained together, creating a fragile domino effect. That experience taught me automation’s golden rule: <strong>Every test must stand on its own. It should create its own data, perform its task, and clean up after itself.</strong>",
        projectTrelloFutureTitle: "What’s Next: Turning This Into a Real Framework",
        projectTrelloFuturePoints: [
            "<strong>Atomic Tests (Setup & Teardown Culture)</strong><p>My top priority is rewriting each test to use a <strong>pre-request script</strong> to generate its own data and a script in the 'Tests' tab to clean it up afterward. This will make each test 100% independent.</p>",
            "<strong>Goodbye Code Duplication (DRY Principle)</strong><p>I’ll move common assertions to the parent <strong>folder’s 'Tests' section</strong>, so they are automatically applied to all requests within it.</p>",
            "<strong>Stronger Assertions and Edge Cases</strong><p>I’ll level up my validations by checking if the returned JSON matches an expected <strong>schema (`jsonSchema`)</strong> and add more negative and edge case scenarios.</p>"
        ],
        projectTrelloGithubLink: "GitHub Repo",

        techJava: "Java", techSelenium: "Selenium", techTestNG: "TestNG", techMaven: "Maven", techPOM: "POM", techGit: "Git", techGitHub: "GitHub", techCucumber: "Cucumber", techExtentReports: "ExtentReports", techJenkins: "Jenkins", techRestAssured: "Rest Assured", techAllure: "Allure Report",
        backToProjects: "Back to All Projects",
        backToBlog: "Back to All Blog Posts",

        // === ISTQB Mock Exam Uygulaması Çevirileri ===
        istqbMainTitle: "ISTQB® Foundation Level Mock Exam - Taygun Kara",
        mainTitleNew: "ISTQB® Foundation Level Mock Exam",
        welcomeIntroNew: "A mock exam to help you test yourself for the Foundation Level (v4.0). Each time the page is refreshed, a new exam will be generated from the question pool, considering the cognitive level (K-Level) and chapter distribution.",
        examInfoTitle: "Exam Information",
        ruleDurationLabel: "Duration:",
        ruleNumQuestionsLabel: "Number of Questions:",
        rulePassingLabel: "Passing Score:",
        ruleDurationText: "minutes",
        rulePassingText: "correct answers",
        importantNotesTitle: "Important Notes",
        noteTime: "The exam ends automatically when the time expires.",
        noteReview: "You can track unsure questions via the navigator and return later.",
        noteSyllabus: "Don't forget to review the Syllabus for success.",
        startButton: "Start Exam",
        downloadButton: "Syllabus (EN)",
        downloadButtonTR: "Syllabus (TR)",
        loadingText: "Loading questions...",
        examTitleHeader: "ISTQB Foundation Level Practice Exam",
        questionLabel: "Question",
        prevButton: "Previous",
        nextButton: "Next",
        finishButton: "Finish Exam",
        resultsTitle: "Exam Results",
        correctLabel: "Correct",
        incorrectLabel: "Incorrect",
        passed: "Passed",
        failed: "Failed",
        reviewTitle: "Question Review",
        reviewCorrect: "Correct",
        reviewIncorrect: "Incorrect",
        reviewYourAnswer: "(Your answer)",
        reviewExplanation: "Explanation:",
        reviewTopic: "Topic:",
        noExplanation: "Explanation not available.",
        noTopic: "Not specified",
        filterAll: "All",
        filterCorrect: "Correct",
        filterIncorrect: "Incorrect",
        homepageButton: "Homepage",
        restartButton: "Restart Exam",
        confirmTitle: "Finish Exam?",
        confirmMessage: "Are you sure you want to finish the exam? You cannot change your answers after submission.",
        cancelButton: "Cancel",
        confirmFinishButton: "Finish Exam",
        loadError: "Could not load question file. Please check the file path or try again later.",
        selectionError: "Could not select questions matching the exam structure. Please check the question pool.",
        navigatorTitle: "Question Navigator",
        officialLinksTitle: "Official Websites",
        selectMultiple: "(Select ALL that apply)",
    },

    // Turkish Translations
    tr: {
        // === Genel & Navigasyon (Portfolyo) ===
        pageTitle: "Taygun Kara - Test Otomasyon Mühendisi",
        navLogo: "Taygun Kara",
        navHome: "Ana Sayfa",
        navAbout: "Hakkımda",
        navSkills: "Yetenekler",
        navEducation: "Eğitim",
        navProjects: "Projeler",
        navExperience: "Deneyim",
        navBlog: "Blog",
        navTools: "Araçlar",
        navContact: "İletişim",
        footerText: "Tüm hakları saklıdır.",
        footerDisclaimer: "Blog yazıları ve araçlarda sunulan bilgiler yalnızca bilgilendirme amaçlıdır ve hatalar içerebilir. Kullanım kendi sorumluluğunuzdadır. Herhangi bir sorumluluk kabul edilmez.",

        // === Ana Sayfa Bölümleri (Portfolyo) ===
        homeTitle: "Merhaba, Ben Taygun Kara",
        homeSubtitle: "Test Otomasyon Mühendisi",
        homeDescription: "Yazılım kalitesini otomasyonun gücü ve titiz bir yaklaşımla artırmaya odaklanmış bir Test Mühendisiyim. Detaylara verdiğim önemle, kullanıcı deneyimini merkezine alan, verimli ve sürdürülebilir test çözümleri geliştiriyorum.",
        homeViewProjects: "Projelerimi Gör",

        // === Hakkımda Bölümü (Portfolyo) ===
        aboutTitle: "Hakkımda",
        aboutText1: "Mekatronik mühendisliği altyapımı yazılım test mühendisliği tutkumla birleştiren, ISTQB sertifikalı bir profesyonelim. E-ticaret girişimciliğinden edindiğim deneyimle, kurucu ortağı olduğum startup ve yönettiğim B2B/B2C projelerde test süreçlerinin kurulumu ve otomasyonu konusunda uzmanlaştım. Java, Selenium, Rest Assured ile uçtan uca test otomasyon framework’leri geliştiriyor; POM yapısıyla sürdürülebilir altyapılar kuruyorum.",
        aboutText2: " GitHub’da bağımsız projeler geliştiriyor, blog yazıyor ve ISTQB & TTB müfredat gözden geçirme ekiplerinde yer alıyorum. Amacım, kullanıcı odaklı ve güvenilir test çözümleriyle yazılım kalitesini en üst seviyeye taşımak.",
        cvDownloadTitle: "Özgeçmişim",
        cvDownloadTR: "CV İndir (TR)",
        cvDownloadEN: "CV İndir (EN)",

        // === Yetenekler Bölümü (Portfolyo) ===
        skillsTitle: "Yeteneklerim",
        skillsAbilities: "Becerilerim",

        // === Projeler Bölümü & Sayfası (Portfolyo) ===
        projectsTitle: "Öne Çıkan Projelerim",
        projectsMainTitle: "Projeler - Taygun Kara",
        allProjectsHeaderTitle: "Tüm Projelerim",
        allProjectsHeaderSubtitle: "İşte üzerinde çalıştığım bazı projelerim.",
        projectCardDetails: "Detaylar",
        projectGitHub: "GitHub",
        projectsSeeAll: "Tüm Projeleri Gör",
        projectCardSeleniumTitle: "Selenium Qacart Todo",
        projectCardSeleniumDesc: "Selenium (UI) ve API testlerini birleştiren, flaky test sorununu çözen ve test hızını dramatik şekilde artıran hibrit test altyapısı.",
        projectCardRestAssuredTitle: "Restful-Booker API Otomasyonu",
        projectCardRestAssuredDesc: "Rest Assured ile bakımı kolay ve ölçeklenebilir bir API test altyapısının nasıl kurulacağına dair, temiz mimari ve güvenilirliğe odaklanan bir vaka analizi.",
        projectCardCucumberTitle: "Trendyol UI Testi ile BDD Yolculuğum",
        projectCardCucumberDesc: "Gerçek hayattan derslerle, BDD prensiplerini kullanarak bir otomasyon çerçevesini nasıl geliştirdiğime dair bir vaka analizi.",
        projectCardSpotifyTitle: "Spotify API Test Otomasyon Çerçevesi",
        projectCardSpotifyDesc: "Bir test çerçevesinin ilk koddan olgun, modüler ve güvenilir bir yapıya evrimini gösteren bir proje.",
        projectCardTrelloTitle: "Trello API ile Uçtan Uca Otomasyon",
        projectCardTrelloDesc: "Postman'den başlayıp Newman ile CI/CD'ye hazır hale getirilen, yapılandırılmış bir koleksiyonla tam bir API test sürecini gösteren proje.",

        // === Deneyim Bölümü (Portfolyo) ===
        experienceTitle: "Deneyim",
        expJob1Title: "Bağımsız Yazılım Test Mühendisi",
        expJob1Company: "Profesyonel Gelişim ve Bağımsız Çalışmalar",
        expJob1Location: "Uzaktan / İstanbul",
        expJob1Dates: "Haziran 2024 - Halen",
        expJob1Resp: [
            "ISTQB & TTB 'CT-GenAI' Sertifika Müfredatı Geliştirme - Beta Gözden Geçirme Ekip Üyeliği",
            "GitHub üzerinde bağımsız Yazılım Test Otomasyonu Projeleri Geliştirme (Java, Selenium, Rest Assured),",
            "Test Süreçlerini Destekleyici Yardımcı Web Uygulamaları Geliştirme,",
            "Yazılım Testi Alanında Teknik Blog Yazarlığı ve İçerik Üretimi,",
            "Gönüllü Alfa/Beta Test Katılımları (Mobil & Web Uygulamaları) ve Açık Kaynak Projelere Katkı Girişimleri,"
        ],
        expJob2Title: "Yazılım Test Mühendisi",
        expJob2Company: "Çağdaş Otomat (Su Armatürleri E-Ticaret)",
        expJob2Location: "İstanbul",
        expJob2Dates: "Aralık 2023 - Haziran 2024",
        expJob2Resp: [
            "Test süreçlerinin yönetilmesi, test planlarının ve senaryolarının oluşturulması,",
            "Java, Selenium (POM ile) ve Rest Assured kullanarak hibrit E2E test otomasyon sistemi kurulması ve Jenkins ile CI/CD entegrasyonu,",
            "Smoke, regresyon, fonksiyonel, API, responsive tasarım ve mobil uyumluluk testlerinin hazırlanması ve yürütülmesi,",
            "Test sonuçlarının raporlanması ve hataların ticketing sistemi (Trello) üzerinden raporlanıp takip edilmesi,"
        ],
        expJob3Title: "Kurucu Ortak & Yazılım Test Mühendisi",
        expJob3Company: "Şen Otonom Elektrik Enerji (E-Ticaret Pazaryeri)",
        expJob3Location: "Kırklareli",
        expJob3Dates: "Eylül 2020 - Ocak 2023",
        expJob3Resp: [
            "E-ticaret pazaryeri için test senaryolarının oluşturulması, öncelik sırasına göre düzenlenmesi,",
            "Manuel testlerin gerçekleştirilmesi ve sistem işlevselliğinin değerlendirilmesi,",
            "Tespit edilen hataların detaylı bir şekilde raporlanması ve geliştirici ekibe iletilmesi,",
            "Hata düzeltmeleri sonrasında onaylama testlerinin yapılarak düzeltmelerin etkinliğinin doğrulanması,",
            "Selenium-Java ile UI ve fonksiyonel test otomasyonuna geçiş süreçlerinin başlatılması,"
        ],

        // === Eğitim Bölümü (Portfolyo) ===
        educationTitle: "Eğitim & Sertifikalar",
        educationUni: "Doğu Akdeniz Üniversitesi, Kıbrıs",
        educationDegree: "Mekatronik Mühendisliği Lisans",
        educationUniDesc: "Temel mühendislik derslerini ve disiplinler arası projeleri tamamladım; programlama ve sistemler konusunda temel bilgi kazandım.",
        educationCert1: "ISTQB Foundation Level (Turkish Testing Board)",
        educationCertDate: "2023",
        educationSeeAll: "Tüm Sertifikaları Gör", // YENİ EKLENDİ

        // === Blog Bölümü & Sayfası (Portfolyo) ===
        blogTitle: "Son Yazılarım",
        allBlogPageTitle: "Tüm Blog Yazıları - Taygun Kara",
        allBlogHeaderTitle: "Tüm Blog Yazılarım",
        blogReadMore: "Devamını Oku",
        blogSeeAll: "Tüm Yazıları Gör",
        
        // === Araçlar Bölümü & Sayfası (Portfolyo) ===
        toolsTitle: "Araçlar",
        toolsIntro: "Yazılım testi topluluğuna katkıda bulunmak amacıyla geliştirdiğim veya kullanıma sunduğum bazı araçlar:",
        allToolsPageTitle: "Yardımcı Araçlar - Taygun Kara",
        allToolsHeaderTitle: "Yardımcı Araçlarım",
        toolMockExamTitle: "ISTQB Foundation Level Deneme Sınavı",
        toolMockExamDesc: "ISTQB FL sınavına web üzerinden hazırlanmak için interaktif bir deneme sınavı uygulaması.",
        toolFlashcardTitle: "ISTQB Terimleri Flashcard (TR/EN)",
        toolFlashcardDesc: "ISTQB terimlerini TR/EN karşılıklarıyla öğrenmek için interaktif flashcard uygulaması.",
        toolFlashcardDefinitionsTitle: "ISTQB Glossary Flashcards",
        toolFlashcardDefinitionsDesc: "ISTQB Glossary Flashcards",
        toolAccess: "Uygulamayı Aç",

        // === İletişim Bölümü (Portfolyo) ===
        contactTitle: "İletişime Geçin",
        contactText: "Projelerinizde yardımcı olabilirim veya sadece test otomasyonu hakkında sohbet etmek isterseniz, aşağıdaki kanallardan bana ulaşabilirsiniz.",
        contactEmail: "E-posta Gönder",
        contactLinkedIn: "LinkedIn",
        contactGitHub: "GitHub",

        // === Proje Detay Sayfaları (Portfolyo) ===
        
        // Proje 1: Selenium Hibrit Framework
        projectSeleniumTitle: "Selenium Qacart Todo Projesi - Taygun Kara",
        projectSeleniumTitleHeader: "🚀 UI Flaky Test Sorununa Çözüm: Selenium + API ile Dayanıklı Hibrit Test Altyapısı",
        projectSeleniumIntro: "Test otomasyonunda en çok canımı sıkan şeylerden biri, yavaş ve sürekli bozulan ('flaky') UI testleriydi. Bu proje, bu soruna bulduğum çözümün bir ürünü: API'nin ham hızıyla Selenium'un kullanıcı gözünden doğrulama gücünü birleştiren, hem hızlı hem de kaya gibi sağlam bir hibrit test iskeleti.",
        projectSeleniumArchTitle: "🔧 Peki, Bu Sistem Nasıl Çalışıyor? Mimarinin Temel Taşları",
        projectSeleniumArchPoints: [
            `<strong>Her Şeyin Bir Yeri Var: Modüler ve Katmanlı Yapı</strong><p>Projeyi katmanlı bir yapıda tasarladım: <code>/pages</code> (POM), <code>/testcases</code> (test mantığı), <code>/apis</code> (API istemcileri) ve <code>/factory</code> (DriverFactory gibi kritik bileşenler).</p>`,
            `<strong>Hız ve Güvenilirlik Bir Arada: Hibrit Yaklaşımın Gücü</strong><p>UI üzerinden login yapmak yerine, bir test kullanıcısı API ile yaratılıp token'ı tarayıcıya enjekte ediliyor. Bu yöntemle testler %70'e varan oranda hızlandı ve login formu değişikliklerinden etkilenmez hale geldi.</p>`,
            `<strong>Farklı Ortamlarda Tek Komutla Test</strong><p><code>mvn test -Denv=PRODUCTION</code> komutunu çalıştırmak yeterli. <code>ConfigUtils</code> sınıfı, seçilen ortam için doğru yapılandırmayı otomatik olarak getiriyor.</p>`,
            `<strong>Sonuçları Konuşan Raporlar</strong><p><strong>Allure Report</strong> ile test sonuçlarını, her adımı, API çağrılarını ve hata anındaki ekran görüntülerini içeren interaktif raporlara dönüştürüyorum.</p>`
        ],
        projectSeleniumChallengeTitle: "⚠️ Yolda Karşılaştığım En Büyük Zorluk (ve En Değerli Ders)",
        projectSeleniumChallengeText: "En büyük zorluk, paralel testlerde WebDriver'ı yönetmekti. Başlangıçtaki Singleton yapım kaosa neden oldu. Bu acı tecrübe, beni stabil paralel koşumlar için kritik olan <code>ThreadLocal</code> tabanlı bir <code>DriverFactory</code> kurmaya itti.",
        projectSeleniumFutureTitle: "📚 Bir Proje Asla Bitmez, Sadece Gelişir: Gelecek Planlarım",
        projectSeleniumFuturePoints: [
            `<strong>Akıllı Bekleme Sistemi: <code>WaitUtils</code></strong><p>Dağınık bekleme komutlarını, okunabilir metotlar sunan, kod tekrarını azaltan ve bakımı kolaylaştıran merkezi bir yardımcı sınıfla değiştireceğim.</p>`,
            `<strong>Daha İyi Hata Ayıklama için Loglama</strong><p>Özellikle CI/CD ortamlarında nerede neyin yanlış gittiğini net bir şekilde görmek için <strong>SLF4J</strong> ile yapılandırılmış loglama entegre edeceğim.</p>`,
            `<strong>Test Kalitesini Derinleştirmek</strong><p>API çağrıları aracılığıyla veri bütünlüğünü doğrulayarak ve daha fazla negatif ve uç durum senaryosu ekleyerek test kapsamını derinleştireceğim.</p>`
        ],
        projectSeleniumGithubLink: "GitHub Repo",

        // Proje 2: Rest Assured API Mimarisi
        projectRestAssuredTitle: "Restful-Booker API Otomasyonu - Taygun Kara",
        projectRestAssuredTitleHeader: "🏗️ Rest Assured ile Sürdürülebilir ve Ölçeklenebilir API Test Mimarisinin İnşası",
        projectRestAssuredIntro: "Test otomasyonunda yol aldıkça anladım ki, çalışan bir test yazmak işin sadece ilk adımı. Asıl meydan okuma; büyüyen, bakımı kolay ve yeni bir ekip arkadaşının bile yarım saat içinde anlayıp katkı sunabileceği bir yapı kurmakta yatıyor. Bu proje, bu felsefeyle inşa ettiğim bir vaka analizidir.",
        projectRestAssuredArchTitle: "🔧 Mimarinin Katmanları Arasında Bir Gezinti: Bu Çerçeve Nasıl Çalışıyor?",
        projectRestAssuredArchPoints: [
            `<strong>Katmanlı Yapı: Herkes Kendi İşini Yapsın</strong><p>Proje, Tek Sorumluluk Prensibi (SRP) üzerine kurulu olup, <code>/tests</code> (iş mantığı), <code>/apis/applicationApi</code> (kolaylaştırıcı katman), <code>/apis/RestResources</code> (HTTP operasyonları) ve <code>/apis/SpecBuilder</code> (tekrar kullanılabilir yapılandırmalar) gibi katmanlara sahiptir.</p>`,
            `<strong>Güvenilirliğin Altın Kuralı: Atomik ve Bağımsız Testler</strong><p>Her test, kendi verisini (örneğin yeni bir rezervasyon) yaratır, doğrulamasını yapar ve arkasında iz bırakmaz. Bu, domino etkisiyle oluşan hataları engeller ve tüm test suitinin güvenilirliğini sağlar.</p>`,
            `<strong>Dinamik Veri ve Kapsamlı Testler</strong><p><strong>JavaFaker</strong> kütüphanesi sayesinde her test, gerçekçi ama benzersiz verilerle çalışır. Testlerim tüm CRUD operasyonlarını ve bir <code>HealthCheck</code> testini kapsar.</p>`,
            `<strong>Anlaşılır Raporlar</strong><p>Test sonuçlarını, <strong>Allure Report</strong> ile iş gereksinimlerine göre gruplandırılmış, adım adım ilerleyen, görsel ve interaktif raporlara dönüştürüyorum.</p>`
        ],
        projectRestAssuredFutureTitle: "🚀 Bir Proje Asla Bitmez: Geliştirme Yol Haritam",
        projectRestAssuredFuturePoints: [
            `<strong>Gözlemlenebilirlik: Hata Ayıklamayı Saniyelere İndirmek</strong><p>İlk işim, her isteği ve yanıtı kaydeden detaylı bir loglama mekanizması kurmak için <strong>SLF4J</strong>'i entegre etmek.</p>`,
            `<strong>Mimaride İnce Ayar: Sorumlulukları Keskinleştirmek</strong><p>Yardımcı sınıfları <strong><code>TestDataFactory</code></strong> (veri üretimi için) ve <strong><code>BookingAssertions</code></strong> (doğrulamalar için) olarak ikiye ayırarak mimariyi daha da temiz hale getireceğim.</p>`,
            `<strong>Akıcı Doğrulamalar: Kodun Konuşmasını Sağlamak</strong><p>Standart assert'ler yerine, düz metin gibi okunan ve tek satırda tüm nesneleri karşılaştırabilen <strong>AssertJ</strong> kütüphanesini entegre edeceğim.</p>`
        ],
        projectRestAssuredGithubLink: "GitHub Repo",

        // Proje 3: BDD Cucumber
        projectCucumberTitle: "BDD Trendyol Projesi - Taygun Kara",
        projectCucumberTitleHeader: "📈 Trendyol UI Testi ile BDD’ye Giriş: Gerçek Hayattan Derslerle Gelişen Bir Otomasyon Çerçevesi",
        projectCucumberIntro: "Bu proje, benim için 'bitti' dediğim bir işten çok, otomasyonun inceliklerini ve 'kötü alışkanlıkların' bir projeyi nasıl kırılgan hale getirdiğini öğrendiğim, canlı bir laboratuvardır.",
        projectCucumberInitialStateTitle: "İlk Hali: BDD'ye Merhaba Dediğim Nokta",
        projectCucumberInitialStatePoints: [
            "<strong>Herkesin Anladığı Dil:</strong> Test senaryoları, <code>.feature</code> dosyalarında, Gherkin'in basit <code>Given-When-Then</code> formatıyla yazıldı.",
            "<strong>Temel Page Object Model (POM):</strong> Her sayfayı kendi sınıfında ele alarak, UI elemanlarını ve işlemleri bir araya getirdim.",
            "<strong>Adımların Koda Dönüşümü:</strong> Her Gherkin adımı, <code>/stepdefinitions</code> paketindeki bir Java metoduna bağlıdır."
        ],
        projectCucumberLessonsTitle: "Acı Ama Değerli Dersler: Koddaki Acemiliklerim",
        projectCucumberLessonsPoints: [
            "<strong><code>Thread.sleep()</code> Tuzağı ve Şansa Bırakılan Testler:</strong> Güvenilmez testler yarattı. <strong>En büyük dersim:</strong> Güvenilirlik, akıllıca beklemeyi bilmektir.",
            "<strong>Domino Etkisi:</strong> Zincirleme testler, ilk halka kopunca tümünün çökmesine neden oldu. <strong>İkinci büyük dersim:</strong> Her test kendi kendine yetmelidir.",
            "<strong>Her İşi Yapan Step Definition'lar:</strong> Kod tekrarına ve bakım kabusuna yol açtı. <strong>Üçüncü büyük dersim:</strong> Step Definition'lar 'tercüman' olmalı, 'uzman' değil."
        ],
        projectCucumberVisionTitle: "Vizyonum: Bu Projeyi Modern Bir Çerçeveye Dönüştürme Planım",
        projectCucumberVisionPoints: [
            `<strong>Akıllı Bekleme Sistemi: <code>WaitUtils</code></strong><p>Tüm <code>Thread.sleep()</code> komutlarını atıp, yerine Selenium'un <code>WebDriverWait</code> mekanizmasını kullanan merkezi bir <strong><code>WaitUtils</code></strong> sınıfı inşa edeceğim.</p>`,
            `<strong>Paralel Koşuma Hazır, Tam Bağımsız Testler</strong><p>Profesyonel driver yönetimi için <strong><code>ThreadLocal</code></strong> tabanlı bir <strong><code>DriverFactory</code></strong> ve her senaryoyu bağımsız kılmak için <strong>Cucumber Hooks</strong> kullanacağım.</p>`,
            `<strong>Daha Derin ve Anlamlı Doğrulamalar</strong><p>Sadece UI kontrolü değil, API çağrıları ile veritabanı doğrulaması yapacak ve daha fazla negatif/uç durum senaryosu ekleyeceğim.</p>`,
            `<strong>Hata Ayıklama için Loglama</strong><p>Bir test patladığında sorunu net görmek için projeye <strong>SLF4J</strong> ile loglama ekleyeceğim.</p>`
        ],
        projectCucumberGithubLink: "GitHub Repo",

        // Proje 4: Spotify API Test
        projectSpotifyTitle: "Spotify API Test Otomasyonu - Taygun Kara",
        projectSpotifyTitleHeader: "🎵 Spotify API Test Otomasyonu: Sıfırdan Modüler Bir Framework’e Evrim",
        projectSpotifyIntro: "Bu Spotify API test projesi, benim için bir test çerçevesinin nasıl düşünülmesi, kurulması ve zamanla nasıl olgunlaştırılması gerektiğini öğrendiğim bir atölye oldu. 'İyi' çalışan bir kodu, 'mükemmel' hale getirme yolculuğumun canlı bir kanıtı.",
        projectSpotifyTechMapTitle: "Kodun İçinde Neler Oluyor? Projenin Teknik Haritası",
        projectSpotifyTechMapPoints: [
            "<strong>Her Şey Yerli Yerinde: Katmanlı Mimari</strong><p>Projeyi, sorumlulukları net bir şekilde ayıran katmanlı bir yapıda tasarladım: `/api` (Spotify etkileşimleri), `/models` (JSON kalıpları) ve `/tests` (iş akışları).</p>",
            "<strong>Test Verilerini Akıllıca Yönetmek</strong><p>Hassas verileri kod dışındaki <code>config.properties</code> dosyasında tutuyor, <code>ConfigLoader</code> ile okuyorum. Değişken veriler içinse <strong>JavaFaker</strong> ile benzersiz isimler üretiyorum.</p>",
            "<strong>Sadece Mutlu Sonlar Değil: Negatif Senaryolar</strong><p>'Eksik Bilgiyle Playlist Oluşturma' (beklenti: <code>400</code>) ve 'Yetkisiz Erişim' (beklenti: <code>401</code>) gibi kritik negatif senaryoları da otomatize ettim.</p>",
            "<strong>Sonuçları Anlamlandırmak: Allure ile Raporlama</strong><p><strong>Allure Report</strong> entegrasyonu ile testlerimi iş gereksinimlerine göre (<code>@Epic</code>) gruplayan, görsel ve interaktif raporlar oluşturuyorum.</p>"
        ],
        projectSpotifyLessonTitle: "Projenin Bana En Büyük Dersi: Güvenilirlik Her Şeydir",
        projectSpotifyLessonText: "Projenin ilk versiyonunda yaptığım en büyük acemi hatalarından biri, bir testi sabit bir ID'ye bağımlı kılmaktı. Bu acı tecrübe, bana otomasyonun altın kuralını öğretti: <strong>Her test kendi kendine yetebilmeli. Kendi verisini yaratmalı, testini yapmalı ve arkasında hiçbir iz bırakmadan ortamı temizlemeli.</strong>",
        projectSpotifyFutureTitle: "Daha İyiye Giden Yol: Geliştirme Planım",
        projectSpotifyFuturePoints: [
            "<strong>Testleri Atomik Hale Getirmek</strong><p>İlk işim, tüm testleri altın kurala göre yeniden yazmak. Artık her test, kendi verisini oluşturacak, doğrulayacak ve işi bitince silecek.</p>",
            "<strong>Daha Derin Doğrulamalar</strong><p>Sadece durum koduna değil, dönen cevabın içindeki verilerin benim gönderdiğim değerlerle birebir aynı olup olmadığını da kontrol edeceğim.</p>",
            "<strong>Uç Durumları Zorlamak</strong><p>Negatif test kapsamını 'çok uzun metin gönderme', 'emoji kullanma', 'rate-limit'e takılma' gibi daha zorlu senaryolarla genişleteceğim.</p>",
            "<strong>Mimaride İnce Ayarlar</strong><p>Yardımcı sınıfları modern <code>enum</code> yapılarına çevireceğim ve en önemlisi, hata ayıklamayı saniyelere indirmek için <strong>SLF4J</strong> ile detaylı loglama ekleyeceğim.</p>"
        ],
        projectSpotifyGithubLink: "GitHub Repo",

        // Proje 5: Trello API / Postman
        projectTrelloTitle: "Trello API Otomasyonu - Taygun Kara",
        projectTrelloTitleHeader: "🚀 Postman’den CI/CD’ye: Trello API ile Uçtan Uca Otomasyon Süreci",
        projectTrelloIntro: "Bu Trello projesi, bir test sürecini en başından en sonuna, yani CI/CD entegrasyonuna kadar nasıl taşıyabildiğimi kanıtlamak amacıyla doğdu. Postman'de elle yapılan birkaç tıklamayla başlayan süreci, Newman ile komut satırından koşan tam teşekküllü bir otomasyon suitine dönüştürdüm.",
        projectTrelloTechDetailsTitle: "Peki, Bu Koleksiyonun İçinde Ne Var? Teknik Detaylar",
        projectTrelloTechDetailsPoints: [
            "<strong>Atölye ve Motor: Postman & Newman İkilisi</strong><p>Projem iki ana araç üzerine kurulu: API isteklerini tasarladığım <strong>Postman</strong> ve tüm koleksiyonu komut satırından çalıştırıp CI/CD'ye entegre etmemi sağlayan <strong>Newman</strong>.</p>",
            "<strong>Düzenli Bir Yapı: Koleksiyon ve Ortam Yönetimi</strong><p>İstekleri mantıksal klasörlere ayırdım ve veri yönetimini <strong>Global Değişkenler</strong> (hassas bilgiler için) ve <strong>Ortam Değişkenleri</strong> (dinamik veriler için) ile sağladım.</p>",
            "<strong>Doğrulama: Sadece 'Çalışıyor' Demek Yetmez</strong><p>Her isteğin 'Tests' sekmesinde, sadece durum kodunu değil, dönen yanıtın gövdesini ve yanıt süresini de doğrulayan detaylı JavaScript kontrolleri yapıyorum.</p>"
        ],
        projectTrelloLessonTitle: "Yolda Öğrendiğim En Acı Ama En Değerli Ders: Bağımlılık Zinciri",
        projectTrelloLessonText: "Projenin ilk halinde testlerim bir zincir gibi birbirine bağlıydı, bu da 'domino etkisiyle' tüm testlerin anlamsızca çökmesine neden olan bir kırılganlık yaratmıştı. Bu deneyim, bana otomasyonun altın kuralını öğretti: <strong>Her test, kendi ayakları üzerinde durmalı. Kendi verisini yaratmalı, işini yapmalı ve arkasını temizleyip gitmeli.</strong>",
        projectTrelloFutureTitle: "Sıradaki Adımlar: Bu Koleksiyonu Gerçek Bir Çerçeveye Dönüştürmek",
        projectTrelloFuturePoints: [
            "<strong>Atomik Testler (Setup & Teardown Kültürü)</strong><p>En büyük önceliğim, her bir testi çalışmadan önce <strong>pre-request script</strong> ile kendi verisini oluşturacak ve test bitince temizleyecek şekilde yeniden yazmak.</p>",
            "<strong>Kod Tekrarına Son (DRY Prensibi)</strong><p>Ortak kontrolleri tek tek isteklerden alıp ait oldukları <strong>klasörün 'Tests' sekmesine</strong> taşıyarak kod tekrarını azaltacak ve bakımı kolaylaştıracağım.</p>",
            "<strong>Daha Derin Kontroller ve Zorlu Senaryolar</strong><p>Dönen JSON yanıtının beklenen <strong>şemaya (`jsonSchema`) uygunluğunu</strong> kontrol edecek ve 'geçersiz ID ile kart silme' gibi daha fazla <strong>negatif/uç durum</strong> senaryosu ekleyeceğim.</p>"
        ],
        projectTrelloGithubLink: "GitHub Repo",

        techJava: "Java", techSelenium: "Selenium", techTestNG: "TestNG", techMaven: "Maven", techPOM: "POM", techGit: "Git", techGitHub: "GitHub", techCucumber: "Cucumber", techExtentReports: "ExtentReports", techJenkins: "Jenkins", techRestAssured: "Rest Assured", techAllure: "Allure Report",
        backToProjects: "Tüm Projelere Geri Dön",
        backToBlog: "Tüm Yazılara Geri Dön",

        // === ISTQB Mock Exam Uygulaması Çevirileri ===
        istqbMainTitle: "ISTQB® Temel Seviye Deneme Sınavı - Taygun Kara",
        mainTitleNew: "ISTQB® Temel Seviye Deneme Sınavı",
        welcomeIntroNew: "Temel Seviye (v4.0) için kendinizi test etmenize yardımcı olacak bir deneme sınavı. Her sayfa yenilendiğinde, soru havuzundan bilişsel seviye (K-Level) ve chapter dağılımı dikkate alınarak yeni bir sınav oluşturulacaktır.",
        examInfoTitle: "Sınav Bilgileri",
        ruleDurationLabel: "Süre:",
        ruleNumQuestionsLabel: "Soru Sayısı:",
        rulePassingLabel: "Geçme Notu:",
        ruleDurationText: "dakika",
        rulePassingText: "doğru",
        importantNotesTitle: "Dikkat Edilmesi Gerekenler",
        noteTime: "Süre dolduğunda sınav otomatik olarak sona erer.",
        noteReview: "Emin olmadığınız soruları soru gezgininden takip edip sonra dönebilirsiniz.",
        noteSyllabus: "Başarılı olmak için Syllabus'u gözden geçirmeyi unutmayın.",
        startButton: "Sınavı Başlat",
        downloadButton: "Syllabus (EN)",
        downloadButtonTR: "Syllabus (TR)",
        loadingText: "Sorular yükleniyor...",
        examTitleHeader: "ISTQB Temel Seviye Pratik Sınavı",
        questionLabel: "Soru",
        prevButton: "Önceki",
        nextButton: "Sonraki",
        finishButton: "Sınavı Bitir",
        resultsTitle: "Sınav Sonuçları",
        correctLabel: "Doğru",
        incorrectLabel: "Yanlış",
        passed: "Geçti",
        failed: "Başarısız",
        reviewTitle: "Soru Değerlendirmesi",
        reviewCorrect: "Doğru",
        reviewIncorrect: "Yanlış",
        reviewYourAnswer: "(Cevabın)",
        reviewExplanation: "Açıklama:",
        reviewTopic: "Konu:",
        noExplanation: "Açıklama mevcut değil.",
        noTopic: "Belirtilmemiş",
        filterAll: "Tümü",
        filterCorrect: "Doğrular",
        filterIncorrect: "Yanlışlar",
        homepageButton: "Anasayfa",
        restartButton: "Tekrar Başla",
        confirmTitle: "Sınavı Bitir?",
        confirmMessage: "Sınavı bitirmek istediğinizden emin misiniz? Gönderdikten sonra cevaplarınızı değiştiremezsiniz.",
        cancelButton: "İptal",
        confirmFinishButton: "Sınavı Bitir",
        loadError: "Soru dosyası yüklenemedi. Lütfen dosya yolunu kontrol edin veya daha sonra tekrar deneyin.",
        selectionError: "Sınav yapısıyla eşleşen soru seçilemedi. Lütfen soru havuzunu kontrol edin.",
        navigatorTitle: "Soru Gezgini",
        officialLinksTitle: "Resmi Web Siteleri",
        selectMultiple: "(Birden Fazla Cevap Seçin)",
    }
};


// ÇEVİRİ FONKSİYONU
function translatePage(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        let translation = translations[lang]?.[key] ?? translations['en']?.[key];

        if (translation === undefined) {
            console.warn(`Translation key "${key}" not found for language "${lang}" or English.`);
            translation = `[${key}]`;
        }

        if (element.tagName === 'UL' && Array.isArray(translation)) {
             element.innerHTML = '';
             translation.forEach(item => {
                 const li = document.createElement('li');
                 if (typeof item === 'string') {
                     li.innerHTML = item;
                 } else {
                     li.textContent = item;
                 }
                 element.appendChild(li);
             });
        }
        else {
             if (typeof translation === 'string' && (translation.includes('<') || translation.includes('&'))) {
                 element.innerHTML = translation;
             } else {
                 element.textContent = translation;
             }
        }
    });
}