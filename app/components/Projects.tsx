'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoUrl?: string;
  codeUrl?: string;
  pending: boolean;
  star?: boolean;
  pendingMessage?: string;
}

const Projects = () => {
  const [filter, setFilter] = useState<string>('all');
  
  const projects: Project[] = [
    {
      id: 'watson',
      title: 'Watson',
      description: 'Application OSINT pour la recherche de comptes, simple à appréhender et très efficace.',
      tags: ['Python', 'JSON', 'OSINT', 'Cybersécurité'],
      imageUrl: '/projects/Watson.png',
      codeUrl: 'https://github.com/margoul1Malin/watson',
      pending: false,
      star: true
    },
    {
      id: 'drhead',
      title: 'DrHead',
      description: 'Une plateforme d\'articles et de formations en ligne',
      tags: ['Next.js', 'Node.JS', 'React', 'TailwindCSS'],
      imageUrl: '/projects/Drhead.png',
      demoUrl: 'https://drhead.org',
      pending: false,
      star: true
    },
    {
      id: 'docify',
      title: 'Docify',
      description: 'Un site en ligne pour faciliter vos créations de documentations. Aucun code n\'est requis, tout est facile d\'accès et expliqué.',
      tags: ['Next.js', 'Markdown', 'TailwindCSS'],
      imageUrl: '/projects/docify.png',
      demoUrl: 'https://docify.ink',
      pending: false,
      star: false
    },
    {
      id: 'rubberchickens',
      title: 'Rubber Chickens',
      description: 'Des Raspberry Pi traffiqués qui deviennent des rubber duckies en encore meilleures avec leur propre programme pour simplifier la vie des utilisateurs.',
      tags: ['Python', 'Raspberry Pi', 'MicroPython', 'Cybersécurité'],
      imageUrl: '/projects/chicken.webp',
      codeUrl: 'https://margoul1.xyz',
      pending: true,
      pendingMessage: 'Prototypes faits.',
      star: false
    },
    {
      id: 'keygarden',
      title: 'KeyGarden',
      description: 'Un jardin pour stocker vos mots de passse entre vos mains',
      tags: ['Python', 'PyQt5'],
      imageUrl: '/projects/KeyGarden.png',
      demoUrl: 'https://keygarden.org',
      codeUrl: 'https://github.com/margoul1Malin/keygarden',
      pending: true,
      pendingMessage: 'Arrivera plus tard...',
      star: false
    },
    {
      id: 'hakboard',
      title: 'HakBoard',
      description: 'Une malette à outil impressionante pour les pentesters. Afin de faciliter leur travail qui n\'est pas toujours de tout repos.',
      tags: ['JavaScript', 'Electron', 'Cybersécurité'],
      imageUrl: '/projects/hakboard.png',
      codeUrl: 'https://github.com/margoul1Malin/hakboard',
      pending: true,
      pendingMessage: 'Version 1 bientôt disponible.',
      star: false
    },
  ];
  
  const jsTags = ['TypeScript', 'React', 'Next.js', 'Node.JS', 'Electron', 'JavaScript', 'Vue.js'];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : filter === 'featured' 
      ? projects.filter(project => project.star)
      : filter === 'JavaScript'
        ? projects.filter(project => project.tags.some(tag => jsTags.includes(tag)))
        : projects.filter(project => project.tags.includes(filter));
  
  return (
    <section id="projets" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#00ff8c]/5 to-transparent opacity-50 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="terminal-text">./</span>
            <span className="text-gradient">Projets</span>
          </h2>
          <div className="w-24 h-1 bg-[#00ff8c] mx-auto rounded-full"></div>
          <p className="mt-4 max-w-2xl mx-auto text-gray-300">
            Une sélection de mes projets en développement et cybersécurité.
          </p>
        </motion.div>
        
        <div className="flex justify-center mb-10 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            {['all', 'featured', 'JavaScript', 'Cybersécurité', 'Python'].map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-4 py-2 rounded-md transition-all duration-300 whitespace-nowrap ${
                  filter === tag 
                    ? 'bg-[#00ff8c]/20 text-[#00ff8c] border border-[#00ff8c]/50 glow-border' 
                    : 'bg-black/30 text-gray-300 border border-white/10 hover:border-[#00ff8c]/30'
                }`}
              >
                {tag === 'all' ? 'Tous' : 
                 tag === 'featured' ? 'En vedette' : tag}
              </button>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {filteredProjects.map(project => (
            <motion.div 
              key={project.id}
              className={`card overflow-hidden group h-full flex flex-col ${project.pending ? 'pending-project border-yellow-500/30' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-video overflow-hidden">
                <Image 
                  src={project.imageUrl}
                  alt={`Capture d'écran du projet ${project.title}`}
                  width={600}
                  height={340}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={project.star}
                  style={{ objectFit: 'cover' }}
                />
                
                {project.pending && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:opacity-0 transition-opacity">
                    <span className="text-[#00ff8c] text-md font-bold border border-[#00ff8c] border-2 rounded-md px-2 py-1">{project.pendingMessage || '[Capture d\'écran du projet]'}</span>
                  </div>
                )}
                
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff8c]/50 to-transparent"></div>
                
                {project.star && (
                  <div className="absolute top-2 right-2 bg-[#00ff8c]/90 text-black text-xs font-semibold py-1 px-2 rounded-sm">
                    ★ Star
                  </div>
                )}
                
                {project.pending && (
                  <div className="absolute top-2 left-2 bg-yellow-500/90 text-black text-xs font-semibold py-1 px-2 rounded-sm flex items-center gap-1">
                    <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    En cours
                  </div>
                )}
              </div>
              
              <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold terminal-text">{project.title}</h3>
                  <div className="flex gap-2">
                    {project.codeUrl && (
                      <a 
                        href={project.codeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#00ff8c] transition-colors"
                        aria-label="Code source"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0a12 12 0 100 24 12 12 0 000-24zm3.163 21.783h-.093a.513.513 0 01-.382-.14.513.513 0 01-.14-.372v-1.406c.006-.467.01-.94.01-1.416a3.693 3.693 0 00-.151-1.028 1.832 1.832 0 00-.542-.875 8.08 8.08 0 002.038-.471 4.21 4.21 0 001.407-.964c.37-.42.655-.919.864-1.471.209-.552.314-1.207.314-1.962a3.93 3.93 0 00-.334-1.617 4.331 4.331 0 00-.96-1.35c.057-.137.113-.3.17-.488.057-.188.104-.479.142-.875.038-.396.021-.792-.046-1.191-.066-.399-.184-.798-.353-1.191h-.082a7.35 7.35 0 00-1.251.243 6.98 6.98 0 00-1.138.4 8.12 8.12 0 00-1.03.585c-.334.234-.582.424-.747.57a11.71 11.71 0 00-1.694-.243A12.52 12.52 0 0010.4 6.39c-.165-.146-.413-.336-.747-.57a8.12 8.12 0 00-1.03-.585 6.98 6.98 0 00-1.138-.4 7.35 7.35 0 00-1.25-.243h-.082a5.97 5.97 0 00-.353 1.191c-.067.399-.085.795-.047 1.191.039.396.085.687.143.875.057.188.113.35.17.488a4.33 4.33 0 00-.961 1.35c-.212.53-.334 1.066-.334 1.617 0 .755.105 1.41.314 1.962.209.553.497 1.051.865 1.471.369.42.854.738 1.455.964.601.226 1.285.396 2.056.515a1.58 1.58 0 00-.47.773 2.08 2.08 0 00-.118.866v.011l-.012-.002c-.323.005-.671.01-1 .01-.63-.001-1.086-.155-1.356-.471-.27-.316-.547-.706-.83-1.156a2.1 2.1 0 00-.69-.733 1.64 1.64 0 00-.82-.264l-.33-.019c-.232 0-.394.024-.488.073-.094.05-.125.114-.094.2.03.085.076.17.141.257.066.085.139.158.221.221l.117.073c.242.11.48.318.717.628.238.31.414.649.526 1.017l.163.49c.14.386.382.702.727.946.345.245.726.386 1.144.422.418.037.82.056 1.208.056.388-.001.718-.018.991-.052v1.426c0 .143-.052.26-.151.353a.533.533 0 01-.381.14h-.092a10.875 10.875 0 01-6.52-2.367A10.877 10.877 0 012.856 15a10.873 10.873 0 012.416-6.524 10.875 10.875 0 016.526-2.367c2.336 0 4.5.79 6.525 2.367a10.87 10.87 0 012.957 12.676 10.873 10.873 0 01-5.117 5.63z" />
                        </svg>
                      </a>
                    )}
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#00ff8c] transition-colors"
                        aria-label="Démo en ligne"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-gray-300 mb-4 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map(tag => (
                    <span 
                      key={`${project.id}-${tag}`}
                      className="px-2 py-1 bg-black/30 border border-[#00ff8c]/20 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="absolute inset-0 border border-transparent group-hover:border-[#00ff8c]/30 transition-all duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <a 
            href="https://github.com/margoul1Malin" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hacker-btn py-3 px-8 rounded-md inline-flex items-center gap-2"
          >
            <span>Voir plus sur GitHub</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 