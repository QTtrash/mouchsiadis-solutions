// Code-drawn architecture diagrams for case files. Each diagram is a left-to-
// right flow of stages joined by labelled links; ArchDiagram.astro renders it
// as HTML so it wraps on phones and stays readable by assistive technology.
// Stage items are component names (kept in English like the stack list);
// titles, links and captions are localized. Facts mirror each project's docs.
import type { Locale } from "./i18n.ts";

type Text = { en: string } & Partial<Record<Locale, string>>;

export interface Stage {
  title: Text;
  items: string[];
}

export interface Diagram {
  caption: Text;
  stages: Stage[];
  /** links[i] joins stages[i] and stages[i + 1]. */
  links: Text[];
}

const t = (en: string, ru: string, de: string, ge: string): Text => ({ en, ru, de, ge });

export const diagrams: Record<string, Diagram> = {
  ypay: {
    caption: t(
      "Each fleet reaches YPay on its own host; provider calls stay behind typed integration modules.",
      "Каждый автопарк обращается к YPay через свой домен; вызовы провайдеров скрыты за типизированными модулями.",
      "Jede Flotte erreicht YPay über einen eigenen Host; Anbieteraufrufe liegen hinter typisierten Integrationsmodulen.",
      "თითოეული ავტოპარკი YPay-ს საკუთარი დომენით უკავშირდება; პროვაიდერების გამოძახებები ტიპიზებული მოდულების უკანაა.",
    ),
    stages: [
      { title: t("Fleets and drivers", "Автопарки и водители", "Flotten und Fahrer", "ავტოპარკები და მძღოლები"), items: ["Driver app", "Admin workspace", "Tenant host per fleet"] },
      { title: t("YPay", "YPay", "YPay", "YPay"), items: ["Next.js 16 monolith", "Payout lifecycle + audit", "Drizzle ORM"] },
      { title: t("Providers", "Провайдеры", "Anbieter", "პროვაიდერები"), items: ["Yandex Fleet · balances", "Bird Verify · OTP", "Bank of Georgia · payments"] },
    ],
    links: [
      t("HTTPS, tenant-bound", "HTTPS, по арендатору", "HTTPS, mandantengebunden", "HTTPS, tenant-ის მიხედვით"),
      t("typed integrations", "типизированные интеграции", "typisierte Integrationen", "ტიპიზებული ინტეგრაციები"),
    ],
  },
  ylead: {
    caption: t(
      "Reports leave the phone only after enrollment and consent, and every read in YDesk is audited.",
      "Отчёты покидают телефон только после подключения и согласия, а каждое чтение в YDesk фиксируется.",
      "Berichte verlassen das Telefon erst nach Kopplung und Einwilligung, und jeder Zugriff in YDesk wird protokolliert.",
      "ანგარიშები ტელეფონს მხოლოდ დაკავშირებისა და თანხმობის შემდეგ ტოვებს, YDesk-ში ყოველი ნახვა კი აუდიტში ფიქსირდება.",
    ),
    stages: [
      { title: t("Business phone", "Рабочий телефон", "Geschäftstelefon", "სამსახურებრივი ტელეფონი"), items: ["Android Telecom calls", "Room + Keystore AES-GCM", "WorkManager offline queue"] },
      { title: t("YDesk device API", "API устройств YDesk", "YDesk-Geräte-API", "YDesk-ის მოწყობილობის API"), items: ["Pairing and consent revisions", "Sharing: SMS, location", "Signed update manifest"] },
      { title: t("YDesk Communications", "YDesk Communications", "YDesk Communications", "YDesk Communications"), items: ["Call and SMS timeline", "Latest location", "Audited reads"] },
    ],
    links: [
      t("HTTPS check-in", "HTTPS check-in", "HTTPS-Check-in", "HTTPS check-in"),
      t("encrypted at rest", "шифрование при хранении", "verschlüsselt gespeichert", "დაშიფრული შენახვა"),
    ],
  },
  neopoints: {
    caption: t(
      "Points come only from qualifying completed orders and are recorded as balanced, append-only journal entries.",
      "Баллы начисляются только за выполненные заказы и записываются сбалансированными проводками только на добавление.",
      "Punkte entstehen nur aus qualifizierten abgeschlossenen Fahrten und werden als ausgeglichene, nur anhängende Buchungen erfasst.",
      "ქულები მხოლოდ შესრულებული შეკვეთებიდან მოდის და დაბალანსებულ, მხოლოდ დამატებად ჩანაწერებად იწერება.",
    ),
    stages: [
      { title: t("Orders", "Заказы", "Fahrten", "შეკვეთები"), items: ["Yandex Fleet", "Shared Fleet service", "Loyalty worker"] },
      { title: t("NeoPoints", "NeoPoints", "NeoPoints", "NeoPoints"), items: ["Balanced ledger", "Ranks, missions, tournaments", "Gift catalogue + stock"] },
      { title: t("Drivers and staff", "Водители и сотрудники", "Fahrer und Team", "მძღოლები და თანამშრომლები"), items: ["Driver PWA (ka, en, ru)", "YPay sign-in over HMAC", "Telegram order alerts"] },
    ],
    links: [
      t("qualifying orders", "выполненные заказы", "qualifizierte Fahrten", "შესრულებული შეკვეთები"),
      t("signed APIs", "подписанные API", "signierte APIs", "ხელმოწერილი API"),
    ],
  },
  space: {
    caption: t(
      "One app, three hosts. Bolt stays the source of truth for drivers and rides; Space owns leads and CRM state.",
      "Одно приложение, три домена. Bolt — источник истины по водителям и поездкам; Space владеет заявками и CRM.",
      "Eine App, drei Hosts. Bolt bleibt Quelle für Fahrer und Fahrten; Space verantwortet Leads und CRM-Zustand.",
      "ერთი აპლიკაცია, სამი დომენი. მძღოლებისა და მგზავრობების წყარო Bolt-ია; განაცხადები და CRM Space-ს ეკუთვნის.",
    ),
    stages: [
      { title: t("Hosts", "Домены", "Hosts", "დომენები"), items: ["spacepark.ge", "payments.spacepark.ge", "management.spacepark.ge"] },
      { title: t("Next.js 16 app", "Приложение Next.js 16", "Next.js-16-App", "Next.js 16 აპლიკაცია"), items: ["Host router", "Route tree per surface", "postgres.js"] },
      { title: t("Data and sync", "Данные и синхронизация", "Daten und Sync", "მონაცემები და სინქრონიზაცია"), items: ["PostgreSQL on RDS", "Bolt sync worker", "Telegram lead alerts"] },
    ],
    links: [
      t("TLS proxy", "TLS-прокси", "TLS-Proxy", "TLS-პროქსი"),
      t("raw SQL", "чистый SQL", "reines SQL", "სუფთა SQL"),
    ],
  },
  neouniverse: {
    caption: t(
      "Compute stays on the VPS; business data, backups and audit live in AWS. Each service keeps its own database and roles.",
      "Вычисления остаются на VPS; бизнес-данные, резервные копии и аудит — в AWS. У каждого сервиса своя база и роли.",
      "Rechenleistung bleibt auf dem VPS; Geschäftsdaten, Backups und Audit liegen in AWS. Jeder Dienst behält eigene Datenbank und Rollen.",
      "გამოთვლები VPS-ზე რჩება; ბიზნეს-მონაცემები, სარეზერვო ასლები და აუდიტი AWS-შია. თითოეულ სერვისს საკუთარი ბაზა და როლები აქვს.",
    ),
    stages: [
      { title: t("Products", "Продукты", "Produkte", "პროდუქტები"), items: ["YPay", "YDesk", "NeoPoints", "Neo Taxi site", "Space"] },
      { title: t("VPS (Docker)", "VPS (Docker)", "VPS (Docker)", "VPS (Docker)"), items: ["Shared Caddy proxy", "Shared Fleet service", "Daily backup timer"] },
      { title: t("AWS Frankfurt", "AWS Франкфурт", "AWS Frankfurt", "AWS ფრანკფურტი"), items: ["RDS PostgreSQL · 6 databases", "S3 + KMS backups", "CloudWatch · CloudTrail"] },
    ],
    links: [
      t("one proxy", "один прокси", "ein Proxy", "ერთი პროქსი"),
      t("TLS, VPS-only credentials", "TLS, ключи только для VPS", "TLS, Zugang nur vom VPS", "TLS, წვდომა მხოლოდ VPS-იდან"),
    ],
  },
  "raid-signal": {
    caption: t(
      "Coordinates are encrypted on the publishing device; the relay only forwards opaque messages and keeps no position history.",
      "Координаты шифруются на отправляющем устройстве; relay лишь пересылает непрозрачные сообщения и не хранит историю позиций.",
      "Koordinaten werden auf dem sendenden Gerät verschlüsselt; das Relay leitet nur undurchsichtige Nachrichten weiter und speichert keinen Positionsverlauf.",
      "კოორდინატები გამომცემ მოწყობილობაზე იშიფრება; relay მხოლოდ გაუშიფრავ შეტყობინებებს გადასცემს და პოზიციების ისტორიას არ ინახავს.",
    ),
    stages: [
      { title: t("Publishing PC", "Отправляющий ПК", "Sendender PC", "გამომცემი კომპიუტერი"), items: ["Screenshot coordinates", "Local maps", "AES-256-GCM"] },
      { title: t("Public relay", "Публичный relay", "Öffentliches Relay", "საჯარო relay"), items: ["WebSocket rooms", "No position history"] },
      { title: t("Squad", "Отряд", "Team", "რაზმი"), items: ["Desktop app", "Phone companion", "Local decryption"] },
    ],
    links: [
      t("opaque messages", "непрозрачные сообщения", "undurchsichtige Nachrichten", "დაშიფრული შეტყობინებები"),
      t("opaque messages", "непрозрачные сообщения", "undurchsichtige Nachrichten", "დაშიფრული შეტყობინებები"),
    ],
  },
};
