export const LOCALES = ["en", "ru", "de", "ge"] as const;

export type Locale = (typeof LOCALES)[number];

export const localeIntlCodes: Record<Locale, string> = {
  en: "en-US",
  ru: "ru-RU",
  de: "de-DE",
  ge: "ka-GE",
};

export const localeNames: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  de: "Deutsch",
  ge: "ქართული",
};

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  de: "DE",
  ge: "GE",
};

export const navigationCopy: Record<
  Locale,
  {
    work: string;
    games: string;
    tooling: string;
    experience: string;
    notes: string;
    contact: string;
    hireMe: string;
    cv: string;
    menu: string;
    options: string;
    drawerLabel: string;
    primaryLabel: string;
    languagesLabel: string;
    preferences: string;
    sound: string;
    effects: string;
    effectsSystem: string;
    effectsReduced: string;
    skipToContent: string;
    status: string;
  }
> = {
  en: {
    work: "Work",
    games: "Games",
    tooling: "Tooling",
    experience: "Experience",
    notes: "Notes",
    contact: "Contact",
    hireMe: "Hire me",
    cv: "CV",
    menu: "Menu",
    options: "Options",
    drawerLabel: "Navigation and options",
    primaryLabel: "Primary navigation",
    languagesLabel: "Languages",
    preferences: "Interface options",
    sound: "Interface sound",
    effects: "Visual effects",
    effectsSystem: "Follow system",
    effectsReduced: "Reduced",
    skipToContent: "Skip to content",
    status: "ONLINE",
  },
  ru: {
    work: "Работы",
    games: "Игры",
    tooling: "Инструменты",
    experience: "Опыт",
    notes: "Записи",
    contact: "Контакт",
    hireMe: "Нанять меня",
    cv: "Резюме",
    menu: "Меню",
    options: "Настройки",
    drawerLabel: "Навигация и настройки",
    primaryLabel: "Основная навигация",
    languagesLabel: "Языки",
    preferences: "Настройки интерфейса",
    sound: "Звук интерфейса",
    effects: "Визуальные эффекты",
    effectsSystem: "Как в системе",
    effectsReduced: "Минимальные",
    skipToContent: "Перейти к содержимому",
    status: "В СЕТИ",
  },
  de: {
    work: "Arbeit",
    games: "Spiele",
    tooling: "Werkzeuge",
    experience: "Erfahrung",
    notes: "Notizen",
    contact: "Kontakt",
    hireMe: "Anfragen",
    cv: "CV",
    menu: "Menü",
    options: "Optionen",
    drawerLabel: "Navigation und Optionen",
    primaryLabel: "Hauptnavigation",
    languagesLabel: "Sprachen",
    preferences: "Oberflächenoptionen",
    sound: "Oberflächenton",
    effects: "Visuelle Effekte",
    effectsSystem: "Systemeinstellung",
    effectsReduced: "Reduziert",
    skipToContent: "Zum Inhalt springen",
    status: "ONLINE",
  },
  ge: {
    work: "ნამუშევრები",
    games: "თამაშები",
    tooling: "ინსტრუმენტები",
    experience: "გამოცდილება",
    notes: "ჩანაწერები",
    contact: "კონტაქტი",
    hireMe: "დამიქირავეთ",
    cv: "CV",
    menu: "მენიუ",
    options: "პარამეტრები",
    drawerLabel: "ნავიგაცია და პარამეტრები",
    primaryLabel: "მთავარი ნავიგაცია",
    languagesLabel: "ენები",
    preferences: "ინტერფეისის პარამეტრები",
    sound: "ინტერფეისის ხმა",
    effects: "ვიზუალური ეფექტები",
    effectsSystem: "სისტემის მიხედვით",
    effectsReduced: "შემცირებული",
    skipToContent: "შინაარსზე გადასვლა",
    status: "ონლაინ",
  },
};

