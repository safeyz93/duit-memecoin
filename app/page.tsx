import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { ChartSection } from "@/components/sections/chart-section";
import { TokenomicsSection } from "@/components/sections/tokenomics-section";
import { MemeVault } from "@/components/sections/meme-vault";
import { HowToBuy } from "@/components/sections/how-to-buy";
import { Roadmap } from "@/components/sections/roadmap";
import { CommunitySection } from "@/components/sections/community-section";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/sections/cta-band";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <ChartSection />
        <TokenomicsSection />
        <MemeVault />
        <HowToBuy />
        <Roadmap />
        <CommunitySection />
        <FaqSection />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
