import type { Locale } from "./i18n.ts";

type LocalizedRecord<T> = { en: T } & Partial<Record<Locale, T>>;
type LocalizedString = LocalizedRecord<string>;

export interface ProjectEntry {
  slug: string;
  title: string;
  eyebrow: LocalizedString;
  summary: LocalizedString;
  /** Concise card copy; the full summary and evidence remain in the case file. */
  cardSummary?: LocalizedString;
  narrative: LocalizedString;
  details: LocalizedRecord<string[]>;
  stack: string[];
  meta: LocalizedRecord<string[]>;
  link: string;
  linkLabel: LocalizedString;
  status?: LocalizedString;
  sourceLink?: string;
  sourceLinkLabel?: LocalizedString;
  cover: string;
  /** Running in production: earns the LIVE foil on its card. */
  live?: boolean;
  evidence?: {
    role: LocalizedString;
    contribution: LocalizedString;
    constraints: LocalizedString;
    outcomes: LocalizedString;
  };
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
  /** Internship or student role: folded under the main timeline. */
  early?: boolean;
}

/** Owner-confirmed facts shown in the hero (location and availability, October 2026). */
export const profile: { location: LocalizedString; availability: LocalizedString } = {
  location: { en: "Munich / Europe", ru: "Мюнхен / Европа", de: "München / Europa", ge: "მიუნხენი / ევროპა" },
  availability: {
    en: "available for systems work",
    ru: "открыт к сотрудничеству",
    de: "offen für Zusammenarbeit",
    ge: "ღია ვარ თანამშრომლობისთვის",
  },
};

export interface ImpactEntry {
  figure?: LocalizedString;
  text: LocalizedString;
  /** Experience slugs whose details state this result. */
  sources: string[];
}

/** Hero track record. Each line restates facts from the experiences named in `sources`. */
export const impact: ImpactEntry[] = [
  {
    figure: { en: "10,000+", ru: "10 000+", de: "10.000+", ge: "10 000+" },
    text: {
      en: "active drivers on a fleet platform I led",
      ru: "активных водителей на флот-платформе, которую я вёл",
      de: "aktive Fahrer auf einer Flottenplattform unter meiner Leitung",
      ge: "აქტიური მძღოლი ავტოპარკის პლატფორმაზე, რომელსაც ვხელმძღვანელობდი",
    },
    sources: ["neo-taxi"],
  },
  {
    figure: { en: "10,000+", ru: "10 000+", de: "10.000+", ge: "10 000+" },
    text: {
      en: "patients in a multi-clinic monitoring system I led",
      ru: "пациентов в системе мониторинга для нескольких клиник, которую я вёл",
      de: "Patientinnen in einem Multi-Klinik-Monitoring unter meiner Leitung",
      ge: "პაციენტი რამდენიმე კლინიკის მონიტორინგის სისტემაში, რომელსაც ვხელმძღვანელობდი",
    },
    sources: ["bits"],
  },
  {
    figure: { en: "50+", ru: "50+", de: "50+", ge: "50+" },
    text: {
      en: "legacy Angular components modernized; a Java monolith rebuilt",
      ru: "legacy-компонентов Angular модернизировано; Java-монолит перестроен",
      de: "Legacy-Angular-Komponenten modernisiert; einen Java-Monolithen neu aufgebaut",
      ge: "მოძველებული Angular-კომპონენტის მოდერნიზაცია; Java-მონოლითის ხელახლა აწყობა",
    },
    sources: ["june", "ingenics"],
  },
  {
    text: {
      en: "Cloud infrastructure owned end to end: Terraform, CI/CD, AI agents",
      ru: "Облачная инфраструктура под мою ответственность: Terraform, CI/CD, AI-агенты",
      de: "Cloud-Infrastruktur in voller Verantwortung: Terraform, CI/CD, AI-Agenten",
      ge: "ღრუბლოვანი ინფრასტრუქტურა სრულად ჩემს პასუხისმგებლობაზე: Terraform, CI/CD, AI-აგენტები",
    },
    sources: ["june", "ocumeda"],
  },
];

