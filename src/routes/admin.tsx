import { createFileRoute } from "@tanstack/react-router";
import { Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { toast, Toaster } from "sonner";
import { defaultCmsContent, type CmsContent, type CmsImage, type CmsLink } from "@/lib/cms-content";

type SectionKey = keyof CmsContent;

const sectionLabels: Array<{ key: SectionKey; label: string }> = [
  { key: "header", label: "Header" },
  { key: "hero", label: "Hero" },
  { key: "about", label: "About" },
  { key: "ventures", label: "Ventures" },
  { key: "journey", label: "Journey" },
  { key: "philosophy", label: "Philosophy" },
  { key: "vision", label: "Vision" },
  { key: "contact", label: "Contact" },
  { key: "seo", label: "SEO" },
];

const passwordStorageKey = "rt-admin-password";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin CMS - Rahul Tanwar" }],
  }),
  component: AdminRoute,
});

function AdminRoute() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [content, setContent] = useState<CmsContent>(defaultCmsContent);
  const [activeSection, setActiveSection] = useState<SectionKey>("header");
  const [loading, setLoading] = useState(true);
  const [savingSection, setSavingSection] = useState<SectionKey | null>(null);

  useEffect(() => {
    const storedPassword = window.localStorage.getItem(passwordStorageKey);
    if (storedPassword) {
      setPassword(storedPassword);
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch("/api/cms");
        if (!response.ok) throw new Error("Unable to load CMS content");
        const data = (await response.json()) as CmsContent;
        if (!cancelled) setContent(data);
      } catch {
        toast.error("Using bundled defaults. CMS content could not be loaded.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const activeLabel = useMemo(
    () => sectionLabels.find((section) => section.key === activeSection)?.label ?? "Content",
    [activeSection],
  );

  const login = async () => {
    setAuthLoading(true);
    try {
      const response = await fetch("/api/cms/auth", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { ok?: boolean };

      if (!data.ok) {
        toast.error("Incorrect admin password.");
        return;
      }

      window.localStorage.setItem(passwordStorageKey, password);
      setAuthenticated(true);
      toast.success("Admin unlocked.");
    } catch {
      toast.error("Could not verify password.");
    } finally {
      setAuthLoading(false);
    }
  };

  const updateSection = <Key extends SectionKey>(key: Key, value: CmsContent[Key]) => {
    setContent((current) => ({ ...current, [key]: value }));
  };

  const saveSection = async (section: SectionKey) => {
    setSavingSection(section);
    try {
      const response = await fetch("/api/cms", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify(content),
      });

      if (!response.ok) throw new Error("Save failed");

      const savedContent = (await response.json()) as CmsContent;
      setContent(savedContent);
      toast.success(`${sectionLabels.find((item) => item.key === section)?.label} saved.`);
    } catch {
      toast.error("Save failed. Check the password and try again.");
    } finally {
      setSavingSection(null);
    }
  };

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-background px-6 py-10 text-foreground md:px-10">
        <Toaster richColors position="top-right" />
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
          <section className="w-full rounded-[1rem] border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
            <div className="eyebrow">Rahul Tanwar CMS</div>
            <h1 className="mt-4 font-display text-5xl leading-none">Admin login</h1>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Enter the temporary admin password to edit local JSON content.
            </p>
            <div className="mt-8 space-y-4">
              <Field
                label="Password"
                type="password"
                value={password}
                onChange={setPassword}
                onEnter={login}
              />
              <button
                type="button"
                onClick={login}
                disabled={authLoading || !password.trim()}
                className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-55"
              >
                {authLoading ? "Checking..." : "Open CMS"}
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Toaster richColors position="top-right" />
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-5 px-6 py-5 md:px-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="eyebrow">Local JSON CMS</div>
            <h1 className="mt-2 font-display text-4xl leading-none md:text-5xl">
              Rahul Tanwar Admin
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/" className="ghost-btn !px-4 !py-2.5 text-[10px]">
              View site
            </a>
            <button
              type="button"
              onClick={() => {
                window.localStorage.removeItem(passwordStorageKey);
                setAuthenticated(false);
              }}
              className="rounded-md border border-border px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.14em] text-ink-soft transition hover:bg-card"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-8 px-6 py-8 md:px-10 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <nav className="grid gap-2">
            {sectionLabels.map((section) => (
              <button
                key={section.key}
                type="button"
                onClick={() => setActiveSection(section.key)}
                className={`rounded-md border px-4 py-3 text-left text-sm transition ${
                  activeSection === section.key
                    ? "border-accent bg-accent/12 text-foreground"
                    : "border-border bg-card/45 text-ink-soft hover:bg-card"
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </aside>

        <section className="min-w-0">
          <div className="mb-5 flex flex-col gap-3 border-b border-border pb-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="eyebrow">Editing</div>
              <h2 className="mt-2 font-display text-4xl">{activeLabel}</h2>
            </div>
            <button
              type="button"
              onClick={() => saveSection(activeSection)}
              disabled={savingSection === activeSection || loading}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-55"
            >
              <Save size={16} aria-hidden="true" />
              {savingSection === activeSection ? "Saving..." : `Save ${activeLabel}`}
            </button>
          </div>

          {loading ? (
            <div className="rounded-[1rem] border border-border bg-card p-8 text-ink-soft">
              Loading CMS content...
            </div>
          ) : (
            <Editor
              section={activeSection}
              content={content}
              updateSection={updateSection}
              saveSection={saveSection}
            />
          )}
        </section>
      </div>
    </main>
  );
}

function Editor({
  section,
  content,
  updateSection,
  saveSection,
}: {
  section: SectionKey;
  content: CmsContent;
  updateSection: <Key extends SectionKey>(key: Key, value: CmsContent[Key]) => void;
  saveSection: (section: SectionKey) => void;
}) {
  if (section === "header") {
    const data = content.header;
    return (
      <Panel>
        <Field
          label="Logo/name text"
          value={data.logoText}
          onChange={(logoText) => updateSection("header", { ...data, logoText })}
        />
        <LinkListEditor
          title="Navigation menu"
          links={data.navLinks}
          onChange={(navLinks) => updateSection("header", { ...data, navLinks })}
        />
        <Field
          label="CTA button text"
          value={data.ctaText}
          onChange={(ctaText) => updateSection("header", { ...data, ctaText })}
        />
        <Field
          label="CTA button link"
          value={data.ctaLink}
          onChange={(ctaLink) => updateSection("header", { ...data, ctaLink })}
        />
      </Panel>
    );
  }

  if (section === "hero") {
    const data = content.hero;
    return (
      <Panel>
        <Field
          label="Founder first/name text"
          value={data.founderName}
          onChange={(founderName) => updateSection("hero", { ...data, founderName })}
        />
        <Field
          label="Highlighted name text"
          value={data.highlightedName}
          onChange={(highlightedName) => updateSection("hero", { ...data, highlightedName })}
        />
        <Field
          label="Highlighted headline word/text"
          value={data.highlightedWord}
          onChange={(highlightedWord) => updateSection("hero", { ...data, highlightedWord })}
        />
        <TextArea
          label="Main headline"
          value={data.mainHeadline}
          onChange={(mainHeadline) => updateSection("hero", { ...data, mainHeadline })}
        />
        <TextArea
          label="Short description"
          value={data.shortDescription}
          onChange={(shortDescription) => updateSection("hero", { ...data, shortDescription })}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Primary button text"
            value={data.primaryButtonText}
            onChange={(primaryButtonText) => updateSection("hero", { ...data, primaryButtonText })}
          />
          <Field
            label="Primary button link"
            value={data.primaryButtonLink}
            onChange={(primaryButtonLink) => updateSection("hero", { ...data, primaryButtonLink })}
          />
        </div>
        <ImageField
          label="Hero portrait image"
          image={data.portraitImage}
          onChange={(portraitImage) => updateSection("hero", { ...data, portraitImage })}
        />
        <Field
          label="Assistant/chatbot label text"
          value={data.assistantLabel}
          onChange={(assistantLabel) => updateSection("hero", { ...data, assistantLabel })}
        />
      </Panel>
    );
  }

  if (section === "about") {
    const data = content.about;
    return (
      <Panel>
        <Field
          label="Section eyebrow"
          value={data.eyebrow}
          onChange={(eyebrow) => updateSection("about", { ...data, eyebrow })}
        />
        <TextArea
          label="Section title"
          value={data.sectionTitle}
          onChange={(sectionTitle) => updateSection("about", { ...data, sectionTitle })}
        />
        <Field
          label="Highlighted title text"
          value={data.highlightedTitle}
          onChange={(highlightedTitle) => updateSection("about", { ...data, highlightedTitle })}
        />
        <TextArea
          label="Main paragraph"
          value={data.mainParagraph}
          onChange={(mainParagraph) => updateSection("about", { ...data, mainParagraph })}
        />
        <TextArea
          label="Supporting content (one paragraph per line)"
          value={data.supportingContent.join("\n")}
          onChange={(value) =>
            updateSection("about", {
              ...data,
              supportingContent: value.split("\n").filter(Boolean),
            })
          }
        />
        <ImageField
          label="About image"
          image={data.image}
          onChange={(image) => updateSection("about", { ...data, image })}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Left image caption"
            value={data.imageCaptionLeft}
            onChange={(imageCaptionLeft) => updateSection("about", { ...data, imageCaptionLeft })}
          />
          <Field
            label="Right image caption"
            value={data.imageCaptionRight}
            onChange={(imageCaptionRight) => updateSection("about", { ...data, imageCaptionRight })}
          />
        </div>
      </Panel>
    );
  }

  if (section === "ventures") {
    return (
      <VenturesEditor
        content={content.ventures}
        onChange={(ventures) => updateSection("ventures", ventures)}
        onSave={() => saveSection("ventures")}
      />
    );
  }

  if (section === "journey") {
    return (
      <JourneyEditor
        content={content.journey}
        onChange={(journey) => updateSection("journey", journey)}
        onSave={() => saveSection("journey")}
      />
    );
  }

  if (section === "philosophy") {
    const data = content.philosophy;
    return (
      <Panel>
        <ImageField
          label="Media image"
          image={data.mediaImage}
          onChange={(mediaImage) => updateSection("philosophy", { ...data, mediaImage })}
        />
        <Field
          label="Media eyebrow"
          value={data.mediaEyebrow}
          onChange={(mediaEyebrow) => updateSection("philosophy", { ...data, mediaEyebrow })}
        />
        <Field
          label="Media title"
          value={data.mediaTitle}
          onChange={(mediaTitle) => updateSection("philosophy", { ...data, mediaTitle })}
        />
        <TextArea
          label="Heading"
          value={data.heading}
          onChange={(heading) => updateSection("philosophy", { ...data, heading })}
        />
        <Field
          label="Highlighted heading text"
          value={data.highlightedHeading}
          onChange={(highlightedHeading) =>
            updateSection("philosophy", { ...data, highlightedHeading })
          }
        />
        <TextArea
          label="Supporting text"
          value={data.supportingText}
          onChange={(supportingText) => updateSection("philosophy", { ...data, supportingText })}
        />
        <QuoteBlocksEditor
          blocks={data.quoteBlocks}
          onChange={(quoteBlocks) => updateSection("philosophy", { ...data, quoteBlocks })}
        />
      </Panel>
    );
  }

  if (section === "vision") {
    const data = content.vision;
    return (
      <Panel>
        <ImageField
          label="Vision image"
          image={data.image}
          onChange={(image) => updateSection("vision", { ...data, image })}
        />
        <Field
          label="Eyebrow"
          value={data.eyebrow}
          onChange={(eyebrow) => updateSection("vision", { ...data, eyebrow })}
        />
        <TextArea
          label="Heading lines (first and third line)"
          value={data.headingLines.join("\n")}
          onChange={(value) =>
            updateSection("vision", { ...data, headingLines: value.split("\n").slice(0, 2) })
          }
        />
        <Field
          label="Highlighted middle line"
          value={data.highlightedLine}
          onChange={(highlightedLine) => updateSection("vision", { ...data, highlightedLine })}
        />
        <TextArea
          label="Description"
          value={data.description}
          onChange={(description) => updateSection("vision", { ...data, description })}
        />
        <TextArea
          label="Supporting text"
          value={data.supportingText}
          onChange={(supportingText) => updateSection("vision", { ...data, supportingText })}
        />
        <KeyPointsEditor
          points={data.keyPoints}
          onChange={(keyPoints) => updateSection("vision", { ...data, keyPoints })}
        />
      </Panel>
    );
  }

  if (section === "contact") {
    const data = content.contact;
    return (
      <Panel>
        <Field
          label="Eyebrow"
          value={data.eyebrow}
          onChange={(eyebrow) => updateSection("contact", { ...data, eyebrow })}
        />
        <TextArea
          label="Heading"
          value={data.heading}
          onChange={(heading) => updateSection("contact", { ...data, heading })}
        />
        <Field
          label="Highlighted heading text"
          value={data.highlightedHeading}
          onChange={(highlightedHeading) =>
            updateSection("contact", { ...data, highlightedHeading })
          }
        />
        <TextArea
          label="Description"
          value={data.description}
          onChange={(description) => updateSection("contact", { ...data, description })}
        />
        <div className="grid gap-4 md:grid-cols-3">
          <Field
            label="Email"
            value={data.email}
            onChange={(email) => updateSection("contact", { ...data, email })}
          />
          <Field
            label="Phone"
            value={data.phone}
            onChange={(phone) => updateSection("contact", { ...data, phone })}
          />
          <Field
            label="Location"
            value={data.location}
            onChange={(location) => updateSection("contact", { ...data, location })}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Contact CTA text"
            value={data.contactCtaText}
            onChange={(contactCtaText) => updateSection("contact", { ...data, contactCtaText })}
          />
          <Field
            label="Contact CTA link"
            value={data.contactCtaLink}
            onChange={(contactCtaLink) => updateSection("contact", { ...data, contactCtaLink })}
          />
          <Field
            label="Secondary CTA text"
            value={data.secondaryCtaText}
            onChange={(secondaryCtaText) => updateSection("contact", { ...data, secondaryCtaText })}
          />
          <Field
            label="Secondary CTA link"
            value={data.secondaryCtaLink}
            onChange={(secondaryCtaLink) => updateSection("contact", { ...data, secondaryCtaLink })}
          />
        </div>
        <LinkListEditor
          title="Social links"
          links={data.socialLinks}
          onChange={(socialLinks) => updateSection("contact", { ...data, socialLinks })}
        />
        <Field
          label="Footer tagline"
          value={data.footerTagline}
          onChange={(footerTagline) => updateSection("contact", { ...data, footerTagline })}
        />
      </Panel>
    );
  }

  const data = content.seo;
  return (
    <Panel>
      <Field
        label="Page title"
        value={data.pageTitle}
        onChange={(pageTitle) => updateSection("seo", { ...data, pageTitle })}
      />
      <TextArea
        label="Meta description"
        value={data.metaDescription}
        onChange={(metaDescription) => updateSection("seo", { ...data, metaDescription })}
      />
      <Field
        label="Open Graph image"
        value={data.openGraphImage}
        onChange={(openGraphImage) => updateSection("seo", { ...data, openGraphImage })}
      />
      <TextArea
        label="Keywords"
        value={data.keywords}
        onChange={(keywords) => updateSection("seo", { ...data, keywords })}
      />
    </Panel>
  );
}

function VenturesEditor({
  content,
  onChange,
}: {
  content: CmsContent["ventures"];
  onChange: (content: CmsContent["ventures"]) => void;
  onSave: () => void;
}) {
  const updateCard = (index: number, card: CmsContent["ventures"]["cards"][number]) => {
    onChange({ ...content, cards: content.cards.map((item, i) => (i === index ? card : item)) });
  };

  return (
    <Panel>
      <Field
        label="Section eyebrow"
        value={content.eyebrow}
        onChange={(eyebrow) => onChange({ ...content, eyebrow })}
      />
      <TextArea
        label="Heading"
        value={content.heading}
        onChange={(heading) => onChange({ ...content, heading })}
      />
      <Field
        label="Highlighted heading text"
        value={content.highlightedHeading}
        onChange={(highlightedHeading) => onChange({ ...content, highlightedHeading })}
      />
      <TextArea
        label="Description"
        value={content.description}
        onChange={(description) => onChange({ ...content, description })}
      />
      <ListHeader
        title="Venture cards"
        onAdd={() =>
          onChange({
            ...content,
            cards: [
              ...content.cards,
              {
                name: "New Venture",
                category: "Category",
                year: "-",
                shortDescription: "",
                image: { src: "" },
                link: "#contact",
                tags: [],
              },
            ],
          })
        }
      />
      <div className="space-y-4">
        {content.cards.map((card, index) => (
          <ItemPanel
            key={`${card.name}-${index}`}
            title={`${index + 1}. ${card.name}`}
            onDelete={() =>
              onChange({ ...content, cards: content.cards.filter((_, i) => i !== index) })
            }
          >
            <div className="grid gap-4 md:grid-cols-3">
              <Field
                label="Venture name"
                value={card.name}
                onChange={(name) => updateCard(index, { ...card, name })}
              />
              <Field
                label="Category"
                value={card.category}
                onChange={(category) => updateCard(index, { ...card, category })}
              />
              <Field
                label="Year/date"
                value={card.year}
                onChange={(year) => updateCard(index, { ...card, year })}
              />
            </div>
            <TextArea
              label="Short description"
              value={card.shortDescription}
              onChange={(shortDescription) => updateCard(index, { ...card, shortDescription })}
            />
            <ImageField
              label="Image/icon URL"
              image={card.image}
              onChange={(image) => updateCard(index, { ...card, image })}
            />
            <Field
              label="Link"
              value={card.link}
              onChange={(link) => updateCard(index, { ...card, link })}
            />
            <TextArea
              label="Tags (one per line)"
              value={card.tags.join("\n")}
              onChange={(value) =>
                updateCard(index, { ...card, tags: value.split("\n").filter(Boolean) })
              }
            />
          </ItemPanel>
        ))}
      </div>
    </Panel>
  );
}

function JourneyEditor({
  content,
  onChange,
}: {
  content: CmsContent["journey"];
  onChange: (content: CmsContent["journey"]) => void;
  onSave: () => void;
}) {
  const updateItem = (index: number, item: CmsContent["journey"]["items"][number]) => {
    onChange({
      ...content,
      items: content.items.map((current, i) => (i === index ? item : current)),
    });
  };

  return (
    <Panel>
      <Field
        label="Section eyebrow"
        value={content.eyebrow}
        onChange={(eyebrow) => onChange({ ...content, eyebrow })}
      />
      <TextArea
        label="Heading"
        value={content.heading}
        onChange={(heading) => onChange({ ...content, heading })}
      />
      <Field
        label="Highlighted heading text"
        value={content.highlightedHeading}
        onChange={(highlightedHeading) => onChange({ ...content, highlightedHeading })}
      />
      <TextArea
        label="Description"
        value={content.description}
        onChange={(description) => onChange({ ...content, description })}
      />
      <ListHeader
        title="Timeline items"
        onAdd={() =>
          onChange({
            ...content,
            items: [
              ...content.items,
              {
                number: String(content.items.length + 1).padStart(2, "0"),
                label: "Chapter",
                title: "New Chapter",
                role: "",
                year: "",
                description: "",
                image: { src: "" },
              },
            ],
          })
        }
      />
      <div className="space-y-4">
        {content.items.map((item, index) => (
          <ItemPanel
            key={`${item.number}-${index}`}
            title={`${item.number}. ${item.title}`}
            onDelete={() =>
              onChange({ ...content, items: content.items.filter((_, i) => i !== index) })
            }
          >
            <div className="grid gap-4 md:grid-cols-4">
              <Field
                label="Number"
                value={item.number}
                onChange={(number) => updateItem(index, { ...item, number })}
              />
              <Field
                label="Label"
                value={item.label}
                onChange={(label) => updateItem(index, { ...item, label })}
              />
              <Field
                label="Year/date"
                value={item.year}
                onChange={(year) => updateItem(index, { ...item, year })}
              />
              <label className="flex items-end gap-2 text-sm text-ink-soft">
                <input
                  type="checkbox"
                  checked={Boolean(item.featured)}
                  onChange={(event) =>
                    updateItem(index, { ...item, featured: event.target.checked })
                  }
                  className="mb-3 h-4 w-4 accent-primary"
                />
                Featured
              </label>
            </div>
            <Field
              label="Title"
              value={item.title}
              onChange={(title) => updateItem(index, { ...item, title })}
            />
            <Field
              label="Role/company"
              value={item.role}
              onChange={(role) => updateItem(index, { ...item, role })}
            />
            <TextArea
              label="Description"
              value={item.description}
              onChange={(description) => updateItem(index, { ...item, description })}
            />
            <ImageField
              label="Image"
              image={item.image}
              onChange={(image) => updateItem(index, { ...item, image })}
            />
          </ItemPanel>
        ))}
      </div>
    </Panel>
  );
}

function LinkListEditor({
  title,
  links,
  onChange,
}: {
  title: string;
  links: Array<CmsLink>;
  onChange: (links: Array<CmsLink>) => void;
}) {
  return (
    <div className="space-y-3">
      <ListHeader
        title={title}
        onAdd={() => onChange([...links, { label: "New link", href: "#" }])}
      />
      {links.map((link, index) => (
        <div
          key={`${link.label}-${index}`}
          className="grid gap-3 rounded-md border border-border p-4 md:grid-cols-[1fr_1fr_auto]"
        >
          <Field
            label="Label"
            value={link.label}
            onChange={(label) =>
              onChange(links.map((item, i) => (i === index ? { ...item, label } : item)))
            }
          />
          <Field
            label="Link"
            value={link.href}
            onChange={(href) =>
              onChange(links.map((item, i) => (i === index ? { ...item, href } : item)))
            }
          />
          <button
            type="button"
            onClick={() => onChange(links.filter((_, i) => i !== index))}
            className="self-end rounded-md border border-border p-3 text-ink-soft transition hover:bg-destructive/10 hover:text-destructive"
            aria-label={`Delete ${link.label}`}
          >
            <Trash2 size={16} aria-hidden="true" />
          </button>
        </div>
      ))}
    </div>
  );
}

function QuoteBlocksEditor({
  blocks,
  onChange,
}: {
  blocks: CmsContent["philosophy"]["quoteBlocks"];
  onChange: (blocks: CmsContent["philosophy"]["quoteBlocks"]) => void;
}) {
  return (
    <div className="space-y-3">
      <ListHeader
        title="Quote/content blocks"
        onAdd={() => onChange([...blocks, { title: "New block", content: "" }])}
      />
      {blocks.map((block, index) => (
        <ItemPanel
          key={`${block.title}-${index}`}
          title={block.title}
          onDelete={() => onChange(blocks.filter((_, i) => i !== index))}
        >
          <Field
            label="Heading"
            value={block.title}
            onChange={(title) =>
              onChange(blocks.map((item, i) => (i === index ? { ...item, title } : item)))
            }
          />
          <TextArea
            label="Content"
            value={block.content}
            onChange={(content) =>
              onChange(blocks.map((item, i) => (i === index ? { ...item, content } : item)))
            }
          />
        </ItemPanel>
      ))}
    </div>
  );
}

function KeyPointsEditor({
  points,
  onChange,
}: {
  points: CmsContent["vision"]["keyPoints"];
  onChange: (points: CmsContent["vision"]["keyPoints"]) => void;
}) {
  return (
    <div className="space-y-3">
      <ListHeader
        title="Key points/cards"
        onAdd={() => onChange([...points, { title: "New point", description: "" }])}
      />
      {points.map((point, index) => (
        <ItemPanel
          key={`${point.title}-${index}`}
          title={point.title}
          onDelete={() => onChange(points.filter((_, i) => i !== index))}
        >
          <Field
            label="Title"
            value={point.title}
            onChange={(title) =>
              onChange(points.map((item, i) => (i === index ? { ...item, title } : item)))
            }
          />
          <TextArea
            label="Description"
            value={point.description}
            onChange={(description) =>
              onChange(points.map((item, i) => (i === index ? { ...item, description } : item)))
            }
          />
        </ItemPanel>
      ))}
    </div>
  );
}

function ImageField({
  label,
  image,
  onChange,
}: {
  label: string;
  image: CmsImage;
  onChange: (image: CmsImage) => void;
}) {
  const uploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange({ ...image, src: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3 rounded-md border border-border p-4">
      <Field
        label={`${label} URL or CMS key`}
        value={image.src}
        onChange={(src) => onChange({ ...image, src })}
      />
      <Field
        label={`${label} alt text`}
        value={image.alt ?? ""}
        onChange={(alt) => onChange({ ...image, alt })}
      />
      <label className="block">
        <span className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-ink-soft">
          Upload image
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={uploadImage}
          className="block w-full rounded-md border border-border bg-background px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-2 file:text-sm file:font-medium file:text-primary-foreground"
        />
      </label>
    </div>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-5 rounded-[1rem] border border-border bg-card p-5 shadow-[var(--shadow-soft)] md:p-7">
      {children}
    </div>
  );
}

function ItemPanel({
  title,
  children,
  onDelete,
}: {
  title: string;
  children: React.ReactNode;
  onDelete: () => void;
}) {
  return (
    <article className="space-y-4 rounded-md border border-border bg-background/55 p-4">
      <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
        <h3 className="font-display text-2xl">{title}</h3>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-md border border-border p-2 text-ink-soft transition hover:bg-destructive/10 hover:text-destructive"
          aria-label={`Delete ${title}`}
        >
          <Trash2 size={16} aria-hidden="true" />
        </button>
      </div>
      {children}
    </article>
  );
}

function ListHeader({ title, onAdd }: { title: string; onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h3 className="font-display text-3xl">{title}</h3>
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm transition hover:bg-background"
      >
        <Plus size={16} aria-hidden="true" />
        Add
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  onEnter,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  onEnter?: () => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-ink-soft">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") onEnter?.();
        }}
        className="w-full rounded-md border border-border bg-background px-3 py-3 text-sm outline-none transition focus:border-accent"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-ink-soft">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="w-full resize-y rounded-md border border-border bg-background px-3 py-3 text-sm leading-relaxed outline-none transition focus:border-accent"
      />
    </label>
  );
}
