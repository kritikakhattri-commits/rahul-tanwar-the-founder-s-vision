import buildingEcosystemImg from "@/assets/chapter-building-ecosystem.jpg";
import buildingSystemsImg from "@/assets/chapter-building-systems.jpg";
import learningDisciplineImg from "@/assets/chapter-learning-discipline.jpg";
import understandingConsumersImg from "@/assets/chapter-understanding-consumers.jpg";
import visionImg from "@/assets/rahul-vision.jpg";

const cmsAssets: Record<string, string> = {
  "cms:rahul-about": "/images/rahul-founder-portrait.png",
  "cms:chapter-building-ecosystem": buildingEcosystemImg,
  "cms:chapter-building-systems": buildingSystemsImg,
  "cms:chapter-learning-discipline": learningDisciplineImg,
  "cms:chapter-understanding-consumers": understandingConsumersImg,
  "cms:rahul-hero": "/images/rahul-tanwar-hero.png",
  "cms:rahul-transition": "/images/leadership-philosophy.jpg",
  "cms:rahul-vision": visionImg,
};

export function resolveCmsImage(src: string | undefined, fallback = ""): string {
  if (!src) return fallback;
  return cmsAssets[src] ?? src;
}
