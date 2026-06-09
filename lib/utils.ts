/**
 * Shared utility helpers.
 * Dodaj tu kolejne helpery gdy projekt rośnie.
 */

/** Scala klasy Tailwind bez konfliktów (lightweight, bez zależności). */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Formatuje numer telefonu do tel: href (usuwa spacje i myślniki). */
export function toTelHref(phone: string): string {
  return phone.replace(/[\s\-().]/g, "");
}

/** Zwraca inicjały z imienia i nazwiska (maks. 2 znaki). */
export function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
