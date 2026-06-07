export type CmsLink = {
  label: string;
  href: string;
};

export type CmsImage = {
  src: string;
  alt?: string;
};

export type CmsContent = {
  header: {
    logoText: string;
    navLinks: Array<CmsLink>;
    ctaText: string;
    ctaLink: string;
  };
  hero: {
    founderName: string;
    highlightedName: string;
    highlightedWord: string;
    mainHeadline: string;
    shortDescription: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    portraitImage: CmsImage;
    assistantLabel: string;
  };
  about: {
    eyebrow: string;
    sectionTitle: string;
    highlightedTitle: string;
    mainParagraph: string;
    supportingContent: Array<string>;
    image: CmsImage;
    imageCaptionLeft: string;
    imageCaptionRight: string;
    framework: Array<{
      number: string;
      title: string;
      description: string;
      image: CmsImage;
    }>;
  };
  ventures: {
    eyebrow: string;
    heading: string;
    highlightedHeading: string;
    description: string;
    cards: Array<{
      name: string;
      category: string;
      year: string;
      shortDescription: string;
      image: CmsImage;
      link: string;
      tags: Array<string>;
    }>;
  };
  journey: {
    eyebrow: string;
    heading: string;
    highlightedHeading: string;
    description: string;
    items: Array<{
      number: string;
      label: string;
      title: string;
      role: string;
      year: string;
      description: string;
      image: CmsImage;
      featured?: boolean;
    }>;
  };
  philosophy: {
    mediaImage: CmsImage;
    mediaEyebrow: string;
    mediaTitle: string;
    heading: string;
    highlightedHeading: string;
    supportingText: string;
    quoteBlocks: Array<{
      title: string;
      content: string;
    }>;
  };
  vision: {
    image: CmsImage;
    eyebrow: string;
    headingLines: Array<string>;
    highlightedLine: string;
    description: string;
    supportingText: string;
    keyPoints: Array<{
      title: string;
      description: string;
    }>;
  };
  contact: {
    eyebrow: string;
    heading: string;
    highlightedHeading: string;
    description: string;
    email: string;
    phone: string;
    location: string;
    contactCtaText: string;
    contactCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    socialLinks: Array<CmsLink>;
    footerTagline: string;
  };
  seo: {
    pageTitle: string;
    metaDescription: string;
    openGraphImage: string;
    keywords: string;
  };
};

