/**
 * Wspólne typy TypeScript dla całego projektu.
 * Rozszerzaj w miarę jak rośnie złożoność (CMS, API, formularze).
 */

/** Identyfikatory usług — muszą zgadzać się z services[].id w content.ts */
export type ServiceId = "posrednictwo" | "leasing" | "outsourcing" | "ukraina";

/** Rola użytkownika w formularzu kontaktowym */
export type ContactRole = "firma" | "kandydat";

/** Status formularza */
export type FormStatus = "idle" | "loading" | "success" | "error";

/** Obsługiwane języki interfejsu */
export type SiteLang = "PL" | "UA";

/** Dane statystyczne */
export interface Stat {
  value:  number;
  suffix: string;
  label:  string;
}

/** Usługa */
export interface Service {
  id:     ServiceId;
  title:  string;
  desc:   string;
  points: string[];
}

/** Krok procesu */
export interface ProcessStep {
  step:  string;
  time:  string;
  title: string;
  desc:  string;
}

/** Przewaga konkurencyjna */
export interface Advantage {
  title: string;
  desc:  string;
}

/** Opinia klienta */
export interface Testimonial {
  quote:    string;
  name:     string;
  role:     string;
  company:  string;
  initials: string;
  stars:    number;
}

/** FAQ item */
export interface FaqItem {
  q: string;
  a: string;
}

/** Payload leada z formularza → API */
export interface LeadPayload {
  role:      ContactRole;
  name:      string;
  phone:     string;
  company?:  string;
  industry?: string;
  headcount?: string;
  city?:     string;
  position?: string;
  message?:  string;
}
