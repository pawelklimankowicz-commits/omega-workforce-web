import { Nav }           from "@/components/Nav";
import { Hero }          from "@/components/Hero";
import { Stats }         from "@/components/Stats";
import { AudienceSplit } from "@/components/AudienceSplit";
import { Services }      from "@/components/Services";
import { Calculator }    from "@/components/Calculator";
import { Process }       from "@/components/Process";
import { Ukraine }       from "@/components/Ukraine";
import { WhyUs }         from "@/components/WhyUs";
import { Testimonials }  from "@/components/Testimonials";
import { Industries }    from "@/components/Industries";
import { Faq }           from "@/components/Faq";
import { LeadWizard }    from "@/components/LeadWizard";
import { FinalCta }      from "@/components/FinalCta";
import { Footer }        from "@/components/Footer";
import { company, faqs } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EmploymentAgency",
  name: company.name,
  description:
    "Agencja zatrudnienia: pośrednictwo pracy, praca tymczasowa, outsourcing procesów oraz obsługa pracowników z Ukrainy.",
  telephone: company.phone,
  email: company.email,
  areaServed: "PL",
  knowsLanguage: ["pl", "uk", "en"],
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main id="main-content">
        {/* 1. Hero — dual-CTA, grid-bg, dual-glow */}
        <Hero />

        {/* 2. Stats — count-up, 4 liczby */}
        <Stats />

        {/* 3. Audience split — B2B vs Kandydat, color-coded */}
        <AudienceSplit />

        {/* 4. Services — 4 modele, karty z kolorami */}
        <Services />

        {/* 5. Calculator — interaktywna wycena leasingu */}
        <Calculator />

        {/* 6. Process — timeline z terminami */}
        <Process />

        {/* 7. Ukraine — featured band, bilingual CTA */}
        <Ukraine />

        {/* 8. Why us — 4 sprawdzalne przewagi */}
        <WhyUs />

        {/* 9. Testimonials — dowód społeczny */}
        <Testimonials />

        {/* 10. Industries — self-identyfikacja */}
        <Industries />

        {/* 11. FAQ — accordion + JSON-LD */}
        <Faq />

        {/* 12. Lead wizard — multi-step, kwalifikacja */}
        <LeadWizard />

        {/* 13. Final CTA — gradient band zamykający */}
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