export const localeSeo: Record<
  Locale,
  {
    title: string;
    description: string;
    heroTitle: string;
    heroBody: string;
    nav: {
      overview: string;
      work: string;
      experience: string;
      games: string;
      cv: string;
      blog: string;
      contact: string;
    };
    cta: {
      work: string;
      blog: string;
      cv: string;
      contact: string;
      play: string;
    };
    sections: {
      work: string;
      experience: string;
      games: string;
      cv: string;
      blog: string;
      contact: string;
    };
    sectionKickers: {
      work: string;
      experience: string;
      games: string;
      cv: string;
      blog: string;
      contact: string;
    };
    sectionBodies: {
      work: string;
      experience: string;
      games: string;
      cv: string;
      blog: string;
      contact: string;
    };
    labels: {
      basedIn: string;
      studioMode: string;
      availableFor: string;
      archiveOpen: string;
      cvOpen: string;
      cvDownload: string;
      cvBody: string;
      currentFocus: string;
      currentFocusBody: string;
      contactBody: string;
      blogBody: string;
      blogLanguage: string;
      blogCount: string;
      blogBack: string;
      prevPost: string;
      nextPost: string;
      notFoundTitle: string;
      notFoundBody: string;
      returnHome: string;
      archiveClose: string;
      githubLabel: string;
      linkedinLabel: string;
      openSourceKicker: string;
      openSourceTitle: string;
      openSourceBody: string;
      openSourceProduct: string;
      openSourceCode: string;
    };
  }
