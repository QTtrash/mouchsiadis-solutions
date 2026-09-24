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
  },
  ge: {
    work: "ნამუშევრები",
    games: "თამაშები",
    tooling: "ხელსაწყოები",
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
    heroTitle: "Senior systems builder for products that have to work.",
    heroBody:
      "I design and ship production platforms, operational tooling, and independent software—from payment workflows to realtime systems. This archive shows the work, constraints, and evidence.",
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
      play: "Play the card deck",
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
        "Service history translated from the formal CV into a readable terminal record.",
      games: "Live multiplayer games, a puzzle platform, and RimWorld mods. Every card opens a case file.",
      cv: "Formal identification file and PDF dossier.",
      blog: "Older notes preserved in original language. Filed as recovered text, not brand copy.",
      contact: "Email is the fastest route. The CV is one click away.",
    },
    labels: {
      basedIn: "station: Munich / Europe",
      studioMode: "loadout: cloud / product / tools / games",
      availableFor: "status: available for systems work",
      archiveOpen: "inspect",
      cvOpen: "open pdf",
      cvDownload: "download",
      cvBody:
        "Education record: BS Computer Science, Technical University of Munich, December 2019. Use the PDF for the formal dossier.",
      currentFocus: "Active loadout",
      currentFocusBody:
        "Cloud infrastructure, product systems, platform tooling, internal operators, and game logic.",
      contactBody: "Signal channel: suren@mouchsiadis-solutions.com",
      blogBody: "Original-language notes, archived without translation pass.",
      blogLanguage: "source language",
      blogBack: "return to notes",
      prevPost: "previous log",
      nextPost: "next log",
      notFoundTitle: "signal lost",
      notFoundBody: "No record at this coordinate.",
      returnHome: "return to terminal",
      archiveClose: "close",
      githubLabel: "GitHub",
      linkedinLabel: "LinkedIn",
      openSourceKicker: "FIRST OPEN-SOURCE RELEASE",
      openSourceTitle: "Raid Signal is now built in public.",
      openSourceBody:
        "A local-first encrypted Windows tool, released with Apache-2.0 source code and verifiable build evidence. Community map assets retain their separate licenses.",
      openSourceProduct: "open Raid Signal",
      openSourceCode: "view source",
    },
  },
  ru: {
    title: "Mouchsiadis Solutions",
    description:
      "Сурен Мухсиадис — старший системный разработчик, создающий production-платформы, операционные инструменты и независимое ПО.",
    heroTitle: "Старший системный разработчик продуктов, которые обязаны работать.",
    heroBody:
      "Я проектирую и запускаю production-платформы, операционные инструменты и независимое ПО — от платежных процессов до систем реального времени. В архиве показаны работа, ограничения и подтверждения.",
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
      play: "Разыграть колоду",
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
      work: "SW // WORK LOG",
      experience: "XP // SERVICE REC",
      games: "GL // GAME LAB",
      cv: "CV // DOSSIER",
      blog: "FN // FIELD NOTES",
      contact: "TX // CONTACT",
    },
    sectionBodies: {
      work: "Production-платформы и инструменты. Каждая карта открывает дело проекта: роль, ограничения и результат.",
      experience:
        "Служебная история из формального CV, переложенная в читаемый терминальный журнал.",
      games: "Мультиплеерные игры, платформа головоломок и моды для RimWorld. Каждая карта открывает дело проекта.",
      cv: "Формальный идентификационный файл и PDF-досье.",
      blog: "Старые заметки сохранены на языке оригинала. Это архивный текст, не рекламная витрина.",
      contact: "Быстрее всего — по почте. Резюме в один клик.",
    },
    labels: {
      basedIn: "станция: Мюнхен / Европа",
      studioMode: "снаряжение: cloud / продукт / инструменты / игры",
      availableFor: "статус: доступен для системной работы",
      archiveOpen: "осмотреть",
      cvOpen: "открыть pdf",
      cvDownload: "скачать",
      cvBody:
        "Запись об образовании: BS Computer Science, Technical University of Munich, December 2019. PDF содержит формальное досье.",
      currentFocus: "Активная загрузка",
      currentFocusBody:
        "Облачная инфраструктура, продуктовые системы, платформенные инструменты, внутренние операторы и игровая логика.",
      contactBody: "Канал связи: suren@mouchsiadis-solutions.com",
      blogBody: "Записи на языке оригинала, без прохода перевода.",
      blogLanguage: "язык источника",
      blogBack: "вернуться к записям",
      prevPost: "предыдущий лог",
      nextPost: "следующий лог",
      notFoundTitle: "сигнал потерян",
      notFoundBody: "По этим координатам записи нет.",
      returnHome: "вернуться к терминалу",
      archiveClose: "закрыть",
      githubLabel: "GitHub",
      linkedinLabel: "LinkedIn",
      openSourceKicker: "ПЕРВЫЙ ПРОЕКТ С ОТКРЫТЫМ КОДОМ",
      openSourceTitle: "Raid Signal теперь разрабатывается публично.",
      openSourceBody:
        "Локальный зашифрованный Windows-инструмент с исходным кодом Apache-2.0 и проверяемыми доказательствами сборки. Карты сообщества сохраняют отдельные лицензии.",
      openSourceProduct: "открыть Raid Signal",
      openSourceCode: "исходный код",
    },
  },
  de: {
    title: "Mouchsiadis Solutions",
    description:
      "Suren Mouchsiadis entwickelt als Senior Systems Builder produktive Plattformen, Operations-Werkzeuge und unabhaengige Software.",
    heroTitle: "Senior Systems Builder fuer Produkte, die funktionieren muessen.",
    heroBody:
      "Ich konzipiere und liefere produktive Plattformen, Operations-Werkzeuge und unabhaengige Software—von Zahlungsablaeufen bis zu Echtzeitsystemen. Das Archiv zeigt Arbeit, Rahmenbedingungen und Nachweise.",
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
      play: "Kartendeck spielen",
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
      work: "SW // WORK LOG",
      experience: "XP // SERVICE REC",
      games: "GL // GAME LAB",
      cv: "CV // DOSSIER",
      blog: "FN // FIELD NOTES",
      contact: "TX // CONTACT",
    },
    sectionBodies: {
      work: "Produktive Plattformen und Werkzeuge. Jede Karte öffnet eine Fallakte mit Rolle, Rahmenbedingungen und Ergebnis.",
      experience:
        "Dienstverlauf aus dem formalen CV, als lesbarer Terminaldatensatz abgelegt.",
      games: "Live-Multiplayer-Spiele, eine Puzzle-Plattform und RimWorld-Mods. Jede Karte öffnet eine Fallakte.",
      cv: "Formale Identifikationsdatei und PDF-Dossier.",
      blog: "Aeltere Notizen in Originalsprache. Als geborgener Text abgelegt, nicht als Markenstimme.",
      contact: "Per E-Mail geht es am schnellsten. Der CV ist einen Klick entfernt.",
    },
    labels: {
      basedIn: "station: Muenchen / Europa",
      studioMode: "loadout: cloud / produkt / tools / games",
      availableFor: "status: bereit fuer Systemarbeit",
      archiveOpen: "pruefen",
      cvOpen: "pdf oeffnen",
      cvDownload: "download",
      cvBody:
        "Ausbildungsdatensatz: BS Computer Science, Technical University of Munich, Dezember 2019. Das PDF enthaelt das formale Dossier.",
      currentFocus: "Aktives Loadout",
      currentFocusBody:
        "Cloud-Infrastruktur, Produktsysteme, Plattformwerkzeuge, interne Operatoren und Game Logic.",
      contactBody: "Signalkanal: suren@mouchsiadis-solutions.com",
      blogBody: "Originalsprachige Notizen, ohne Uebersetzungsdurchlauf.",
      blogLanguage: "quellsprache",
      blogBack: "zurueck zu den notizen",
      prevPost: "vorheriges log",
      nextPost: "naechstes log",
      notFoundTitle: "signal verloren",
      notFoundBody: "An diesen Koordinaten liegt kein Datensatz.",
      returnHome: "zurueck zum terminal",
      archiveClose: "schliessen",
      githubLabel: "GitHub",
      linkedinLabel: "LinkedIn",
      openSourceKicker: "ERSTES OPEN-SOURCE-RELEASE",
      openSourceTitle: "Raid Signal wird jetzt oeffentlich entwickelt.",
      openSourceBody:
        "Ein lokales, verschluesseltes Windows-Werkzeug mit Apache-2.0-Quellcode und ueberpruefbaren Build-Nachweisen. Community-Karten behalten ihre eigenen Lizenzen.",
      openSourceProduct: "Raid Signal oeffnen",
      openSourceCode: "Quellcode ansehen",
    },
  },
  ge: {
    title: "Mouchsiadis Solutions",
    description:
      "სურენ მუხსიადისი არის უფროსი სისტემების შემქმნელი, რომელიც ქმნის production პლატფორმებს, საოპერაციო ხელსაწყოებსა და დამოუკიდებელ პროგრამულ უზრუნველყოფას.",
    heroTitle: "უფროსი სისტემების შემქმნელი პროდუქტებისთვის, რომლებმაც აუცილებლად უნდა იმუშაონ.",
    heroBody:
      "ვაპროექტებ და ვუშვებ production პლატფორმებს, საოპერაციო ხელსაწყოებსა და დამოუკიდებელ პროგრამულ უზრუნველყოფას—გადახდის პროცესებიდან რეალურ დროში მოქმედ სისტემებამდე. არქივი აჩვენებს ნამუშევარს, შეზღუდვებსა და მტკიცებულებებს.",
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
      play: "ბარათების დასტის თამაში",
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
      work: "SW // WORK LOG",
      experience: "XP // SERVICE REC",
      games: "GL // GAME LAB",
      cv: "CV // DOSSIER",
      blog: "FN // FIELD NOTES",
      contact: "TX // CONTACT",
    },
    sectionBodies: {
      work: "Production პლატფორმები და ხელსაწყოები. ყოველი ბარათი ხსნის პროექტის საქმეს: როლი, შეზღუდვები და შედეგი.",
      experience:
        "ფორმალური CV-დან გადმოტანილი სამსახურის ისტორია, წაკითხვადი ტერმინალის ჩანაწერად.",
      games: "მრავალმოთამაშიანი თამაშები, თავსატეხების პლატფორმა და RimWorld-ის მოდები. ყოველი ბარათი ხსნის პროექტის საქმეს.",
      cv: "ფორმალური იდენტიფიკაციის ფაილი და PDF დოსიე.",
      blog: "ძველი ჩანაწერები ინახება საწყის ენაზე. ეს არის აღდგენილი ტექსტი, არა ბრენდის ტექსტი.",
      contact: "ყველაზე სწრაფი გზა ელფოსტაა. CV ერთი დაწკაპებითაა ხელმისაწვდომი.",
    },
    labels: {
      basedIn: "სადგური: მიუნხენი / ევროპა",
      studioMode: "აღჭურვა: cloud / პროდუქტი / tools / games",
      availableFor: "სტატუსი: ხელმისაწვდომია სისტემურ სამუშაოზე",
      archiveOpen: "შემოწმება",
      cvOpen: "PDF-ის გახსნა",
      cvDownload: "ჩამოტვირთვა",
      cvBody:
        "განათლების ჩანაწერი: BS Computer Science, Technical University of Munich, დეკემბერი 2019. ფორმალური დოსიე PDF-შია.",
      currentFocus: "აქტიური აღჭურვა",
      currentFocusBody:
        "Cloud ინფრასტრუქტურა, პროდუქტის სისტემები, პლატფორმის ხელსაწყოები, შიდა ოპერატორები და თამაშის ლოგიკა.",
      contactBody: "სიგნალის არხი: suren@mouchsiadis-solutions.com",
      blogBody:
        "საწყის ენაზე არსებული ჩანაწერები, თარგმნის დამატებითი გავლის გარეშე.",
      blogLanguage: "წყაროს ენა",
      blogBack: "ჩანაწერებში დაბრუნება",
      prevPost: "წინა ლოგი",
      nextPost: "შემდეგი ლოგი",
      notFoundTitle: "სიგნალი დაიკარგა",
      notFoundBody: "ამ კოორდინატზე ჩანაწერი არ არის.",
      returnHome: "ტერმინალში დაბრუნება",
      archiveClose: "დახურვა",
      githubLabel: "GitHub",
      linkedinLabel: "LinkedIn",
      openSourceKicker: "პირველი ღია კოდის რელიზი",
      openSourceTitle: "Raid Signal ახლა საჯაროდ ვითარდება.",
      openSourceBody:
        "ლოკალური დაშიფრული Windows ხელსაწყო Apache-2.0 საწყისი კოდითა და შემოწმებადი build-მტკიცებულებებით. საზოგადოების რუკები საკუთარ ლიცენზიებს ინარჩუნებს.",
      openSourceProduct: "Raid Signal-ის გახსნა",
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
    readerReading: string;
    announcePlayed: string;
    caseKicker: string;
    backToWork: string;
    backToGames: string;
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
    readerIdle: "Drop a card here",
    readerHint: "or choose Open case file on any card",
    readerReading: "Reading {title}…",
    announcePlayed: "{title} played. Opening case file.",
    caseKicker: "CASE FILE",
    backToWork: "Back to work",
    backToGames: "Back to games",
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
    readerIdle: "Перетащите карту сюда",
    readerHint: "или нажмите «Открыть дело» на любой карте",
    readerReading: "Чтение: {title}…",
    announcePlayed: "{title} разыграна. Открываю дело.",
    caseKicker: "ДЕЛО",
    backToWork: "Назад к работам",
    backToGames: "Назад к играм",
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
    readerIdle: "Karte hier ablegen",
    readerHint: "oder „Fallakte öffnen“ auf einer Karte wählen",
    readerReading: "Lese {title} …",
    announcePlayed: "{title} ausgespielt. Fallakte wird geöffnet.",
    caseKicker: "FALLAKTE",
    backToWork: "Zurück zur Arbeit",
    backToGames: "Zurück zu den Spielen",
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
    suits: { platform: "პლატფორმა", tool: "ხელსაწყო", game: "თამაში" },
    live: "აქტიური",
    flip: "გადაბრუნება",
    open: "საქმის გახსნა",
    readerLabel: "ბარათის წამკითხველი",
    readerIdle: "ჩააგდეთ ბარათი აქ",
    readerHint: "ან აირჩიეთ „საქმის გახსნა“ ნებისმიერ ბარათზე",
    readerReading: "იკითხება {title}…",
    announcePlayed: "{title} გათამაშდა. იხსნება საქმე.",
    caseKicker: "საქმე",
    backToWork: "ნამუშევრებზე დაბრუნება",
    backToGames: "თამაშებზე დაბრუნება",
    built: "რა შეიქმნა",
    stack: "სტეკი",
    prevCase: "წინა საქმე",
    nextCase: "შემდეგი საქმე",
    hireTitle: "გჭირდებათ მსგავსი სისტემა?",
    hireBody: "ყველაზე სწრაფი გზა ელფოსტაა. სრული ისტორია CV-შია.",
    avatarPhoto: "ფოტოს ჩვენება",
  },
};

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}
