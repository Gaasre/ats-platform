import Cta from "@/components/homepage/cta";
import Faq from "@/components/homepage/faq";
import Features from "@/components/homepage/features";
import Hero from "@/components/homepage/hero";
import Pricing from "@/components/homepage/pricing";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="h-[250px]"></div>
      <Features />
      <Pricing />
      <Faq />
      <Cta />
    </div>
  );
}