> = {
  en: {
    title: "Mouchsiadis Solutions",
    description:
      "Suren Mouchsiadis is a senior systems builder creating production platforms, operational tools, and independent software.",
    heroTitle: "Senior engineer. Reliable systems.",
    heroBody:
      "I build payment platforms, practical tools, and independent software.",
    nav: {
      overview: "Overview",
      work: "Work",
      experience: "Experience",
      games: "Games",
      cv: "CV",
      blog: "Notes",
      contact: "Contact",
    },
    cta: {
      work: "See work",
      blog: "Read notes",
      cv: "CV (PDF)",
      contact: "Contact me",
      play: "Explore projects",
    },
    sections: {
      work: "Selected work",
      experience: "Experience",
      games: "Games",
      cv: "CV",
      blog: "Notes",
      contact: "Contact",
    },
    sectionKickers: {
      work: "SW // WORK LOG",
      experience: "XP // SERVICE REC",
      games: "GL // GAME LAB",
      cv: "CV // DOSSIER",
      blog: "FN // FIELD NOTES",
      contact: "TX // CONTACT",
    },
    sectionBodies: {
      work: "Production platforms and tools. Every card opens a case file with role, constraints, and outcome.",
      experience:
        "Roles, responsibilities, and the systems I helped deliver.",
      games: "An independent game studio, a puzzle platform, and RimWorld mods. Every card opens a case file.",
      cv: "Experience and education in a downloadable PDF.",
      blog: "A personal writing archive, preserved in its original languages.",
      contact: "Email is the fastest route. The CV is one click away.",
    },
    labels: {
      basedIn: "Munich / Europe",
      studioMode: "cloud / product / tools / games",
      availableFor: "available for systems work",
      archiveOpen: "inspect",
      cvOpen: "open pdf",
      cvDownload: "download",
      cvBody:
        "Education record: BS Computer Science, Technical University of Munich, December 2019. Use the PDF for the formal dossier.",
      currentFocus: "Current focus",
      currentFocusBody:
        "Cloud infrastructure, product systems, internal tools, and game development.",
      contactBody: "Email: suren@mouchsiadis-solutions.com",
      blogBody: "Personal notes, preserved in their original languages.",
      blogLanguage: "source language",
      blogCount: "Archive records: {count}",
      blogBack: "return to notes",
      prevPost: "previous post",
      nextPost: "next post",
      notFoundTitle: "signal lost",
      notFoundBody: "No record at this coordinate.",
      returnHome: "return to terminal",
      archiveClose: "close",
      githubLabel: "GitHub",
      linkedinLabel: "LinkedIn",
      openSourceKicker: "OPEN SOURCE",
      openSourceTitle: "Open source, in practice.",
      openSourceBody:
        "Independent tools with public code, documented decisions, and releases you can inspect.",
      openSourceProduct: "open project",
      openSourceCode: "view source",
    },
  },
  ru: {
    title: "Mouchsiadis Solutions",
    description:
      "Сурен Мухсиадис — старший системный разработчик, создающий production-платформы, операционные инструменты и независимое ПО.",
    heroTitle: "Старший инженер. Надёжные системы.",
    heroBody:
      "Создаю платёжные платформы, рабочие инструменты и независимое ПО.",
    nav: {
      overview: "Обзор",
      work: "Работы",
      experience: "Опыт",
      games: "Игры",
      cv: "Резюме",
      blog: "Записи",
      contact: "Контакт",
    },
    cta: {
      work: "Смотреть работы",
      blog: "Читать записи",
      cv: "Резюме (PDF)",
      contact: "Написать мне",
      play: "Смотреть проекты",
    },
    sections: {
      work: "Избранные работы",
      experience: "Опыт",
      games: "Игры",
      cv: "Резюме",
      blog: "Записи",
      contact: "Контакт",
    },
    sectionKickers: {
      work: "SW // РАБОТЫ",
      experience: "XP // ОПЫТ",
      games: "GL // ИГРЫ",
      cv: "CV // РЕЗЮМЕ",
      blog: "FN // ЗАПИСИ",
      contact: "TX // КОНТАКТ",
    },
    sectionBodies: {
      work: "Платформы и инструменты. В каждом проекте — роль, ограничения и результат.",
      experience:
        "Роли, обязанности и системы, над которыми я работал.",
      games: "Независимая игровая студия, платформа головоломок и моды для RimWorld. Каждая карта открывает дело проекта.",
      cv: "Опыт и образование в PDF.",
      blog: "Архив личных записей. Тексты сохранены на языке оригинала.",
      contact: "Быстрее всего — по почте. Резюме в один клик.",
    },
    labels: {
      basedIn: "Мюнхен / Европа",
      studioMode: "облако / продукты / инструменты / игры",
      availableFor: "открыт к сотрудничеству",
      archiveOpen: "осмотреть",
      cvOpen: "открыть pdf",
      cvDownload: "скачать",
      cvBody:
        "Запись об образовании: BS Computer Science, Technical University of Munich, December 2019. PDF содержит формальное досье.",
      currentFocus: "Сейчас в работе",
      currentFocusBody:
        "Облачная инфраструктура, продуктовые системы, внутренние инструменты и разработка игр.",
      contactBody: "Канал связи: suren@mouchsiadis-solutions.com",
      blogBody: "Личные записи на языке оригинала.",
      blogLanguage: "язык источника",
      blogCount: "Записей в архиве: {count}",
      blogBack: "вернуться к записям",
      prevPost: "предыдущая запись",
      nextPost: "следующая запись",
      notFoundTitle: "сигнал потерян",
      notFoundBody: "По этим координатам записи нет.",
      returnHome: "вернуться к терминалу",
      archiveClose: "закрыть",
      githubLabel: "GitHub",
      linkedinLabel: "LinkedIn",
      openSourceKicker: "ОТКРЫТЫЙ КОД",
      openSourceTitle: "Открытый код в работе.",
      openSourceBody:
        "Независимые инструменты с открытым кодом, описанными решениями и доступными для проверки релизами.",
      openSourceProduct: "открыть проект",
      openSourceCode: "исходный код",
    },
  },
  de: {
    title: "Mouchsiadis Solutions",
    description:
      "Suren Mouchsiadis entwickelt als Senior Systems Builder produktive Plattformen, Operations-Werkzeuge und unabhängige Software.",
    heroTitle: "Senior Engineer. Zuverlässige Systeme.",
    heroBody:
      "Ich entwickle Zahlungsplattformen, praktische Werkzeuge und unabhängige Software.",
    nav: {
      overview: "Überblick",
      work: "Arbeit",
      experience: "Erfahrung",
      games: "Spiele",
      cv: "CV",
      blog: "Notizen",
      contact: "Kontakt",
    },
    cta: {
      work: "Arbeiten ansehen",
      blog: "Notizen lesen",
      cv: "CV (PDF)",
      contact: "Kontakt aufnehmen",
      play: "Projekte ansehen",
    },
    sections: {
      work: "Ausgewählte Arbeiten",
      experience: "Erfahrung",
      games: "Spiele",
      cv: "CV",
      blog: "Notizen",
      contact: "Kontakt",
    },
    sectionKickers: {
      work: "SW // PROJEKTE",
      experience: "XP // ERFAHRUNG",
      games: "GL // SPIELE",
      cv: "CV // LEBENSLAUF",
      blog: "FN // NOTIZEN",
      contact: "TX // KONTAKT",
    },
    sectionBodies: {
      work: "Produktive Plattformen und Werkzeuge. Jede Karte öffnet eine Fallakte mit Rolle, Rahmenbedingungen und Ergebnis.",
      experience:
        "Rollen, Verantwortung und die Systeme, an denen ich gearbeitet habe.",
      games: "Ein unabhängiges Spielestudio, eine Puzzle-Plattform und RimWorld-Mods. Jede Karte öffnet eine Fallakte.",
      cv: "Erfahrung und Ausbildung als PDF.",
      blog: "Ein persönliches Textarchiv. Alle Beiträge bleiben in ihrer Originalsprache.",
      contact: "Per E-Mail geht es am schnellsten. Der CV ist einen Klick entfernt.",
    },
    labels: {
      basedIn: "München / Europa",
      studioMode: "Cloud / Produkte / Werkzeuge / Spiele",
      availableFor: "offen für Zusammenarbeit",
      archiveOpen: "prüfen",
      cvOpen: "PDF öffnen",
      cvDownload: "download",
      cvBody:
        "Ausbildungsdatensatz: BS Computer Science, Technical University of Munich, Dezember 2019. Das PDF enthält das formale Dossier.",
      currentFocus: "Aktueller Fokus",
      currentFocusBody:
        "Cloud-Infrastruktur, Produktsysteme, interne Werkzeuge und Spieleentwicklung.",
      contactBody: "Signalkanal: suren@mouchsiadis-solutions.com",
      blogBody: "Persönliche Beiträge in ihrer Originalsprache.",
      blogLanguage: "quellsprache",
      blogCount: "Archivbeiträge: {count}",
      blogBack: "zurück zu den notizen",
      prevPost: "vorheriger Beitrag",
      nextPost: "nächster Beitrag",
      notFoundTitle: "signal verloren",
      notFoundBody: "An diesen Koordinaten liegt kein Datensatz.",
      returnHome: "zurück zum terminal",
      archiveClose: "schließen",
      githubLabel: "GitHub",
      linkedinLabel: "LinkedIn",
      openSourceKicker: "OPEN SOURCE",
      openSourceTitle: "Open Source in der Praxis.",
      openSourceBody:
        "Unabhängige Werkzeuge mit öffentlichem Quellcode, dokumentierten Entscheidungen und nachvollziehbaren Releases.",
      openSourceProduct: "Projekt öffnen",
      openSourceCode: "Quellcode ansehen",
    },
  },
  ge: {
    title: "Mouchsiadis Solutions",
    description:
      "სურენ მუხსიადისი — უფროსი ინჟინერი. გადახდის პლატფორმები, სამუშაო ინსტრუმენტები და დამოუკიდებელი პროგრამები.",
    heroTitle: "უფროსი ინჟინერი. საიმედო სისტემები.",
    heroBody:
      "ვქმნი გადახდის პლატფორმებს, სამუშაო ინსტრუმენტებსა და დამოუკიდებელ პროგრამებს.",
    nav: {
      overview: "მიმოხილვა",
      work: "ნამუშევრები",
      experience: "გამოცდილება",
      games: "თამაშები",
      cv: "CV",
      blog: "ჩანაწერები",
      contact: "კონტაქტი",
    },
    cta: {
      work: "ნამუშევრების ნახვა",
      blog: "ჩანაწერების კითხვა",
      cv: "CV (PDF)",
      contact: "დამიკავშირდით",
      play: "პროექტების ნახვა",
    },
    sections: {
      work: "რჩეული ნამუშევრები",
      experience: "გამოცდილება",
      games: "თამაშები",
      cv: "CV",
      blog: "ჩანაწერები",
      contact: "კონტაქტი",
    },
    sectionKickers: {
      work: "SW // ნამუშევრები",
      experience: "XP // გამოცდილება",
      games: "GL // თამაშები",
      cv: "CV // რეზიუმე",
      blog: "FN // ჩანაწერები",
      contact: "TX // კონტაქტი",
    },
    sectionBodies: {
      work: "პლატფორმები და ინსტრუმენტები. თითოეულ პროექტში: როლი, შეზღუდვები და შედეგი.",
      experience:
        "სამუშაო გამოცდილება, პასუხისმგებლობები და გამოყენებული ტექნოლოგიები.",
      games: "დამოუკიდებელი სტუდია, თავსატეხების პლატფორმა და RimWorld-ის მოდები. გაეცანით თითოეულ პროექტს.",
      cv: "სამუშაო გამოცდილება და განათლება PDF ფორმატში.",
      blog: "პირადი ჩანაწერების არქივი. ტექსტები შენარჩუნებულია ორიგინალის ენაზე.",
      contact: "ყველაზე სწრაფი გზა ელფოსტაა. CV ერთი დაწკაპებითაა ხელმისაწვდომი.",
    },
    labels: {
      basedIn: "მიუნხენი / ევროპა",
      studioMode: "სისტემები / პროდუქტები / ინსტრუმენტები / თამაშები",
      availableFor: "ღია ვარ თანამშრომლობისთვის",
      archiveOpen: "დეტალები",
      cvOpen: "PDF-ის გახსნა",
      cvDownload: "ჩამოტვირთვა",
      cvBody:
        "განათლება: BS Computer Science, Technical University of Munich, დეკემბერი 2019. სრული ინფორმაცია CV-შია.",
      currentFocus: "მიმდინარე მიმართულებები",
      currentFocusBody:
        "ღრუბლოვანი ინფრასტრუქტურა, პროგრამული პროდუქტები, შიდა ინსტრუმენტები და თამაშების ლოგიკა.",
      contactBody: "ელფოსტა: suren@mouchsiadis-solutions.com",
      blogBody:
        "ჩანაწერები ორიგინალის ენაზე, თარგმანის გარეშე.",
      blogLanguage: "ჩანაწერის ენა",
      blogCount: "ჩანაწერები არქივში: {count}",
      blogBack: "ჩანაწერებში დაბრუნება",
      prevPost: "წინა ჩანაწერი",
      nextPost: "შემდეგი ჩანაწერი",
      notFoundTitle: "სიგნალი დაიკარგა",
      notFoundBody: "ამ კოორდინატზე ჩანაწერი არ არის.",
      returnHome: "ტერმინალში დაბრუნება",
      archiveClose: "დახურვა",
      githubLabel: "GitHub",
      linkedinLabel: "LinkedIn",
      openSourceKicker: "ღია კოდი",
      openSourceTitle: "პროექტები ღია კოდით.",
      openSourceBody:
        "დამოუკიდებელი ინსტრუმენტები საჯარო კოდით, დოკუმენტირებული გადაწყვეტილებებითა და შემოწმებადი რელიზებით.",
      openSourceProduct: "პროექტის გახსნა",
      openSourceCode: "კოდის ნახვა",
    },
  },
};

