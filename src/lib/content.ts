import type { Locale } from "./i18n.ts";

type LocalizedRecord<T> = { en: T } & Partial<Record<Locale, T>>;
type LocalizedString = LocalizedRecord<string>;

export interface ProjectEntry {
  slug: string;
  title: string;
  eyebrow: LocalizedString;
  summary: LocalizedString;
  narrative: LocalizedString;
  details: LocalizedRecord<string[]>;
  stack: string[];
  meta: LocalizedRecord<string[]>;
  link: string;
  linkLabel: LocalizedString;
  cover: string;
}

export interface ExperienceEntry {
  slug: string;
  title: LocalizedString;
  company: string;
  range: string;
  location: string;
  summary: LocalizedString;
  details: LocalizedRecord<string[]>;
  stack: string[];
  cover: string;
}

export const projects: ProjectEntry[] = [
  {
    slug: "neopay",
    title: "Neopay",
    eyebrow: {
      en: "Tenant-aware payout platform",
      ru: "Мультиарендная платформа выплат",
      de: "Mandantenfaehige Auszahlungsplattform",
    },
    summary: {
      en: "A payout platform for Yandex fleets with admin and driver flows, balance visibility, payout orchestration, and dual VPS deployment support.",
      ru: "Платформа выплат для парков Yandex с административными и водительскими потоками, видимостью балансов, оркестрацией выплат и поддержкой двух VPS-окружений.",
      de: "Eine Auszahlungsplattform fuer Yandex-Flotten mit Admin- und Fahrerablaeufen, Saldenansicht, Auszahlungsorchestrierung und dualem VPS-Deployment.",
    },
    narrative: {
      en: "Neopay is designed around tenant isolation, payout risk control, and infrastructure clarity. The product combines host-bound tenant routing, role-separated admin and driver surfaces, external provider integrations, and an auditable payout lifecycle.",
      ru: "Neopay строится вокруг изоляции арендаторов, контроля рисков выплат и прозрачной инфраструктуры. Продукт сочетает host-bound маршрутизацию арендаторов, разделенные интерфейсы для админов и водителей, интеграции с внешними провайдерами и аудируемый жизненный цикл выплат.",
      de: "Neopay ist auf Mandantentrennung, Risikokontrolle bei Auszahlungen und klare Infrastruktur ausgerichtet. Das Produkt kombiniert host-gebundenes Tenant-Routing, getrennte Admin- und Fahreroberflaechen, externe Integrationen und einen auditierbaren Auszahlungsprozess.",
    },
    details: {
      en: [
        "Built as a Next.js 16 monolith with typed integration modules, Drizzle ORM, PostgreSQL, and tenant-bound host parsing.",
        "Implements Yandex Fleet, Bird Verify, and Bank of Georgia integration layers for balances, OTP delivery, and payment submission.",
        "Supports driver-side payout requests, reconciliation visibility, and event history with clear admin oversight.",
        "Structured for production and development VPS targets behind a shared host-level proxy stack.",
      ],
      ru: [
        "Построен как монолит на Next.js 16 с типизированными интеграционными модулями, Drizzle ORM, PostgreSQL и tenant-bound host parsing.",
        "Содержит интеграционные слои для Yandex Fleet, Bird Verify и Bank of Georgia: балансы, OTP и отправка платежей.",
        "Поддерживает запросы на вывод средств со стороны водителя, сверку статусов и историю событий под контролем админов.",
        "Подготовлен к продакшн- и dev-окружениям VPS за общим хостовым proxy-стеком.",
      ],
      de: [
        "Als Next.js-16-Monolith mit typisierten Integrationsmodulen, Drizzle ORM, PostgreSQL und tenant-gebundenem Host-Parsing aufgebaut.",
        "Enthaelt Integrationen fuer Yandex Fleet, Bird Verify und Bank of Georgia fuer Salden, OTP-Zustellung und Zahlungsanlage.",
        "Unterstuetzt fahrerseitige Auszahlungsanfragen, Reconciliation-Ansicht und Ereignisverlauf unter Admin-Kontrolle.",
        "Fuer produktive und Entwicklungs-VPS-Ziele hinter einem gemeinsamen Host-Proxy vorbereitet.",
      ],
    },
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Drizzle ORM",
      "PostgreSQL",
      "Yandex Fleet",
      "Bird Verify",
      "Bank of Georgia",
    ],
    meta: {
      en: ["public platform", "tenant routing", "payments"],
      ru: ["публичная платформа", "tenant routing", "платежи"],
      de: ["oeffentliche Plattform", "Tenant-Routing", "Payments"],
    },
    link: "https://neopay.cloud",
    linkLabel: {
      en: "open platform",
      ru: "открыть платформу",
      de: "Plattform oeffnen",
    },
    cover: "neopay",
  },
  {
    slug: "true-grind",
    title: "True Grind",
    eyebrow: {
      en: "CS2 analytics and demo intelligence",
      ru: "CS2-аналитика и анализ демок",
      de: "CS2-Analytik und Demo-Intelligenz",
    },
    summary: {
      en: "A Counter-Strike 2 platform for authentication, match history, replay artifacts, demo parsing, and public-facing analysis tools.",
      ru: "Платформа Counter-Strike 2 для аутентификации, истории матчей, артефактов повторов, парсинга демок и публичных инструментов анализа.",
      de: "Eine Counter-Strike-2-Plattform fuer Authentifizierung, Matchhistorie, Replay-Artefakte, Demo-Parsing und oeffentliche Analysewerkzeuge.",
    },
    narrative: {
      en: "True Grind combines product work and systems engineering: a public landing experience, account surface, parser worker, Steam sidecar, and replay tooling that turns raw demo files into explorable match data.",
      ru: "True Grind сочетает продуктовую разработку и системную инженерию: публичную посадочную страницу, аккаунтную часть, parser worker, Steam sidecar и replay-инструменты, превращающие сырые демки в исследуемые данные матчей.",
      de: "True Grind verbindet Produktentwicklung mit Systems Engineering: oeffentliche Landing Page, Account-Flaeche, Parser-Worker, Steam-Sidecar und Replay-Tooling, das rohe Demodateien in analysierbare Matchdaten verwandelt.",
    },
    details: {
      en: [
        "Ships as a multi-service stack with a Next.js app, Go parser worker, Steam bot sidecar, PostgreSQL, and shared-proxy deployment.",
        "Handles Steam auth, FACEIT linking, match ingestion, generated replay assets, and public analysis surfaces.",
        "Includes replay and canvas tooling, server-side parsing, and durable storage for artifacts and demo workflows.",
        "Designed for both consumer-facing polish and backend operational stability.",
      ],
      ru: [
        "Поставляется как мультисервисный стек: Next.js-приложение, Go parser worker, Steam bot sidecar, PostgreSQL и deployment через shared-proxy.",
        "Обрабатывает Steam-auth, привязку FACEIT, ingestion матчей, генерацию replay-артефактов и публичные поверхности анализа.",
        "Включает replay- и canvas-инструменты, серверный парсинг и надежное хранение артефактов и демо-процессов.",
        "Спроектирован одновременно под consumer-facing polish и устойчивость backend-операций.",
      ],
      de: [
        "Laeuft als Multi-Service-Stack mit Next.js-App, Go-Parser-Worker, Steam-Bot-Sidecar, PostgreSQL und shared-proxy-Deployment.",
        "Uebernimmt Steam-Auth, FACEIT-Verknuepfung, Match-Ingestion, Replay-Artefakte und oeffentliche Analyseflaechen.",
        "Beinhaltet Replay- und Canvas-Tooling, serverseitiges Parsing und dauerhafte Speicherung von Artefakten und Demo-Workflows.",
        "Auf gleichzeitige Produktqualitaet und operative Backend-Stabilitaet ausgelegt.",
      ],
    },
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Go",
      "PostgreSQL",
      "Steam OpenID",
      "FACEIT",
      "Docker",
    ],
    meta: {
      en: ["public product", "multi-service", "gaming analytics"],
      ru: ["публичный продукт", "мультисервис", "игровая аналитика"],
      de: ["oeffentliches Produkt", "Multi-Service", "Gaming-Analytik"],
    },
    link: "https://true-grind-cs2.online",
    linkLabel: {
      en: "open site",
      ru: "открыть сайт",
      de: "Website oeffnen",
    },
    cover: "truegrind",
  },
  {
    slug: "medura",
    title: "Medura Solution",
    eyebrow: {
      en: "Healthcare SaaS",
      ru: "Healthcare SaaS",
      de: "Healthcare SaaS",
    },
    summary: {
      en: "A GDPR-compliant medical practice management system for German healthcare providers with scheduling, patient portals, dashboards, and multi-tenant access control.",
      ru: "GDPR-совместимая система управления медицинской практикой для немецких провайдеров здравоохранения: расписание, пациентские порталы, дашборды и мультиарендный контроль доступа.",
      de: "Ein DSGVO-konformes Praxismanagement-System fuer deutsche Gesundheitsanbieter mit Terminplanung, Patientenportal, Dashboards und mandantenfaehiger Zugriffskontrolle.",
    },
    narrative: {
      en: "The Medura entry is positioned as a healthcare product case: regulated-domain UX, access boundaries, scheduling flows, and provider-facing operational tooling packaged into a cleaner SaaS surface.",
      ru: "Запись Medura оформлена как healthcare-case: UX в регулируемой доменной области, границы доступа, процессы расписания и операционные инструменты для провайдеров внутри аккуратного SaaS-интерфейса.",
      de: "Medura wird als Healthcare-Case positioniert: UX in einem regulierten Umfeld, Zugriffsgrenzen, Terminablaeufe und provider-seitige Operations-Tools in einer klaren SaaS-Flaeche.",
    },
    details: {
      en: [
        "Centered on appointment management, patient communication, practice dashboards, and role-specific workflows.",
        "Highlights a product language closer to healthcare operations than a generic admin dashboard.",
        "Uses a modern web stack and multi-tenant framing appropriate for clinics and medical teams.",
        "Presented here as a polished public-facing case study entry with service and systems depth.",
      ],
      ru: [
        "Сфокусирована на управлении расписанием, коммуникации с пациентами, кабинетах практик и ролевых рабочих сценариях.",
        "Подчеркивает продуктовый язык, ближе к healthcare-операциям, а не к типичному админ-дашборду.",
        "Использует современный веб-стек и мультиарендную модель, подходящую для клиник и медкоманд.",
        "Представлена здесь как аккуратно оформленный публичный case study с глубиной сервиса и систем.",
      ],
      de: [
        "Konzentriert sich auf Terminmanagement, Patientenkommunikation, Praxis-Dashboards und rollenbezogene Workflows.",
        "Betont eine Produktsprache, die naeher an echten Healthcare-Operations liegt als an generischen Admin-Dashboards.",
        "Setzt auf einen modernen Web-Stack und ein mandantenfaehiges Modell fuer Kliniken und medizinische Teams.",
        "Wird hier als oeffentlich lesbare Case Study mit Produkt- und Systemtiefe praesentiert.",
      ],
    },
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "NextAuth",
      "Tailwind CSS",
    ],
    meta: {
      en: ["public showcase", "healthcare", "multi-tenant"],
      ru: ["публичный кейс", "healthcare", "мультиарендность"],
      de: ["oeffentliche Case Study", "Healthcare", "mandantenfaehig"],
    },
    link: "https://www.medura-solution.com",
    linkLabel: {
      en: "open site",
      ru: "открыть сайт",
      de: "Website oeffnen",
    },
    cover: "medura",
  },
];

