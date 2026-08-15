import { Hero } from "@/components/hero";
import { Results } from "@/components/results";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { CaseStudyIntro } from "@/components/case-study-intro";
import { CaseStudyOverview } from "@/components/case-study-overview";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";
import { FinalCta } from "@/components/final-cta";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Results />
      <About />
      <Services />
      <CaseStudyIntro />

      <CaseStudyOverview
        eyebrow="Numbers"
        title="AquaView Beach Resort"
        description="An automated online booking and guest management platform deployed for a premier coastal resort in Ghana, replacing manual reservations with a seamless digital experience."
        stats={[
          { label: "Revenue Growth", value: "$140K" },
          { label: "Booking Speed", value: "3x Faster" },
          { label: "Time Saved", value: "20 hrs/wk" },
        ]}
      />

      <Testimonials />
      <Contact />
      <FinalCta />
    </main>
  );
}