export const evidenceLabels: Record<Locale, [string, string, string, string]> = {
  en: ["Role", "Contribution", "Constraints", "Outcome"],
  ru: ["Роль", "Вклад", "Ограничения", "Результат"],
  de: ["Rolle", "Beitrag", "Rahmenbedingungen", "Ergebnis"],
  ge: ["როლი", "წვლილი", "შეზღუდვები", "შედეგი"],
};

// Card deck, card reader, and case-file copy. {title} is replaced at runtime.
export const deckCopy: Record<
  Locale,
  {
    evidenceTitle: string;
    viewLabel: string;
    viewCards: string;
    viewList: string;
    suits: { platform: string; tool: string; game: string };
    live: string;
    flip: string;
    open: string;
    readerLabel: string;
    readerIdle: string;
    readerHint: string;
    readerCarrying: string;
    readerArmed: string;
    readerCancelled: string;
    readerCancelHint: string;
    readerReading: string;
    announcePlayed: string;
    caseKicker: string;
    backToWork: string;
    backToGames: string;
    backToTooling: string;
    built: string;
    stack: string;
    prevCase: string;
    nextCase: string;
    hireTitle: string;
    hireBody: string;
    avatarPhoto: string;
  }
> = {
  en: {
    evidenceTitle: "Evidence",
    viewLabel: "View",
    viewCards: "Cards",
    viewList: "List",
    suits: { platform: "Platform", tool: "Tool", game: "Game" },
    live: "LIVE",
    flip: "Flip",
    open: "Open case file",
    readerLabel: "Card reader",
    readerIdle: "Drop a card here to open",
    readerHint: "Or choose Open case file on any card.",
    readerCarrying: "Move to the reader",
    readerArmed: "Release to open",
    readerCancelled: "Card returned",
    readerCancelHint: "Esc or release outside to cancel.",
    readerReading: "Reading {title}…",
    announcePlayed: "{title} played. Opening case file.",
    caseKicker: "CASE FILE",
    backToWork: "Back to work",
    backToGames: "Back to games",
    backToTooling: "Back to tooling",
    built: "What was built",
    stack: "Stack",
    prevCase: "Previous case",
    nextCase: "Next case",
    hireTitle: "Need a system like this built?",
    hireBody: "Email is the fastest route. The CV has the full record.",
    avatarPhoto: "Show photo",
  },
  ru: {
    evidenceTitle: "Подтверждения",
    viewLabel: "Вид",
    viewCards: "Карты",
    viewList: "Список",
    suits: { platform: "Платформа", tool: "Инструмент", game: "Игра" },
    live: "В РАБОТЕ",
    flip: "Перевернуть",
    open: "Открыть дело",
    readerLabel: "Считыватель карт",
    readerIdle: "Перетащите карту, чтобы открыть",
    readerHint: "Или нажмите «Открыть дело» на карте.",
    readerCarrying: "Перенесите к считывателю",
    readerArmed: "Отпустите, чтобы открыть",
    readerCancelled: "Карта возвращена",
    readerCancelHint: "Esc или отпустите вне считывателя для отмены.",
    readerReading: "Чтение: {title}…",
    announcePlayed: "{title} разыграна. Открываю дело.",
    caseKicker: "ДЕЛО",
    backToWork: "Назад к работам",
    backToGames: "Назад к играм",
    backToTooling: "Назад к инструментам",
    built: "Что построено",
    stack: "Стек",
    prevCase: "Предыдущее дело",
    nextCase: "Следующее дело",
    hireTitle: "Нужна такая система?",
    hireBody: "Быстрее всего — по почте. Полная история — в резюме.",
    avatarPhoto: "Показать фото",
  },
  de: {
    evidenceTitle: "Nachweise",
    viewLabel: "Ansicht",
    viewCards: "Karten",
    viewList: "Liste",
    suits: { platform: "Plattform", tool: "Werkzeug", game: "Spiel" },
    live: "LIVE",
    flip: "Umdrehen",
    open: "Fallakte öffnen",
    readerLabel: "Kartenleser",
    readerIdle: "Karte hier ablegen und öffnen",
    readerHint: "Oder „Fallakte öffnen“ auf einer Karte wählen.",
    readerCarrying: "Zum Kartenleser ziehen",
    readerArmed: "Zum Öffnen loslassen",
    readerCancelled: "Karte zurückgelegt",
    readerCancelHint: "Esc oder außerhalb loslassen zum Abbrechen.",
    readerReading: "Lese {title} …",
    announcePlayed: "{title} ausgespielt. Fallakte wird geöffnet.",
    caseKicker: "FALLAKTE",
    backToWork: "Zurück zur Arbeit",
    backToGames: "Zurück zu den Spielen",
    backToTooling: "Zurück zu den Werkzeugen",
    built: "Was gebaut wurde",
    stack: "Stack",
    prevCase: "Vorherige Akte",
    nextCase: "Nächste Akte",
    hireTitle: "Brauchen Sie ein solches System?",
    hireBody: "Per E-Mail geht es am schnellsten. Der CV enthält den vollständigen Werdegang.",
    avatarPhoto: "Foto zeigen",
  },
  ge: {
    evidenceTitle: "მტკიცებულებები",
    viewLabel: "ხედი",
    viewCards: "ბარათები",
    viewList: "სია",
    suits: { platform: "პლატფორმა", tool: "ინსტრუმენტი", game: "თამაში" },
    live: "მოქმედი",
    flip: "გადაბრუნება",
    open: "პროექტის ნახვა",
    readerLabel: "ბარათის წამკითხველი",
    readerIdle: "გადმოიტანეთ ბარათი გასახსნელად",
    readerHint: "ან აირჩიეთ „პროექტის ნახვა“ ბარათზე.",
    readerCarrying: "გადმოიტანეთ წამკითხველთან",
    readerArmed: "გაუშვით გასახსნელად",
    readerCancelled: "ბარათი დაბრუნდა",
    readerCancelHint: "გაუქმება: Esc ან გაუშვით გარეთ.",
    readerReading: "იკითხება {title}…",
    announcePlayed: "იხსნება პროექტი: {title}.",
    caseKicker: "პროექტი",
    backToWork: "ნამუშევრებზე დაბრუნება",
    backToGames: "თამაშებზე დაბრუნება",
    backToTooling: "ინსტრუმენტებზე დაბრუნება",
    built: "რა შეიქმნა",
    stack: "სტეკი",
    prevCase: "წინა პროექტი",
    nextCase: "შემდეგი პროექტი",
    hireTitle: "გჭირდებათ მსგავსი სისტემა?",
    hireBody: "ყველაზე სწრაფი გზა ელფოსტაა. სრული გამოცდილება CV-შია.",
    avatarPhoto: "ფოტოს ჩვენება",
  },
};

