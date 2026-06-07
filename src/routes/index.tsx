import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { CompanyTicker } from "@/components/site/CompanyTicker";
import { Intro } from "@/components/site/Intro";
import { IndiaUAEMarketSection } from "@/components/site/IndiaUAEMarketSection";
import { Ventures } from "@/components/site/Ventures";
import { Philosophy } from "@/components/site/Philosophy";
import { Timeline } from "@/components/site/Timeline";
import { Vision } from "@/components/site/Vision";
import { Contact, Footer } from "@/components/site/Contact";
import { ExecutiveAssistant } from "@/components/site/ExecutiveAssistant";
import { resolveCmsImage } from "@/lib/cms-assets";
import { defaultCmsContent } from "@/lib/cms-content";
import { useCmsContent } from "@/lib/use-cms-content";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: defaultCmsContent.seo.pageTitle },
      {
        name: "description",
        content: defaultCmsContent.seo.metaDescription,
      },
      { name: "keywords", content: defaultCmsContent.seo.keywords },
      { property: "og:title", content: defaultCmsContent.seo.pageTitle },
      {
        property: "og:description",
        content: defaultCmsContent.seo.metaDescription,
      },
      { property: "og:type", content: "profile" },
    ],
  }),
  component: Index,
});

function Index() {
  const content = useCmsContent();

  useEffect(() => {
    document.title = content.seo.pageTitle;
    setMeta("description", content.seo.metaDescription);
    setMeta("keywords", content.seo.keywords);
    setMeta("og:title", content.seo.pageTitle, "property");
    setMeta("og:description", content.seo.metaDescription, "property");
    setMeta("og:image", resolveCmsImage(content.seo.openGraphImage), "property");
  }, [content.seo]);

  return (
    <main className="relative bg-background text-foreground overflow-x-hidden">
      <Nav content={content.header} />
      <Hero content={content.hero} />
      <CompanyTicker />
      <Intro content={content.about} />
      <IndiaUAEMarketSection />
      <Philosophy content={content.philosophy} />
      <Ventures content={content.ventures} />
      <Timeline content={content.journey} />
      <Vision content={content.vision} />
      <Contact content={content.contact} />
      <Footer content={content.contact} logoText={content.header.logoText} />
      <ExecutiveAssistant label={content.hero.assistantLabel} />
    </main>
  );
}

function setMeta(name: string, value: string, attribute: "name" | "property" = "name") {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.content = value;
}
