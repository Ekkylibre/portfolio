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
      description: 'Développeur Front End avec une spécialisation en React.js, j’adore créer des interfaces modernes et fluides. Curieux et impliqué, je prends plaisir à résoudre des défis techniques et à trouver des solutions simples et efficaces. Je cherche toujours à apprendre de nouvelles choses tout en contribuant activement au succès des projets de l’équipe.',
      skills: 'Compétences',
    },
    portfolio: {
      title: 'Mes Projets',
      demoButton: 'Voir le projet',
      projects: [
        {
          title: 'Crazee-Burger',
          description: 'Une application de commande en ligne permettant de personnaliser les produits, gérer les quantités et ajuster les prix en temps réel.',
          demoUrl: 'https://crazee-burger-kgp1jvhvw-danys-projects-420b837d.vercel.app/',
          imageUrl: '/crazee-burger.jpg',
        },
        {
          title: 'Site Vitrine',
          description: 'Un site vitrine pour un réalisateur présente son portfolio, ses services et facilite la prise de contact via un formulaire dédié.',
          demoUrl: 'https://www.makeyvision.com/',
          imageUrl: '/makeyvision.jpg',
        },
        {
          title: 'Minecraft Modboard',
          description: 'API et interface utilisateur Web pour gérer les serveurs Minecraft modifiés permettant une gestion facile des configurations et des mods.',
          demoUrl: 'https://mc-mod-board-qbxi3t2qs-danys-projects-420b837d.vercel.app/',
          imageUrl: '/minecraft.jpg',
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
      description: 'Front End developer specializing in React.js, I love building modern and seamless interfaces. Curious and dedicated, I enjoy tackling technical challenges and finding simple, effective solutions. I’m always eager to learn new things while actively contributing to the success of the team\'s projects.',
      skills: 'Skills',
    },
    portfolio: {
      title: 'My Projects',
      demoButton: 'View Project',
      projects: [
        {
          title: 'Crazee-Burger',
          description: 'An online ordering application that allows you to customize products, manage quantities and adjust prices in real time.',
          demoUrl: 'https://crazee-burger-kgp1jvhvw-danys-projects-420b837d.vercel.app/',
          imageUrl: '/crazee-burger.jpg',
        },
        {
          title: 'Showcase Site',
          description: 'A showcase site for a director presents his portfolio, his services and his career, while facilitating contact through a dedicated form.',
          demoUrl: 'https://www.makeyvision.com/',
          imageUrl: '/makeyvision.jpg'
        },
        {
          title: 'Minecraft Modboard',
          description: 'API and web UI to manage modded Minecraft servers allowing easy management of configurations and mods.',
          demoUrl: 'https://mc-mod-board-qbxi3t2qs-danys-projects-420b837d.vercel.app/',
          imageUrl: '/minecraft.jpg',
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