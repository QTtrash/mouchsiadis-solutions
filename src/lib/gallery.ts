// Case-file screenshots. Every image is a signed-out public page captured by
// scripts/capture-project-shots.mjs (or the owner's own published art) and
// reviewed for personal data before it was committed. Kept apart from
// content.ts so Node tests can import the content model without image loaders.
import type { ImageMetadata } from "astro";
import type { Locale } from "./i18n.ts";

import alicePlaysHome from "../assets/projects/alice-plays/home.webp";
import alicePlaysPhone from "../assets/projects/alice-plays/home-phone.webp";
import flygodHome from "../assets/projects/flygod-studios/home.webp";
import flygodPhone from "../assets/projects/flygod-studios/home-phone.webp";
import grindlikeHome from "../assets/projects/grindlike/home.webp";
import grindlikePhone from "../assets/projects/grindlike/home-phone.webp";
import lsBattle from "../assets/projects/last-standard/battle-check.webp";
import lsCautery from "../assets/projects/last-standard/cautery.webp";
import lsDrones from "../assets/projects/last-standard/drone-swarm.webp";
import lsWarden from "../assets/projects/last-standard/reliquary-warden.webp";
import lsRoad from "../assets/projects/last-standard/road-map.webp";
import lsTitle from "../assets/projects/last-standard/title-screen.webp";
import neoTaxiCalculator from "../assets/projects/neo-taxi-site/calculator.webp";
import neoTaxiDelivery from "../assets/projects/neo-taxi-site/delivery-phone.webp";
import neoTaxiHome from "../assets/projects/neo-taxi-site/home.webp";
import neopointsHome from "../assets/projects/neopoints/home.webp";
import neopointsPhone from "../assets/projects/neopoints/home-phone.webp";
import raidSignalHome from "../assets/projects/raid-signal/home.webp";
import raidSignalPhone from "../assets/projects/raid-signal/home-phone.webp";
import spaceHome from "../assets/projects/space/home.webp";
import spacePayments from "../assets/projects/space/payments-phone.webp";
import spacePhone from "../assets/projects/space/home-phone.webp";
import hearthpack from "../assets/projects/surikmods/hearthpack.webp";
import ironroad from "../assets/projects/surikmods/ironroad.webp";
import stormrune from "../assets/projects/surikmods/stormrune.webp";
import ydeskHome from "../assets/projects/ydesk/home.webp";
import ydeskPhone from "../assets/projects/ydesk/home-phone.webp";
import ypayHome from "../assets/projects/ypay/home.webp";
import ypayPhone from "../assets/projects/ypay/home-phone.webp";

type Text = { en: string } & Partial<Record<Locale, string>>;

export interface Shot {
  src: ImageMetadata;
  alt: Text;
  /** browser: desktop page in browser chrome; phone: phone page; plain: game art. */
  frame: "browser" | "phone" | "plain";
  /** Address shown in the browser chrome. */
  url?: string;
}

const home = (product: string): Text => ({
  en: `${product} home page on a desktop browser`,
  ru: `Главная страница ${product} в браузере на компьютере`,
  de: `Startseite von ${product} im Desktop-Browser`,
  ge: `${product}-ის მთავარი გვერდი კომპიუტერის ბრაუზერში`,
});
const phone = (product: string): Text => ({
  en: `${product} home page on a phone`,
  ru: `Главная страница ${product} на телефоне`,
  de: `Startseite von ${product} auf dem Smartphone`,
  ge: `${product}-ის მთავარი გვერდი ტელეფონზე`,
});
const scene = (en: string, ru: string, de: string, ge: string): Text => ({ en, ru, de, ge });

