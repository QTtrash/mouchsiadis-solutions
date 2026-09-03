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
    tooling: string;
    about: string;
    notes: string;
    contact: string;
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
    tooling: "Tooling",
    about: "About",
    notes: "Notes",
    contact: "Contact",
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
    tooling: "Инструменты",
    about: "Обо мне",
    notes: "Записи",
    contact: "Контакт",
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
    tooling: "Werkzeuge",
    about: "Profil",
    notes: "Notizen",
    contact: "Kontakt",
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
    tooling: "ხელსაწყოები",
    about: "ჩემ შესახებ",
    notes: "ჩანაწერები",
    contact: "კონტაქტი",
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
    aboutTitle: string;
    aboutBody: string;
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
      approachTitle: string;
      approachBody: string;
      writingTitle: string;
      writingBody: string;
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
    aboutTitle: "Operator note",
    aboutBody:
      "The archive keeps the useful facts close to the surface: what was built, what constraints mattered, and where to open the formal record.",
    nav: {
      overview: "status",
      work: "work logs",
      experience: "service record",
      games: "game lab",
      cv: "dossier",
      blog: "notes",
      contact: "signal",
    },
    cta: {
      work: "open work logs",
      blog: "read field notes",
      cv: "view dossier",
    },
    sections: {
      work: "work logs",
      experience: "service record",
      games: "game lab",
      cv: "dossier",
      blog: "field notes",
      contact: "signal channel",
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
      work: "Public project records. Open an entry for scope, constraints, stack, and external link.",
      experience:
        "Service history translated from the formal CV into a readable terminal record.",
      games:
        "Game systems and mods filed by rules, balance, feedback loops, and release surface.",
      cv: "Formal identification file and PDF dossier.",
      blog: "Older notes preserved in original language. Filed as recovered text, not brand copy.",
      contact: "Open channel. Send a direct transmission.",
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
      approachTitle: "Build protocol",
      approachBody: "Readable interfaces. Stable machinery. No wasted motion.",
      writingTitle: "Recovered notes",
      writingBody:
        "Unpolished entries kept in the language and state they were written.",
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
    aboutTitle: "Заметка оператора",
    aboutBody:
      "Архив держит полезные факты близко к поверхности: что было построено, какие ограничения имели значение и где открыть формальное досье.",
    nav: {
      overview: "статус",
      work: "журнал работ",
      experience: "служба",
      games: "игровой отсек",
      cv: "досье",
      blog: "записи",
      contact: "сигнал",
    },
    cta: {
      work: "открыть журнал",
      blog: "читать записи",
      cv: "смотреть досье",
    },
    sections: {
      work: "журнал работ",
      experience: "служебная запись",
      games: "игровой отсек",
      cv: "досье",
      blog: "полевые записи",
      contact: "канал связи",
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
      work: "Публичные записи проектов. Откройте элемент, чтобы увидеть рамки, ограничения, стек и внешнюю ссылку.",
      experience:
        "Служебная история из формального CV, переложенная в читаемый терминальный журнал.",
      games:
        "Игровые системы и моды: правила, баланс, обратная связь и релизная поверхность.",
      cv: "Формальный идентификационный файл и PDF-досье.",
      blog: "Старые заметки сохранены на языке оригинала. Это архивный текст, не рекламная витрина.",
      contact: "Канал открыт. Отправьте прямую передачу.",
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
      approachTitle: "Протокол сборки",
      approachBody:
        "Читаемые интерфейсы. Стабильный механизм. Никаких лишних движений.",
      writingTitle: "Найденные записи",
      writingBody:
        "Неполированные записи оставлены на том языке и в том состоянии, в котором были написаны.",
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
    aboutTitle: "Operatornotiz",
    aboutBody:
      "Das Archiv haelt die nuetzlichen Fakten vorne: was gebaut wurde, welche Grenzen zaehlten und wo die formale Akte liegt.",
    nav: {
      overview: "status",
      work: "arbeitslog",
      experience: "dienstakte",
      games: "game-lab",
      cv: "dossier",
      blog: "notizen",
      contact: "signal",
    },
    cta: {
      work: "arbeitslog oeffnen",
      blog: "feldnotizen lesen",
      cv: "dossier ansehen",
    },
    sections: {
      work: "arbeitslog",
      experience: "dienstakte",
      games: "game-lab",
      cv: "dossier",
      blog: "feldnotizen",
      contact: "signalkanal",
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
      work: "Oeffentliche Projektdatensaetze. Oeffnen Sie einen Eintrag fuer Umfang, Grenzen, Stack und externen Link.",
      experience:
        "Dienstverlauf aus dem formalen CV, als lesbarer Terminaldatensatz abgelegt.",
      games:
        "Game-Systeme und Mods, abgelegt nach Regeln, Balance, Feedback-Loops und Release-Flaeche.",
      cv: "Formale Identifikationsdatei und PDF-Dossier.",
      blog: "Aeltere Notizen in Originalsprache. Als geborgener Text abgelegt, nicht als Markenstimme.",
      contact: "Kanal offen. Senden Sie eine direkte Uebertragung.",
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
      approachTitle: "Bauprotokoll",
      approachBody:
        "Lesbare Interfaces. Stabile Maschine. Keine unnoetige Bewegung.",
      writingTitle: "Geborgene Notizen",
      writingBody:
        "Unpolierte Eintraege bleiben in Sprache und Zustand der Originalfassung.",
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
    aboutTitle: "ოპერატორის ჩანაწერი",
    aboutBody:
      "არქივი სასარგებლო ფაქტებს ზედაპირთან ახლოს ტოვებს: რა აშენდა, რა შეზღუდვები იყო მნიშვნელოვანი და სად იხსნება ფორმალური დოსიე.",
    nav: {
      overview: "სტატუსი",
      work: "სამუშაო ჟურნალი",
      experience: "სამსახურის ჩანაწერი",
      games: "თამაშის ლაბი",
      cv: "დოსიე",
      blog: "ჩანაწერები",
      contact: "სიგნალი",
    },
    cta: {
      work: "ჟურნალის გახსნა",
      blog: "ჩანაწერების კითხვა",
      cv: "დოსიეს ნახვა",
    },
    sections: {
      work: "სამუშაო ჟურნალი",
      experience: "სამსახურის ჩანაწერი",
      games: "თამაშის ლაბი",
      cv: "დოსიე",
      blog: "საველე ჩანაწერები",
      contact: "სიგნალის არხი",
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
      work: "საჯარო პროექტების ჩანაწერები. გახსენით ელემენტი ფარგლების, შეზღუდვების, სტეკისა და გარე ბმულის სანახავად.",
      experience:
        "ფორმალური CV-დან გადმოტანილი სამსახურის ისტორია, წაკითხვადი ტერმინალის ჩანაწერად.",
      games:
        "თამაშის სისტემები და მოდები, დალაგებული წესებით, ბალანსით, უკუკავშირის ციკლებით და გამოშვების ზედაპირით.",
      cv: "ფორმალური იდენტიფიკაციის ფაილი და PDF დოსიე.",
      blog: "ძველი ჩანაწერები ინახება საწყის ენაზე. ეს არის აღდგენილი ტექსტი, არა ბრენდის ტექსტი.",
      contact: "არხი ღიაა. გაგზავნეთ პირდაპირი გადაცემა.",
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
      approachTitle: "აწყობის პროტოკოლი",
      approachBody:
        "წაკითხვადი ინტერფეისები. სტაბილური მექანიკა. ზედმეტი მოძრაობის გარეშე.",
      writingTitle: "აღდგენილი ჩანაწერები",
      writingBody:
        "დაუპრიალებელი ჩანაწერები რჩება იმ ენასა და მდგომარეობაში, რომელშიც დაიწერა.",
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

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}