// Tooling page: {count} includes tools in development and production.
export const toolingCopy: Record<Locale, { kicker: string; title: string; body: string; note: string }> = {
  en: {
    kicker: "TL // TOOLING / {count} PROJECTS",
    title: "Tools built for practice.",
    body: "Game analysis, encrypted squad coordination, and solo CS2 practice. Explore the code, decisions, and release status of each project.",
    note: "Independent tools · production and prerelease projects",
  },
  ru: {
    kicker: "TL // ИНСТРУМЕНТЫ / ПРОЕКТОВ: {count}",
    title: "Инструменты для дела.",
    body: "Анализ игр, зашифрованная координация отряда и одиночная практика в CS2. Код, решения и статус релиза — в описании каждого проекта.",
    note: "Независимые инструменты · рабочие и предварительные версии",
  },
  de: {
    kicker: "TL // WERKZEUGE / {count} PROJEKTE",
    title: "Werkzeuge für die Praxis.",
    body: "Spielanalyse, verschlüsselte Teamkoordination und Solotraining in CS2. Jeder Eintrag zeigt Quellcode, Entscheidungen und Release-Status.",
    note: "Unabhängige Werkzeuge · produktive Systeme und Vorabversionen",
  },
  ge: {
    kicker: "TL // ინსტრუმენტები / {count} პროექტი",
    title: "ინსტრუმენტები პრაქტიკისთვის.",
    body: "თამაშების ანალიზი, გუნდის დაშიფრული კოორდინაცია და CS2-ში ინდივიდუალური ვარჯიში. გაეცანით პროექტების კოდს, გადაწყვეტილებებსა და გამოშვების სტატუსს.",
    note: "დამოუკიდებელი ინსტრუმენტები · მოქმედი და წინასწარი ვერსიები",
  },
};