export const projects: ProjectEntry[] = [
  {
    slug: "ypay",
    title: "YPay",
    cardSummary: {
      en: "Fleet payouts with tenant isolation, balance visibility and reconciliation.",
      ru: "Выплаты автопаркам: изоляция клиентов, балансы и сверка платежей.",
      de: "Flottenauszahlungen mit Mandantentrennung, Salden und Zahlungsabgleich.",
      ge: "ავტოპარკების გადახდები, კლიენტების იზოლაცია და ბალანსების შეჯერება.",
    },
    eyebrow: {
      en: "Tenant-aware payout platform",
      ru: "Мультиарендная платформа выплат",
      de: "Mandantenfähige Auszahlungsplattform",
      ge: "ავტოპარკების გადახდის პლატფორმა",
    },
    summary: {
      en: "A live tenant-aware payout platform for mobility fleets, with admin and driver experiences, balance visibility, payout orchestration, and reconciliation.",
      ru: "Действующая мультиарендная платформа выплат для автопарков: интерфейсы для администраторов и водителей, видимость балансов, оркестрация выплат и сверка.",
      de: "Eine produktive, mandantenfähige Auszahlungsplattform für Mobilitätsflotten mit Admin- und Fahreroberflächen, Saldenansicht, Auszahlungsorchestrierung und Abgleich.",
    },
    narrative: {
      en: "YPay is designed around tenant isolation, payout risk control, and infrastructure clarity. The product combines host-bound tenant routing, role-separated admin and driver surfaces, external provider integrations, and an auditable payout lifecycle.",
      ru: "YPay строится вокруг изоляции арендаторов, контроля рисков выплат и прозрачной инфраструктуры. Продукт сочетает host-bound маршрутизацию арендаторов, разделенные интерфейсы для админов и водителей, интеграции с внешними провайдерами и аудируемый жизненный цикл выплат.",
      de: "YPay ist auf Mandantentrennung, Risikokontrolle bei Auszahlungen und klare Infrastruktur ausgerichtet. Das Produkt kombiniert host-gebundenes Tenant-Routing, getrennte Admin- und Fahreroberflächen, externe Integrationen und einen auditierbaren Auszahlungsprozess.",
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
        "Enthält Integrationen für Yandex Fleet, Bird Verify und Bank of Georgia für Salden, OTP-Zustellung und Zahlungsanlage.",
        "Unterstützt fahrerseitige Auszahlungsanfragen, Reconciliation-Ansicht und Ereignisverlauf unter Admin-Kontrolle.",
        "Für produktive und Entwicklungs-VPS-Ziele hinter einem gemeinsamen Host-Proxy vorbereitet.",
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
      de: ["öffentliche Plattform", "Tenant-Routing", "Payments"],
      ge: ["პლატფორმა", "ავტოპარკები", "გადახდები"],
    },
    link: "https://ypay.ge",
    linkLabel: {
      en: "open platform",
      ru: "открыть платформу",
      de: "Plattform öffnen",
    },
    cover: "neopay",
    live: true,
    evidence: {
      role: {
        en: "Product and systems engineer",
        ru: "Продуктовый и системный инженер",
        de: "Produkt- und Systementwickler",
        ge: "პროდუქტისა და სისტემების ინჟინერი",
      },
      contribution: {
        en: "Designed and implemented the tenant model, product surfaces, payment integrations, and deployment topology.",
        ru: "Спроектировал и реализовал tenant-модель, продуктовые интерфейсы, платежные интеграции и схему развертывания.",
        de: "Tenant-Modell, Produktoberflächen, Zahlungsintegrationen und Deployment-Topologie konzipiert und umgesetzt.",
        ge: "დავაპროექტე და განვახორციელე tenant-მოდელი, პროდუქტის ინტერფეისები, გადახდის ინტეგრაციები და განთავსების ტოპოლოგია.",
      },
      constraints: {
        en: "Financial operations require strict tenant isolation, auditable state changes, and resilient third-party boundaries.",
        ru: "Финансовые операции требуют строгой изоляции арендаторов, аудируемых изменений состояния и надежных границ интеграций.",
        de: "Finanzoperationen verlangen strikte Tenant-Trennung, auditierbare Zustandsänderungen und robuste Integrationsgrenzen.",
        ge: "ფინანსური ოპერაციები მოითხოვს tenant-ების მკაცრ იზოლაციას, აუდიტირებად ცვლილებებს და გამძლე ინტეგრაციის საზღვრებს.",
      },
      outcomes: {
        en: "A live platform that gives fleets and drivers one traceable payout lifecycle from balance visibility to reconciliation.",
        ru: "Рабочая платформа с единым отслеживаемым циклом выплаты — от видимости баланса до сверки.",
        de: "Eine produktive Plattform mit einem nachvollziehbaren Auszahlungszyklus von der Saldenansicht bis zur Reconciliation.",
        ge: "მოქმედი პლატფორმა ერთიანი, მიკვლევადი გადახდის ციკლით — ბალანსის ხილვადობიდან შეჯერებამდე.",
      },
    },
  },
  {
    slug: "ydesk",
    title: "YDesk",
    cardSummary: {
      en: "Dispatch and support with clear queues, case ownership and reliable notifications.",
      ru: "Диспетчеризация и поддержка: очереди, ответственные и надёжные уведомления.",
      de: "Disposition und Support mit klaren Warteschlangen, Zuständigkeiten und Benachrichtigungen.",
      ge: "დისპეტჩერიზაცია და მხარდაჭერა: რიგები, პასუხისმგებელი პირები და შეტყობინებები.",
    },
    eyebrow: {
      en: "Multi-tenant dispatch operations",
      ru: "Мультиарендные диспетчерские операции",
      de: "Mandantenfähige Disposition",
      ge: "დისპეტჩერიზაცია და მხარდაჭერა",
    },
    summary: {
      en: "A production dispatch and support workspace for tenant operations, real-time workflows, notification workers, and accountable case handling.",
      ru: "Рабочее пространство диспетчеризации и поддержки для tenant-операций, процессов в реальном времени, уведомлений и контролируемой обработки обращений.",
      de: "Ein produktiver Dispatch- und Support-Arbeitsplatz für Tenant-Operations, Echtzeitabläufe, Benachrichtigungen und nachvollziehbare Fallbearbeitung.",
    },
    narrative: {
      en: "YDesk turns operational traffic into a clear working surface: tenant-specific domains, role-aware queues, durable records, integrations, and background notifications under one deployment model.",
      ru: "YDesk превращает операционный поток в понятную рабочую среду: tenant-домены, ролевые очереди, надежные записи, интеграции и фоновые уведомления.",
      de: "YDesk macht operativen Verkehr zu einer klaren Arbeitsfläche: Tenant-Domains, rollenbezogene Queues, dauerhafte Datensätze, Integrationen und Hintergrundbenachrichtigungen.",
    },
    details: {
      en: [
        "Combines a Next.js operations surface, PostgreSQL, support notification worker, and tenant-aware routing.",
        "Separates administrative and tenant workflows while keeping auditable operational records.",
        "Runs as a production multi-service stack behind the shared VPS proxy.",
      ],
    },
    stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Workers", "Docker"],
    meta: {
      en: ["live platform", "multi-tenant", "operations"],
      ru: ["действующая платформа", "изоляция клиентов", "операции"],
      de: ["im Einsatz", "Mandantentrennung", "Betrieb"],
      ge: ["მოქმედი პლატფორმა", "იზოლაცია", "ოპერაციები"],
    },
    link: "https://ydesk.org",
    linkLabel: {
      en: "open site",
      ru: "открыть сайт",
      de: "Website öffnen",
    },
    cover: "neopay",
    live: true,
    evidence: {
      role: {
        en: "Product and systems engineer",
        ru: "Продуктовый и системный инженер",
        de: "Produkt- und Systementwickler",
        ge: "პროდუქტისა და სისტემების ინჟინერი",
      },
      contribution: {
        en: "Built the operational workspace, tenant-aware routing, durable case records, worker notifications, and production stack.",
        ru: "Создал операционное пространство, tenant-aware маршрутизацию, надежные записи обращений, уведомления и production-стек.",
        de: "Operations-Arbeitsplatz, Tenant-Routing, dauerhafte Falldaten, Worker-Benachrichtigungen und Produktionsstack umgesetzt.",
        ge: "შევქმენი საოპერაციო სივრცე, tenant-aware მარშრუტიზაცია, მდგრადი ჩანაწერები, შეტყობინებები და production-სტეკი.",
      },
      constraints: {
        en: "Support work must remain fast under live traffic while preserving ownership, history, and tenant boundaries.",
        ru: "Поддержка должна оставаться быстрой под живой нагрузкой, сохраняя ответственность, историю и границы арендаторов.",
        de: "Support muss unter Live-Traffic schnell bleiben und zugleich Zuständigkeit, Verlauf und Tenant-Grenzen bewahren.",
        ge: "მხარდაჭერა სწრაფი უნდა დარჩეს ცოცხალი დატვირთვისას და ამავე დროს შეინარჩუნოს პასუხისმგებლობა, ისტორია და tenant-საზღვრები.",
      },
      outcomes: {
        en: "A live multi-tenant operations surface with clearer queues, accountable case handling, and durable notification delivery.",
        ru: "Рабочий мультиарендный интерфейс с понятными очередями, контролируемой обработкой обращений и надежными уведомлениями.",
        de: "Eine produktive Multi-Tenant-Oberfläche mit klareren Queues, verantwortlicher Fallbearbeitung und dauerhaften Benachrichtigungen.",
        ge: "მოქმედი multi-tenant საოპერაციო ინტერფეისი მკაფიო რიგებით, პასუხისმგებლიანი დამუშავებით და მდგრადი შეტყობინებებით.",
      },
    },
  },
  {
    slug: "neopoints",
    title: "NeoPoints",
    cardSummary: {
      en: "Driver loyalty with a points ledger, gift catalogue, ranks and missions per park.",
      ru: "Программа лояльности водителей: учёт баллов, каталог подарков, ранги и миссии для каждого парка.",
      de: "Fahrerloyalität mit Punkte-Ledger, Geschenkkatalog, Rängen und Missionen je Flottenpark.",
      ge: "მძღოლების ლოიალობის პროგრამა: ქულების აღრიცხვა, საჩუქრების კატალოგი, რანგები და მისიები.",
    },
    eyebrow: {
      en: "Multi-tenant driver loyalty",
      ru: "Мультиарендная программа лояльности",
      de: "Mandantenfähige Fahrerloyalität",
      ge: "მძღოლების ლოიალობის პლატფორმა",
    },
    summary: {
      en: "A live loyalty platform for Neo Taxi and Neo Delivery drivers: qualifying completed orders earn points in an auditable ledger, redeemed through a gift catalogue, with ranks, missions, leaderboards and tournaments.",
      ru: "Действующая программа лояльности для водителей Neo Taxi и Neo Delivery: выполненные заказы приносят баллы в аудируемом журнале, которые обмениваются на подарки из каталога; есть ранги, миссии, рейтинги и турниры.",
      de: "Eine produktive Loyalitätsplattform für Fahrer von Neo Taxi und Neo Delivery: qualifizierte abgeschlossene Fahrten bringen Punkte in einem prüfbaren Ledger, einlösbar im Geschenkkatalog – mit Rängen, Missionen, Bestenlisten und Turnieren.",
      ge: "მოქმედი ლოიალობის პლატფორმა Neo Taxi-სა და Neo Delivery-ს მძღოლებისთვის: შესრულებული შეკვეთები ქულებს აგროვებს აუდიტირებად ჟურნალში, რომლებიც საჩუქრების კატალოგში იცვლება; რანგები, მისიები, რეიტინგები და ტურნირები.",
    },
    narrative: {
      en: "NeoPoints is built around a balanced, append-only ledger and strict park boundaries. Each park has its own hosts, membership, wallet and activation; identity and SMS codes come from YPay, Yandex Fleet data arrives through a shared Fleet service, and support stays in YDesk.",
      ru: "NeoPoints строится вокруг сбалансированного журнала только на добавление и строгих границ между парками. У каждого парка свои домены, участники, кошелёк и активация; идентификацию и SMS-коды даёт YPay, данные Yandex Fleet приходят через общий Fleet-сервис, а поддержка остаётся в YDesk.",
      de: "NeoPoints basiert auf einem ausgeglichenen, nur anhängenden Ledger und strikten Parkgrenzen. Jeder Park hat eigene Hosts, Mitgliedschaft, Wallet und Aktivierung; Identität und SMS-Codes liefert YPay, Yandex-Fleet-Daten kommen über einen gemeinsamen Fleet-Dienst, Support bleibt in YDesk.",
      ge: "NeoPoints დაფუძნებულია დაბალანსებულ, მხოლოდ დამატებად ჟურნალსა და პარკებს შორის მკაცრ საზღვრებზე. თითოეულ პარკს აქვს საკუთარი დომენები, წევრობა, საფულე და აქტივაცია; იდენტიფიკაციასა და SMS-კოდებს YPay უზრუნველყოფს, Yandex Fleet-ის მონაცემები საერთო Fleet-სერვისით მოდის, მხარდაჭერა კი YDesk-შია.",
    },
    details: {
      en: [
        "Next.js 16 and React 19 app with web, worker, order-board and Fleet processes on PostgreSQL, with jobs and outbox kept in the database.",
        "Points from qualifying completed orders, recorded as immutable, balanced journal entries with audited admin adjustments.",
        "Gift catalogue with stock reservations and Telegram order notifications, plus ranks, missions, seasons, leaderboards, 2x campaigns and public order tournaments.",
        "HMAC-signed internal APIs to YPay for identity, SMS one-time codes and challenge rewards; installable PWA in Georgian, English and Russian.",
      ],
      ru: [
        "Приложение на Next.js 16 и React 19 с процессами web, worker, order-board и Fleet на PostgreSQL; задачи и outbox хранятся в базе.",
        "Баллы за выполненные заказы фиксируются неизменяемыми сбалансированными проводками; корректировки администраторов проходят аудит.",
        "Каталог подарков с резервированием остатков и уведомлениями о заказах в Telegram, а также ранги, миссии, сезоны, рейтинги, акции 2x и публичные турниры по заказам.",
        "Подписанные HMAC внутренние API к YPay для идентификации, SMS-кодов и наград за челленджи; устанавливаемое PWA на грузинском, английском и русском.",
      ],
      de: [
        "Next.js-16- und React-19-Anwendung mit Web-, Worker-, Order-Board- und Fleet-Prozessen auf PostgreSQL; Jobs und Outbox liegen in der Datenbank.",
        "Punkte für qualifizierte abgeschlossene Fahrten als unveränderliche, ausgeglichene Buchungen; Admin-Korrekturen werden auditiert.",
        "Geschenkkatalog mit Bestandsreservierung und Telegram-Benachrichtigungen, dazu Ränge, Missionen, Saisons, Bestenlisten, 2x-Aktionen und öffentliche Fahrtenturniere.",
        "HMAC-signierte interne APIs zu YPay für Identität, SMS-Einmalcodes und Challenge-Prämien; installierbare PWA auf Georgisch, Englisch und Russisch.",
      ],
    },
    stack: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL", "Yandex Fleet", "YPay", "Telegram", "PWA"],
    meta: {
      en: ["live platform", "multi-tenant", "loyalty"],
      ru: ["действующая платформа", "изоляция клиентов", "лояльность"],
      de: ["im Einsatz", "Mandantentrennung", "Loyalität"],
      ge: ["მოქმედი პლატფორმა", "იზოლაცია", "ლოიალობა"],
    },
    link: "https://neopoints.ge",
    linkLabel: {
      en: "open platform",
      ru: "открыть платформу",
      de: "Plattform öffnen",
      ge: "პლატფორმის გახსნა",
    },
    cover: "neopay",
    live: true,
    evidence: {
      role: {
        en: "Product and systems engineer",
        ru: "Продуктовый и системный инженер",
        de: "Produkt- und Systementwickler",
        ge: "პროდუქტისა და სისტემების ინჟინერი",
      },
      contribution: {
        en: "Designed and built the points economy, ledger, tenant model, gift catalogue, gamification, admin workspaces, YPay and Fleet integrations, and release pipeline.",
        ru: "Спроектировал и построил экономику баллов, журнал, tenant-модель, каталог подарков, геймификацию, админ-панели, интеграции с YPay и Fleet и процесс релизов.",
        de: "Punkteökonomie, Ledger, Tenant-Modell, Geschenkkatalog, Gamification, Admin-Arbeitsbereiche, YPay- und Fleet-Integration sowie Release-Pipeline konzipiert und umgesetzt.",
        ge: "დავაპროექტე და ავაწყე ქულების ეკონომიკა, ჟურნალი, tenant-მოდელი, საჩუქრების კატალოგი, გეიმიფიკაცია, ადმინისტრირება, YPay-სა და Fleet-ის ინტეგრაციები და რელიზების პროცესი.",
      },
      constraints: {
        en: "Points carry real value, so every balance must reconcile to journal entries, parks must never see each other's data, and other systems' records stay behind signed APIs.",
        ru: "Баллы имеют реальную ценность: каждый баланс должен сходиться с проводками, парки не должны видеть данные друг друга, а записи других систем доступны только через подписанные API.",
        de: "Punkte haben echten Wert: Jeder Saldo muss mit den Buchungen übereinstimmen, Parks dürfen keine fremden Daten sehen, und Daten anderer Systeme bleiben hinter signierten APIs.",
        ge: "ქულებს რეალური ღირებულება აქვს: ყველა ბალანსი უნდა ემთხვეოდეს ჟურნალის ჩანაწერებს, პარკები ერთმანეთის მონაცემებს ვერ ხედავენ, სხვა სისტემების ჩანაწერები კი მხოლოდ ხელმოწერილი API-ით არის ხელმისაწვდომი.",
      },
      outcomes: {
        en: "A live loyalty program in two fleet parks where drivers earn points on real orders, climb ranks and redeem gifts, with every balance traceable to its ledger entries.",
        ru: "Действующая программа лояльности в двух автопарках: водители получают баллы за реальные заказы, растут в рангах и обменивают баллы на подарки, а каждый баланс прослеживается до проводок.",
        de: "Ein produktives Loyalitätsprogramm in zwei Flottenparks: Fahrer sammeln Punkte für echte Fahrten, steigen in Rängen auf und lösen Geschenke ein – jeder Saldo ist bis zur Buchung nachvollziehbar.",
        ge: "მოქმედი ლოიალობის პროგრამა ორ ავტოპარკში: მძღოლები რეალურ შეკვეთებზე ქულებს აგროვებენ, რანგებში იწევენ და საჩუქრებს იღებენ, ყველა ბალანსი კი ჟურნალის ჩანაწერებამდე მიკვლევადია.",
      },
    },
  },
];

