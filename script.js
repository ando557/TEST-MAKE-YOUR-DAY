document.addEventListener('DOMContentLoaded', () => {
    // --- TEMPLATE ДЛЯ HEADER ---
    const headerTemplate = `
        <div class="container mx-auto flex justify-between items-center">
            <a href="index.html" class="flex items-center gap-3">
                <img src="images/makeurdaylogo.png" alt="Logo" class="h-10 w-10 md:h-12 md:w-12 object-contain">
                <span class="text-2xl font-bold tracking-wider main-gradient-text">MakeYourDay</span>
            </a>
            <div class="flex items-center gap-2 md:gap-4">
                 <a href="leaderboard.html" class="hidden md:flex items-center gap-2 glass-card-footer px-3 py-2 rounded-lg hover:bg-slate-700/80 transition-colors" data-key="leaderboardsBtn">
                    <i data-lucide="bar-chart-3" class="w-5 h-5"></i>
                    <span class="text-sm" data-key="leaderboardsBtn">Leaderboards</span>
                </a>
                <div id="auth-buttons" class="hidden items-center gap-2">
                    <a href="auth.html?mode=login" class="px-4 py-2 text-sm font-medium hover:text-pink-400 transition-colors" data-key="loginBtn">Войти</a>
                    <a href="auth.html?mode=register" class="shine-button bg-pink-600 text-white font-bold py-2 px-5 rounded-full text-sm transition-all duration-300 hover:bg-pink-500 hover:shadow-lg hover:shadow-pink-600/50" data-key="registerBtn">Регистрация</a>
                </div>
                <div id="user-profile" class="hidden items-center gap-3 glass-card-footer p-2 rounded-lg">
                    <a href="account.html" id="notifications-btn" class="p-2 rounded-md hover:bg-slate-700/50 transition-colors relative">
                        <i data-lucide="bell" class="w-5 h-5 text-slate-400 hover:text-white transition-colors"></i>
                        <span id="notifications-count" class="absolute top-1 right-1 notification-badge hidden"></span>
                    </a>
                    <a href="account.html" class="flex items-center gap-2 text-right p-2 rounded-md hover:bg-slate-700/50 transition-colors">
                        <div>
                            <span id="profile-username" class="font-bold text-white block text-sm">Username</span>
                            <span id="profile-plan" class="text-xs uppercase font-bold">Free Plan</span>
                        </div>
                        <img id="profile-avatar-icon" src="images/default-avatar.png" class="w-8 h-8 rounded-full object-cover border-2 border-slate-600">
                    </a>
                    <button id="logout-btn" title="Выйти" class="p-2 rounded-md hover:bg-slate-700/50 transition-colors">
                        <i data-lucide="log-out" class="w-5 h-5 text-slate-400 hover:text-white transition-colors"></i>
                    </button>
                </div>
                <div id="theme-switcher-container" class="relative hidden">
                     <button id="theme-switcher-btn" class="glass-card-footer p-2 rounded-lg hover:bg-slate-700/80 transition-colors" title="Сменить тему">
                        <i data-lucide="palette" class="w-5 h-5"></i>
                     </button>
                </div>
                <div id="lang-selector" class="relative">
                    <button id="lang-button" class="flex items-center gap-2 glass-card-footer px-3 py-2 rounded-lg hover:bg-slate-700/80 transition-colors">
                        <i data-lucide="globe" class="w-5 h-5"></i>
                        <span id="current-lang-text" class="text-sm">RU</span>
                        <i data-lucide="chevron-down" id="lang-chevron" class="w-4 h-4 transition-transform duration-300"></i>
                    </button>
                    <div id="lang-dropdown" class="absolute top-full right-0 mt-2 w-32 glass-card-footer rounded-lg overflow-hidden hidden transition-all duration-300 transform origin-top-right scale-95 opacity-0 z-30">
                        <a href="#" class="lang-option block px-4 py-2 text-sm text-white hover:bg-slate-700/80" data-lang="ru">Русский</a>
                        <a href="#" class="lang-option block px-4 py-2 text-sm text-white hover:bg-slate-700/80" data-lang="en">English</a>
                    </div>
                </div>
            </div>
        </div>
    `;


    // --- DATABASE ---
    const quotes = {
        free: {
            motivation: [
                { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
                { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
                { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
                { quote: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
                { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
            ],
            life: [
                { quote: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
                { quote: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
                { quote: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
                { quote: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
                { quote: "Life is either a daring adventure or nothing at all.", author: "Helen Keller" }
            ],
            success: [
                { quote: "The road to success and the road to failure are almost exactly the same.", author: "Colin R. Davis" },
                { quote: "Success is stumbling from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
                { quote: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
                { quote: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
                { quote: "Success is not in what you have, but who you are.", author: "Bo Bennett" }
            ]
        },
        premium: {
            wisdom: [
                { quote: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
                { quote: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle" },
                { quote: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
                { quote: "Wisdom is not a product of schooling but of the lifelong attempt to acquire it.", author: "Albert Einstein" }
            ],
            leadership: [
                { quote: "A leader is one who knows the way, goes the way, and shows the way.", author: "John C. Maxwell" },
                { quote: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
                { quote: "The greatest leader is not necessarily the one who does the greatest things. He is the one that gets the people to do the greatest things.", author: "Ronald Reagan" }
            ],
            ai_wisdom: [
                { quote: "The currency of the future is not data, but the wisdom to interpret it correctly.", author: "AI Oracle" },
                { quote: "Logic is the framework, but creativity is the spark that illuminates the unknown.", author: "AI Oracle" },
                { quote: "Empathy, a human trait, is the most complex algorithm an AI strives to understand.", author: "AI Oracle" },
                { quote: "In the symphony of existence, every data point has its note to play.", author: "AI Oracle" }
            ]
        }
    };

    const sparkTemplates = {
        ru: {
            creative: [ "Нарисуй что-то, что представляет твое текущее настроение", "Напиши короткое стихотворение о чем-то, что тебя вдохновляет", "Создай коллаж из фотографий, которые вызывают у тебя радость", "Придумай метафору для своего сегодняшнего дня" ],
            health: [ "Сделай 10 приседаний прямо сейчас", "Выпей стакан воды и почувствуй, как организм говорит 'спасибо'", "Сделай 5-минутную растяжку, даже если ты за компьютером", "Пройдись по комнате, представляя, что ты идешь по пляжу" ],
            learning: [ "Посмотри 5-минутное образовательное видео на тему, которую не знаешь", "Прочитай статью о чем-то совершенно новом для тебя", "Изучи три интересных факта о космосе", "Узнай что-то новое о культуре другой страны" ],
            mindfulness: [ "Закрой глаза на 60 секунд и сосредоточься только на своем дыхании", "Опиши 5 вещей, которые ты видишь, 4 которые слышишь, 3 которые чувствуешь", "Поблагодари мысленно трех людей, которые сделали твой день лучше", "Представь свой идеальный день через 5 лет в деталях" ],
            social: [ "Сделай комплимент незнакомцу в социальной сети", "Напиши сообщение другу, с которым давно не общался", "Поделись чем-то вдохновляющим в своих соцсетях", "Позвони родственнику и просто спроси, как его дела" ]
        },
        en: {
            creative: [ "Draw something that represents your current mood", "Write a short poem about something that inspires you", "Create a collage of photos that bring you joy", "Come up with a metaphor for your day today" ],
            health: [ "Do 10 squats right now", "Drink a glass of water and feel your body say 'thank you'", "Do a 5-minute stretch, even if you're at your computer", "Walk around the room, imagining you're walking on a beach" ],
            learning: [ "Watch a 5-minute educational video on a topic you don't know", "Read an article about something completely new to you", "Learn three interesting facts about space", "Learn something new about another country's culture" ],
            mindfulness: [ "Close your eyes for 60 seconds and focus only on your breathing", "Describe 5 things you see, 4 you hear, 3 you feel", "Mentally thank three people who made your day better", "Imagine your ideal day in 5 years in detail" ],
            social: [ "Give a compliment to a stranger on social media", "Message a friend you haven't talked to in a while", "Share something inspiring on your social media", "Call a relative and just ask how they are" ]
        }
    };
    
    // --- TRANSLATIONS ---
    const translations = { 
        ru: { 
            title: "Сделай Свой День - Мотивационные Цитаты", 
            subtitle: "Ваша дневная доза вдохновения", 
            initialQuote: "Нажмите кнопку ниже, чтобы получить свою первую цитату!", 
            initialAuthor: "— Автор", 
            getQuoteBtn: "Получить Цитату", 
            loginPrompt: '<a href="auth.html?mode=login" class="underline hover:text-white">Войдите</a>, чтобы получать больше цитат.', 
            limitReached: "Вы достигли дневного лимита. Возвращайтесь через:", 
            getMoreQuotes: "Получить больше цитат", 
            footerFollow: "Подписывайтесь на нас", 
            leaderboardsBtn: "Таблицы лидеров", 
            loginBtn: "Войти", 
            registerBtn: "Регистрация", 
            logoutBtnTitle: "Выйти",
            changeThemeBtnTitle: "Сменить тему",
            subHeaderTitle: "Выберите Ваш План", 
            subHeaderSubtitle: "Откройте полную силу ежедневного вдохновения.", 
            planFreeTitle: "Базовый", 
            planFreePrice: "Бесплатно", 
            planFreeDesc: "Начните свой путь с основ.", 
            planFreeFeat1: "3 случайные цитаты в день", 
            planFreeFeat2: "Стандартные категории", 
            planFreeFeat3: "Только текстовые цитаты", 
            planPremiumTitle: "Премиум", 
            planPremiumDesc: "Для тех, кто хочет больше мотивации.", 
            planPremiumFeat1: "До 20 цитат в день", 
            planPremiumFeat2: "5+ эксклюзивных категорий", 
            planPremiumFeat3: "Красивые цитаты с изображениями", 
            planPremiumFeat4: "Скачиваемые изображения", 
            planPremiumFeat5: "Сохраняйте любимые цитаты", 
            planVipTitle: "VIP", 
            planVipDesc: "Ультимативный персонализированный опыт.", 
            planVipFeat1: "Все из Премиум", 
            planVipFeat2: "Персонализированные цитаты на основе ИИ", 
            planVipFeat3: "Создавайте свои коллекции", 
            planVipFeat4: "Эксклюзивные темы", 
            subscribeBtn: "Подписаться", 
            currentPlanBtn: "Ваш План", 
            backToQuotes: "← Назад к цитатам", 
            authTitleLogin: "Вход в Аккаунт", 
            authTitleRegister: "Создать Аккаунт", 
            authSubtitleLogin: "С возвращением!", 
            authSubtitleRegister: "Присоединяйся к нам!", 
            authNicknameLabel: "Никнейм", 
            authPasswordLabel: "Пароль", 
            authSubmitLogin: "Войти", 
            authSubmitRegister: "Зарегистрироваться", 
            authToggleToRegister: "Нет аккаунта? <a href=\"auth.html?mode=register\" class=\"font-medium text-pink-400 hover:text-pink-300\">Зарегистрироваться</a>", 
            authToggleToLogin: "Уже есть аккаунт? <a href=\"auth.html?mode=login\" class=\"font-medium text-pink-400 hover:text-pink-300\">Войти</a>", 
            accountTitle: "Личный Кабинет", 
            welcomeMessage: "Добро пожаловать, ", 
            profileHeader: "Профиль", 
            nicknameLabel: "Никнейм:", 
            planLabel: "План:", 
            changePlanBtn: "Сменить План", 
            saveProfileBtn: "Сохранить", 
            statsHeader: "Статистика", 
            quotesViewedLabel: "Просмотрено цитат:", 
            rateProjectHeader: "Оцените Проект", 
            rateProjectText: "Нам важно ваше мнение!", 
            rateProjectBtn: "Оценить", 
            favoritesHeader: "Избранное", 
            friendRequestsHeader: "Запросы в друзья",
            messagesHeader: "Сообщения",
            viewAllBtn: "Смотреть все", 
            favoritesPageTitle: "Избранные Цитаты", 
            favoritesPageSubtitle: "Твоя личная коллекция вдохновения", 
            leaderboardTitle: "Таблицы Лидеров", 
            leaderboardSubtitle: "Посмотрите, кто лидирует в чартах вдохновения.", 
            liveLeaderboardTitle: "Сейчас онлайн", 
            quoteLeaderboardTitle: "Топ-100 по цитатам", 
            loading: "Загрузка...", 
            feedbackTitle: "Оцените Приложение", 
            feedbackSubtitle: "Ваш отзыв поможет нам стать лучше.", 
            feedbackSubmitBtn: "Отправить Оценку", 
            feedbackSending: "Отправка...", 
            feedbackThanks: "Спасибо за вашу оценку!", 
            feedbackError: "Ошибка отправки. Попробуйте позже.", 
            feedbackSelectRating: "Пожалуйста, выберите оценку.", 
            noFavoritesMsg1: "Ты еще не сохранил ни одной цитаты.", 
            noFavoritesMsg2: 'Нажми на иконку <a href="index.html" class="underline text-pink-400 hover:text-pink-300">❤️ на главной странице</a>, чтобы добавить.', 
            sparkTitle: "Искра Дня", 
            sparkDoneBtn: "Сделано!", 
            sparkCompleted: "только что выполнил(а) Искру Дня!",
            aiSparkTitles: { creative: "🎨 Творческая искра", health: "💪 Здоровая привычка", learning: "📚 Минутка знаний", mindfulness: "🧘 Осознанность", social: "👥 Социальное действие" },
            commentsTitle: "Комментарии",
            commentPlaceholder: "Добавьте комментарий...",
            addFriend: "Добавить в друзья",
            requestSent: "Запрос отправлен",
            unfriend: "Удалить из друзей",
            accept: "Принять",
            decline: "Отклонить",
            friends: "Друзья",
            sendMessage: "Отправить сообщение",
            downloadQuote: "Скачать как картинку",
            addToFavorites: "Добавить в избранное",
            bioPlaceholder: "Расскажите о себе...",
            noBio: "Пользователь еще не добавил биографию.",
            backToLeaderboard: "← Назад к таблице лидеров",
            backToAccount: "← Назад в аккаунт",
            noFriendRequests: "У вас нет новых запросов в друзья.",
            noFriendsToChat: "У вас пока нет друзей. Добавьте кого-нибудь, чтобы начать общаться!",
            chatWith: "Чат с",
            typeMessagePlaceholder: "Введите сообщение...",
            noFriendsYet: "У этого пользователя пока нет друзей.",
            userReading: "сейчас читает...",
            noUsersOnline: "Сейчас нет пользователей онлайн."
        }, 
        en: { 
            title: "Make Your Day - Motivational Quotes", 
            subtitle: "Your daily dose of inspiration", 
            initialQuote: "Click the button below to get your first quote!", 
            initialAuthor: "— Author", 
            getQuoteBtn: "Get Your Quote", 
            loginPrompt: '<a href="auth.html?mode=login" class="underline hover:text-white">Log in</a> to get more quotes.', 
            limitReached: "You have reached your daily limit. Come back in:", 
            getMoreQuotes: "Get more quotes", 
            footerFollow: "Follow Us", 
            leaderboardsBtn: "Leaderboards", 
            loginBtn: "Login", 
            registerBtn: "Register", 
            logoutBtnTitle: "Logout",
            changeThemeBtnTitle: "Change Theme",
            subHeaderTitle: "Choose Your Plan", 
            subHeaderSubtitle: "Unlock the full power of daily inspiration.", 
            planFreeTitle: "Basic", 
            planFreePrice: "Free", 
            planFreeDesc: "Start your journey with the essentials.", 
            planFreeFeat1: "3 random quotes per day", 
            planFreeFeat2: "Standard categories", 
            planFreeFeat3: "Text-only quotes", 
            planPremiumTitle: "Premium", 
            planPremiumDesc: "For those who want more motivation.", 
            planPremiumFeat1: "Up to 20 quotes per day", 
            planPremiumFeat2: "5+ exclusive categories", 
            planPremiumFeat3: "Beautiful image quotes", 
            planPremiumFeat4: "Downloadable images", 
            planPremiumFeat5: "Save favorite quotes", 
            planVipTitle: "VIP", 
            planVipDesc: "The ultimate personalized experience.", 
            planVipFeat1: "Everything in Premium", 
            planVipFeat2: "AI-powered personalized quotes", 
            planVipFeat3: "Create your own collections", 
            planVipFeat4: "Exclusive themes", 
            subscribeBtn: "Subscribe", 
            currentPlanBtn: "Current Plan", 
            backToQuotes: "← Back to quotes", 
            authTitleLogin: "Login to Your Account", 
            authTitleRegister: "Create an Account", 
            authSubtitleLogin: "Welcome back!", 
            authSubtitleRegister: "Join us!", 
            authNicknameLabel: "Nickname", 
            authPasswordLabel: "Password", 
            authSubmitLogin: "Login", 
            authSubmitRegister: "Register", 
            authToggleToRegister: "No account? <a href=\"auth.html?mode=register\" class=\"font-medium text-pink-400 hover:text-pink-300\">Register</a>", 
            authToggleToLogin: "Already have an account? <a href=\"auth.html?mode=login\" class=\"font-medium text-pink-400 hover:text-pink-300\">Login</a>", 
            accountTitle: "Personal Account", 
            welcomeMessage: "Welcome, ", 
            profileHeader: "Profile", 
            nicknameLabel: "Nickname:", 
            planLabel: "Plan:", 
            changePlanBtn: "Change Plan", 
            saveProfileBtn: "Save Profile", 
            statsHeader: "Statistics", 
            quotesViewedLabel: "Quotes viewed:", 
            rateProjectHeader: "Rate the Project", 
            rateProjectText: "Your opinion is important to us!", 
            rateProjectBtn: "Rate", 
            favoritesHeader: "Favorites", 
            friendRequestsHeader: "Friend Requests",
            messagesHeader: "Messages",
            viewAllBtn: "View All", 
            favoritesPageTitle: "Favorite Quotes", 
            favoritesPageSubtitle: "Your personal collection of inspiration", 
            leaderboardTitle: "Leaderboards", 
            leaderboardSubtitle: "See who's leading the inspiration charts.", 
            liveLeaderboardTitle: "Live Leaderboard", 
            quoteLeaderboardTitle: "Top 100 Quote Readers", 
            loading: "Loading...", 
            feedbackTitle: "Rate Our App", 
            feedbackSubtitle: "Your feedback helps us improve.", 
            feedbackSubmitBtn: "Submit Rating", 
            feedbackSending: "Sending...", 
            feedbackThanks: "Thanks for your rating!", 
            feedbackError: "Submission error. Please try again.", 
            feedbackSelectRating: "Please select a rating.", 
            noFavoritesMsg1: "You haven't saved any quotes yet.", 
            noFavoritesMsg2: 'Click the <a href="index.html" class="underline text-pink-400 hover:text-pink-300">❤️ icon on the main page</a> to add one.', 
            sparkTitle: "Daily Spark", 
            sparkDoneBtn: "Done!", 
            sparkCompleted: "just completed the Daily Spark!",
            aiSparkTitles: { creative: "🎨 Creative Spark", health: "💪 Healthy Habit", learning: "📚 Learning Moment", mindfulness: "🧘 Mindfulness", social: "👥 Social Action" },
            commentsTitle: "Comments",
            commentPlaceholder: "Add a comment...",
            addFriend: "Add Friend",
            requestSent: "Request Sent",
            unfriend: "Unfriend",
            accept: "Accept",
            decline: "Decline",
            friends: "Friends",
            sendMessage: "Send Message",
            downloadQuote: "Download as image",
            addToFavorites: "Add to favorites",
            bioPlaceholder: "Tell us about yourself...",
            noBio: "This user hasn't added a bio yet.",
            backToLeaderboard: "← Back to leaderboards",
            backToAccount: "← Back to account",
            noFriendRequests: "You have no new friend requests.",
            noFriendsToChat: "You don't have any friends yet. Add someone to start chatting!",
            chatWith: "Chat with",
            typeMessagePlaceholder: "Type a message...",
            noFriendsYet: "This user has no friends yet.",
            userReading: "is currently reading...",
            noUsersOnline: "No users online right now."
        }, 
    };

    // --- APP STATE & DOM ELEMENTS ---
    let currentUser = null;
    let currentQuote = {};
    let countdownInterval;
    let usedQuotes = new Set();
    const PLAN_LIMITS = { free: 3, premium: 20, vip: Infinity, developer: Infinity, makeyourdayofficial: Infinity, guest: 3 };
    const THEMES = ['default', 'cyberpunk', 'retro', 'forest'];
    let musicState = { playing: false, currentTime: 0 };
    const DEFAULT_AVATAR = 'images/default-avatar.png';

    // --- DATA MANAGEMENT ---
    function getUsersDB() { return JSON.parse(localStorage.getItem('makeYourDayUsers')) || {}; }
    function saveUsersDB(db) { localStorage.setItem('makeYourDayUsers', JSON.stringify(db)); }
    function getQuoteDataDB() { return JSON.parse(localStorage.getItem('makeYourDayQuoteData')) || {}; }
    function saveQuoteDataDB(db) { localStorage.setItem('makeYourDayQuoteData', JSON.stringify(db)); }
    function getMessagesDB() { return JSON.parse(localStorage.getItem('makeYourDayMessages')) || {}; }
    function saveMessagesDB(db) { localStorage.setItem('makeYourDayMessages', JSON.stringify(db)); }

    // --- Special User Handling ---
    function applySpecialUserProperties(user) {
        if (!user) return null;
        if (user.username === 'Andranik') {
            user.plan = 'Developer';
            user.planClass = 'plan-developer';
            user.usernameClass = 'username-developer';
        } else if (user.username === 'MakeYourDay') {
            user.plan = 'MakeYourDayOfficial';
            user.planClass = 'plan-official';
            user.usernameClass = 'username-official';
        } else {
            user.planClass = `premium-gradient-text`;
            user.usernameClass = '';
        }
        return user;
    }

    function getCurrentUser() {
        const username = localStorage.getItem('makeYourDayCurrentUser');
        if (!username) return null;
        const usersDB = getUsersDB();
        let user = usersDB[username];
        if (user) {
            user.username = username; // Ensure username is part of the object
            user.favorites = user.favorites || [];
            user.theme = user.theme || 'default';
            user.lang = user.lang || 'ru';
            user.quotesViewed = user.quotesViewed || 0;
            user.usage = user.usage || { date: new Date().toISOString().split('T')[0], count: 0 };
            user.avatar = user.avatar || DEFAULT_AVATAR;
            user.bio = user.bio || '';
            user.lastSparkDate = user.lastSparkDate || null;
            user.friends = user.friends || [];
            user.friendRequestsSent = user.friendRequestsSent || [];
            user.friendRequestsReceived = user.friendRequestsReceived || [];
            user = applySpecialUserProperties(user);
        }
        return user;
    }
    
    function saveCurrentUser() {
        if (!currentUser) return;
        const usersDB = getUsersDB();
        if (usersDB[currentUser.username]) {
             const { username, usernameClass, planClass, ...userData } = currentUser;
             usersDB[currentUser.username] = userData;
            saveUsersDB(usersDB);
        }
    }
    
    function getQuoteHash(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; 
      }
      return 'q' + Math.abs(hash);
    }

    function playNotificationSound() {
        const sound = document.getElementById('notification-sound');
        if (sound && sound.src) {
            sound.volume = 0.7;
            sound.play().catch(e => console.log("Notification sound blocked by browser."));
        }
    }

    function initializeIcons() { if (window.lucide) { lucide.createIcons(); } }

    function setupGlobalMusic() {
        const savedMusicState = localStorage.getItem('makeYourDayMusicState');
        if (savedMusicState) {
            musicState = JSON.parse(savedMusicState);
        }
        const musicToggleBtn = document.getElementById('music-toggle-btn');
        const lofiAudio = document.getElementById('lofi-audio');
        if (musicToggleBtn && lofiAudio) {
            if (musicState.playing) {
                lofiAudio.currentTime = musicState.currentTime;
                lofiAudio.play().catch(e => console.log("Music autoplay blocked"));
                musicToggleBtn.innerHTML = '<i data-lucide="pause" class="w-6 h-6"></i>';
                musicToggleBtn.classList.add('playing');
            }
            musicToggleBtn.addEventListener('click', () => {
                const isPlaying = !lofiAudio.paused;
                if (isPlaying) {
                    lofiAudio.pause();
                    musicToggleBtn.innerHTML = '<i data-lucide="play" class="w-6 h-6"></i>';
                    musicToggleBtn.classList.remove('playing');
                    musicState.playing = false;
                } else {
                    lofiAudio.play().catch(error => console.log("Music autoplay requires user interaction first."));
                    musicToggleBtn.innerHTML = '<i data-lucide="pause" class="w-6 h-6"></i>';
                    musicToggleBtn.classList.add('playing');
                    musicState.playing = true;
                }
                localStorage.setItem('makeYourDayMusicState', JSON.stringify(musicState));
                lucide.createIcons();
            });
            setInterval(() => {
                if (!lofiAudio.paused) {
                    musicState.currentTime = lofiAudio.currentTime;
                    localStorage.setItem('makeYourDayMusicState', JSON.stringify(musicState));
                }
            }, 5000);
            document.body.addEventListener('click', () => {
                if (lofiAudio.paused && musicState.playing) {
                    lofiAudio.play().catch(e => {});
                }
            }, { once: true });
        }
    }

    function renderHeader() {
        const headerContainer = document.getElementById('main-header');
        if (!headerContainer) return;
        headerContainer.innerHTML = headerTemplate;
        const authButtons = headerContainer.querySelector('#auth-buttons');
        const userProfile = headerContainer.querySelector('#user-profile');
        if (currentUser) {
            userProfile.classList.remove('hidden');
            userProfile.classList.add('flex');
            
            const usernameSpan = userProfile.querySelector('#profile-username');
            const planSpan = userProfile.querySelector('#profile-plan');
            
            usernameSpan.textContent = currentUser.username;
            usernameSpan.className = `font-bold text-white block text-sm ${currentUser.usernameClass || ''}`;
            
            planSpan.textContent = `${currentUser.plan} Plan`;
            planSpan.className = `text-xs uppercase font-bold ${currentUser.planClass || 'premium-gradient-text'}`;

            userProfile.querySelector('#profile-avatar-icon').src = currentUser.avatar || DEFAULT_AVATAR;
            userProfile.querySelector('#logout-btn').addEventListener('click', () => {
                localStorage.removeItem('makeYourDayCurrentUser');
                window.location.href = 'index.html';
            });

            updateNotificationCounts();

            if (currentUser.plan === 'vip' || currentUser.plan === 'Developer') {
                const themeSwitcher = headerContainer.querySelector('#theme-switcher-container');
                if(themeSwitcher) {
                    themeSwitcher.classList.remove('hidden');
                    const themeBtn = themeSwitcher.querySelector('#theme-switcher-btn');
                    themeBtn.addEventListener('click', toggleTheme);
                }
            }
        } else {
            authButtons.classList.remove('hidden');
            authButtons.classList.add('flex');
        }
        attachLangSwitcherListeners(headerContainer);
    }
    
    function updateNotificationCounts() {
        if (!currentUser) return;
        
        const requestsCount = currentUser.friendRequestsReceived?.length || 0;
        const messagesDB = getMessagesDB();
        let unreadMessagesCount = 0;
        Object.values(messagesDB).flat().forEach(msg => {
            if (msg.receiver === currentUser.username && !msg.read) {
                unreadMessagesCount++;
            }
        });

        const totalNotifications = requestsCount + unreadMessagesCount;
        const countBadge = document.getElementById('notifications-count');
        if (countBadge) {
            if (totalNotifications > 0) {
                countBadge.textContent = totalNotifications;
                countBadge.classList.remove('hidden');
            } else {
                countBadge.classList.add('hidden');
            }
        }
        
        const requestsBadge = document.getElementById('requests-count');
        if(requestsBadge) {
             if (requestsCount > 0) {
                requestsBadge.textContent = requestsCount;
                requestsBadge.classList.remove('hidden');
            } else {
                requestsBadge.classList.add('hidden');
            }
        }
        
        const messagesBadge = document.getElementById('messages-count');
         if(messagesBadge) {
             if (unreadMessagesCount > 0) {
                messagesBadge.textContent = unreadMessagesCount;
                messagesBadge.classList.remove('hidden');
            } else {
                messagesBadge.classList.add('hidden');
            }
        }
    }

    function applyTheme(theme) {
        document.body.className = 'bg-slate-900 text-white overflow-x-hidden';
        if (theme && theme !== 'default') { document.body.classList.add(`theme-${theme}`); }
    }
    
    function toggleTheme() {
        if (!currentUser || !['vip', 'Developer'].includes(currentUser.plan)) return;
        const currentThemeIndex = THEMES.indexOf(currentUser.theme || 'default');
        const nextThemeIndex = (currentThemeIndex + 1) % THEMES.length;
        currentUser.theme = THEMES[nextThemeIndex];
        applyTheme(currentUser.theme);
        saveCurrentUser();
    }

    function setLanguage(lang) {
        const langPack = translations[lang] || translations['ru'];
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (langPack[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if(el.type === 'submit' || el.type === 'button') el.value = langPack[key];
                    else el.placeholder = langPack[key];
                } else if (el.hasAttribute('title')) {
                    el.title = langPack[key];
                }
                else { el.innerHTML = langPack[key]; }
            }
        });
        const currentLangText = document.getElementById('current-lang-text');
        if (currentLangText) currentLangText.textContent = lang.toUpperCase();
        document.documentElement.lang = lang;
        if (currentUser) { currentUser.lang = lang; saveCurrentUser(); }
        // Re-render dynamic content that depends on language
        if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
            displayDailySpark();
        }
    }

    function attachLangSwitcherListeners(container) {
        const langButton = container.querySelector('#lang-button');
        const langDropdown = container.querySelector('#lang-dropdown');
        if(!langButton || !langDropdown) return;
        langButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = langDropdown.classList.contains('hidden');
             if (isHidden) {
                langDropdown.classList.remove('hidden');
                setTimeout(() => { langDropdown.classList.remove('opacity-0', 'scale-95'); }, 10);
            } else {
                 langDropdown.classList.add('opacity-0', 'scale-95');
                 setTimeout(() => langDropdown.classList.add('hidden'), 300);
            }
        });
        container.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                setLanguage(e.target.dataset.lang);
                langDropdown.classList.add('opacity-0', 'scale-95');
                setTimeout(() => langDropdown.classList.add('hidden'), 300);
            });
        });
        document.addEventListener('click', (e) => {
            if (langDropdown && !langDropdown.classList.contains('hidden') && !langButton.contains(e.target) && !langDropdown.contains(e.target)) {
                 langDropdown.classList.add('opacity-0', 'scale-95');
                 setTimeout(() => langDropdown.classList.add('hidden'), 300);
            }
        });
    }
    
    function handleSubscription(newPlan) {
        if (!currentUser) return;
        currentUser.plan = newPlan;
        currentUser.usage = { date: new Date().toISOString().split('T')[0], count: 0 };
        saveCurrentUser();
        alert(`Congratulations! You have successfully upgraded to the ${newPlan.toUpperCase()} plan!`);
        window.location.href = 'account.html';
    }

    function checkUsage() {
        if (!currentUser) {
            const guestUsage = JSON.parse(localStorage.getItem('guestUsage')) || { date: new Date().toISOString().split('T')[0], count: 0 };
            const today = new Date().toISOString().split('T')[0];
            if (guestUsage.date !== today) {
                guestUsage.date = today;
                guestUsage.count = 0;
                localStorage.setItem('guestUsage', JSON.stringify(guestUsage));
            }
            return guestUsage;
        }
        const today = new Date().toISOString().split('T')[0];
        if (!currentUser.usage || currentUser.usage.date !== today) {
            currentUser.usage = { date: today, count: 0 };
            saveCurrentUser();
        }
        return currentUser.usage;
    }

    function updateUsage() {
        const usage = checkUsage();
        usage.count++;
        if (currentUser) {
            currentUser.quotesViewed = (currentUser.quotesViewed || 0) + 1;
            currentUser.usage = usage;
            saveCurrentUser();
        } else {
            localStorage.setItem('guestUsage', JSON.stringify(usage));
        }
    }

    function isLimitReached() {
        const plan = currentUser ? currentUser.plan.toLowerCase() : 'guest';
        const limit = PLAN_LIMITS[plan] || 3;
        return checkUsage().count >= limit;
    }

    function startCountdown() {
        if (countdownInterval) clearInterval(countdownInterval);
        const countdownTimer = document.getElementById('countdown-timer');
        if (!countdownTimer) return;
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        function updateTimer() {
            const msLeft = tomorrow - new Date();
            if (msLeft <= 0) {
                countdownTimer.textContent = "00:00:00";
                clearInterval(countdownInterval);
                updateButtonState();
                return;
            }
            const hours = Math.floor(msLeft / 3600000);
            const minutes = Math.floor((msLeft % 3600000) / 60000);
            const seconds = Math.floor((msLeft % 60000) / 1000);
            countdownTimer.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
        updateTimer();
        countdownInterval = setInterval(updateTimer, 1000);
    }

    function updateButtonState() {
        const btn = document.getElementById('new-quote-btn');
        const limitMsg = document.getElementById('limit-message');
        const loginPrmpt = document.getElementById('login-prompt');
        if (!btn) return;
        if (isLimitReached()) {
            btn.disabled = true;
            btn.classList.add('opacity-50', 'cursor-not-allowed');
            if (currentUser) {
                if (limitMsg) limitMsg.classList.remove('hidden');
                startCountdown();
            } else {
                if (loginPrmpt) loginPrmpt.classList.remove('hidden');
                btn.classList.add('hidden');
            }
        } else {
            btn.disabled = false;
            btn.classList.remove('opacity-50', 'cursor-not-allowed', 'hidden');
            if (limitMsg) limitMsg.classList.add('hidden');
            if (loginPrmpt) loginPrmpt.classList.add('hidden');
            if (countdownInterval) clearInterval(countdownInterval);
        }
    }

    function getNewQuote() {
        const plan = currentUser ? currentUser.plan.toLowerCase() : 'guest';
        let categories = { ...quotes.free };
        if (['premium', 'vip', 'developer', 'makeyourdayofficial'].includes(plan)) { 
            categories = { ...categories, ...quotes.premium }; 
        }
        const allQuotes = Object.values(categories).flat();
        const availableQuotes = allQuotes.filter(quote => !usedQuotes.has(quote.quote));
        if (availableQuotes.length === 0) {
            usedQuotes.clear();
            return allQuotes[Math.floor(Math.random() * allQuotes.length)];
        }
        const newQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
        usedQuotes.add(newQuote.quote);
        return newQuote;
    }

    function displayNewQuote() {
        if (isLimitReached()) { updateButtonState(); return; }
        
        updateUsage();
        currentQuote = getNewQuote();
        const quoteCardInner = document.getElementById('quote-card-inner');
        const socialContainer = document.getElementById('social-container');
        if (socialContainer) socialContainer.classList.add('hidden');
        
        if (quoteCardInner) {
            quoteCardInner.style.transform = 'rotateY(180deg)';
        }
        
        setTimeout(() => {
            document.getElementById('quote-text').textContent = currentQuote.quote;
            document.getElementById('quote-author').textContent = `— ${currentQuote.author}`;
            if (currentUser) {
                updateFavoriteButtonUI();
                loadQuoteSocialData();
                if (socialContainer) socialContainer.classList.remove('hidden');
            }
            updateQuoteCardBackground();
            if (quoteCardInner) quoteCardInner.style.transform = 'rotateY(0deg)';
            updateButtonState();
        }, 350);
    }

    function updateQuoteCardBackground() {
        const card = document.getElementById('quote-card');
        if (!card) return;
        let overlay = card.querySelector('.image-quote-overlay');
        const plan = currentUser ? currentUser.plan.toLowerCase() : 'guest';
        if (['premium', 'vip', 'developer', 'makeyourdayofficial'].includes(plan)) {
            card.style.backgroundImage = `url(https://picsum.photos/1200/675?random=${getQuoteHash(currentQuote.quote)})`;
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'image-quote-overlay';
                card.prepend(overlay);
            }
        } else {
            card.style.backgroundImage = '';
            if (overlay) overlay.remove();
        }
    }
    
    function loadQuoteSocialData() {
        if (!currentUser || !currentQuote.quote) return;
        const quoteHash = getQuoteHash(currentQuote.quote);
        const quoteDataDB = getQuoteDataDB();
        const data = quoteDataDB[quoteHash] || { reactions: {}, comments: [] };

        document.querySelectorAll('.reaction-btn').forEach(btn => {
            const reactionType = btn.dataset.reaction;
            const reactors = data.reactions[reactionType] || [];
            btn.querySelector('.count').textContent = reactors.length;
            btn.classList.toggle('reacted', reactors.includes(currentUser.username));
        });
        renderComments(data.comments);
    }

    function handleReaction(e) {
        if (!currentUser || !currentQuote.quote) return;
        const button = e.currentTarget;
        const reactionType = button.dataset.reaction;
        const quoteHash = getQuoteHash(currentQuote.quote);
        const quoteDataDB = getQuoteDataDB();
        
        if (!quoteDataDB[quoteHash]) {
            quoteDataDB[quoteHash] = { reactions: {}, comments: [] };
        }
        const reactions = quoteDataDB[quoteHash].reactions;
        
        const alreadyReacted = reactions[reactionType] && reactions[reactionType].includes(currentUser.username);

        // Allow only one reaction type per user
        Object.keys(reactions).forEach(type => {
            const index = reactions[type]?.indexOf(currentUser.username);
            if (index > -1) {
                reactions[type].splice(index, 1);
            }
        });

        if (!alreadyReacted) {
            if (!reactions[reactionType]) reactions[reactionType] = [];
            reactions[reactionType].push(currentUser.username);
        }

        saveQuoteDataDB(quoteDataDB);
        loadQuoteSocialData();
    }

    function handleCommentSubmit(e) {
        e.preventDefault();
        if (!currentUser || !currentQuote.quote) return;
        const input = document.getElementById('comment-input');
        const text = input.value.trim();
        if (!text) return;

        const quoteHash = getQuoteHash(currentQuote.quote);
        const quoteDataDB = getQuoteDataDB();
        if (!quoteDataDB[quoteHash]) {
            quoteDataDB[quoteHash] = { reactions: {}, comments: [] };
        }

        const newComment = {
            username: currentUser.username,
            avatar: currentUser.avatar || DEFAULT_AVATAR,
            text: text,
            timestamp: new Date().toISOString()
        };
        quoteDataDB[quoteHash].comments.push(newComment);
        saveQuoteDataDB(quoteDataDB);
        renderComments(quoteDataDB[quoteHash].comments);
        input.value = '';
    }

    function renderComments(comments) {
        const list = document.getElementById('comments-list');
        if (!list) return;
        if (!comments || comments.length === 0) {
            list.innerHTML = '';
            return;
        }
        list.innerHTML = comments
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map(comment => {
                const author = applySpecialUserProperties({ username: comment.username });
                return `
                <div class="comment-item">
                    <img src="${comment.avatar || DEFAULT_AVATAR}" alt="${comment.username}" class="comment-avatar">
                    <div class="comment-content">
                        <span class="comment-author ${author.usernameClass || ''}">${comment.username}</span>
                        <p class="comment-text">${comment.text}</p>
                    </div>
                </div>
            `}).join('');
    }
    
    function toggleFavorite() {
        if (!currentUser || !currentQuote || !currentQuote.quote) return;
        const index = currentUser.favorites.findIndex(f => f.quote === currentQuote.quote);
        if (index > -1) { 
            currentUser.favorites.splice(index, 1); 
        } else { 
            currentUser.favorites.push({...currentQuote, favoritedAt: new Date().toISOString() }); 
        }
        saveCurrentUser();
        updateFavoriteButtonUI();
    }

    function updateFavoriteButtonUI() {
        const favBtn = document.getElementById('favorite-quote-btn');
        if (!favBtn || !currentUser || !currentQuote || !currentQuote.quote) return;
        const isFav = currentUser.favorites.some(f => f.quote === currentQuote.quote);
        favBtn.classList.toggle('is-favorite', isFav);
    }

    function renderFavorites(limit = Infinity) {
        const container = document.getElementById('favorites-container');
        const noFavsMsg = document.getElementById('no-favorites-message');
        if (!container || !currentUser) return;
        container.innerHTML = '';
        const favoritesToRender = currentUser.favorites.slice().reverse().slice(0, limit);
        if (favoritesToRender.length === 0) {
            if (noFavsMsg) {
                const lang = currentUser.lang || 'ru';
                noFavsMsg.innerHTML = `<p>${translations[lang].noFavoritesMsg1}</p><p>${translations[lang].noFavoritesMsg2}</p>`;
                noFavsMsg.classList.remove('hidden');
            }
            return;
        }
        if (noFavsMsg) noFavsMsg.classList.add('hidden');
        favoritesToRender.forEach((fav) => {
            const originalIndex = currentUser.favorites.findIndex(item => item.quote === fav.quote);
            const card = document.createElement('div');
            card.className = 'favorite-card glass-card p-4 relative';
            card.innerHTML = `<blockquote class="text-lg mb-4">"${fav.quote}"</blockquote><footer class="text-right font-bold" style="color: var(--accent-brass);">— ${fav.author}</footer><button class="remove-fav-btn absolute top-3 right-3 text-slate-400 hover:text-red-400" data-index="${originalIndex}"><i data-lucide="trash-2" class="w-4 h-4"></i></button>`;
            container.appendChild(card);
        });
        container.querySelectorAll('.remove-fav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const indexToRemove = parseInt(e.currentTarget.dataset.index, 10);
                currentUser.favorites.splice(indexToRemove, 1);
                saveCurrentUser();
                renderFavorites(limit);
            });
        });
        add3DTiltEffect();
        initializeIcons();
    }
    
    function handleFriendAction(targetUsername) {
        if (!currentUser || targetUsername === currentUser.username) return;

        const usersDB = getUsersDB();
        const targetUser = usersDB[targetUsername];
        if (!targetUser) return;

        const isFriend = currentUser.friends.includes(targetUsername);
        const requestSent = currentUser.friendRequestsSent.includes(targetUsername);
        
        if (isFriend) {
            currentUser.friends = currentUser.friends.filter(f => f !== targetUsername);
            targetUser.friends = targetUser.friends.filter(f => f !== currentUser.username);
        } else if (requestSent) {
            currentUser.friendRequestsSent = currentUser.friendRequestsSent.filter(u => u !== targetUsername);
            targetUser.friendRequestsReceived = targetUser.friendRequestsReceived.filter(u => u !== currentUser.username);
        } else {
            currentUser.friendRequestsSent.push(targetUsername);
            if(!targetUser.friendRequestsReceived) targetUser.friendRequestsReceived = [];
            targetUser.friendRequestsReceived.push(currentUser.username);
        }
        
        usersDB[targetUsername] = targetUser;
        saveUsersDB(usersDB);
        saveCurrentUser();

        if (window.location.pathname.includes('leaderboard.html')) {
            renderQuoteLeaderboard();
        } else if (window.location.pathname.includes('profile.html')) {
            renderUserProfile();
        }
    }
    
    function attachFriendActionListeners(container) {
         container.querySelectorAll('.friend-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                handleFriendAction(e.currentTarget.dataset.username);
            });
        });
    }

    function getFriendButtonHTML(targetUsername) {
        if (!currentUser || currentUser.username === targetUsername) return '';

        const lang = currentUser.lang || 'ru';
        const isFriend = currentUser.friends.includes(targetUsername);
        const requestSent = currentUser.friendRequestsSent.includes(targetUsername);
        const requestReceived = currentUser.friendRequestsReceived.includes(targetUsername);

        if (isFriend) {
            return `<button class="friend-action-btn unfriend" data-username="${targetUsername}" title="${translations[lang].unfriend}"><i data-lucide="user-x" class="w-5 h-5"></i></button>`;
        } else if (requestSent) {
            return `<button class="friend-action-btn pending" data-username="${targetUsername}" title="${translations[lang].requestSent}"><i data-lucide="hourglass" class="w-5 h-5"></i></button>`;
        } else if (requestReceived) {
            return `<a href="account.html#requests" class="friend-action-btn" title="${translations[lang].accept}"><i data-lucide="user-plus" class="w-5 h-5 text-amber-400"></i></a>`;
        } else {
            return `<button class="friend-action-btn" data-username="${targetUsername}" title="${translations[lang].addFriend}"><i data-lucide="user-plus" class="w-5 h-5"></i></button>`;
        }
    }


    function renderQuoteLeaderboard() {
        const container = document.getElementById('quote-leaderboard');
        if (!container) return;
        const usersDB = getUsersDB();
        const lang = currentUser?.lang || 'ru';
        
        const sortedUsers = Object.entries(usersDB)
            .map(([username, data]) => {
                let user = { username, ...data };
                return applySpecialUserProperties(user);
            })
            .sort((a, b) => (b.quotesViewed || 0) - (a.quotesViewed || 0))
            .slice(0, 100);

        container.innerHTML = sortedUsers.map((user, index) => `
            <div class="leaderboard-item rank-${index + 1}">
                <span class="leaderboard-rank">#${index + 1}</span>
                <a href="profile.html?user=${user.username}" class="flex items-center gap-3 flex-grow">
                    <img src="${user.avatar || DEFAULT_AVATAR}" class="leaderboard-avatar">
                    <div class="leaderboard-info">
                        <div class="leaderboard-name ${user.usernameClass || ''}">${user.username}</div>
                        <p class="leaderboard-bio">${user.bio || translations[lang].noBio}</p>
                    </div>
                </a>
                <div class="leaderboard-actions">
                    ${getFriendButtonHTML(user.username)}
                </div>
                <span class="leaderboard-score">${user.quotesViewed || 0}</span>
            </div>`
        ).join('');
        
        attachFriendActionListeners(container);
        initializeIcons();
    }

    function renderLiveLeaderboard() {
        const container = document.getElementById('live-leaderboard');
        if (!container) return;
        const usersDB = getUsersDB();
        const allUsernames = Object.keys(usersDB);
        const lang = currentUser?.lang || 'ru';

        if (allUsernames.length === 0) { 
            container.innerHTML = `<p class="text-slate-400">${translations[lang].noUsersOnline}</p>`; 
            return; 
        }
        const onlineCount = Math.min(allUsernames.length, Math.floor(Math.random() * 8) + 3);
        const onlineUsers = allUsernames.sort(() => 0.5 - Math.random()).slice(0, onlineCount);
        container.innerHTML = onlineUsers.map(username => { 
            let user = usersDB[username]; 
            user = applySpecialUserProperties({username, ...user});
            return `<div class="leaderboard-item"><img src="${user.avatar || DEFAULT_AVATAR}" class="leaderboard-avatar w-10 h-10"><div class="leaderboard-info"><div class="leaderboard-name ${user.usernameClass || ''}">${username}</div><p class="leaderboard-bio text-green-400 text-xs">${translations[lang].userReading}</p></div></div>`; 
        }).join('');
    }

    function generateAISpark() {
        const lang = currentUser?.lang || 'ru';
        const templatesByLang = sparkTemplates[lang];
        const categories = Object.keys(templatesByLang);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const templates = templatesByLang[randomCategory];
        const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
        return { text: randomTemplate, category: randomCategory, title: translations[lang].aiSparkTitles[randomCategory] };
    }

    function displayDailySpark() {
        const sparkSection = document.getElementById('daily-spark-section');
        if (!sparkSection) return;
        if (!currentUser) { sparkSection.classList.add('hidden'); return; }

        const sparkChallenge = document.getElementById('spark-challenge');
        const sparkTitle = sparkSection.querySelector('h2');
        const sparkDoneBtn = document.getElementById('spark-done-btn');
        const today = new Date().toISOString().split('T')[0];

        if (currentUser.lastSparkDate === today) { sparkSection.classList.add('hidden'); return; }
        
        sparkSection.classList.remove('hidden');
        const spark = generateAISpark();
        if (sparkTitle) sparkTitle.innerHTML = `<i data-lucide="sparkles" class="w-6 h-6"></i> <span>${spark.title}</span>`;
        if (sparkChallenge) sparkChallenge.textContent = spark.text;
        if (sparkDoneBtn) {
            sparkDoneBtn.disabled = false;
            sparkDoneBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
        lucide.createIcons();
    }

    function handleSparkCompletion() {
        if (!currentUser) return;
        const today = new Date().toISOString().split('T')[0];
        currentUser.lastSparkDate = today;
        saveCurrentUser();
        const sparkDoneBtn = document.getElementById('spark-done-btn');
        if (sparkDoneBtn) {
            sparkDoneBtn.disabled = true;
            sparkDoneBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
        showLiveFeedNotification();
    }

    function showLiveFeedNotification() {
        const liveFeedContainer = document.getElementById('live-feed');
        if (!liveFeedContainer || !currentUser) return;
        const lang = currentUser.lang || 'ru';
        const completionText = translations[lang].sparkCompleted;
        const item = document.createElement('div');
        item.className = 'live-feed-item';
        item.innerHTML = `<img src="${currentUser.avatar || DEFAULT_AVATAR}" alt="avatar"><p><strong class="font-bold ${currentUser.usernameClass || ''}">${currentUser.username}</strong> ${completionText}</p><i data-lucide="sparkles" class="spark-icon"></i>`;
        liveFeedContainer.prepend(item);
        lucide.createIcons();
        setTimeout(() => { item.remove(); }, 5000);
    }
    
    function add3DTiltEffect() {
        document.querySelectorAll('.glass-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; const y = e.clientY - rect.top;
                const { width, height } = rect;
                const rotateX = (y / height - 0.5) * -15;
                const rotateY = (x / width - 0.5) * 15;
                card.style.setProperty('--rotateX', `${rotateX}deg`);
                card.style.setProperty('--rotateY', `${rotateY}deg`);
                card.style.setProperty('--x', `${x}px`);
                card.style.setProperty('--y', `${y}px`);
            });
            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--rotateX', '0deg');
                card.style.setProperty('--rotateY', '0deg');
            });
        });
    }

    function renderFriendRequests() {
        const container = document.getElementById('friend-requests-container');
        if (!container || !currentUser) return;
        
        const lang = currentUser.lang || 'ru';
        const usersDB = getUsersDB();
        
        if (currentUser.friendRequestsReceived.length === 0) {
            container.innerHTML = `<p class="text-slate-400">${translations[lang].noFriendRequests}</p>`;
            return;
        }

        if (!sessionStorage.getItem('friendRequestNotified')) {
            playNotificationSound();
            sessionStorage.setItem('friendRequestNotified', 'true');
        }

        container.innerHTML = currentUser.friendRequestsReceived.map(username => {
            const requester = usersDB[username];
            return `
                <div class="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/50">
                    <div class="flex items-center gap-3">
                        <img src="${requester?.avatar || DEFAULT_AVATAR}" class="w-10 h-10 rounded-full object-cover">
                        <span>${username}</span>
                    </div>
                    <div class="flex gap-2">
                        <button class="accept-request-btn p-2 hover:bg-slate-700 rounded-full" data-username="${username}" title="${translations[lang].accept}"><i data-lucide="check" class="w-5 h-5 text-green-400 pointer-events-none"></i></button>
                        <button class="decline-request-btn p-2 hover:bg-slate-700 rounded-full" data-username="${username}" title="${translations[lang].decline}"><i data-lucide="x" class="w-5 h-5 text-red-400 pointer-events-none"></i></button>
                    </div>
                </div>
            `;
        }).join('');

        container.querySelectorAll('.accept-request-btn').forEach(btn => {
            btn.addEventListener('click', (e) => acceptFriendRequest(e.currentTarget.dataset.username));
        });
        container.querySelectorAll('.decline-request-btn').forEach(btn => {
            btn.addEventListener('click', (e) => declineFriendRequest(e.currentTarget.dataset.username));
        });
        initializeIcons();
    }

    function acceptFriendRequest(requesterUsername) {
        const usersDB = getUsersDB();
        const requester = usersDB[requesterUsername];
        if (!requester || !currentUser) return;

        currentUser.friends.push(requesterUsername);
        requester.friends.push(currentUser.username);

        currentUser.friendRequestsReceived = currentUser.friendRequestsReceived.filter(u => u !== requesterUsername);
        requester.friendRequestsSent = requester.friendRequestsSent.filter(u => u !== currentUser.username);

        usersDB[requesterUsername] = requester;
        saveUsersDB(usersDB);
        saveCurrentUser();
        renderFriendRequests();
        updateNotificationCounts();
    }

    function declineFriendRequest(requesterUsername) {
        const usersDB = getUsersDB();
        const requester = usersDB[requesterUsername];
        if (!requester || !currentUser) return;

        currentUser.friendRequestsReceived = currentUser.friendRequestsReceived.filter(u => u !== requesterUsername);
        requester.friendRequestsSent = requester.friendRequestsSent.filter(u => u !== currentUser.username);

        usersDB[requesterUsername] = requester;
        saveUsersDB(usersDB);
        saveCurrentUser();
        renderFriendRequests();
        updateNotificationCounts();
    }
    
    function renderMessagesTab() {
        const container = document.getElementById('messages-container');
        if (!container || !currentUser) return;
        
        const lang = currentUser.lang || 'ru';
        const usersDB = getUsersDB();
        if (currentUser.friends.length === 0) {
            container.innerHTML = `<p class="text-slate-400">${translations[lang].noFriendsToChat}</p>`;
            return;
        }

        const friendListHTML = currentUser.friends.map(friendUsername => {
            const friendData = usersDB[friendUsername];
            const friend = applySpecialUserProperties({username: friendUsername, ...friendData});
            return `
                <div class="friend-chat-item p-3 flex items-center gap-4 rounded-lg cursor-pointer hover:bg-slate-800/50" data-username="${friendUsername}">
                    <img src="${friend?.avatar || DEFAULT_AVATAR}" class="w-12 h-12 rounded-full object-cover">
                    <span class="font-bold text-lg ${friend.usernameClass || ''}">${friendUsername}</span>
                </div>
            `;
        }).join('');
        
        container.innerHTML = `<h2 class="text-2xl font-bold mb-4" data-key="messagesHeader">${translations[lang].messagesHeader}</h2><div class="space-y-2">${friendListHTML}</div>`;

        container.querySelectorAll('.friend-chat-item').forEach(item => {
            item.addEventListener('click', (e) => renderChatView(e.currentTarget.dataset.username));
        });
    }

    function renderChatView(friendUsername) {
        const container = document.getElementById('messages-container');
        if (!container || !currentUser) return;

        const lang = currentUser.lang || 'ru';
        const usersDB = getUsersDB();
        const friendData = usersDB[friendUsername];
        const friend = applySpecialUserProperties({username: friendUsername, ...friendData});

        container.innerHTML = `
            <div class="flex items-center gap-4 mb-4 border-b border-slate-700 pb-3">
                 <button id="back-to-chats-btn" class="p-2 hover:bg-slate-700 rounded-full"><i data-lucide="arrow-left"></i></button>
                 <img src="${friend?.avatar || DEFAULT_AVATAR}" class="w-10 h-10 rounded-full object-cover">
                 <h2 class="text-xl font-bold">${translations[lang].chatWith} <span class="${friend.usernameClass || ''}">${friendUsername}</span></h2>
            </div>
            <div id="chat-messages" class="h-[60vh] md:h-[45vh] overflow-y-auto pr-2 mb-4"></div>
            <form id="chat-form" class="flex gap-2">
                <input type="text" id="chat-input" placeholder="${translations[lang].typeMessagePlaceholder}" class="premium-input flex-grow" required>
                <button type="submit" class="premium-button !p-3 flex-shrink-0"><i data-lucide="send" class="w-5 h-5"></i></button>
            </form>
        `;

        document.getElementById('back-to-chats-btn').addEventListener('click', renderMessagesTab);
        document.getElementById('chat-form').addEventListener('submit', (e) => {
            e.preventDefault();
            sendMessage(friendUsername);
        });
        
        loadAndRenderConversation(friendUsername);
        initializeIcons();
    }
    
    function getConversationKey(user1, user2) {
        return [user1, user2].sort().join('-');
    }

    function loadAndRenderConversation(friendUsername) {
        const chatBox = document.getElementById('chat-messages');
        if (!chatBox) return;

        const key = getConversationKey(currentUser.username, friendUsername);
        const messagesDB = getMessagesDB();
        const usersDB = getUsersDB();
        const conversation = messagesDB[key] || [];

        let changed = false;
        conversation.forEach(msg => {
            if(msg.receiver === currentUser.username && !msg.read) {
                msg.read = true;
                changed = true;
            }
        });

        if(changed) {
            messagesDB[key] = conversation;
            saveMessagesDB(messagesDB);
            updateNotificationCounts();
            if (!sessionStorage.getItem('messageNotified')) {
                playNotificationSound();
                sessionStorage.setItem('messageNotified', 'true');
            }
        }
        
        chatBox.innerHTML = conversation.map((msg, index) => {
            const senderData = usersDB[msg.sender];
            const sender = applySpecialUserProperties({username: msg.sender, ...senderData});
            const isMe = msg.sender === currentUser.username;
            
            const readReceipt = isMe ? `<span class="read-receipt ${msg.read ? 'is-read' : ''}"><i data-lucide="${msg.read ? 'check-check' : 'check'}"></i></span>` : '';
            
            const reactionsHTML = Object.entries(msg.reactions || {}).map(([emoji, users]) => {
                if (users.length === 0) return '';
                const amIReacted = users.includes(currentUser.username);
                return `<div class="reaction-chip ${amIReacted ? 'reacted-by-me' : ''}"><span>${emoji}</span><span>${users.length}</span></div>`;
            }).join('');

            return `
                <div class="chat-message-container ${isMe ? 'sent' : 'received'}" style="animation-delay: ${index * 80}ms" data-timestamp="${msg.timestamp}">
                    <div class="chat-message-inner">
                        ${!isMe ? `<img src="${sender?.avatar || DEFAULT_AVATAR}" alt="${msg.sender}" class="chat-avatar">` : ''}
                        <div class="message-content">
                            ${!isMe ? `<span class="message-author-name ${sender.usernameClass || ''}">${msg.sender}</span>` : ''}
                            <div class="message-bubble">
                                <p>${msg.text}</p>
                            </div>
                            <div class="message-meta">
                                <span class="chat-timestamp">${new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                ${readReceipt}
                            </div>
                        </div>
                        ${!isMe ? `
                            <div class="message-react-button">
                                <i data-lucide="smile-plus" class="w-4 h-4 text-slate-400"></i>
                                <div class="emoji-picker">
                                    <span data-emoji="❤️">❤️</span>
                                    <span data-emoji="😂">😂</span>
                                    <span data-emoji="👍">👍</span>
                                    <span data-emoji="🔥">🔥</span>
                                </div>
                            </div>
                        `: ''}
                    </div>
                     ${reactionsHTML ? `<div class="message-reactions-container">${reactionsHTML}</div>` : ''}
                </div>
            `;
        }).join('');
        
        chatBox.scrollTop = chatBox.scrollHeight;
        attachMessageReactionListeners(friendUsername);
        initializeIcons();
    }
    
    function attachMessageReactionListeners(friendUsername) {
        const chatBox = document.getElementById('chat-messages');
        const key = getConversationKey(currentUser.username, friendUsername);

        chatBox.querySelectorAll('.message-react-button').forEach(button => {
            const messageContainer = button.closest('.chat-message-container');
            if(!messageContainer) return;
            
            const picker = button.querySelector('.emoji-picker');
            
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelectorAll('.emoji-picker.visible').forEach(p => {
                    if (p !== picker) p.classList.remove('visible');
                });
                picker.classList.toggle('visible');
            });
            
            picker.querySelectorAll('[data-emoji]').forEach(emojiSpan => {
                emojiSpan.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const emoji = e.currentTarget.dataset.emoji;
                    const msgTimestamp = messageContainer.dataset.timestamp;
                    if(msgTimestamp) {
                        handleMessageReaction(key, msgTimestamp, emoji, friendUsername);
                    }
                });
            });
        });

        document.body.addEventListener('click', () => {
             document.querySelectorAll('.emoji-picker.visible').forEach(p => p.classList.remove('visible'));
        }, true);
    }
    
    function handleMessageReaction(key, timestamp, emoji, friendUsername) {
        const messagesDB = getMessagesDB();
        const conversation = messagesDB[key];
        const message = conversation.find(m => m.timestamp === timestamp);

        if (message) {
            if (!message.reactions) message.reactions = {};
            if (!message.reactions[emoji]) message.reactions[emoji] = [];
            
            const userIndex = message.reactions[emoji].indexOf(currentUser.username);
            if (userIndex > -1) {
                message.reactions[emoji].splice(userIndex, 1);
            } else {
                 Object.values(message.reactions).forEach(users => {
                    const idx = users.indexOf(currentUser.username);
                    if (idx > -1) users.splice(idx, 1);
                });
                message.reactions[emoji].push(currentUser.username);
            }
            saveMessagesDB(messagesDB);
            loadAndRenderConversation(friendUsername);
        }
    }


    function sendMessage(receiver) {
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        if (!text) return;

        const message = {
            sender: currentUser.username,
            receiver: receiver,
            text: text,
            timestamp: new Date().toISOString(),
            read: false,
            reactions: {}
        };

        const key = getConversationKey(currentUser.username, receiver);
        const messagesDB = getMessagesDB();
        if (!messagesDB[key]) {
            messagesDB[key] = [];
        }
        messagesDB[key].push(message);
        saveMessagesDB(messagesDB);

        input.value = '';
        loadAndRenderConversation(receiver);
    }
    
    function renderUserProfile() {
        const urlParams = new URLSearchParams(window.location.search);
        const username = urlParams.get('user');
        const lang = currentUser?.lang || 'ru';
        
        if (!username) {
            document.body.innerHTML = '<h1>User not found.</h1>';
            return;
        }

        const usersDB = getUsersDB();
        let user = usersDB[username];
        const profileContainer = document.getElementById('profile-container');
        const loadingContainer = document.getElementById('loading-profile');
        
        if (!user) {
            loadingContainer.innerHTML = '<h1>User not found.</h1>';
            return;
        }

        user = applySpecialUserProperties({username, ...user});
        
        document.title = `${username}'s Profile - Make Your Day`;
        document.getElementById('profile-avatar').src = user.avatar || DEFAULT_AVATAR;
        const usernameEl = document.getElementById('profile-username');
        usernameEl.textContent = username;
        usernameEl.className = `text-3xl font-bold ${user.usernameClass || ''}`;

        document.getElementById('profile-bio').textContent = user.bio || translations[lang].noBio;
        document.getElementById('profile-quotes-viewed').textContent = user.quotesViewed || 0;
        document.getElementById('profile-friends-count').textContent = user.friends?.length || 0;

        const actionsContainer = document.getElementById('profile-actions');
        if (currentUser) {
            actionsContainer.innerHTML = `
                ${getFriendButtonHTML(username)}
                ${currentUser.friends.includes(username) ? `<button id="send-message-btn" class="message-btn p-2 hover:bg-slate-700 rounded-full" data-username="${username}" title="${translations[lang].sendMessage}"><i data-lucide="message-circle" class="w-5 h-5 pointer-events-none"></i></button>` : ''}
            `;
            attachFriendActionListeners(actionsContainer);

            const sendMessageBtn = document.getElementById('send-message-btn');
            if (sendMessageBtn) {
                sendMessageBtn.addEventListener('click', (e) => {
                    const targetUser = e.currentTarget.dataset.username;
                    localStorage.setItem('openChatWith', targetUser);
                    window.location.href = 'account.html#messages';
                });
            }
        }
        
        const friendsListContainer = document.getElementById('profile-friends-list');
        if (user.friends && user.friends.length > 0) {
            friendsListContainer.innerHTML = user.friends.map(friendName => {
                const friendData = usersDB[friendName];
                const friend = applySpecialUserProperties({username: friendName, ...friendData});
                return `
                <a href="profile.html?user=${friendName}" class="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/50">
                    <img src="${friend?.avatar || DEFAULT_AVATAR}" class="w-10 h-10 rounded-full object-cover">
                    <span class="${friend.usernameClass || ''}">${friendName}</span>
                </a>
                `;
            }).join('');
        } else {
            friendsListContainer.innerHTML = `<p class="text-slate-400 col-span-full">${translations[lang].noFriendsYet}</p>`;
        }

        loadingContainer.classList.add('hidden');
        profileContainer.classList.remove('hidden');
        initializeIcons();
    }
    
    function seedInitialUsers() {
        const usersDB = getUsersDB();
        const initialUsers = {
            'Andranik': { password: 'andranik12', plan: 'vip' },
            'MakeYourDay': { password: 'makeyourday', plan: 'vip' }
        };

        let dbChanged = false;
        Object.keys(initialUsers).forEach(username => {
            if (!usersDB[username]) {
                usersDB[username] = {
                    password: initialUsers[username].password,
                    plan: initialUsers[username].plan,
                    lang: 'ru',
                    favorites: [],
                    theme: 'default',
                    avatar: DEFAULT_AVATAR,
                    bio: `This is the special account for ${username}.`,
                    quotesViewed: 0,
                    usage: { date: new Date().toISOString().split('T')[0], count: 0 },
                    createdAt: new Date().toISOString(),
                    lastSparkDate: null,
                    friends: [],
                    friendRequestsSent: [],
                    friendRequestsReceived: []
                };
                dbChanged = true;
            }
        });
        if (dbChanged) {
            saveUsersDB(usersDB);
        }
    }

    function init() {
        seedInitialUsers();
        currentUser = getCurrentUser();
        window.currentUser = currentUser;
        window.translations = translations;
        
        const userLang = currentUser?.lang || (navigator.language || 'ru').split('-')[0];
        
        renderHeader();
        setLanguage(userLang);
        applyTheme(currentUser?.theme || 'default');
        
        const savedUsedQuotes = localStorage.getItem('makeYourDayUsedQuotes');
        if (savedUsedQuotes) usedQuotes = new Set(JSON.parse(savedUsedQuotes));

        const pagePath = window.location.pathname;
        setupGlobalMusic();

        if (pagePath.includes('index.html') || pagePath.endsWith('/')) {
            document.getElementById('new-quote-btn')?.addEventListener('click', displayNewQuote);
            document.getElementById('spark-done-btn')?.addEventListener('click', handleSparkCompletion);
            displayDailySpark();
            
            if (currentUser) {
                document.getElementById('quote-actions-container')?.classList.remove('hidden');
                document.getElementById('favorite-quote-btn')?.classList.remove('hidden');
                document.getElementById('favorite-quote-btn')?.addEventListener('click', toggleFavorite);
                if (['premium', 'vip', 'developer', 'makeyourdayofficial'].includes(currentUser.plan.toLowerCase())) {
                    document.getElementById('download-quote-btn')?.classList.remove('hidden');
                }
                document.querySelectorAll('.reaction-btn').forEach(btn => btn.addEventListener('click', handleReaction));
                document.getElementById('comment-form')?.addEventListener('submit', handleCommentSubmit);
            }
            updateButtonState();
        }

        if (pagePath.includes('account.html')) {
            if (!currentUser) { window.location.href = 'auth.html?mode=login'; return; }
            document.getElementById('user-nickname').textContent = currentUser.username;
            document.getElementById('user-plan').textContent = currentUser.plan;
            const avatarImg = document.getElementById('profile-avatar');
            const bioText = document.getElementById('user-bio');
            avatarImg.src = currentUser.avatar || DEFAULT_AVATAR;
            bioText.value = currentUser.bio;

            document.getElementById('quotes-viewed-stat').textContent = currentUser.quotesViewed || 0;
            const nicknameEl = document.getElementById('user-nickname');
            nicknameEl.className = `font-light ${currentUser.usernameClass || ''}`;
            const planEl = document.getElementById('user-plan');
            planEl.className = `font-light uppercase ${currentUser.planClass || ''}`;


            document.getElementById('avatar-upload').addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => { avatarImg.src = event.target.result; };
                    reader.readAsDataURL(file);
                }
            });
            document.getElementById('save-profile-btn').addEventListener('click', () => {
                currentUser.avatar = avatarImg.src;
                currentUser.bio = bioText.value;
                saveCurrentUser();
                alert('Profile saved!');
                renderHeader();
            });
            renderFavorites(4);

            const tabs = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    tabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    tabContents.forEach(c => c.classList.add('hidden'));
                    document.getElementById(`tab-content-${tab.dataset.tab}`).classList.remove('hidden');
                    window.location.hash = tab.dataset.tab;
                });
            });

            const currentTab = window.location.hash.substring(1);
            if (currentTab) {
                const tabToActivate = document.querySelector(`.tab-btn[data-tab="${currentTab}"]`);
                if (tabToActivate) tabToActivate.click();
            }

            renderFriendRequests();
            renderMessagesTab();
            updateNotificationCounts();

            const openChatUser = localStorage.getItem('openChatWith');
            if (openChatUser) {
                localStorage.removeItem('openChatWith');
                document.querySelector('.tab-btn[data-tab="messages"]').click();
                renderChatView(openChatUser);
            }
        }
        
        if (pagePath.includes('subscribe.html')) {
             if (!currentUser) { window.location.href = 'auth.html?mode=login'; return; }
             document.querySelectorAll('.subscribe-btn').forEach(button => {
                const plan = button.dataset.plan;
                if (plan === currentUser.plan.toLowerCase()) {
                    const card = document.getElementById(`plan-${plan}`);
                    card.classList.add('plan-highlight-border');
                    button.disabled = true;
                    button.classList.add('opacity-60', 'cursor-not-allowed');
                }
                button.addEventListener('click', () => handleSubscription(plan));
             });
        }

        if (pagePath.includes('favorites.html')) {
            if (!currentUser) { window.location.href = 'auth.html?mode=login'; return; }
            renderFavorites();
        }

        if (pagePath.includes('leaderboard.html')) {
            if (!currentUser) { window.location.href = 'auth.html?mode=login'; return; }
            renderQuoteLeaderboard();
            renderLiveLeaderboard();
            setInterval(renderLiveLeaderboard, 7000);
        }

        if (pagePath.includes('profile.html')) {
            if (!currentUser) { window.location.href = 'auth.html?mode=login'; return; }
            renderUserProfile();
        }

        if (pagePath.includes('auth.html')) {
            const urlParams = new URLSearchParams(window.location.search);
            const mode = urlParams.get('mode') || 'register';
            
            const keyMap = {
                login: { title: 'authTitleLogin', subtitle: 'authSubtitleLogin', submit: 'authSubmitLogin', toggle: 'authToggleToRegister' },
                register: { title: 'authTitleRegister', subtitle: 'authSubtitleRegister', submit: 'authSubmitRegister', toggle: 'authToggleToLogin' }
            };
            const keys = keyMap[mode];
            document.querySelector('title').textContent = translations[userLang][keys.title] + ' - Make Your Day';
            document.getElementById('form-title').dataset.key = keys.title;
            document.getElementById('form-subtitle').dataset.key = keys.subtitle;
            document.getElementById('submit-btn').dataset.key = keys.submit;
            document.getElementById('toggle-mode').dataset.key = keys.toggle;
            document.querySelector('label[for="nickname"]').dataset.key = 'authNicknameLabel';
            document.querySelector('label[for="password"]').dataset.key = 'authPasswordLabel';
            setLanguage(userLang);

            document.getElementById('auth-form').addEventListener('submit', (e) => {
                e.preventDefault();
                const nickname = document.getElementById('nickname').value.trim();
                const password = document.getElementById('password').value;
                const errorMessage = document.getElementById('error-message');
                
                if (!nickname || !password) {
                    errorMessage.textContent = 'Please fill in all fields.';
                    return;
                }

                const usersDB = getUsersDB();

                if (mode === 'register') {
                    if (usersDB[nickname]) {
                        errorMessage.textContent = 'Username already taken.';
                    } else {
                        usersDB[nickname] = {
                            password: password,
                            plan: 'free',
                            lang: 'ru',
                            favorites: [],
                            theme: 'default',
                            avatar: DEFAULT_AVATAR, // Assign default avatar here
                            bio: '',
                            quotesViewed: 0,
                            usage: { date: new Date().toISOString().split('T')[0], count: 0 },
                            createdAt: new Date().toISOString(),
                            lastSparkDate: null,
                            friends: [],
                            friendRequestsSent: [],
                            friendRequestsReceived: []
                        };
                        saveUsersDB(usersDB);
                        localStorage.setItem('makeYourDayCurrentUser', nickname);
                        window.location.href = 'index.html';
                    }
                } else {
                    if (usersDB[nickname] && usersDB[nickname].password === password) {
                        localStorage.setItem('makeYourDayCurrentUser', nickname);
                        window.location.href = 'index.html';
                    } else {
                        errorMessage.textContent = 'Invalid nickname or password.';
                    }
                }
            });
        }
        
        initializeIcons();
        add3DTiltEffect();

        window.addEventListener('beforeunload', () => {
            localStorage.setItem('makeYourDayUsedQuotes', JSON.stringify([...usedQuotes]));
            if (musicState.playing) {
                const audio = document.getElementById('lofi-audio');
                if (audio) musicState.currentTime = audio.currentTime;
            }
            localStorage.setItem('makeYourDayMusicState', JSON.stringify(musicState));
        });
    }

    init();
});