export const gameProjects: ProjectEntry[] = [
  {
    slug: "alice-plays",
    title: "Alice Plays",
    eyebrow: {
      en: "Puzzle platform",
      ru: "Платформа головоломок",
      de: "Puzzle-Plattform",
    },
    summary: {
      en: "A multi-game puzzle platform starting with Sudoku, built with social sign-in, cloud saves, leaderboards, PWA behavior, and mobile-first play.",
      ru: "Платформа головоломок, начинающаяся с Sudoku, с social sign-in, облачными сохранениями, лидербордами, PWA-поведением и mobile-first игровым опытом.",
      de: "Eine Puzzle-Plattform, die mit Sudoku startet und Social Sign-in, Cloud-Saves, Leaderboards, PWA-Verhalten und Mobile-First-Spiel liefert.",
    },
    narrative: {
      en: "Alice Plays started from a simple thought: if a puzzle game lives on your phone, it should remember you, come back fast, and never make the quiet part of playing feel like work.",
      ru: "Alice Plays начался с простой мысли: если головоломка живет у тебя в телефоне, она должна помнить тебя, быстро возвращать в игру и не превращать спокойную часть игры в работу.",
      de: "Alice Plays begann mit einem einfachen Gedanken: Wenn ein Puzzle-Spiel auf deinem Telefon lebt, soll es dich wiedererkennen, schnell zurueck sein und die ruhige Seite des Spielens nicht wie Arbeit wirken lassen.",
    },
    details: {
      en: [
        "Starts with Sudoku but is structured as a broader game platform rather than a one-off title.",
        "Supports social authentication, cloud saves, leaderboard patterns, and offline-friendly progressive web app behavior.",
        "Built with a modern React stack tuned for mobile-first interaction.",
        "Presented as a product where polish, retention, and future game extensibility matter equally.",
      ],
      ru: [
        "Начинается с Sudoku, но спроектирована как более широкая игровая платформа, а не единичный тайтл.",
        "Поддерживает social auth, cloud saves, паттерны лидербордов и offline-friendly поведение progressive web app.",
        "Построена на современном React-стеке, настроенном под mobile-first взаимодействие.",
        "Представлена как продукт, где одинаково важны polish, retention и будущая расширяемость на новые игры.",
      ],
      de: [
        "Startet mit Sudoku, ist aber als breitere Spieleplattform statt als einmaliger Titel aufgebaut.",
        "Unterstuetzt Social Auth, Cloud Saves, Leaderboard-Muster und offline-freundliches Progressive-Web-App-Verhalten.",
        "Mit modernem React-Stack fuer Mobile-First-Interaktion gebaut.",
        "Als Produkt praesentiert, bei dem Polishing, Retention und kuenftige Erweiterbarkeit gleich wichtig sind.",
      ],
    },
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "NextAuth",
      "Tailwind CSS",
      "PWA",
    ],
    meta: {
      en: ["public product", "games", "mobile-first"],
      ru: ["публичный продукт", "игры", "mobile-first"],
      de: ["oeffentliches Produkt", "Games", "mobile-first"],
    },
    link: "https://www.alice-plays.online/",
    linkLabel: {
      en: "open platform",
      ru: "открыть платформу",
      de: "Plattform oeffnen",
    },
    cover: "alice",
  },
  {
    slug: "bomb-town",
    title: "Bomb Town",
    eyebrow: {
      en: "Persistent multiplayer warfare",
      ru: "Персистентная мультиплеерная война",
      de: "Persistente Multiplayer-Kriegsfuehrung",
    },
    summary: {
      en: "A persistent multiplayer grid warfare game with a Phaser world renderer, React HUD, authoritative WebSocket server, and PostgreSQL-backed persistence.",
      ru: "Персистентная многопользовательская стратегия на сетке с Phaser-рендером мира, React HUD, authoritative WebSocket server и PostgreSQL-персистентностью.",
      de: "Ein persistentes Multiplayer-Grid-Warfare-Spiel mit Phaser-Renderer, React-HUD, autoritativem WebSocket-Server und PostgreSQL-Persistenz.",
    },
    narrative: {
      en: "Bomb Town sits at the intersection of product design and game systems: live multiplayer state, deterministic rules, server authority, and an intentionally sharp visual identity around territory and escalation.",
      ru: "Bomb Town находится на пересечении продуктового дизайна и игровых систем: живое мультиплеерное состояние, детерминированные правила, server authority и намеренно резкая визуальная идентичность вокруг территории и эскалации.",
      de: "Bomb Town liegt an der Schnittstelle von Produktdesign und Game Systems: Live-Multiplayer-State, deterministische Regeln, Server-Authority und eine scharfe visuelle Sprache rund um Territorium und Eskalation.",
    },
    details: {
      en: [
        "Uses Phaser for the world layer, React for HUD and menus, and a Node.js authoritative game server.",
        "Backed by PostgreSQL with versioned migrations and a deployment path behind the shared VPS proxy.",
        "The project is framed as a systems-heavy game product, not just a front-end prototype.",
        "Case-study emphasis: multiplayer state handling, rules orchestration, and production deployment.",
      ],
      ru: [
        "Использует Phaser для мира, React для HUD и меню и Node.js authoritative game server.",
        "Опирается на PostgreSQL с versioned migrations и deployment-путем за shared VPS proxy.",
        "Проект подается как системно тяжелый игровой продукт, а не просто front-end prototype.",
        "Фокус кейса: обработка мультиплеерного состояния, оркестрация правил и production deployment.",
      ],
      de: [
        "Nutzt Phaser fuer die Welt, React fuer HUD und Menues und einen autoritativen Node.js-Game-Server.",
        "Basiert auf PostgreSQL mit versionierten Migrationen und einem Deployment-Pfad hinter dem gemeinsamen VPS-Proxy.",
        "Das Projekt wird als systems-lastiges Spieleprodukt gezeigt, nicht nur als Frontend-Prototyp.",
        "Case-Study-Fokus: Multiplayer-State-Handling, Regelorchestrierung und produktives Deployment.",
      ],
    },
    stack: ["Phaser", "React", "Node.js", "WebSockets", "PostgreSQL", "Docker"],
    meta: {
      en: ["live game", "authoritative server", "persistent world"],
      ru: ["живая игра", "authoritative server", "персистентный мир"],
      de: ["Live-Spiel", "autoritativer Server", "persistente Welt"],
    },
    link: "https://bomb.town",
    linkLabel: {
      en: "enter game",
      ru: "открыть игру",
      de: "Spiel oeffnen",
    },
    cover: "bombtown",
  },
  {
    slug: "rifle-revolver",
    title: "Rifle Revolver",
    eyebrow: {
      en: "RimWorld weapon mod",
      ru: "Мод оружия для RimWorld",
      de: "RimWorld-Waffenmod",
    },
    summary: {
      en: "A RimWorld weapon mod centered on a rifle-revolver hybrid silhouette, tuning weapon feel, item identity, and battlefield role inside the game’s mod ecosystem.",
      ru: "Мод оружия для RimWorld, построенный вокруг гибридной силуэтной идеи rifle-revolver, с настройкой оружейного ощущения, идентичности предмета и его роли в бою.",
      de: "Ein RimWorld-Waffenmod rund um die Silhouette eines Rifle-Revolver-Hybrids mit Fokus auf Waffencharakter, Item-Identitaet und taktische Rolle.",
    },
    narrative: {
      en: "The value here is not only the workshop release itself but the discipline of translating a weapon concept into readable in-game behavior, balancing, and presentation.",
      ru: "Ценность здесь не только в публикации в Workshop, но и в дисциплине перевода оружейной идеи в читаемое игровое поведение, баланс и подачу.",
      de: "Der Wert liegt nicht nur im Workshop-Release, sondern in der Disziplin, ein Waffenkonzept in lesbares Spielverhalten, Balancing und Praesentation zu uebersetzen.",
    },
    details: {
      en: [
        "Presented as a crafted content mod rather than a throwaway asset pack.",
        "Focuses on weapon fantasy, tactical readability, and the fit of a new firearm inside RimWorld combat loops.",
        "Shown here as part of the broader game-development section, alongside original game and systems work.",
        "Custom-designed card replaces default embed treatment for a cleaner portfolio presentation.",
      ],
      ru: [
        "Подается как аккуратно сделанный контентный мод, а не одноразовый asset pack.",
        "Фокусируется на weapon fantasy, тактической читаемости и том, как новое оружие встраивается в боевые циклы RimWorld.",
        "Показан здесь как часть более широкого game-development архива рядом с оригинальной игрой и системной работой.",
        "Кастомно оформленная карточка заменяет дефолтный embed ради более чистой портфельной подачи.",
      ],
      de: [
        "Wird als sorgfaeltig gebauter Content-Mod und nicht als Wegwerf-Asset-Pack praesentiert.",
        "Fokussiert auf Weapon Fantasy, taktische Lesbarkeit und die Einbettung einer neuen Waffe in die Combat-Loops von RimWorld.",
        "Wird hier als Teil eines groesseren Game-Development-Archivs gezeigt, neben originaler Spiel- und Systemarbeit.",
        "Eine eigene Karteninszenierung ersetzt Standard-Embeds fuer eine sauberere Portfolio-Praesentation.",
      ],
    },
    stack: [
      "RimWorld",
      "Steam Workshop",
      "Game Data",
      "Weapon Design",
      "Balancing",
    ],
    meta: {
      en: ["workshop release", "weapon design", "modding"],
      ru: ["workshop-релиз", "weapon design", "моддинг"],
      de: ["Workshop-Release", "Weapon Design", "Modding"],
    },
    link: "https://steamcommunity.com/sharedfiles/filedetails/?id=2612445210",
    linkLabel: {
      en: "view workshop page",
      ru: "страница workshop",
      de: "Workshop-Seite",
    },
    cover: "rifle",
  },
  {
    slug: "incendiary-revolver",
    title: "Incendiary Revolver",
    eyebrow: {
      en: "RimWorld weapon mod",
      ru: "Мод оружия для RimWorld",
      de: "RimWorld-Waffenmod",
    },
    summary: {
      en: "A RimWorld revolver mod built around incendiary identity, emphasizing fire-driven combat flavor, encounter shaping, and the theatrical side of weapon design.",
      ru: "Мод револьвера для RimWorld с выраженной зажигательной идентичностью, акцентом на огненный боевой характер, форму столкновений и театральность оружейного дизайна.",
      de: "Ein RimWorld-Revolvermod mit klarer Brand-Identitaet, Fokus auf feuergetriebene Kampfcharakteristik und die theatralische Seite von Weapon Design.",
    },
    narrative: {
      en: "This entry highlights how small-scale game work can still carry strong authorship: a single weapon concept, a clear fantasy, and a better-than-default presentation layer.",
      ru: "Эта запись показывает, что даже малый игровой проект может нести сильное авторство: одна концепция оружия, четкая fantasy и презентация лучше дефолтной.",
      de: "Dieser Eintrag zeigt, dass auch kleinformatige Spielearbeit starke Autorschaft tragen kann: ein klares Waffenkonzept, eine deutliche Fantasy und eine bessere Praesentation als der Standard.",
    },
    details: {
      en: [
        "Built as a custom showcase card rather than a raw workshop embed.",
        "Centers on incendiary personality, weapon readability, and combat flavor inside RimWorld.",
        "Complements Bomb Town by showing a different scale of game work: focused modding instead of full-stack multiplayer systems.",
        "Linked directly to Steam Workshop for the original release page.",
      ],
      ru: [
        "Оформлен как кастомная showcase-карточка, а не сырой workshop-embed.",
        "Сосредоточен на зажигательной личности оружия, читаемости и боевом вкусе внутри RimWorld.",
        "Дополняет Bomb Town, показывая другой масштаб game work: сфокусированный моддинг вместо full-stack multiplayer systems.",
        "Ссылается напрямую на Steam Workshop со страницей оригинального релиза.",
      ],
      de: [
        "Als eigene Showcase-Karte statt als roher Workshop-Embed aufgebaut.",
        "Fokussiert auf Brand-Persoenlichkeit, Waffenlesbarkeit und Combat-Flavour in RimWorld.",
        "Ergaenzt Bomb Town, indem es eine andere Groessenordnung von Game Work zeigt: fokussiertes Modding statt Full-Stack-Multiplayer-Systeme.",
        "Direkt mit der Steam-Workshop-Seite des Original-Releases verlinkt.",
      ],
    },
    stack: [
      "RimWorld",
      "Steam Workshop",
      "Combat Flavor",
      "Weapon Design",
      "Modding",
    ],
    meta: {
      en: ["workshop release", "incendiary theme", "modding"],
      ru: ["workshop-релиз", "огненная тема", "моддинг"],
      de: ["Workshop-Release", "Brand-Thema", "Modding"],
    },
    link: "https://steamcommunity.com/sharedfiles/filedetails/?id=2615335684",
    linkLabel: {
      en: "view workshop page",
      ru: "страница workshop",
      de: "Workshop-Seite",
    },
    cover: "incendiary",
  },
];

