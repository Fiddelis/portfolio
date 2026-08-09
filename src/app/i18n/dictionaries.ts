import { defaultLocale, type Locale } from "./config";

export type Dictionary = {
  nav: {
    home: string;
    projects: string;
    posts: string;
    contact: string;
  };
  blog: {
    title: string;
    subtitle: string;
    readMore: string;
    backToPosts: string;
    empty: string;
    publishedOn: string;
  };
  hero: {
    badge: string;
    role: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    cardBullets: string[];
    cardMeta: Array<{ label: string; value: string }>;
    logosAria: string;
  };
  projects: {
    archiveLabel: string;
    titlePrefix: string;
    titleAccent: string;
    subtitle: string;
    projectLabel: string;
    liveLabel: string;
    consoleLabel: string;
    consoleStatus: string;
    openLabel: string;
    details: {
      kindle2anki: {
        description: string;
        tags: string[];
      };
      kognilo: {
        description: string;
        tags: string[];
      };
    };
  };
  timeline: {
    archiveLabel: string;
    titleEmphasis: string;
    titleRest: string;
    visitSite: string;
    present: string;
    roles: Record<string, string>;
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
    socialTitle: string;
    socialSubtitle: string;
  };
  footer: {
    rights: string;
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    nav: {
      home: "Home",
      projects: "Work",
      posts: "Notes",
      contact: "Contact",
    },
    blog: {
      title: "Notes",
      subtitle:
        "Things I'm learning while building with AI, backend systems, and everything around them.",
      readMore: "Read note",
      backToPosts: "Back to notes",
      empty: "Nothing here yet.",
      publishedOn: "Posted on",
    },
    hero: {
      badge: "Software / AI / Product",
      role: "Software engineer",
      description:
        "I turn complicated ideas into digital products, simple tools, and AI features people can use every day.",
      ctaPrimary: "See my resume",
      ctaSecondary: "See what I've built",
      cardBullets: [
        "Web products & digital experiences",
        "Systems that connect the pieces",
        "AI tools that save time",
      ],
      cardMeta: [],
      logosAria: "Tools I use",
    },
    projects: {
      archiveLabel: "A few things I've made",
      titlePrefix: "Selected",
      titleAccent: "work",
      subtitle:
        "A couple of products I've built to make learning feel a little easier.",
      projectLabel: "PROJECT",
      liveLabel: "ONLINE",
      consoleLabel: "PROJECTS.EXE / HANDPICKED",
      consoleStatus: "2 systems online",
      openLabel: "See project",
      details: {
        kindle2anki: {
          description:
            "Moves Kindle highlights into Anki cards, so review starts with what you already marked.",
          tags: ["Kindle", "Anki", "Learning"],
        },
        kognilo: {
          description:
            "A calmer learning workspace for turning scattered study time into steady progress.",
          tags: ["AI", "Learning", "Web app"],
        },
      },
    },
    timeline: {
      archiveLabel: "Where I've worked",
      titleEmphasis: "Career",
      titleRest: "so far",
      visitSite: "Visit site",
      present: "Present",
      roles: {
        aiSoftwareIntern: "AI & Software Intern",
        numericalStatsTeachingAssistant: "Statistics Teaching Assistant",
        microcontrollersTeachingAssistant: "Microcontrollers Teaching Assistant",
        cybersecurityAiResearchIntern: "Cybersecurity and AI Research Intern",
        telecommunicationsIntern: "Telecommunications Intern",
        softwareAutomationIntern: "Software Automation Intern",
      },
    },
    cta: {
      title: "Have an idea?",
      description:
        "Tell me what you're working on. We can figure out the next step together.",
      button: "Let's talk",
    },
    contact: {
      badge: "Get in touch",
      title: "Say hello",
      description:
        "Have a project in mind or just want to compare notes? Send me a message.",
      socialTitle: "Find me online",
      socialSubtitle: "Elsewhere",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
  pt: {
    nav: {
      home: "Inicio",
      projects: "Projetos",
      posts: "Notas",
      contact: "Contato",
    },
    blog: {
      title: "Notas",
      subtitle:
        "O que estou aprendendo enquanto construo com IA, backends e tudo que aparece no caminho.",
      readMore: "Ler nota",
      backToPosts: "Voltar as notas",
      empty: "Ainda nao tem nada aqui.",
      publishedOn: "Publicado em",
    },
    hero: {
      badge: "Software / IA / Produto",
      role: "Engenheiro de software",
      description:
        "Transformo ideias dificeis de explicar em produtos digitais, ferramentas simples e recursos de IA que funcionam de verdade no dia a dia.",
      ctaPrimary: "Ver curriculo",
      ctaSecondary: "Ver meus projetos",
      cardBullets: [
        "Produtos web e experiencias digitais",
        "Sistemas que conectam tudo",
        "Ferramentas de IA que poupam tempo",
      ],
      cardMeta: [],
      logosAria: "Ferramentas que uso",
    },
    projects: {
      archiveLabel: "Algumas coisas que fiz",
      titlePrefix: "Alguns",
      titleAccent: "projetos",
      subtitle:
        "Dois produtos que fiz para deixar o estudo mais simples - e um pouco menos pesado.",
      projectLabel: "PROJETO",
      liveLabel: "ONLINE",
      consoleLabel: "PROJETOS.EXE / ARQUIVO PESSOAL",
      consoleStatus: "2 sistemas online",
      openLabel: "Ver projeto",
      details: {
        kindle2anki: {
          description:
            "Leva seus destaques do Kindle direto para cards no Anki, prontos para revisar.",
          tags: ["Kindle", "Anki", "Estudos"],
        },
        kognilo: {
          description:
            "Um espaco de estudo mais tranquilo para transformar tempo espalhado em progresso de verdade.",
          tags: ["IA", "Estudos", "Web app"],
        },
      },
    },
    timeline: {
      archiveLabel: "Por onde passei",
      titleEmphasis: "Carreira",
      titleRest: "ate aqui",
      visitSite: "Ver site",
      present: "Hoje",
      roles: {
        aiSoftwareIntern: "Estagio em IA e Software",
        numericalStatsTeachingAssistant: "Monitor de Estatistica",
        microcontrollersTeachingAssistant: "Monitor de Microcontroladores",
        cybersecurityAiResearchIntern: "Pesquisa em Ciberseguranca e IA",
        telecommunicationsIntern: "Estagio em Telecom",
        softwareAutomationIntern: "Estagio em Automacao de Software",
      },
    },
    cta: {
      title: "Tem uma ideia?",
      description:
        "Me conta no que voce esta trabalhando. A gente pensa no proximo passo juntos.",
      button: "Vamos conversar",
    },
    contact: {
      badge: "Fale comigo",
      title: "Vamos trocar uma ideia",
      description:
        "Tem um projeto em mente ou so quer conversar? Me manda uma mensagem.",
      socialTitle: "Me encontre por ai",
      socialSubtitle: "Links",
    },
    footer: {
      rights: "Todos os direitos reservados.",
    },
  },
};

export function getDictionary(locale?: string): Dictionary {
  const key = (locale as Locale) || defaultLocale;
  return dictionaries[key] ?? dictionaries[defaultLocale];
}
