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
    };
  }
> = {
  en: {
    title: "Mouchsiadis Solutions",
    description:
      "Field terminal for Suren Mouchsiadis: software work, service record, CV, and notes.",
    heroTitle: "Systems, tools, and field notes.",
    heroBody:
      "This terminal catalogs public builds, service history, game systems, and archived notes. Select a section and inspect the record.",
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
    },
  },
  ru: {
    title: "Mouchsiadis Solutions",
    description:
      "Полевой терминал Сурена Мухсиадиса: софт, служебная запись, CV и заметки.",
    heroTitle: "Системы, инструменты и полевые записи.",
    heroBody:
      "Терминал хранит публичные сборки, служебную историю, игровые системы и архивные заметки. Выберите раздел и откройте запись.",
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
    },
  },
  de: {
    title: "Mouchsiadis Solutions",
    description:
      "Feldterminal fuer Suren Mouchsiadis: Softwarearbeit, Dienstakte, CV und Notizen.",
    heroTitle: "Systeme, Werkzeuge und Feldnotizen.",
    heroBody:
      "Dieses Terminal katalogisiert oeffentliche Builds, Dienstverlauf, Game-Systeme und archivierte Notizen. Waehlen Sie einen Bereich und pruefen Sie den Datensatz.",
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
    },
  },
  ge: {
    title: "Mouchsiadis Solutions",
    description:
      "სურენ მუხსიადისის საველე ტერმინალი: პროგრამული სამუშაო, სამსახურის ჩანაწერი, CV და ჩანაწერები.",
    heroTitle: "სისტემები, ხელსაწყოები და საველე ჩანაწერები.",
    heroBody:
      "ეს ტერმინალი ინახავს საჯარო ნაშენებს, სამსახურის ისტორიას, თამაშის სისტემებს და არქივირებულ ჩანაწერებს. აირჩიეთ განყოფილება და გახსენით ჩანაწერი.",
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
    },
  },
};

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}
