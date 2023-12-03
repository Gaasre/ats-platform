import Features from "@/components/homepage/features";
import Hero from "@/components/homepage/hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="h-[250px]"></div>
      <Features />
    </div>
  );
}
