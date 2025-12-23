import { defaultLocale, type Locale } from "./config";

export type Dictionary = {
  nav: {
    home: string;
    projects: string;
    about: string;
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
  about: {
    badge: string;
    title: string;
    description: string;
    focusLabel: string;
    focusValue: string;
    locationLabel: string;
    locationValue: string;
    imageAlt: string;
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
      about: "About",
      contact: "Contact",
    },
    hero: {
      badge: "Available for freelance",
      intro: "Hi, I am",
      role: "Software Engineer",
      descriptionHighlight: "Software Engineer",
      description:
        "focused on building modern frontend experiences, scalable software systems, and AI-powered applications such as chatbots and intelligent tools.",
      ctaPrimary: "Let's talk",
      ctaSecondary: "View projects",
      cardTitle: "Freelance focus",
      cardStatus: "Open now",
      cardBullets: [
        "High-end frontend interfaces with React & modern stacks.",
        "Custom software solutions and dashboards.",
        "AI integrations, chatbots, and automation tools.",
      ],
      cardMeta: [
        { label: "Work model", value: "Project-based" },
        { label: "Response", value: "24-48h" },
      ],
      logosAria: "Technology partners",
    },
    projects: {
      titlePrefix: "Available for",
      titleAccent: "Freelance Work",
      subtitle:
        "Focused on clean interfaces, secure systems, and measurable outcomes.",
      cards: [
        {
          title: "Frontend & UI Engineering",
          description:
            "Design and development of modern, high-performance frontend applications with clean UX, accessibility, and responsive layouts.",
          ctaText: "Available — Let's build",
        },
        {
          title: "Software Development",
          description:
            "End-to-end software development, from architecture to implementation, focused on scalability, maintainability, and real-world use cases.",
          ctaText: "Available — Discuss your idea",
        },
        {
          title: "AI & Chatbot Solutions",
          description:
            "Integration of AI models, chatbots, and intelligent workflows to automate processes, enhance products, and improve user interaction.",
          ctaText: "Available — Explore AI solutions",
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
    about: {
      badge: "About",
      title: "Building scalable software and intelligent systems.",
      description:
        "I am Lucas Fiddelis, a software engineering student and freelance developer focused on building scalable software systems, backend-driven applications, and AI-powered solutions such as chatbots, automation, and intelligent platforms.",
      focusLabel: "Focus",
      focusValue: "Frontend, Software Engineering & AI",
      locationLabel: "Location",
      locationValue: "Brazil, remote ready",
      imageAlt: "Portrait of Lucas Fiddelis",
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
      home: "Início",
      projects: "Projetos",
      about: "Sobre",
      contact: "Contato",
    },
    hero: {
      badge: "Disponível para freela",
      intro: "Oi, eu sou",
      role: "Engenharia de Software",
      descriptionHighlight: "Engenheiro de Software",
      description:
        "focado em criar experiências modernas de frontend, sistemas de software escaláveis e aplicações com IA, como chatbots e ferramentas inteligentes.",
      ctaPrimary: "Vamos conversar",
      ctaSecondary: "Ver projetos",
      cardTitle: "Foco em freela",
      cardStatus: "Disponível",
      cardBullets: [
        "Interfaces frontend modernas com React e stacks atuais.",
        "Soluções de software e dashboards sob medida.",
        "Integrações com IA, chatbots e automações.",
      ],
      cardMeta: [
        { label: "Modelo de trabalho", value: "Por projeto" },
        { label: "Resposta", value: "24-48h" },
      ],
      logosAria: "Tecnologias",
    },
    projects: {
      titlePrefix: "Disponível para",
      titleAccent: "Freelance",
      subtitle:
        "Foco em interfaces limpas, sistemas seguros e resultados mensuráveis.",
      cards: [
        {
          title: "Frontend & Interfaces",
          description:
            "Design e desenvolvimento de aplicações frontend modernas, com foco em UX, performance e responsividade.",
          ctaText: "Disponível — Vamos construir",
        },
        {
          title: "Desenvolvimento de Software",
          description:
            "Desenvolvimento completo de software, da arquitetura à entrega, com foco em escalabilidade e código sustentável.",
          ctaText: "Disponível — Conversar sobre a ideia",
        },
        {
          title: "Soluções em IA & Chatbots",
          description:
            "Criação e integração de chatbots, modelos de IA e fluxos inteligentes para automatizar processos e melhorar produtos digitais.",
          ctaText: "Disponível — Explorar soluções em IA",
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
        "Vamos transformar sua próxima ideia em um produto seguro e escalável com clareza e ritmo.",
      button: "Começar um projeto",
    },
    contact: {
      badge: "Contato",
      title: "Vamos conversar",
      description:
        "Compartilhe suas ideias, prazos e escopo. Respondo rápido e mantenho a comunicação clara.",
      responseTag: "Resposta em 24-48h",
      socialTitle: "Redes",
      socialSubtitle: "Links",
    },
    about: {
      badge: "Sobre",
      title: "Construindo software escalável e sistemas inteligentes.",
      description:
        "Sou Lucas Fiddelis, estudante de engenharia de software e desenvolvedor freelancer focado na construção de sistemas de software escaláveis, aplicações backend e soluções com IA, como chatbots, automações e plataformas inteligentes.",
      focusLabel: "Foco",
      focusValue: "Frontend, Engenharia de Software & IA",
      locationLabel: "Localização",
      locationValue: "Brasil, remoto",
      imageAlt: "Retrato de Lucas Fiddelis",
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
