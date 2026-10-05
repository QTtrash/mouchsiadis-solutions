// One address for every contact action. Subjects let the owner see where a
// message started; the plain address stays visible because mailto: can do
// nothing on devices without a mail client.

export const EMAIL = "suren@mouchsiadis-solutions.com";

export function mailto(subject?: string): string {
  return subject ? `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}` : `mailto:${EMAIL}`;
}
