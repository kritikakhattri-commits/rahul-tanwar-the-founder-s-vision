import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Intro } from "@/components/site/Intro";
import { Ventures } from "@/components/site/Ventures";
import { Philosophy } from "@/components/site/Philosophy";
import { Timeline } from "@/components/site/Timeline";
import { Vision } from "@/components/site/Vision";
import { Contact, Footer } from "@/components/site/Contact";
import { useRevealAll } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rahul Tanwar — Founder, Investor & Business Leader" },
      { name: "description", content: "Rahul Tanwar is an entrepreneur building an ecosystem of ventures across beverages, consumer brands, textiles, manufacturing, finance and innovation-led industries." },
      { property: "og:title", content: "Rahul Tanwar — Founder, Investor & Business Leader" },
      { property: "og:description", content: "Building businesses that create lasting value. An ecosystem of ventures led by Rahul Tanwar." },
      { property: "og:type", content: "profile" },
    ],
  }),
  component: Index,
});

function Index() {
  useRevealAll();
  return (
    <main className="relative bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <Intro />
      <Ventures />
      <Philosophy />
      <Timeline />
      <Vision />
      <Contact />
      <Footer />
    </main>
  );
}