export const experiences: ExperienceEntry[] = [
  {
    slug: "ocumeda",
    title: {
      en: "Senior Cloud Engineer",
      ru: "Senior Cloud Engineer",
      de: "Senior Cloud Engineer",
    },
    company: "Ocumeda GmbH",
    range: "Apr 2026 - Present",
    location: "Munich, Bavaria, Germany",
    summary: {
      en: "Owning cloud platform and infrastructure, with AI-agent integration and cross-team delivery support.",
      ru: "Ответственность за облачную платформу и инфраструктуру, интеграцию AI-агентов и поддержку поставки между командами.",
      de: "Verantwortung fuer Cloud-Plattform und Infrastruktur, AI-Agenten-Integration und technische Unterstuetzung ueber Teamgrenzen hinweg.",
    },
    details: {
      en: [
        "Own cloud platform and infrastructure, including provisioning, scalability, and reliability across environments.",
        "Implement custom AI agents and integrate AI tooling to automate workflows and extend platform capability.",
        "Collaborate with external teams and support delivery with technical guidance and alignment.",
      ],
      ru: [
        "Веду облачную платформу и инфраструктуру: provisioning, scalability и reliability между окружениями.",
        "Реализую кастомных AI-агентов и интегрирую AI-инструменты для автоматизации процессов и расширения возможностей платформы.",
        "Работаю с внешними командами и поддерживаю поставку через техническое сопровождение и выравнивание решений.",
      ],
      de: [
        "Verantworte Cloud-Plattform und Infrastruktur inklusive Provisioning, Skalierung und Zuverlaessigkeit ueber mehrere Umgebungen.",
        "Implementiere eigene AI-Agenten und integriere AI-Tooling zur Automatisierung von Workflows und Erweiterung der Plattformfaehigkeiten.",
        "Arbeite mit externen Teams zusammen und begleite Lieferprozesse mit technischer Fuehrung und Alignment.",
      ],
    },
    stack: [
      "Cloud Infrastructure",
      "AI Agents",
      "Automation",
      "Platform Engineering",
    ],
    cover: "cloud",
  },
  {
    slug: "june",
    title: {
      en: "Software Engineer",
      ru: "Software Engineer",
      de: "Software Engineer",
    },
    company: "June GmbH",
    range: "Jan 2025 - Mar 2026",
    location: "Munich, Bavaria, Germany",
    summary: {
      en: "Full-stack analytics product work, Angular modernization, and Azure/Terraform platform ownership.",
      ru: "Full-stack разработка аналитического продукта, модернизация Angular и владение Azure/Terraform платформой.",
      de: "Full-Stack-Arbeit an einem Analytics-Produkt, Angular-Modernisierung und Plattformverantwortung auf Azure/Terraform.",
    },
    details: {
      en: [
        "Built analytics platform features with C#, .NET, TypeScript, and Angular for processing and visualizing business metrics.",
        "Refactored a legacy Angular application and migrated 50+ components from deprecated Material UI patterns to the current Angular stack.",
        "Managed infrastructure as code with Terraform and Azure Cloud, including CI/CD, monitoring, and observability.",
        "Mentored two junior developers on full-stack engineering practices.",
      ],
      ru: [
        "Разрабатывал функции аналитической платформы на C#, .NET, TypeScript и Angular для обработки и визуализации бизнес-метрик.",
        "Рефакторил legacy Angular-приложение и мигрировал более 50 компонентов с устаревших Material UI-паттернов на актуальный Angular-стек.",
        "Вел infrastructure as code на Terraform и Azure Cloud, включая CI/CD, monitoring и observability.",
        "Менторил двух junior-разработчиков по full-stack практикам.",
      ],
      de: [
        "Entwickelte Analytics-Features mit C#, .NET, TypeScript und Angular zur Verarbeitung und Visualisierung von Business-Metriken.",
        "Refaktorierte eine Legacy-Angular-Anwendung und migrierte mehr als 50 Komponenten von veralteten Material-UI-Mustern auf den aktuellen Angular-Stack.",
        "Verwaltete Infrastructure as Code mit Terraform und Azure Cloud inklusive CI/CD, Monitoring und Observability.",
        "Mentorierte zwei Junior-Entwickler in Full-Stack-Engineering-Praktiken.",
      ],
    },
    stack: ["C#", ".NET", "TypeScript", "Angular", "Terraform", "Azure"],
    cover: "analytics",
  },
  {
    slug: "toptal",
    title: {
      en: "Senior Software / Platform Engineer (Freelance)",
      ru: "Senior Software / Platform Engineer (Freelance)",
      de: "Senior Software / Platform Engineer (Freelance)",
    },
    company: "Toptal",
    range: "Feb 2022 - Jan 2026",
    location: "Munich, Bavaria, Germany",
    summary: {
      en: "Freelance platform delivery across analytics, frontend architecture, and full-stack product systems.",
      ru: "Фриланс-поставка платформ и продуктов: аналитика, frontend-архитектура и full-stack системы.",
      de: "Freelance-Lieferung von Plattformen und Produkten ueber Analytics, Frontend-Architektur und Full-Stack-Systeme hinweg.",
    },
    details: {
      en: [
        "Led platform development for Acclinate Inc., building analytics and data-processing systems.",
        "Mentored engineers on frontend architecture patterns, state management, and authentication implementation.",
        "Delivered full-stack solutions across client projects with NestJS, Ruby on Rails, Vue, and Webflow, from requirements through production deployment.",
      ],
      ru: [
        "Вел платформенную разработку для Acclinate Inc., создавая аналитические и data-processing системы.",
        "Менторил инженеров по frontend-архитектуре, state management и реализации аутентификации.",
        "Поставлял full-stack решения для клиентских проектов на NestJS, Ruby on Rails, Vue и Webflow — от требований до production deployment.",
      ],
      de: [
        "Leitete die Plattformentwicklung fuer Acclinate Inc. und baute Analytics- sowie Data-Processing-Systeme.",
        "Mentorierte Ingenieure in Frontend-Architekturmustern, State Management und Authentifizierungsimplementierung.",
        "Lieferte Full-Stack-Loesungen fuer mehrere Kundenprojekte mit NestJS, Ruby on Rails, Vue und Webflow vom Requirements-Scope bis zum produktiven Deployment.",
      ],
    },
    stack: [
      "NestJS",
      "Ruby on Rails",
      "Vue",
      "Webflow",
      "Architecture",
      "Mentoring",
    ],
    cover: "platform",
  },
  {
    slug: "upwork",
    title: {
      en: "Senior Software Engineer (Freelance)",
      ru: "Senior Software Engineer (Freelance)",
      de: "Senior Software Engineer (Freelance)",
    },
    company: "Upwork",
    range: "Feb 2021 - Jan 2026",
    location: "Munich, Bavaria, Germany",
    summary: {
      en: "Client delivery spanning testing strategy, React product work, and AWS-backed application delivery.",
      ru: "Клиентская поставка от стратегии тестирования до React-продуктов и приложений на AWS.",
      de: "Kundenprojekte von Teststrategie ueber React-Produktarbeit bis zu AWS-gestuetzter Applikationslieferung.",
    },
    details: {
      en: [
        "Developed a comprehensive testing strategy for Elunic AG with unit, integration, and end-to-end coverage plus CI/CD integration.",
        "Built frontend features with React and TypeScript for RemoteAmbition’s remote work platform.",
        "Delivered complete applications for Variant Perception using JavaScript, React, Node.js, and AWS Serverless across architecture, implementation, testing, and deployment.",
      ],
      ru: [
        "Разработал комплексную стратегию тестирования для Elunic AG: unit, integration и end-to-end покрытие с интеграцией в CI/CD.",
        "Создавал frontend-функции на React и TypeScript для платформы удаленной работы RemoteAmbition.",
        "Поставлял полные приложения для Variant Perception на JavaScript, React, Node.js и AWS Serverless — от архитектуры до тестирования и релиза.",
      ],
      de: [
        "Entwickelte fuer Elunic AG eine umfassende Teststrategie mit Unit-, Integrations- und End-to-End-Abdeckung samt CI/CD-Integration.",
        "Baute Frontend-Features mit React und TypeScript fuer die Remote-Work-Plattform von RemoteAmbition.",
        "Lieferte komplette Anwendungen fuer Variant Perception mit JavaScript, React, Node.js und AWS Serverless von Architektur bis Deployment.",
      ],
    },
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "AWS Serverless",
      "Testing",
      "CI/CD",
    ],
    cover: "delivery",
  },
  {
    slug: "ingenics",
    title: {
      en: "Software Engineer",
      ru: "Software Engineer",
      de: "Software Engineer",
    },
    company: "Ingenics Digital GmbH",
    range: "Aug 2023 - Jan 2025",
    location: "Munich, Bavaria, Germany",
    summary: {
      en: "Led the refactor of a legacy monolith into a modern Java/Spring and React/TypeScript architecture.",
      ru: "Вел рефакторинг legacy-монолита в современную архитектуру на Java/Spring и React/TypeScript.",
      de: "Fuehrte das Refactoring eines Legacy-Monolithen in eine moderne Java/Spring- und React/TypeScript-Architektur.",
    },
    details: {
      en: [
        "Led a team of two developers to reverse-engineer and refactor the legacy eGas application.",
        "Rebuilt the backend with Java and Spring using a new service layer and improved data-access patterns.",
        "Architected and implemented the frontend in React and TypeScript, defining component and state-management structure.",
      ],
      ru: [
        "Руководил командой из двух разработчиков по reverse engineering и рефакторингу legacy-приложения eGas.",
        "Перестроил backend на Java и Spring с новым service layer и улучшенными data-access паттернами.",
        "Спроектировал и реализовал frontend на React и TypeScript, задав структуру компонентов и state management.",
      ],
      de: [
        "Fuehrte ein Team von zwei Entwicklern beim Reverse Engineering und Refactoring der Legacy-Anwendung eGas.",
        "Baute das Backend mit Java und Spring neu auf, inklusive neuer Service-Schicht und verbesserter Data-Access-Muster.",
        "Entwarf und implementierte das Frontend in React und TypeScript inklusive Komponenten- und State-Management-Struktur.",
      ],
    },
    stack: ["Java", "Spring", "React", "TypeScript", "Legacy Modernization"],
    cover: "refactor",
  },
  {
    slug: "boldly-go",
    title: {
      en: "Tech Consulting",
      ru: "Tech Consulting",
      de: "Tech Consulting",
    },
    company: "Boldly Go Industries GmbH",
    range: "Dec 2022 - Jul 2023",
    location: "Munich, Bavaria, Germany",
    summary: {
      en: "Technical consulting and custom application delivery across Angular, .NET, and Laravel systems.",
      ru: "Технический консалтинг и кастомная разработка приложений на Angular, .NET и Laravel.",
      de: "Technische Beratung und kundenspezifische App-Entwicklung ueber Angular-, .NET- und Laravel-Systeme.",
    },
    details: {
      en: [
        "Consulted on technical architecture for client work, including a conveyor-line management system.",
        "Developed responsive frontend interfaces in TypeScript and Angular.",
        "Built backend APIs and business logic with C# .NET and PHP Laravel plus database integration.",
      ],
      ru: [
        "Консультировал по технической архитектуре клиентских проектов, включая систему управления конвейерной линией.",
        "Разрабатывал адаптивные frontend-интерфейсы на TypeScript и Angular.",
        "Создавал backend API и бизнес-логику на C# .NET и PHP Laravel с интеграцией базы данных.",
      ],
      de: [
        "Beriet Kundenprojekte in technischer Architektur, darunter ein System zur Steuerung von Foerderlinien.",
        "Entwickelte responsive Frontends mit TypeScript und Angular.",
        "Baute Backend-APIs und Business-Logik mit C# .NET und PHP Laravel inklusive Datenbankanbindung.",
      ],
    },
    stack: ["TypeScript", "Angular", "C#", ".NET", "PHP", "Laravel"],
    cover: "consulting",
  },
  {
    slug: "bits",
    title: {
      en: "Software Developer",
      ru: "Software Developer",
      de: "Software Developer",
    },
    company: "BITS GmbH",
    range: "Jan 2022 - Dec 2022",
    location: "Munich, Bavaria, Germany",
    summary: {
      en: "Led PRISMA, a multi-clinic patient monitoring system handling questionnaire data and physician alerts.",
      ru: "Вел PRISMA — систему мониторинга пациентов для нескольких клиник с обработкой анкет и уведомлениями врачей.",
      de: "Leitete PRISMA, ein Multi-Klinik-System zur Patientenueberwachung mit Fragebogendaten und Arzt-Benachrichtigungen.",
    },
    details: {
      en: [
        "Led development of PRISMA, serving 10,000+ breast cancer patients across multiple medical facilities.",
        "Architected the relational database schema and implemented physician alerting for medically concerning responses.",
        "Built the frontend in TypeScript and Angular and the backend with Java Spring, MySQL, and Hibernate while mentoring two junior developers.",
      ],
      ru: [
        "Руководил разработкой PRISMA для 10 000+ пациентов с раком груди в нескольких медучреждениях.",
        "Спроектировал реляционную схему базы данных и систему уведомлений врачей при потенциально тревожных ответах пациентов.",
        "Создавал frontend на TypeScript и Angular и backend на Java Spring, MySQL и Hibernate, одновременно менторя двух junior-разработчиков.",
      ],
      de: [
        "Leitete die Entwicklung von PRISMA fuer mehr als 10.000 Brustkrebspatientinnen ueber mehrere Kliniken hinweg.",
        "Entwarf das relationale Datenbankschema und implementierte ein Alarmierungssystem fuer medizinisch kritische Antworten.",
        "Baute das Frontend mit TypeScript und Angular sowie das Backend mit Java Spring, MySQL und Hibernate und mentorierte dabei zwei Junior-Entwickler.",
      ],
    },
    stack: ["TypeScript", "Angular", "Java", "Spring", "MySQL", "Hibernate"],
    cover: "medical",
  },
  {
    slug: "bmw",
    title: {
      en: "Software Engineer Intern",
      ru: "Software Engineer Intern",
      de: "Software Engineer Intern",
    },
    company: "BMW Group",
    range: "Mar 2021 - Aug 2021",
    location: "Munich, Bavaria, Germany",
    summary: {
      en: "Built calibration and sensor-visualization tooling for engine test vehicles.",
      ru: "Разрабатывал инструменты калибровки и визуализации сенсорных данных для испытательных автомобилей.",
      de: "Baute Kalibrierungs- und Sensorvisualisierungstools fuer Motor-Testfahrzeuge.",
    },
    details: {
      en: [
        "Developed calibration software to help engineers navigate and interpret engine sensor data during testing.",
        "Built a Vue.js and JavaScript interface for real-time sensor monitoring and historical analysis.",
        "Implemented backend data processing in Flask and Python with Asammdf, Pandas, and Plotly.",
      ],
      ru: [
        "Разрабатывал калибровочное ПО, помогавшее инженерам читать и интерпретировать данные датчиков двигателя во время тестов.",
        "Создал интерфейс на Vue.js и JavaScript для мониторинга сенсоров в реальном времени и исторического анализа.",
        "Реализовал backend-обработку данных на Flask и Python с Asammdf, Pandas и Plotly.",
      ],
      de: [
        "Entwickelte Kalibrierungssoftware, mit der Ingenieure Sensordaten von Motor-Testfahrzeugen auswerten konnten.",
        "Baute ein Interface mit Vue.js und JavaScript fuer Echtzeit-Monitoring und historische Analyse.",
        "Implementierte die Datenverarbeitung im Backend mit Flask, Python, Asammdf, Pandas und Plotly.",
      ],
    },
    stack: ["Vue.js", "JavaScript", "Flask", "Python", "Pandas", "Plotly"],
    cover: "telemetry",
  },
  {
    slug: "capmo",
    title: {
      en: "Working Student Software Developer",
      ru: "Working Student Software Developer",
      de: "Werkstudent Software Developer",
    },
    company: "Capmo",
    range: "Oct 2020 - Mar 2021",
    location: "Munich, Germany",
    summary: {
      en: "Delivered business logic, testing infrastructure, and product fixes for a construction management platform.",
      ru: "Разрабатывал бизнес-логику, тестовую инфраструктуру и продуктовые исправления для платформы управления строительством.",
      de: "Lieferte Business-Logik, Test-Infrastruktur und Produktkorrekturen fuer eine Construction-Management-Plattform.",
    },
    details: {
      en: [
        "Developed business logic using React, TypeScript, and GraphQL.",
        "Established an end-to-end testing suite in Cypress with a Page Object Model pattern.",
        "Resolved frontend performance issues, UI inconsistencies, and backend logic errors.",
      ],
      ru: [
        "Разрабатывал бизнес-логику на React, TypeScript и GraphQL.",
        "Построил end-to-end test suite на Cypress с паттерном Page Object Model.",
        "Исправлял проблемы производительности фронтенда, UI-несоответствия и backend logic errors.",
      ],
      de: [
        "Entwickelte Business-Logik mit React, TypeScript und GraphQL.",
        "Baute eine End-to-End-Test-Suite mit Cypress nach dem Page-Object-Model-Muster auf.",
        "Behob Frontend-Performanceprobleme, UI-Inkonsistenzen und Fehler in der Backend-Logik.",
      ],
    },
    stack: ["React", "TypeScript", "GraphQL", "Cypress", "E2E Testing"],
    cover: "testing",
  },
  {
    slug: "metoda",
    title: {
      en: "Working Student Software Developer",
      ru: "Working Student Software Developer",
      de: "Werkstudent Software Developer",
    },
    company: "Metoda GmbH",
    range: "May 2020 - Oct 2020",
    location: "Munich, Germany",
    summary: {
      en: "Built analytics tools, backend services, and scraping pipelines for eCommerce intelligence.",
      ru: "Создавал аналитические инструменты, backend-сервисы и scraping-пайплайны для eCommerce intelligence.",
      de: "Baute Analytics-Tools, Backend-Services und Scraping-Pipelines fuer eCommerce-Intelligence.",
    },
    details: {
      en: [
        "Built internal analytics tools with Vue.js, Plotly, and Quasar.",
        "Developed backend services in Ruby on Rails and Docker for processing and APIs.",
        "Implemented Selenium-based scraping in Ruby to collect competitive market data.",
      ],
      ru: [
        "Создавал внутренние аналитические инструменты на Vue.js, Plotly и Quasar.",
        "Разрабатывал backend-сервисы на Ruby on Rails и Docker для обработки данных и API.",
        "Реализовал scraping-систему на Selenium и Ruby для сбора конкурентных рыночных данных.",
      ],
      de: [
        "Baute interne Analytics-Tools mit Vue.js, Plotly und Quasar.",
        "Entwickelte Backend-Services mit Ruby on Rails und Docker fuer Verarbeitung und APIs.",
        "Implementierte Selenium-basiertes Scraping in Ruby zur Erhebung von Wettbewerbsdaten.",
      ],
    },
    stack: [
      "Vue.js",
      "Plotly",
      "Quasar",
      "Ruby on Rails",
      "Docker",
      "Selenium",
    ],
    cover: "scraping",
  },
  {
    slug: "iprax",
    title: {
      en: "Working Student Second Line Support",
      ru: "Working Student Second Line Support",
      de: "Werkstudent Second Line Support",
    },
    company: "iPrax Systems GmbH",
    range: "Jan 2020 - May 2020",
    location: "Munich, Germany",
    summary: {
      en: "SQL-heavy support work across reporting, bug diagnosis, testing, and Windows Server environments.",
      ru: "SQL-ориентированная support-работа: отчеты, диагностика багов, тестирование и среды Windows Server.",
      de: "SQL-lastige Support-Arbeit ueber Reporting, Bugdiagnose, Testing und Windows-Server-Umgebungen.",
    },
    details: {
      en: [
        "Generated client reports and business analysis with SQL and Excel.",
        "Diagnosed application bugs and database conflicts on Windows Server environments using SQL.",
        "Performed software testing, documented issues in Jira, and worked with developers on resolution.",
      ],
      ru: [
        "Готовил клиентские отчеты и бизнес-анализ с помощью SQL и Excel.",
        "Диагностировал баги приложений и конфликты в базе данных в средах Windows Server с использованием SQL.",
        "Проводил тестирование, документировал проблемы в Jira и работал с разработчиками над исправлениями.",
      ],
      de: [
        "Erstellte Kundenreports und Business-Analysen mit SQL und Excel.",
        "Diagnostizierte Anwendungsfehler und Datenbankkonflikte in Windows-Server-Umgebungen mit SQL.",
        "Fuehrte Softwaretests durch, dokumentierte Probleme in Jira und arbeitete mit dem Entwicklungsteam an der Behebung.",
      ],
    },
    stack: ["SQL", "Excel", "Windows Server", "Jira", "Testing"],
    cover: "support",
  },
  {
    slug: "grabmaier",
    title: {
      en: "Fertigungspraktikum",
      ru: "Fertigungspraktikum",
      de: "Fertigungspraktikum",
    },
    company: "Grabmaier Feinmechanik und Elektronik GmbH",
    range: "Apr 2019 - Jun 2019",
    location: "Munich, Germany",
    summary: {
      en: "Hands-on manufacturing internship in precision mechanics, electronics, and quality assurance.",
      ru: "Практика в производстве прецизионной механики, электроники и контроля качества.",
      de: "Praxis in Fertigung, Feinmechanik, Elektronik und Qualitaetssicherung.",
    },
    details: {
      en: [
        "Participated in manufacturing processes for precision mechanics and electronics.",
        "Supported production tasks and quality-assurance work.",
      ],
      ru: [
        "Участвовал в производственных процессах прецизионной механики и электроники.",
        "Поддерживал производственные задачи и работы по контролю качества.",
      ],
      de: [
        "Arbeitete in Fertigungsprozessen fuer Feinmechanik und Elektronik mit.",
        "Unterstuetzte Produktion und Qualitaetssicherung.",
      ],
    },
    stack: ["Manufacturing", "Electronics", "Quality Assurance"],
    cover: "precision",
  },
  {
    slug: "neo-taxi",
    title: {
      en: "Lead Developer",
      ru: "Lead Developer",
      de: "Lead Developer",
    },
    company: "NEO TAXI",
    range: "Jan 2018 - Mar 2021",
    location: "Tbilisi, Georgia",
    summary: {
      en: "Led development of a driver and fleet management system integrated with Yandex Fleet for 10,000+ active drivers.",
      ru: "Возглавлял разработку системы управления водителями и флотом, интегрированной с Yandex Fleet, для 10 000+ активных водителей.",
      de: "Leitete die Entwicklung eines Fahrer- und Flottenmanagement-Systems mit Yandex-Fleet-Integration fuer mehr als 10.000 aktive Fahrer.",
    },
    details: {
      en: [
        "Led development of driver and fleet management flows using Angular and TypeScript.",
        "Built backend APIs with NestJS, Prisma, and PostgreSQL to automate registration, onboarding, and fleet operations.",
        "Implemented Telegram bot and Bird.com SMS infrastructure for real-time driver communication.",
      ],
      ru: [
        "Возглавлял разработку driver- и fleet-management потоков на Angular и TypeScript.",
        "Создавал backend API на NestJS, Prisma и PostgreSQL для автоматизации регистрации, onboarding и fleet operations.",
        "Реализовал инфраструктуру Telegram bot и Bird.com SMS для коммуникации с водителями в реальном времени.",
      ],
      de: [
        "Leitete die Entwicklung von Fahrer- und Flottenmanagement-Flows mit Angular und TypeScript.",
        "Baute Backend-APIs mit NestJS, Prisma und PostgreSQL zur Automatisierung von Registrierung, Onboarding und Flottenbetrieb.",
        "Implementierte Telegram-Bot- und Bird.com-SMS-Infrastruktur fuer Echtzeitkommunikation mit Fahrern.",
      ],
    },
    stack: [
      "Angular",
      "TypeScript",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Telegram",
      "Bird.com",
    ],
    cover: "fleet",
  },
];