export const toolProjects: ProjectEntry[] = [
  {
    slug: "grindlike",
    title: "Grindlike",
    eyebrow: { en: "CS2 demo intelligence", ru: "Аналитика демозаписей CS2", de: "CS2-Demoanalyse", ge: "CS2-ის ჩანაწერების ანალიზი" },
    cardSummary: {
      en: "Match demos become match history, replays and interactive CS2 analysis.",
      ru: "Демозаписи матчей превращаются в историю, повторы и интерактивную аналитику CS2.",
      de: "Match-Demos werden zu Spielverlauf, Replays und interaktiver CS2-Analyse.",
      ge: "მატჩების ჩანაწერები, გამეორებები და CS2-ის ინტერაქტიული ანალიზი.",
    },
    summary: { en: "Match history, replay artifacts, server-side demo parsing, and explorable Counter-Strike analysis." },
    narrative: { en: "A multi-service analytics system that turns raw match demos into durable, interactive evidence." },
    details: { en: ["Steam and FACEIT identity flows", "Go parser and replay pipeline", "Public and account analysis surfaces"] },
    stack: ["Next.js", "Go", "PostgreSQL", "Steam", "FACEIT"],
    meta: { en: ["live tool", "gaming analytics"], ru: ["действующий продукт", "аналитика игр"], de: ["im Einsatz", "Spielanalyse"], ge: ["მოქმედი პროდუქტი", "თამაშის ანალიზი"] },
    link: "https://grindlike.pro",
    linkLabel: { en: "open tool", ru: "открыть сервис", de: "Anwendung öffnen", ge: "სერვისის გახსნა" },
    cover: "truegrind",
    live: true,
  },
  {
    slug: "raid-signal",
    title: "Raid Signal",
    cardSummary: {
      en: "A Windows squad map with encrypted coordination between desktop and phone.",
      ru: "Карта отряда для Windows с зашифрованной связью между компьютером и телефоном.",
      de: "Eine Windows-Teamkarte mit verschlüsselter Abstimmung zwischen PC und Smartphone.",
      ge: "რაზმის რუკა Windows-ისთვის, დაშიფრული კავშირით კომპიუტერსა და ტელეფონს შორის.",
    },
    eyebrow: {
      en: "Encrypted open-source squad map",
      de: "Verschlüsselte Open-Source-Teamkarte",
      ru: "Зашифрованная карта отряда с открытым кодом",
      ge: "რაზმის დაშიფრული რუკა",
    },
    summary: {
      en: "An open-source Windows raid navigator with local maps and end-to-end encrypted coordination between desktop and phone.",
      de: "Ein quelloffener Windows-Raid-Navigator mit lokalen Karten und Ende-zu-Ende-verschlüsselter Abstimmung zwischen PC und Smartphone.",
      ru: "Windows-навигатор с открытым кодом, локальными картами и сквозным шифрованием связи между компьютером и телефоном.",
      ge: "ღია კოდის რეიდ-ნავიგატორი Windows-ისთვის, ლოკალური რუკებითა და გამჭოლი დაშიფვრით დაცული კავშირით კომპიუტერსა და ტელეფონს შორის.",
    },
    narrative: {
      en: "Coordinates are encrypted on the publishing device; the public relay forwards opaque messages without position history. Source and release evidence are public on GitHub.",
      de: "Koordinaten werden auf dem sendenden Gerät verschlüsselt; das öffentliche Relay leitet undurchsichtige Nachrichten ohne Positionsverlauf weiter. Quellcode und Release-Nachweise sind auf GitHub öffentlich.",
      ru: "Координаты шифруются на отправляющем устройстве; публичный relay передаёт непрозрачные сообщения без истории позиций. Код и доказательства сборки доступны на GitHub.",
      ge: "კოორდინატები გამომცემ მოწყობილობაზე იშიფრება; საჯარო relay გაუშიფრავ შეტყობინებებს პოზიციების ისტორიის გარეშე გადასცემს. კოდი და რელიზის მტკიცებულებები GitHub-ზე საჯაროა.",
    },
    details: {
      en: ["Apache-2.0 original source code", "AES-256-GCM Internet rooms", "Immutable releases with checksum, SBOM and provenance"],
      de: ["Originalquellcode unter Apache-2.0", "AES-256-GCM-Interneträume", "Unveränderliche Releases mit Checksumme, SBOM und Provenienz"],
      ru: ["Исходный код под Apache-2.0", "Интернет-комнаты AES-256-GCM", "Неизменяемые релизы с checksum, SBOM и provenance"],
      ge: ["საწყისი კოდი Apache-2.0 ლიცენზიით", "AES-256-GCM ინტერნეტ-ოთახები", "უცვლელი რელიზები checksum-ით, SBOM-ით და provenance-ით"],
    },
    stack: ["Tauri", "React", "Rust", "WebSockets", "Web Crypto"],
    meta: {
      en: ["open source", "privacy-first"],
      de: ["Open Source", "Privacy-first"],
      ru: ["открытый код", "privacy-first"],
      ge: ["ღია კოდი", "პირადი მონაცემების დაცვა"],
    },
    status: { en: "OPEN SOURCE", de: "OPEN SOURCE", ru: "ОТКРЫТЫЙ КОД", ge: "ღია კოდი" },
    link: "https://signal.mouchsiadis-solutions.com",
    linkLabel: { en: "open Raid Signal", de: "Raid Signal öffnen", ru: "открыть Raid Signal", ge: "Raid Signal-ის გახსნა" },
    sourceLink: "https://github.com/QTtrash/tarkov-map",
    sourceLinkLabel: { en: "view source", de: "Quellcode ansehen", ru: "исходный код", ge: "კოდის ნახვა" },
    cover: "truegrind",
    live: true,
  },
];

