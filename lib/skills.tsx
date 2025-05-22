import React from 'react';
import { SiNextdotjs, SiTypescript, SiReact, SiTailwindcss, SiGithub, SiRedux, SiPostgresql, SiSwagger } from 'react-icons/si';

export const skills = [
  { 
    name: 'Next.js',
    icon: <SiNextdotjs className="h-8 w-8" style={{ color: '#000000' }} />
  },
  { 
    name: 'TypeScript',
    icon: <SiTypescript className="h-8 w-8" style={{ color: '#3178C6' }} />
  },
  { 
    name: 'React.js',
    icon: <SiReact className="h-8 w-8" style={{ color: '#61DAFB' }} />
  },
  { 
    name: 'Tailwind CSS',
    icon: <SiTailwindcss className="h-8 w-8" style={{ color: '#06B6D4' }} />
  },
  { 
    name: 'Git/GitHub',
    icon: <SiGithub className="h-8 w-8" style={{ color: '#181717' }} />
  },
  { 
    name: 'Redux',
    icon: <SiRedux className="h-8 w-8" style={{ color: '#764ABC' }} />
  },
  { 
    name: 'PostgreSQL',
    icon: <SiPostgresql className="h-8 w-8" style={{ color: '#4169E1' }} />
  },
  { 
    name: 'API REST',
    icon: <SiSwagger className="h-8 w-8" style={{ color: '#85EA2D' }} />
  }
];
