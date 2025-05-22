export type Language = 'fr' | 'en';

export const translations = {
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À propos',
      portfolio: 'Portfolio',
      contact: 'Contact',
    },
    hero: {
      title: 'Développeur Web',
      subtitle: 'Passionné par la création d\'applications web modernes et performantes',
      contactButton: 'Me contacter',
      downloadCV: 'Télécharger CV',
    },
    about: {
      title: 'À propos de moi',
      description: 'J\'aime quand les idées prennent forme, quand on passe du concept au concret. Ce qui me motive, c\'est de rejoindre une équipe qui ose, qui itère vite, et qui construit pour répondre à de vrais besoins. J\'ai envie d\'apprendre au contact du terrain, de prendre part à un projet ambitieux et de contribuer à un produit qui a du sens. Builder, tester, pivoter s\'il le faut — mais toujours avancer.',
      skills: 'Compétences',
    },
    portfolio: {
      title: 'Mes Projets',
      demoButton: 'Voir le projet',
      githubButton: 'Voir le code',
      projects: [
        {
          title: 'Crazee Burger - Application de commande en ligne',
          description: 'Une application de commande en ligne permettant de personnaliser les produits, gérer les quantités et ajuster les prix en temps réel.',
          demoUrl: 'https://crazee-burger-mauve.vercel.app/',
          githubUrl: 'https://github.com/Ekkylibre/crazee-burger',
          imageUrl: '/crazee-burger.jpg',
        },
        {
          title: 'MK Vision - Site vitrine pour un réalisateur',
          description: 'Un site vitrine pour un réalisateur présente son portfolio, ses services et facilite la prise de contact via un formulaire dédié.',
          demoUrl: 'https://www.makeyvision.com/',
          githubUrl: 'https://github.com/Ekkylibre/mk-vision',
          imageUrl: '/makeyvision.jpg',
        },
        {
          title: 'PoketSecret - Application Web SaaS',
          description: 'Une application web permettant de suivre la disponibilité des produits Pokémon en magasin et d\'être alerté sur les réapprovisionnements et promotions.',
          demoUrl: 'https://poket-secret.vercel.app/',
          githubUrl: '',
          imageUrl: '/poketsecret.jpg',
        },
      ],
    },
    contact: {
      title: 'Me Contacter',
      form: {
        name: 'Nom',
        email: 'Email',
        subject: 'Sujet',
        message: 'Message',
        send: 'Envoyer',
        placeholders: {
          name: 'Votre nom',
          email: 'votre@email.com',
          subject: 'Sujet de votre message',
          message: 'Votre message...',
        },
      },
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      portfolio: 'Portfolio',
      contact: 'Contact',
    },
    hero: {
      title: 'Web Developer',
      subtitle: 'Passionate about creating modern and performant web applications',
      contactButton: 'Contact Me',
      downloadCV: 'Download CV',
    },
    about: {
      title: 'About Me',
      description: 'I thrive when ideas take shape, when we go from concept to reality. What drives me is joining a team that dares, iterates quickly, and builds to solve real needs. I want to learn hands-on, contribute to an ambitious project, and help create a product that truly matters. Build, test, pivot if needed — but always move forward.',
      skills: 'Skills',
    },
    portfolio: {
      title: 'My Projects',
      demoButton: 'View Project',
      githubButton: 'View Code',
      projects: [
        {
          title: 'Crazee-Burger',
          description: 'An online ordering application that allows you to customize products, manage quantities and adjust prices in real time.',
          demoUrl: 'https://crazee-burger-mauve.vercel.app/',
          githubUrl: 'https://github.com/Ekkylibre/crazee-burger',
          imageUrl: '/crazee-burger.jpg',
        },
        {
          title: 'Showcase Site',
          description: 'A showcase site for a director presents his portfolio, his services and his career, while facilitating contact through a dedicated form.',
          demoUrl: 'https://www.makeyvision.com/',
          githubUrl: 'https://github.com/Ekkylibre/makeyvision',
          imageUrl: '/makeyvision.jpg'
        },
        {
          title: 'PoketSecret - Web SaaS Application',
          description: 'A web application that allows users to track the availability of Pokémon products in stores and receive alerts for restocks and promotions.',
          demoUrl: 'https://poket-secret.vercel.app/',
          githubUrl: '',
          imageUrl: '/poketsecret.jpg',
        },
      ],
    },
    contact: {
      title: 'Contact Me',
      form: {
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        send: 'Send',
        placeholders: {
          name: 'Your name',
          email: 'your@email.com',
          subject: 'Message subject',
          message: 'Your message...',
        },
      },
    },
  },
} as const;