// Backlog Breaker, the hero mini-game.
export const arcadeCopy: Record<
  Locale,
  {
    title: string;
    help: string;
    start: string;
    pause: string;
    resume: string;
    again: string;
    score: string;
    lives: string;
    serve: string;
    won: string;
    lost: string;
    label: string;
  }
> = {
  en: {
    title: "Backlog Breaker",
    help: "Drag or use ← →. Tap, click, or Space launches the ball.",
    start: "Start",
    pause: "Pause",
    resume: "Resume",
    again: "Play again",
    score: "Score",
    lives: "Lives",
    serve: "Launch the ball",
    won: "Backlog cleared. Ship it.",
    lost: "Out of lives. The backlog wins this round.",
    label: "Backlog Breaker: bounce the ball off the paddle to clear the ticket wall.",
  },
  ru: {
    title: "Разгреби бэклог",
    help: "Тяните или жмите ← →. Касание, клик или пробел запускает мяч.",
    start: "Старт",
    pause: "Пауза",
    resume: "Продолжить",
    again: "Ещё раз",
    score: "Счёт",
    lives: "Жизни",
    serve: "Запустите мяч",
    won: "Бэклог разобран. Выкатываем.",
    lost: "Жизни кончились. В этот раз победил бэклог.",
    label: "Разгреби бэклог: отбивайте мяч платформой, чтобы разбить стену задач.",
  },
  de: {
    title: "Backlog-Brecher",
    help: "Ziehen oder ← → nutzen. Tippen, Klick oder Leertaste startet den Ball.",
    start: "Start",
    pause: "Pause",
    resume: "Weiter",
    again: "Nochmal",
    score: "Punkte",
    lives: "Leben",
    serve: "Ball starten",
    won: "Backlog leer. Ausliefern.",
    lost: "Keine Leben mehr. Diese Runde gewinnt der Backlog.",
    label: "Backlog-Brecher: den Ball mit dem Schläger zurückspielen und die Ticketwand abräumen.",
  },
  ge: {
    title: "ბექლოგის მსხვრეველი",
    help: "მართეთ თითით ან ← → ღილაკებით. ბურთის გასაშვებად შეეხეთ ეკრანს ან დააჭირეთ Space-ს.",
    start: "დაწყება",
    pause: "პაუზა",
    resume: "გაგრძელება",
    again: "თავიდან",
    score: "ქულა",
    lives: "სიცოცხლე",
    serve: "გაუშვით ბურთი",
    won: "ბექლოგი გასუფთავდა. გავუშვათ.",
    lost: "ცდები ამოიწურა. სცადეთ თავიდან.",
    label: "ბექლოგის მსხვრეველი: მოიგერიეთ ბურთი პლატფორმით და დაანგრიეთ დავალებების კედელი.",
  },
};

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}
