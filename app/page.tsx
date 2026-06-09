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
import { LangProvider }  from "@/components/LangProvider";
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
    <LangProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main id="main-content">
        <Hero />
        <Stats />
        <AudienceSplit />
        <Services />
        <Calculator />
        <Process />
        <Ukraine />
        <WhyUs />
        <Testimonials />
        <Industries />
        <Faq />
        <LeadWizard />
        <FinalCta />
      </main>
      <Footer />
    </LangProvider>
  );
}
