/**
 * CRM / Lead routing — gotowy do podłączenia.
 *
 * Aktualna implementacja: console.log (dev) + zwraca true.
 * Podmień poszczególne funkcje gdy wybierzesz docelowe narzędzie.
 *
 * ─── Resend (e-mail notyfikacje) ───
 *   npm install resend
 *   const resend = new Resend(process.env.RESEND_API_KEY)
 *   await resend.emails.send({ from, to, subject, html })
 *
 * ─── HubSpot CRM ───
 *   POST https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}
 *   Klucze: HUBSPOT_PORTAL_ID, HUBSPOT_FORM_GUID w .env.local
 *
 * ─── Pipedrive ───
 *   POST https://api.pipedrive.com/v1/leads  (Bearer PIPEDRIVE_API_TOKEN)
 *
 * ─── Supabase (własna baza leadów) ───
 *   await supabase.from("leads").insert(payload)
 *
 * ─── Webhooks / Make / n8n ───
 *   await fetch(process.env.WEBHOOK_URL, { method: "POST", body: JSON.stringify(payload) })
 */

import type { LeadPayload } from "./types";

export interface CrmResult {
  ok:    boolean;
  error?: string;
}

/**
 * Główna funkcja routingu leada.
 * Wywoływana z app/api/lead/route.ts.
 * Możesz równolegle wysyłać do kilku kanałów.
 */
export async function routeLead(payload: LeadPayload): Promise<CrmResult> {
  try {
    // 1. E-mail notification (TODO: Resend)
    await sendEmailNotification(payload);

    // 2. CRM insert (TODO: HubSpot / Pipedrive / Supabase)
    await saveToCrm(payload);

    // 3. Webhook / automation (TODO: Make / n8n / Zapier)
    await triggerAutomation(payload);

    return { ok: true };
  } catch (err) {
    console.error("[crm] routeLead failed:", err);
    return { ok: false, error: "CRM routing failed" };
  }
}

// ─── Implementacje stub ───────────────────────────────────────────────────────

async function sendEmailNotification(payload: LeadPayload): Promise<void> {
  // TODO: zaimplementuj gdy masz klucz Resend
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({ ... });
  if (process.env.NODE_ENV === "development") {
    console.log("[crm:email] would send to", process.env.NOTIFICATION_EMAIL ?? "kontakt@omegaworkforce.pl", payload);
  }
}

async function saveToCrm(payload: LeadPayload): Promise<void> {
  // TODO: zaimplementuj HubSpot / Pipedrive / Supabase
  if (process.env.NODE_ENV === "development") {
    console.log("[crm:save]", payload);
  }
}

async function triggerAutomation(payload: LeadPayload): Promise<void> {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) return;
  // TODO: produkcyjna implementacja Make/n8n
  await fetch(webhookUrl, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(payload),
  });
}