export const defaultCmsContent: CmsContent = {
  header: {
    logoText: "Rahul Tanwar",
    navLinks: [
      { href: "#about", label: "About" },
      { href: "#philosophy", label: "Philosophy" },
      { href: "#ventures", label: "Ventures" },
      { href: "#journey", label: "Journey" },
      { href: "#vision", label: "Vision" },
      { href: "#contact", label: "Contact" },
    ],
    ctaText: "Get in touch",
    ctaLink: "#contact",
  },
  hero: {
    founderName: "Rahul",
    highlightedName: "Tanwar",
    highlightedWord: "lasting value.",
    mainHeadline: "Building businesses that create lasting value.",
    shortDescription:
      "Entrepreneur, founder, investor and business leader building ventures across beverages, consumer brands, textiles, manufacturing, finance and innovation-led industries.",
    primaryButtonText: "EXPLORE VENTURES",
    primaryButtonLink: "#ventures",
    portraitImage: {
      src: "cms:rahul-hero",
      alt: "Rahul Tanwar - Founder portrait",
    },
    assistantLabel: "RT Executive Assistant",
  },
  about: {
    eyebrow: "Chapter I - The Founder",
    sectionTitle: "The entrepreneur behind multiple ventures.",
    highlightedTitle: "multiple ventures.",
    mainParagraph:
      "Rahul Tanwar is a modern business builder - an operator who treats every company as a long-form act of craftsmanship. His work spans beverages, consumer brands, textiles, manufacturing, finance and emerging technology.",
    supportingContent: [
      "From a decade in global financial services to leadership in the quick-service industry, his career has been a deliberate study in building organisations that grow with discipline and outlast their founders.",
      "Today, his portfolio is an ecosystem - interconnected ventures designed to create sustained, generational value for partners, employees and the communities they touch.",
    ],
    image: {
      src: "cms:rahul-about",
      alt: "Rahul Tanwar at work",
    },
    imageCaptionLeft: "Rahul Tanwar, 2025",
    imageCaptionRight: "New Delhi",
    framework: [
      {
        number: "01",
        title: "See Opportunity",
        description: "Identify market openings before they become obvious.",
        image: {
          src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=82",
        },
      },
      {
        number: "02",
        title: "Build Systems",
        description: "Turn ambition into repeatable operating structure.",
        image: {
          src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=82",
        },
      },
      {
        number: "03",
        title: "Execute Relentlessly",
        description: "Move with discipline from decision to delivery.",
        image: {
          src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=82",
        },
      },
      {
        number: "04",
        title: "Compound Value",
        description: "Build assets that strengthen each other over time.",
        image: {
          src: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1200&q=82",
        },
      },
      {
        number: "05",
        title: "Connect Markets",
        description: "Bridge regional strengths into wider opportunity.",
        image: {
          src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=82",
        },
      },
    ],
  },
  ventures: {
    eyebrow: "Chapter III - The Ecosystem",
    heading: "An ecosystem of ventures.",
    highlightedHeading: "ventures.",
    description:
      "Eight ventures. One operating philosophy. Each built to compound value independently - and together.",
    cards: [
      {
        name: "SR18 Groups",
        category: "Business Group",
        year: "-",
        shortDescription:
          "A diversified business ecosystem built around disciplined execution, operating depth and long-term value creation. Designed to connect consumer brands, manufacturing, technology and investment into one compounding platform.",
        tags: ["ECOSYSTEM", "VENTURES", "GROWTH"],
        image: {
          src: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=82",
        },
        link: "#contact",
      },
      {
        name: "Delhi 6",
        category: "Beverages",
        year: "-",
        shortDescription:
          "A heritage-inspired beverage venture celebrating culture, storytelling and modern consumer experiences. Built to create memorable brands with strong market resonance and enduring consumer value.",
        tags: ["BEER BRAND", "BEVERAGE", "CULTURE"],
        image: {
          src: "https://images.unsplash.com/photo-1681422695061-9023e14a28c1?auto=format&fit=crop&w=1600&q=82",
        },
        link: "#contact",
      },
      {
        name: "Volt 50000",
        category: "Energy & Mobility",
        year: "-",
        shortDescription:
          "An energy and mobility platform focused on scalable infrastructure, technology adoption and future-ready consumer solutions. Built for emerging markets where reliability, access and efficiency matter.",
        tags: ["ENERGY", "MOBILITY", "FUTURE"],
        image: {
          src: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1600&q=82",
        },
        link: "#contact",
      },
      {
        name: "VAM",
        category: "Manufacturing",
        year: "-",
        shortDescription:
          "Precision-led industrial manufacturing focused on quality, efficiency and long-term operational reliability. Built around disciplined execution, scalable systems and engineering excellence.",
        tags: ["INDUSTRIAL", "PRECISION", "SYSTEMS"],
        image: {
          src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=82",
        },
        link: "#contact",
      },
      {
        name: "Adatto",
        category: "Consumer & Lifestyle",
        year: "-",
        shortDescription:
          "Design-led solutions focused on modern lifestyle, consumer experience and thoughtful product innovation. Built with a balance of creativity, utility and commercial impact.",
        tags: ["LIFESTYLE", "DESIGN", "CONSUMER"],
        image: {
          src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=82",
        },
        link: "#contact",
      },
      {
        name: "Arnika Textiles",
        category: "Textiles",
        year: "-",
        shortDescription:
          "Textile craftsmanship shaped for modern supply chains, consistent quality and scalable production. Focused on material discipline, dependable execution and long-term manufacturing partnerships.",
        tags: ["TEXTILES", "CRAFT", "SUPPLY"],
        image: {
          src: "https://images.unsplash.com/photo-1542060748-10c28b62716f?auto=format&fit=crop&w=1600&q=82",
        },
        link: "#contact",
      },
      {
        name: "Masai",
        category: "Consumer Brand",
        year: "-",
        shortDescription:
          "A contemporary consumer brand blending culture, design and community into category-defining experiences. Focused on emotional connection, strong identity and long-term loyalty.",
        tags: ["CONSUMER", "LIFESTYLE", "BRAND"],
        image: {
          src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=82",
        },
        link: "#contact",
      },
      {
        name: "TradesNSignals",
        category: "Financial Technology",
        year: "2022",
        shortDescription:
          "Market intelligence and trading insights designed to transform financial experience into practical, data-driven decision-making tools. Built for investors who value clarity, discipline and timely execution.",
        tags: ["FINTECH", "MARKETS", "INTELLIGENCE"],
        image: {
          src: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1600&q=82",
        },
        link: "#contact",
      },
    ],
  },
  journey: {
    eyebrow: "Chapter IV - The Journey",
    heading: "A career in deliberate chapters.",
    highlightedHeading: "deliberate chapters.",
    description:
      "Each chapter built on the last. From institutional finance to consumer operations to building a multi-vertical ecosystem.",
    items: [
      {
        number: "01",
        label: "Chapter I",
        title: "Learning Discipline",
        role: "American Express",
        year: "2011 - 2014",
        description:
          "A formative chapter in institutional finance, developing operational rigor, systems thinking and long-term discipline.",
        image: {
          src: "cms:chapter-learning-discipline",
          alt: "Institutional finance trading floor with strategic discussion",
        },
      },
      {
        number: "02",
        label: "Chapter II",
        title: "Understanding Consumers",
        role: "Food & Quick Service Industry",
        year: "2014 - 2017",
        description:
          "Learning customer behaviour, operations, supply chains and the realities of consumer businesses.",
        image: {
          src: "cms:chapter-understanding-consumers",
          alt: "Premium hospitality operations and customer service interaction",
        },
      },
      {
        number: "03",
        label: "Chapter III",
        title: "Building Systems",
        role: "TradeNSignals",
        year: "2022",
        description:
          "Transforming market experience into products, systems and scalable frameworks.",
        image: {
          src: "cms:chapter-building-systems",
          alt: "Financial technology systems with market analytics dashboards",
        },
      },
      {
        number: "04",
        label: "Chapter IV",
        title: "Building An Ecosystem",
        role: "SR18 GROUPS",
        year: "",
        description:
          "The culmination of multiple disciplines into a diversified ecosystem spanning beverages, manufacturing, consumer brands, technology and investment.",
        image: {
          src: "cms:chapter-building-ecosystem",
          alt: "Abstract network visualization for a diversified business ecosystem",
        },
        featured: true,
      },
    ],
  },
  philosophy: {
    mediaImage: {
      src: "cms:rahul-transition",
      alt: "Rahul Tanwar walking through a manufacturing space",
    },
    mediaEyebrow: "Chapter II",
    mediaTitle: "Leadership Philosophy",
    heading: "Six principles that govern every decision, every hire, every product.",
    highlightedHeading: "decision, every hire, every product.",
    supportingText: "",
    quoteBlocks: [
      {
        title: "Innovation",
        content: "Building ventures through first-principles thinking.",
      },
      {
        title: "Execution",
        content: "Turning clear vision into disciplined operations.",
      },
      {
        title: "Ownership",
        content: "Treating every venture with founder-level responsibility.",
      },
      {
        title: "Excellence",
        content: "Holding the standard when momentum makes compromise easy.",
      },
      {
        title: "Growth",
        content: "Compounding people, systems and value over the long term.",
      },
      {
        title: "Integrity",
        content: "Building trust through clarity, consistency and restraint.",
      },
    ],
  },
  vision: {
    image: {
      src: "cms:rahul-vision",
      alt: "Rahul Tanwar - vision portrait",
    },
    eyebrow: "Chapter V - Vision",
    headingLines: ["Building organisations", "their founders."],
    highlightedLine: "that outlive",
    description:
      "A business is only meaningful if it serves a generation longer than the one that built it.",
    supportingText:
      "The work is the legacy. The team is the multiplier. Time is the only honest measure.",
    keyPoints: [],
  },
  contact: {
    eyebrow: "Chapter VI - Contact",
    heading: "Let's build something meaningful.",
    highlightedHeading: "meaningful.",
    description:
      "For partnerships, investment conversations, press and speaking enquiries - the office of Rahul Tanwar responds personally.",
    email: "office@rahultanwar.com",
    phone: "",
    location: "New Delhi, India",
    contactCtaText: "Connect with Office",
    contactCtaLink: "mailto:office@rahultanwar.com",
    secondaryCtaText: "Explore the Ecosystem",
    secondaryCtaLink: "#ventures",
    socialLinks: [
      { href: "#", label: "LinkedIn" },
      { href: "#", label: "X / Twitter" },
      { href: "#", label: "Instagram" },
    ],
    footerTagline: "An Ecosystem in Motion",
  },
  seo: {
    pageTitle: "Rahul Tanwar - Founder, Investor & Business Leader",
    metaDescription:
      "Rahul Tanwar is an entrepreneur building an ecosystem of ventures across beverages, consumer brands, textiles, manufacturing, finance and innovation-led industries.",
    openGraphImage: "cms:rahul-hero",
    keywords: "Rahul Tanwar, founder, investor, business leader, ventures, SR18 Groups, Delhi 6",
  },
};