export const gameProjects: ProjectEntry[] = [
  {
    slug: "flygod-studios",
    title: "FlyGod Studios",
    eyebrow: { en: "Independent game studio", ru: "Независимая игровая студия", de: "Unabhängiges Spielestudio", ge: "დამოუკიდებელი თამაშების სტუდია" },
    cardSummary: {
      en: "An independent studio for original games, experiments and playable systems.",
      ru: "Независимая студия авторских игр, экспериментов и игровых систем.",
      de: "Ein unabhängiges Studio für eigene Spiele, Experimente und spielbare Systeme.",
      ge: "დამოუკიდებელი სტუდია ორიგინალური თამაშებისა და ექსპერიმენტებისთვის.",
    },
    summary: { en: "A public studio home for authored games, experiments, and the systems that connect them." },
    narrative: { en: "FlyGod Studios gives the game work a coherent release identity without hiding the engineering behind each title." },
    details: { en: ["Independent game releases", "Studio-level presentation", "A growing catalogue of playable systems"] },
    stack: ["Web", "Game systems", "Realtime", "Creative direction"],
    meta: {
      en: ["live studio", "independent games"],
      ru: ["действующая студия", "независимые игры"],
      de: ["aktives Studio", "unabhängige Spiele"],
      ge: ["მოქმედი სტუდია", "დამოუკიდებელი თამაშები"],
    },
    link: "https://flygod.games",
    linkLabel: { en: "open studio" },
    cover: "sillybazaar",
    live: true,
  },
  {
    slug: "alice-plays",
    title: "Alice Plays",
    cardSummary: {
      en: "Mobile puzzles with social sign-in, cloud saves and leaderboards, starting with Sudoku.",
      ru: "Мобильные головоломки с входом через соцсети, облачными сохранениями и рейтингом.",
      de: "Mobile Rätsel mit Social Login, Cloud-Spielständen und Ranglisten – beginnend mit Sudoku.",
      ge: "მობილური თავსატეხები, ღრუბელში შენახული პროგრესი და მოთამაშეთა რეიტინგი.",
    },
    eyebrow: {
      en: "Puzzle platform",
      ru: "Платформа головоломок",
      de: "Puzzle-Plattform",
      ge: "თავსატეხების პლატფორმა",
    },
    summary: {
      en: "A multi-game puzzle platform starting with Sudoku, built with social sign-in, cloud saves, leaderboards, PWA behavior, and mobile-first play.",
      ru: "Платформа головоломок, начинающаяся с Sudoku, с social sign-in, облачными сохранениями, лидербордами, PWA-поведением и mobile-first игровым опытом.",
      de: "Eine Puzzle-Plattform, die mit Sudoku startet und Social Sign-in, Cloud-Saves, Leaderboards, PWA-Verhalten und Mobile-First-Spiel liefert.",
    },
    narrative: {
      en: "Alice Plays started from a simple thought: if a puzzle game lives on your phone, it should remember you, come back fast, and never make the quiet part of playing feel like work.",
      ru: "Alice Plays начался с простой мысли: если головоломка живет у тебя в телефоне, она должна помнить тебя, быстро возвращать в игру и не превращать спокойную часть игры в работу.",
      de: "Alice Plays begann mit einem einfachen Gedanken: Wenn ein Puzzle-Spiel auf deinem Telefon lebt, soll es dich wiedererkennen, schnell zurück sein und die ruhige Seite des Spielens nicht wie Arbeit wirken lassen.",
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
        "Unterstützt Social Auth, Cloud Saves, Leaderboard-Muster und offline-freundliches Progressive-Web-App-Verhalten.",
        "Mit modernem React-Stack für Mobile-First-Interaktion gebaut.",
        "Als Produkt präsentiert, bei dem Polishing, Retention und künftige Erweiterbarkeit gleich wichtig sind.",
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
      de: ["öffentliches Produkt", "Games", "mobile-first"],
      ge: ["თავსატეხები", "მობილური", "თამაშები"],
    },
    link: "https://www.alice-plays.online/",
    linkLabel: {
      en: "open platform",
      ru: "открыть платформу",
      de: "Plattform öffnen",
    },
    cover: "alice",
    live: true,
  },
  {
    slug: "rifle-revolver",
    title: "Rifle Revolver",
    cardSummary: {
      en: "A RimWorld weapon mod combining a rifle silhouette with revolver mechanics.",
      ru: "Оружейный мод для RimWorld: силуэт винтовки и механика револьвера.",
      de: "Ein RimWorld-Waffenmod mit Gewehrsilhouette und Revolvermechanik.",
      ge: "RimWorld-ის მოდი, რომელიც შაშხანასა და რევოლვერს აერთიანებს.",
    },
    eyebrow: {
      en: "RimWorld weapon mod",
      ru: "Мод оружия для RimWorld",
      de: "RimWorld-Waffenmod",
      ge: "იარაღის მოდი RimWorld-ისთვის",
    },
    summary: {
      en: "A RimWorld weapon mod centered on a rifle-revolver hybrid silhouette, tuning weapon feel, item identity, and battlefield role inside the game’s mod ecosystem.",
      ru: "Мод оружия для RimWorld, построенный вокруг гибридной силуэтной идеи rifle-revolver, с настройкой оружейного ощущения, идентичности предмета и его роли в бою.",
      de: "Ein RimWorld-Waffenmod rund um die Silhouette eines Rifle-Revolver-Hybrids mit Fokus auf Waffencharakter, Item-Identität und taktische Rolle.",
    },
    narrative: {
      en: "The value here is not only the workshop release itself but the discipline of translating a weapon concept into readable in-game behavior, balancing, and presentation.",
      ru: "Ценность здесь не только в публикации в Workshop, но и в дисциплине перевода оружейной идеи в читаемое игровое поведение, баланс и подачу.",
      de: "Der Wert liegt nicht nur im Workshop-Release, sondern in der Disziplin, ein Waffenkonzept in lesbares Spielverhalten, Balancing und Präsentation zu übersetzen.",
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
        "Wird als sorgfältig gebauter Content-Mod und nicht als Wegwerf-Asset-Pack präsentiert.",
        "Fokussiert auf Weapon Fantasy, taktische Lesbarkeit und die Einbettung einer neuen Waffe in die Combat-Loops von RimWorld.",
        "Wird hier als Teil eines größeren Game-Development-Archivs gezeigt, neben originaler Spiel- und Systemarbeit.",
        "Eine eigene Karteninszenierung ersetzt Standard-Embeds für eine sauberere Portfolio-Präsentation.",
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
      ge: ["Workshop", "იარაღის დიზაინი", "მოდები"],
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
    cardSummary: {
      en: "A RimWorld revolver mod with incendiary rounds and a distinct combat role.",
      ru: "Револьвер для RimWorld с зажигательными боеприпасами и особой ролью в бою.",
      de: "Ein RimWorld-Revolvermod mit Brandmunition und eigener taktischer Rolle.",
      ge: "RimWorld-ის რევოლვერის მოდი ცეცხლგამჩენი საბრძოლო მასალით.",
    },
    eyebrow: {
      en: "RimWorld weapon mod",
      ru: "Мод оружия для RimWorld",
      de: "RimWorld-Waffenmod",
      ge: "იარაღის მოდი RimWorld-ისთვის",
    },
    summary: {
      en: "A RimWorld revolver mod built around incendiary identity, emphasizing fire-driven combat flavor, encounter shaping, and the theatrical side of weapon design.",
      ru: "Мод револьвера для RimWorld с выраженной зажигательной идентичностью, акцентом на огненный боевой характер, форму столкновений и театральность оружейного дизайна.",
      de: "Ein RimWorld-Revolvermod mit klarer Brand-Identität, Fokus auf feuergetriebene Kampfcharakteristik und die theatralische Seite von Weapon Design.",
    },
    narrative: {
      en: "This entry highlights how small-scale game work can still carry strong authorship: a single weapon concept, a clear fantasy, and a better-than-default presentation layer.",
      ru: "Эта запись показывает, что даже малый игровой проект может нести сильное авторство: одна концепция оружия, четкая fantasy и презентация лучше дефолтной.",
      de: "Dieser Eintrag zeigt, dass auch kleinformatige Spielearbeit starke Autorschaft tragen kann: ein klares Waffenkonzept, eine deutliche Fantasy und eine bessere Präsentation als der Standard.",
    },
    details: {
      en: [
        "Built as a custom showcase card rather than a raw workshop embed.",
        "Centers on incendiary personality, weapon readability, and combat flavor inside RimWorld.",
        "Linked directly to Steam Workshop for the original release page.",
      ],
      ru: [
        "Оформлен как кастомная showcase-карточка, а не сырой workshop-embed.",
        "Сосредоточен на зажигательной личности оружия, читаемости и боевом вкусе внутри RimWorld.",
        "Ссылается напрямую на Steam Workshop со страницей оригинального релиза.",
      ],
      de: [
        "Als eigene Showcase-Karte statt als roher Workshop-Embed aufgebaut.",
        "Fokussiert auf Brand-Persönlichkeit, Waffenlesbarkeit und Combat-Flavour in RimWorld.",
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
      ge: ["Workshop", "ცეცხლგამჩენი იარაღი", "მოდები"],
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
    slug: "alexander-thamm",
    title: {
      en: "Senior Software Engineer",
      ru: "Senior Software Engineer",
      de: "Senior Software Engineer",
    },
    company: "Alexander Thamm GmbH",
    range: "Oct 2026 - Present",
    location: "Munich, Germany",
    summary: {
      en: "Software engineering at a data and AI consultancy serving enterprise and mid-sized clients across the DACH region.",
      ru: "Разработка ПО в консалтинговой компании в области данных и AI для корпоративных клиентов и среднего бизнеса в регионе DACH.",
      de: "Softwareentwicklung bei einer Data- und AI-Beratung für Konzerne und Mittelständler im DACH-Raum.",
    },
    details: {
      en: ["Deliver software engineering for client data and AI initiatives, from technical design through implementation and production readiness."],
      ru: ["Веду разработку для клиентских проектов в области данных и AI — от технического дизайна до реализации и готовности к продакшену."],
      de: ["Liefere Softwareentwicklung für Data- und AI-Initiativen von Kunden, vom technischen Design über die Umsetzung bis zur Produktionsreife."],
    },
    stack: ["Software Engineering", "Data & AI", "Consulting"],
    cover: "consulting",
  },
  {
    slug: "ocumeda",
    title: {
      en: "Senior Cloud Engineer",
      ru: "Senior Cloud Engineer",
      de: "Senior Cloud Engineer",
    },
    company: "Ocumeda GmbH",
    range: "Apr 2026 - Sep 2026",
    location: "Munich, Germany",
    summary: {
      en: "Owned cloud platform and infrastructure, with AI-agent integration and cross-team delivery support.",
      ru: "Ответственность за облачную платформу и инфраструктуру, интеграцию AI-агентов и поддержку поставки между командами.",
      de: "Verantwortung für Cloud-Plattform und Infrastruktur, AI-Agenten-Integration und technische Unterstützung über Teamgrenzen hinweg.",
    },
    details: {
      en: [
        "Owned cloud platform and infrastructure, including provisioning, scalability, and reliability across environments.",
        "Implemented custom AI agents and integrated AI tooling to automate workflows and extend platform capability.",
        "Collaborated with external teams and supported delivery with technical guidance and alignment.",
      ],
      ru: [
        "Вёл облачную платформу и инфраструктуру: provisioning, scalability и reliability между окружениями.",
        "Реализовал кастомных AI-агентов и интегрировал AI-инструменты для автоматизации процессов и расширения возможностей платформы.",
        "Работал с внешними командами и поддерживал поставку через техническое сопровождение и выравнивание решений.",
      ],
      de: [
        "Verantwortete Cloud-Plattform und Infrastruktur inklusive Provisioning, Skalierung und Zuverlässigkeit über mehrere Umgebungen.",
        "Implementierte eigene AI-Agenten und integrierte AI-Tooling zur Automatisierung von Workflows und Erweiterung der Plattformfähigkeiten.",
        "Arbeitete mit externen Teams zusammen und begleitete Lieferprozesse mit technischer Führung und Alignment.",
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
    company: "JUNE GmbH",
    range: "Jan 2025 - Mar 2026",
    location: "Munich, Germany",
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
    slug: "freelance",
    title: {
      en: "Senior Software / Platform Engineer (Freelance)",
      ru: "Senior Software / Platform Engineer (Freelance)",
      de: "Senior Software / Platform Engineer (Freelance)",
    },
    company: "Toptal, Upwork & direct clients",
    range: "Feb 2021 - Jan 2026",
    location: "Remote / Munich, Germany",
    summary: {
      en: "Freelance product and platform delivery for healthcare, fintech, industrial, analytics and e-commerce clients, from technical design to production support.",
      ru: "Фриланс-разработка продуктов и платформ для клиентов из здравоохранения, финтеха, промышленности, аналитики и e-commerce — от технического дизайна до поддержки в продакшене.",
      de: "Freelance-Produkt- und Plattformentwicklung für Kunden aus Healthcare, Fintech, Industrie, Analytics und E-Commerce – vom technischen Design bis zum Produktionsbetrieb.",
    },
    details: {
      en: [
        "Led core platform development for Acclinate Inc. (clinical-research data) with NestJS, Angular, TypeORM, PostgreSQL, Auth0 and GCP, and mentored two engineers.",
        "Designed a domain-specific language for configurable traffic rules at Exceed Solutions and built visitor-recovery tooling on Node.js, MongoDB, Kubernetes and GCP.",
        "Built backend services and payment integrations with Passport.js, IBEX and Lightspark for Tanzer Holdings' custodial financial-services product.",
        "Established Cypress/Jest end-to-end testing and CI/CD as lead QA engineer at elunic AG for industrial IoT software.",
        "Delivered React, Vue, Node.js and AWS Serverless features for Variant Perception, RemoteAmbition, BizMiner and Bitbo, plus travel-data scrapers for Ota.",
      ],
      ru: [
        "Вёл разработку ядра платформы Acclinate Inc. (данные клинических исследований) на NestJS, Angular, TypeORM, PostgreSQL, Auth0 и GCP и менторил двух инженеров.",
        "Спроектировал предметно-ориентированный язык для настраиваемых правил трафика в Exceed Solutions и создал инструменты возврата посетителей на Node.js, MongoDB, Kubernetes и GCP.",
        "Разработал backend-сервисы и платёжные интеграции на Passport.js, IBEX и Lightspark для кастодиального финансового продукта Tanzer Holdings.",
        "Выстроил end-to-end тестирование на Cypress/Jest и CI/CD в роли ведущего QA-инженера в elunic AG для промышленного IoT-ПО.",
        "Поставлял функции на React, Vue, Node.js и AWS Serverless для Variant Perception, RemoteAmbition, BizMiner и Bitbo, а также скраперы туристических данных для Ota.",
      ],
      de: [
        "Leitete die Kernplattform-Entwicklung für Acclinate Inc. (klinische Forschungsdaten) mit NestJS, Angular, TypeORM, PostgreSQL, Auth0 und GCP und mentorierte zwei Ingenieure.",
        "Entwarf bei Exceed Solutions eine domänenspezifische Sprache für konfigurierbare Traffic-Regeln und baute Visitor-Recovery-Tools mit Node.js, MongoDB, Kubernetes und GCP.",
        "Entwickelte Backend-Dienste und Zahlungsintegrationen mit Passport.js, IBEX und Lightspark für das Custody-Finanzprodukt von Tanzer Holdings.",
        "Etablierte als Lead QA Engineer bei elunic AG End-to-End-Tests mit Cypress/Jest und CI/CD für industrielle IoT-Software.",
        "Lieferte React-, Vue-, Node.js- und AWS-Serverless-Features für Variant Perception, RemoteAmbition, BizMiner und Bitbo sowie Reisedaten-Scraper für Ota.",
      ],
    },
    stack: ["NestJS", "Angular", "React", "Node.js", "GCP", "AWS Serverless", "Testing", "CI/CD"],
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
    location: "Munich, Germany",
    summary: {
      en: "Led the refactor of a legacy monolith into a modern Java/Spring and React/TypeScript architecture.",
      ru: "Вел рефакторинг legacy-монолита в современную архитектуру на Java/Spring и React/TypeScript.",
      de: "Führte das Refactoring eines Legacy-Monolithen in eine moderne Java/Spring- und React/TypeScript-Architektur.",
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
        "Führte ein Team von zwei Entwicklern beim Reverse Engineering und Refactoring der Legacy-Anwendung eGas.",
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
      en: "Technical Consultant / Full-stack Developer",
      ru: "Technical Consultant / Full-stack Developer",
      de: "Technical Consultant / Full-stack Developer",
    },
    company: "BOLDLY GO INDUSTRIES GmbH",
    range: "Dec 2022 - Jul 2023",
    location: "Munich, Germany",
    summary: {
      en: "Technical consulting and custom application delivery across Angular, .NET, and Laravel systems.",
      ru: "Технический консалтинг и кастомная разработка приложений на Angular, .NET и Laravel.",
      de: "Technische Beratung und kundenspezifische App-Entwicklung über Angular-, .NET- und Laravel-Systeme.",
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
        "Beriet Kundenprojekte in technischer Architektur, darunter ein System zur Steuerung von Förderlinien.",
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
    location: "Munich, Germany",
    summary: {
      en: "Led PRISMA, a multi-clinic patient monitoring system handling questionnaire data and physician alerts.",
      ru: "Вел PRISMA — систему мониторинга пациентов для нескольких клиник с обработкой анкет и уведомлениями врачей.",
      de: "Leitete PRISMA, ein Multi-Klinik-System zur Patientenüberwachung mit Fragebogendaten und Arzt-Benachrichtigungen.",
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
        "Leitete die Entwicklung von PRISMA für mehr als 10.000 Brustkrebspatientinnen über mehrere Kliniken hinweg.",
        "Entwarf das relationale Datenbankschema und implementierte ein Alarmierungssystem für medizinisch kritische Antworten.",
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
    location: "Munich, Germany",
    summary: {
      en: "Built calibration and sensor-visualization tooling for engine test vehicles.",
      ru: "Разрабатывал инструменты калибровки и визуализации сенсорных данных для испытательных автомобилей.",
      de: "Baute Kalibrierungs- und Sensorvisualisierungstools für Motor-Testfahrzeuge.",
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
        "Baute ein Interface mit Vue.js und JavaScript für Echtzeit-Monitoring und historische Analyse.",
        "Implementierte die Datenverarbeitung im Backend mit Flask, Python, Asammdf, Pandas und Plotly.",
      ],
    },
    stack: ["Vue.js", "JavaScript", "Flask", "Python", "Pandas", "Plotly"],
    cover: "telemetry",
    early: true,
  },
  {
    slug: "capmo",
    title: {
      en: "Working Student Software Developer",
      ru: "Working Student Software Developer",
      de: "Working Student Software Developer",
    },
    company: "Capmo",
    range: "Oct 2020 - Mar 2021",
    location: "Munich, Germany",
    summary: {
      en: "Delivered business logic, testing infrastructure, and product fixes for a construction management platform.",
      ru: "Разрабатывал бизнес-логику, тестовую инфраструктуру и продуктовые исправления для платформы управления строительством.",
      de: "Lieferte Business-Logik, Test-Infrastruktur und Produktkorrekturen für eine Construction-Management-Plattform.",
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
    early: true,
  },
  {
    slug: "metoda",
    title: {
      en: "Working Student Software Developer",
      ru: "Working Student Software Developer",
      de: "Working Student Software Developer",
    },
    company: "metoda GmbH",
    range: "May 2020 - Oct 2020",
    location: "Munich, Germany",
    summary: {
      en: "Built analytics tools, backend services, and scraping pipelines for eCommerce intelligence.",
      ru: "Создавал аналитические инструменты, backend-сервисы и scraping-пайплайны для eCommerce intelligence.",
      de: "Baute Analytics-Tools, Backend-Services und Scraping-Pipelines für eCommerce-Intelligence.",
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
        "Entwickelte Backend-Services mit Ruby on Rails und Docker für Verarbeitung und APIs.",
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
    early: true,
  },
  {
    slug: "iprax",
    title: {
      en: "Working Student - Second Level Support",
      ru: "Working Student - Second Level Support",
      de: "Working Student - Second Level Support",
    },
    company: "iPrax Systems GmbH",
    range: "Jan 2020 - May 2020",
    location: "Munich, Germany",
    summary: {
      en: "SQL-heavy support work across reporting, bug diagnosis, testing, and Windows Server environments.",
      ru: "SQL-ориентированная support-работа: отчеты, диагностика багов, тестирование и среды Windows Server.",
      de: "SQL-lastige Support-Arbeit über Reporting, Bugdiagnose, Testing und Windows-Server-Umgebungen.",
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
        "Führte Softwaretests durch, dokumentierte Probleme in Jira und arbeitete mit dem Entwicklungsteam an der Behebung.",
      ],
    },
    stack: ["SQL", "Excel", "Windows Server", "Jira", "Testing"],
    cover: "support",
    early: true,
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
      de: "Leitete die Entwicklung eines Fahrer- und Flottenmanagement-Systems mit Yandex-Fleet-Integration für mehr als 10.000 aktive Fahrer.",
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
        "Implementierte Telegram-Bot- und Bird.com-SMS-Infrastruktur für Echtzeitkommunikation mit Fahrern.",
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
