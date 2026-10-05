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
      status: string;
      contactAudience: string;
      proofTitle: string;
      impactTitle: string;
      emailMe: string;
      copyAddress: string;
      copied: string;
      includeTitle: string;
      include: string[];
      elsewhere: string;
      mailSubject: string;
      articleContact: string;
      archiveOpen: string;
      cvOpen: string;
      cvDownload: string;
      cvBody: string;
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
    };
  }
> = {
  en: {
    title: "Mouchsiadis Solutions",
    description:
      "Suren Mouchsiadis is a senior platform engineer building scalable platforms, the cloud infrastructure under them, and independent software.",
    heroTitle: "Senior platform engineer for products that have to work.",
    heroBody:
      "I build scalable platforms and the cloud infrastructure that keeps them running.",
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
      contact: "Tell me about the project, contract, consulting work or role. Email reaches me directly.",
    },
    labels: {
      status: "status",
      contactAudience: "For projects, contract work, consulting or a role. Or write directly:",
      proofTitle: "Live case files",
      impactTitle: "Track record",
      emailMe: "Email me",
      copyAddress: "Copy address",
      copied: "Copied",
      includeTitle: "Useful to include",
      include: [
        "What you are building or hiring for",
        "Timeline and how far along it is",
        "Stack, constraints and decisions already made",
        "Links or documents I can read first",
      ],
      elsewhere: "Also on",
      mailSubject: "Inquiry via mouchsiadis-solutions.com",
      articleContact: "Want to talk about a project or a role?",
      archiveOpen: "inspect",
      cvOpen: "open pdf",
      cvDownload: "download",
      cvBody:
        "Education record: BS Computer Science, Technical University of Munich, December 2019. Use the PDF for the formal dossier.",
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
    },
  },
  ru: {
    title: "Mouchsiadis Solutions",
    description:
      "Сурен Мухсиадис — senior platform engineer: масштабируемые платформы, облачная инфраструктура под ними и независимое ПО.",
    heroTitle: "Senior platform engineer для продуктов, которые обязаны работать.",
    heroBody:
      "Строю масштабируемые платформы и облачную инфраструктуру, на которой они работают.",
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
      contact: "Расскажите о проекте, контракте, консультации или вакансии. Письмо приходит напрямую мне.",
    },
    labels: {
      status: "статус",
      contactAudience: "Для проектов, контрактов, консалтинга или работы в команде. Или напишите напрямую:",
      proofTitle: "Работающие проекты",
      impactTitle: "Результаты",
      emailMe: "Написать на почту",
      copyAddress: "Скопировать адрес",
      copied: "Скопировано",
      includeTitle: "Что стоит указать",
      include: [
        "Что вы строите или на какую роль ищете человека",
        "Сроки и текущий этап",
        "Стек, ограничения и уже принятые решения",
        "Ссылки или документы, с которыми стоит ознакомиться",
      ],
      elsewhere: "Также",
      mailSubject: "Запрос с mouchsiadis-solutions.com",
      articleContact: "Хотите обсудить проект или работу?",
      archiveOpen: "осмотреть",
      cvOpen: "открыть pdf",
      cvDownload: "скачать",
      cvBody:
        "Запись об образовании: BS Computer Science, Technical University of Munich, December 2019. PDF содержит формальное досье.",
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
    },
  },
  de: {
    title: "Mouchsiadis Solutions",
    description:
      "Suren Mouchsiadis ist Senior Platform Engineer: skalierbare Plattformen, die Cloud-Infrastruktur darunter und unabhängige Software.",
    heroTitle: "Senior Platform Engineer für Produkte, die funktionieren müssen.",
    heroBody:
      "Ich baue skalierbare Plattformen und die Cloud-Infrastruktur, die sie am Laufen hält.",
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
      contact: "Erzählen Sie mir von Projekt, Auftrag, Beratung oder Rolle. Die E-Mail erreicht mich direkt.",
    },
    labels: {
      status: "Status",
      contactAudience: "Für Projekte, Auftragsarbeit, Beratung oder eine Festanstellung. Oder direkt schreiben:",
      proofTitle: "Live-Fallakten",
      impactTitle: "Ergebnisse",
      emailMe: "E-Mail schreiben",
      copyAddress: "Adresse kopieren",
      copied: "Kopiert",
      includeTitle: "Hilfreich in der Nachricht",
      include: [
        "Was Sie bauen oder für welche Rolle Sie suchen",
        "Zeitplan und aktueller Stand",
        "Stack, Rahmenbedingungen und bereits getroffene Entscheidungen",
        "Links oder Dokumente zum Vorab-Lesen",
      ],
      elsewhere: "Außerdem auf",
      mailSubject: "Anfrage über mouchsiadis-solutions.com",
      articleContact: "Möchten Sie über ein Projekt oder eine Rolle sprechen?",
      archiveOpen: "prüfen",
      cvOpen: "PDF öffnen",
      cvDownload: "download",
      cvBody:
        "Ausbildungsdatensatz: BS Computer Science, Technical University of Munich, Dezember 2019. Das PDF enthält das formale Dossier.",
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
    },
  },
  ge: {
    title: "Mouchsiadis Solutions",
    description:
      "სურენ მუხსიადისი — senior platform engineer: მასშტაბირებადი პლატფორმები, მათი ღრუბლოვანი ინფრასტრუქტურა და დამოუკიდებელი პროგრამები.",
    heroTitle: "Senior platform engineer: სისტემები, რომლებიც უნდა მუშაობდეს.",
    heroBody:
      "ვაშენებ მასშტაბირებად პლატფორმებს და ღრუბლოვან ინფრასტრუქტურას, რომელზეც ისინი მუშაობს.",
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
      contact: "მომწერეთ პროექტის, კონტრაქტის, კონსულტაციის ან ვაკანსიის შესახებ. წერილი პირდაპირ მე მომდის.",
    },
    labels: {
      status: "სტატუსი",
      contactAudience: "პროექტებისთვის, კონტრაქტებისთვის, კონსულტაციისთვის ან სამუშაო შეთავაზებისთვის. ან მომწერეთ პირდაპირ:",
      proofTitle: "მოქმედი პროექტები",
      impactTitle: "შედეგები",
      emailMe: "მომწერეთ ელფოსტით",
      copyAddress: "მისამართის კოპირება",
      copied: "დაკოპირდა",
      includeTitle: "რა უნდა მიუთითოთ",
      include: [
        "რას ქმნით ან რა როლზე ეძებთ ადამიანს",
        "ვადები და მიმდინარე ეტაპი",
        "სტეკი, შეზღუდვები და უკვე მიღებული გადაწყვეტილებები",
        "ბმულები ან დოკუმენტები, რომელთა გაცნობაც ღირს",
      ],
      elsewhere: "ასევე",
      mailSubject: "მოთხოვნა mouchsiadis-solutions.com-დან",
      articleContact: "გსურთ პროექტის ან სამუშაოს განხილვა?",
      archiveOpen: "დეტალები",
      cvOpen: "PDF-ის გახსნა",
      cvDownload: "ჩამოტვირთვა",
      cvBody:
        "განათლება: BS Computer Science, Technical University of Munich, დეკემბერი 2019. სრული ინფორმაცია CV-შია.",
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
    discuss: string;
    ctaKicker: string;
    ctaTitle: string;
    ctaBody: string;
    ctaEmail: string;
    ctaSubject: string;
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
    discuss: "Discuss a similar project",
    ctaKicker: "TX // NEXT STEP",
    ctaTitle: "Building something similar?",
    ctaBody: "Tell me what you are working on: a project, contract work, consulting or a role. Email reaches me directly.",
    ctaEmail: "Email me about {title}",
    ctaSubject: "About {title} (via mouchsiadis-solutions.com)",
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
    discuss: "Обсудить похожий проект",
    ctaKicker: "TX // СЛЕДУЮЩИЙ ШАГ",
    ctaTitle: "Строите что-то похожее?",
    ctaBody: "Расскажите, над чем работаете: проект, контракт, консультация или вакансия. Письмо приходит напрямую мне.",
    ctaEmail: "Написать о {title}",
    ctaSubject: "По поводу {title} (mouchsiadis-solutions.com)",
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
    discuss: "Ähnliches Projekt besprechen",
    ctaKicker: "TX // NÄCHSTER SCHRITT",
    ctaTitle: "Bauen Sie etwas Ähnliches?",
    ctaBody: "Erzählen Sie, woran Sie arbeiten: Projekt, Auftrag, Beratung oder eine Rolle. Die E-Mail erreicht mich direkt.",
    ctaEmail: "Zu {title} schreiben",
    ctaSubject: "Zu {title} (über mouchsiadis-solutions.com)",
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
    discuss: "მსგავსი პროექტის განხილვა",
    ctaKicker: "TX // შემდეგი ნაბიჯი",
    ctaTitle: "ქმნით რაიმე მსგავსს?",
    ctaBody: "მომიყევით, რაზე მუშაობთ: პროექტი, კონტრაქტი, კონსულტაცია თუ ვაკანსია. წერილი პირდაპირ მე მომდის.",
    ctaEmail: "მომწერეთ {title}-ის შესახებ",
    ctaSubject: "{title}-ის შესახებ (mouchsiadis-solutions.com)",
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