export const gallery: Record<string, Shot[]> = {
  ypay: [
    { src: ypayHome, alt: home("YPay"), frame: "browser", url: "ypay.ge" },
    { src: ypayPhone, alt: phone("YPay"), frame: "phone" },
  ],
  ydesk: [
    { src: ydeskHome, alt: home("YDesk"), frame: "browser", url: "ydesk.org" },
    { src: ydeskPhone, alt: phone("YDesk"), frame: "phone" },
  ],
  neopoints: [
    { src: neopointsHome, alt: home("NeoPoints"), frame: "browser", url: "neopoints.ge" },
    { src: neopointsPhone, alt: phone("NeoPoints"), frame: "phone" },
  ],
  "neo-taxi-site": [
    { src: neoTaxiHome, alt: home("Neo Taxi"), frame: "browser", url: "yandex-partner.ge" },
    {
      src: neoTaxiCalculator,
      alt: scene(
        "Neo Taxi earnings calculator with work type, make, model and year",
        "Калькулятор дохода Neo Taxi: тип работы, марка, модель и год",
        "Verdienstrechner von Neo Taxi mit Arbeitsart, Marke, Modell und Baujahr",
        "Neo Taxi-ს შემოსავლის კალკულატორი: სამუშაოს ტიპი, მარკა, მოდელი და წელი",
      ),
      frame: "browser",
      url: "yandex-partner.ge/calculator",
    },
    { src: neoTaxiDelivery, alt: phone("Neo Delivery"), frame: "phone" },
  ],
  space: [
    { src: spaceHome, alt: home("Space"), frame: "browser", url: "spacepark.ge" },
    { src: spacePhone, alt: phone("Space"), frame: "phone" },
    {
      src: spacePayments,
      alt: scene(
        "Space driver portal sign-in with a phone number",
        "Вход в портал водителя Space по номеру телефона",
        "Anmeldung im Space-Fahrerportal mit Telefonnummer",
        "Space-ის მძღოლის პორტალში შესვლა ტელეფონის ნომრით",
      ),
      frame: "phone",
    },
  ],
  grindlike: [
    { src: grindlikeHome, alt: home("Grindlike"), frame: "browser", url: "grindlike.pro" },
    { src: grindlikePhone, alt: phone("Grindlike"), frame: "phone" },
  ],
  "raid-signal": [
    { src: raidSignalHome, alt: home("Raid Signal"), frame: "browser", url: "signal.mouchsiadis-solutions.com" },
    { src: raidSignalPhone, alt: phone("Raid Signal"), frame: "phone" },
  ],
  "flygod-studios": [
    { src: flygodHome, alt: home("FlyGod Studios"), frame: "browser", url: "flygod.games" },
    { src: flygodPhone, alt: phone("FlyGod Studios"), frame: "phone" },
  ],
  "alice-plays": [
    { src: alicePlaysHome, alt: home("Alice Plays"), frame: "browser", url: "alice-plays.online" },
    { src: alicePlaysPhone, alt: phone("Alice Plays"), frame: "phone" },
  ],
  "last-standard": [
    {
      src: lsTitle,
      alt: scene(
        "Last Standard title screen",
        "Титульный экран Last Standard",
        "Titelbildschirm von Last Standard",
        "Last Standard-ის სათაური ეკრანი",
      ),
      frame: "plain",
    },
    {
      src: lsRoad,
      alt: scene(
        "The road map of the Bile Fens, the first act, with its table stops",
        "Карта пути через Bile Fens, первый акт, со стоянками",
        "Die Wegkarte durch die Bile Fens, den ersten Akt, mit ihren Stationen",
        "Bile Fens-ის, პირველი აქტის, გზის რუკა გაჩერებებით",
      ),
      frame: "plain",
    },
    {
      src: lsBattle,
      alt: scene(
        "A battle against the Rot-Sworn Guard with the king in check",
        "Бой с Rot-Sworn Guard: королю шах",
        "Ein Kampf gegen die Rot-Sworn Guard, der König steht im Schach",
        "ბრძოლა Rot-Sworn Guard-თან, მეფეს ქიში აქვს",
      ),
      frame: "plain",
    },
    {
      src: lsWarden,
      alt: scene(
        "The commander fight against the Reliquary Warden",
        "Бой с командиром Reliquary Warden",
        "Der Kommandantenkampf gegen den Reliquary Warden",
        "ბრძოლა მეთაურ Reliquary Warden-თან",
      ),
      frame: "plain",
    },
    {
      src: lsDrones,
      alt: scene(
        "A Drone Swarm battle in the second act",
        "Бой с Drone Swarm во втором акте",
        "Ein Kampf gegen den Drone Swarm im zweiten Akt",
        "ბრძოლა Drone Swarm-თან მეორე აქტში",
      ),
      frame: "plain",
    },
    {
      src: lsCautery,
      alt: scene(
        "Aiming the Cautery tactics card, which burns a trail across the board",
        "Прицеливание картой тактики Cautery, которая выжигает след на доске",
        "Die Taktikkarte Cautery wird gezielt und brennt eine Spur über das Brett",
        "ტაქტიკის ბარათ Cautery-ის დამიზნება, რომელიც დაფაზე ბილიკს წვავს",
      ),
      frame: "plain",
    },
  ],
};

/** Icons for collection parts (content.ts `parts[].icon`). */
export const partIcons: Record<string, ImageMetadata> = { ironroad, hearthpack, stormrune };

export function shotsFor(slug: string): Shot[] {
  return gallery[slug] ?? [];
}
