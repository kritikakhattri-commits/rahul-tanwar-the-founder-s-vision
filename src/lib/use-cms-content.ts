import { useEffect, useState } from "react";
import { defaultCmsContent, type CmsContent } from "@/lib/cms-content";

export function useCmsContent(initialContent: CmsContent = defaultCmsContent) {
  const [content, setContent] = useState<CmsContent>(initialContent);

  useEffect(() => {
    let cancelled = false;

    const loadContent = async () => {
      try {
        const response = await fetch("/api/cms");
        if (!response.ok) return;

        const nextContent = (await response.json()) as CmsContent;

        if (!cancelled) {
          setContent(nextContent);
        }
      } catch {
        // Keep bundled defaults if the local CMS endpoint is unavailable.
      }
    };

    void loadContent();

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
