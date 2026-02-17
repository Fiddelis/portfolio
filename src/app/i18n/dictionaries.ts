import { defaultLocale, type Locale } from "./config";

export type Dictionary = {
  nav: {
    home: string;
    projects: string;
    contact: string;
  };
  hero: {
    badge: string;
    intro: string;
    role: string;
    descriptionHighlight: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    cardTitle: string;
    cardStatus: string;
    cardBullets: string[];
    cardMeta: Array<{ label: string; value: string }>;
    logosAria: string;
  };
  projects: {
    titlePrefix: string;
    titleAccent: string;
    subtitle: string;
    cards: Array<{
      title: string;
      description: string;
      ctaText: string;
    }>;
  };
  timeline: {
    titleEmphasis: string;
    titleRest: string;
    visitSite: string;
    present: string;
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
  contact: {
    badge: string;
    title: string;
    description: string;
    responseTag: string;
    socialTitle: string;
    socialSubtitle: string;
  };
  footer: {
    rights: string;
  };
  misc: {
    loading: string;
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      badge: "Available for freelance",
      intro: "Hi, I am",
      role: "Software Engineer",
      descriptionHighlight: "Software Engineer",
      description:
        "I build software on demand: web apps, internal tools, APIs, and AI automations tailored to each business.",
      ctaPrimary: "Let's talk",
      ctaSecondary: "View projects",
      cardTitle: "Freelance focus",
      cardStatus: "Open now",
      cardBullets: [
        "Web apps built for your process",
        "Internal tools that save team time",
        "APIs and AI automations on demand",
      ],
      cardMeta: [],
      logosAria: "Technology partners",
    },
    projects: {
      titlePrefix: "Available for",
      titleAccent: "Freelance Work",
      subtitle:
        "Custom software on demand, built around your workflow and goals.",
      cards: [
        {
          title: "Frontend & UI Engineering",
          description:
            "UI development for products and dashboards with clear UX, fast performance, and reliable delivery.",
          ctaText: "Available - Build your interface",
        },
        {
          title: "Software Development",
          description:
            "Custom software from planning to launch: backend, integrations, and architecture for real operations.",
          ctaText: "Available - Plan your project",
        },
        {
          title: "AI & Chatbot Solutions",
          description:
            "AI features, chatbots, and automations integrated into your product or internal workflows.",
          ctaText: "Available - Add AI",
        },
      ],
    },
    timeline: {
      titleEmphasis: "Career",
      titleRest: "Timeline",
      visitSite: "Visit site",
      present: "Present",
    },
    cta: {
      title: "Ready to build something real?",
      description:
        "Let's turn your next idea into a secure, scalable product with clarity and momentum.",
      button: "Start a project",
    },
    contact: {
      badge: "Contact",
      title: "Let's connect",
      description:
        "Share your ideas, timelines, and scope. I respond quickly and keep communication clear.",
      responseTag: "24-48h response",
      socialTitle: "Social",
      socialSubtitle: "Links",
    },
    footer: {
      rights: "All rights reserved.",
    },
    misc: {
      loading: "Loading...",
    },
  },
  pt: {
    nav: {
      home: "Inicio",
      projects: "Projetos",
      contact: "Contato",
    },
    hero: {
      badge: "Disponivel para freela",
      intro: "Oi, eu sou",
      role: "Engenharia de Software",
      descriptionHighlight: "Engenheiro de Software",
      description:
        "eu desenvolvo software sob demanda: apps web, ferramentas internas, APIs e automacoes com IA para cada negocio.",
      ctaPrimary: "Vamos conversar",
      ctaSecondary: "Ver projetos",
      cardTitle: "Foco em freela",
      cardStatus: "Disponivel",
      cardBullets: [
        "Apps web feitas para seu processo",
        "Ferramentas internas que economizam tempo",
        "APIs e automacoes com IA sob demanda",
      ],
      cardMeta: [],
      logosAria: "Tecnologias",
    },
    projects: {
      titlePrefix: "Disponivel para",
      titleAccent: "Freelance",
      subtitle:
        "Software sob demanda, construindo em cima do seu fluxo e metas do negocio.",
      cards: [
        {
          title: "Frontend & Interfaces",
          description:
            "Desenvolvimento de interfaces para produtos e dashboards com UX clara, performance e entrega consistente.",
          ctaText: "Disponivel - Construir interface",
        },
        {
          title: "Desenvolvimento de Software",
          description:
            "Software sob demanda do planejamento ao deploy: backend, integracoes e arquitetura para operacao real.",
          ctaText: "Disponivel - Planejar projeto",
        },
        {
          title: "Solucoes em IA & Chatbots",
          description:
            "Recursos de IA, chatbots e automacoes integrados ao seu produto ou fluxo interno.",
          ctaText: "Disponivel - Adicionar IA",
        },
      ],
    },
    timeline: {
      titleEmphasis: "Linha",
      titleRest: "do tempo",
      visitSite: "Visitar site",
      present: "Atualmente",
    },
    cta: {
      title: "Pronto para construir algo real?",
      description:
        "Vamos transformar sua proxima ideia em um produto seguro e escalavel com clareza e ritmo.",
      button: "Comecar um projeto",
    },
    contact: {
      badge: "Contato",
      title: "Vamos conversar",
      description:
        "Compartilhe suas ideias, prazos e escopo. Respondo rapido e mantenho a comunicacao clara.",
      responseTag: "Resposta em 24-48h",
      socialTitle: "Redes",
      socialSubtitle: "Links",
    },
    footer: {
      rights: "Todos os direitos reservados.",
    },
    misc: {
      loading: "Carregando...",
    },
  },
};

export function getDictionary(locale?: string): Dictionary {
  const key = (locale as Locale) || defaultLocale;
  return dictionaries[key] ?? dictionaries[defaultLocale];
}
