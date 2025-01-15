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
          title: 'E-commerce Platform',
          description: 'Une plateforme e-commerce complète avec panier, paiement et gestion des commandes',
          demoUrl: '#',
        },
        {
          title: 'Dashboard Analytics',
          description: 'Un tableau de bord moderne pour visualiser et analyser les données',
          demoUrl: '#',
        },
        {
          title: 'Task Management',
          description: 'Application de gestion de tâches avec fonctionnalités collaboratives',
          demoUrl: '#',
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
          title: 'E-commerce Platform',
          description: 'A complete e-commerce platform with cart, payment, and order management',
          demoUrl: '#',
        },
        {
          title: 'Dashboard Analytics',
          description: 'A modern dashboard for data visualization and analysis',
          demoUrl: '#',
        },
        {
          title: 'Task Management',
          description: 'Task management application with collaborative features',
          demoUrl: '#',
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