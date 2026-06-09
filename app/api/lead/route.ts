import { NextResponse } from "next/server";
import type { LeadPayload } from "@/lib/types";
import { routeLead } from "@/lib/crm";

/**
 * POST /api/lead
 *
 * Odbiór i routing leadów z formularza kontaktowego.
 * Walidacja → lib/crm.ts → 200 / 400 / 500.
 *
 * Aby podłączyć realny kanał (e-mail, CRM, webhook):
 *   → edytuj lib/crm.ts — wszystkie stuby i instrukcje tam.
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<LeadPayload>;
    const { name, phone, role } = body;

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Brak wymaganych pól: imię i numer telefonu." },
        { status: 400 }
      );
    }

    if (!role || (role !== "firma" && role !== "kandydat")) {
      return NextResponse.json(
        { ok: false, error: "Nieznana rola." },
        { status: 400 }
      );
    }

    const payload: LeadPayload = {
      role,
      name:      name.trim(),
      phone:     phone.trim(),
      company:   body.company?.trim(),
      industry:  body.industry?.trim(),
      headcount: body.headcount?.trim(),
      city:      body.city?.trim(),
      position:  body.position?.trim(),
      message:   body.message?.trim(),
    };

    // Route to e-mail / CRM / webhook (see lib/crm.ts)
    const result = await routeLead(payload);

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: "Nie udało się zapisać zapytania." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Nieoczekiwany błąd serwera." },
      { status: 500 }
    );
  }
}
