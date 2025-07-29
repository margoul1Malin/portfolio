'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaCode, FaShieldAlt, FaTerminal, FaLaptopCode, FaNetworkWired, FaWindows, FaLinux, FaPython, FaGit, FaDocker, FaJs } from "react-icons/fa";
import { PiStudentFill } from 'react-icons/pi';
import { useJsDetection } from '../lib/js-detection';

const About = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const { jsAvailable } = useJsDetection();
  
  useEffect(() => {
    if (!jsAvailable) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [jsAvailable]);

  // Définir les compétences avec des icônes et des couleurs
  const tags = [
    { name: 'Developpement', icon: <FaCode />, color: '#61DAFB' },
    { name: 'Cybersecurity', icon: <FaShieldAlt />, color: '#FF3E00' },
    { name: 'Pentesting', icon: <FaTerminal />, color: '#00FF8C' },
    { name: 'Programmation', icon: <FaLaptopCode />, color: '#3178C6' },
    { name: 'Active Directory', icon: <FaNetworkWired />, color: '#5C2D91' },
    { name: 'Linux', icon: <FaLinux />, color: '#FCC624' },
    { name: 'Windows', icon: <FaWindows />, color: '#0078D6' },
    { name: 'Teaching', icon: <PiStudentFill />, color: '#FFFFFF'},
    { name: 'Networking', icon: <FaNetworkWired />, color: '#00FF8C' },
    { name: 'Python', icon: <FaPython />, color: '#0078D6' },
    { name: 'Bash', icon: <FaTerminal />, color: '#FF3E00' },
    { name: 'Git', icon: <FaGit />, color: '#5C2D91' },
    { name: 'Docker', icon: <FaDocker />, color: '#FCC624' },
    { name: 'Javascript', icon: <FaJs />, color: '#00FF8C' },
  ];

  // Version statique pour les bots
  if (!jsAvailable) {
    return (
      <>
        {/* Cette div contient un flag caché qui sera visible dans le code source HTML */}

        <section id="apropos" className="py-20 relative overflow-hidden">
          {/* Fond dynamique avec motifs cyberpunk */}
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/circuit-pattern.png')] bg-repeat"></div>
          </div>
          
          {/* Effet de grille */}
          <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,255,140,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,140,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30"></div>
          
          {/* Flag caché visible uniquement dans le code source */}
          <div style={{ display: 'none' }} data-flag="FLAG{H4CK3R_1N_PR0GR3SS}">
            Ce flag est visible uniquement dans le code source. Bravo pour votre curiosité !
          </div>
          
          <div className="scanline"></div>
          {/* Fin du fond dynamique */}
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                <span className="terminal-text">./</span>
                <span className="text-gradient">À propos</span>
              </h2>
              <div className="w-24 h-1 bg-[#00ff8c] mx-auto rounded-full"></div>
              <div className="h-px max-w-sm mx-auto mt-6 bg-gradient-to-r from-transparent via-[#00ff8c]/50 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-5 card p-6 relative backdrop-blur-sm border border-white/10 group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ff8c]/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-gradient">Qui suis-je ?</h3>
                  <div className="space-y-4 text-gray-300">
                    <div className="font-mono text-sm">
                      <div className="text-[#00ff8c] mb-2">about_me.txt</div>
                      <div className="space-y-2">
                        <p>❯Développeur passionné avec sa propre expertise en sécurité informatique et développement web. J&apos;explore constamment les nouvelles technologies pour créer des solutions innovantes.</p>
                        <p>❯Mon parcours mêle programmation et cybersécurité, me permettant d&apos;adopter une approche complète dans mes projets. Je m&apos;efforce de produire du code non seulement fonctionnel, mais aussi sécurisé et optimisé. Je peux aussi servir de &quot;&quot;&quot;professeur&quot;&quot;&quot; partiellement si vous souhaitez acquérier du savoir dans des domaines que je maîtrise.</p>
                        <p>❯En veille technologique permanente, je m&apos;intéresse particulièrement à la manière dont les hackers utilisent l&apos;informatique, à la sécurité des applications et aux nouveautés dans le monde du code.</p>
                      </div>
                      <div className="mt-4">
                        <div className="text-[#00ff8c]">$ cd ./expérience</div>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center">
                            <span className="text-[#00ff8c] mr-2">▶</span>
                            <span className="font-semibold">Développeur Full Stack</span>
                            <span className="text-gray-400 ml-2">Since 2018</span>
                          </div>
                          <div className="text-sm text-gray-300 ml-6">Développement d&apos;applications web sécurisées avec des frameworks modernes comme Next.js ou Django</div>
                          
                          <div className="flex items-center">
                            <span className="text-[#00ff8c] mr-2">▶</span>
                            <span className="font-semibold">Pentester</span>
                            <span className="text-gray-400 ml-2">Since 2023</span>
                          </div>
                          <div className="text-sm text-gray-300 ml-6">A mes heures perdues je me suis formé à la cybersécurité et j&apos;ai pu tester des systèmes d&apos;exploitation, des applications, des réseaux wifi, etc..</div>
                          
                          <div className="flex items-center">
                            <span className="text-[#00ff8c] mr-2">▶</span>
                            <span className="font-semibold">Informaticien</span>
                            <span className="text-gray-400 ml-2">Since 2025</span>
                          </div>
                          <div className="text-sm text-gray-300 ml-6">J&apos;ai eu l&apos;occasion de suivre une formation très enrichissante chez Dawan pour comprendre le monde de l&apos;informatique plus en profondeur et notamment l&apos;Active Directory et les architectures réseaux en entreprise.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7">
                <div className="card p-6 backdrop-blur-sm border border-white/10">
                  <h3 className="text-2xl font-bold mb-6 text-gradient">Compétences & Technologies</h3>
                  <div className="flex flex-wrap gap-3">
                    {tags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                        style={{ borderColor: `${tag.color}40` }}
                      >
                        <span style={{ color: tag.color }}>{tag.icon}</span>
                        <span className="text-sm font-medium">{tag.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Version interactive pour les utilisateurs
  return (
    <>
      {/* Cette div contient un flag caché qui sera visible dans le code source HTML */}

      <section id="apropos" className="py-20 relative overflow-hidden">
        {/* Fond dynamique avec motifs cyberpunk */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/circuit-pattern.png')] bg-repeat"></div>
        </div>
        
        {/* Effet de grille */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,255,140,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,140,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30"></div>
        
        {/* Flag caché visible uniquement dans le code source */}
        <div style={{ display: 'none' }} data-flag="FLAG{H4CK3R_1N_PR0GR3SS}">
          Ce flag est visible uniquement dans le code source. Bravo pour votre curiosité !
        </div>
        
        {/* Effet de suivi de souris */}
        <div 
          className="pointer-events-none fixed w-80 h-80 rounded-full bg-[#00ff8c] opacity-5 blur-3xl z-0"
          style={{
            left: `${cursorPosition.x - 150}px`,
            top: `${cursorPosition.y - 150}px`,
            transition: 'left 0.5s ease-out, top 0.5s ease-out',
          }}
        ></div>
        
        <div className="scanline"></div>
        {/* Fin du fond dynamique */}
        
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
              <span className="text-gradient">À propos</span>
            </h2>
            <div className="w-24 h-1 bg-[#00ff8c] mx-auto rounded-full"></div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-px max-w-sm mx-auto mt-6 bg-gradient-to-r from-transparent via-[#00ff8c]/50 to-transparent"
            ></motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <motion.div 
              className="md:col-span-5 card p-6 relative backdrop-blur-sm border border-white/10 group"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Lignes décoratives animées */}
              <div className="absolute top-0 left-0 w-0 h-1 bg-[#00ff8c] group-hover:w-full transition-all duration-700"></div>
              <div className="absolute top-0 right-0 w-1 h-0 bg-[#00ff8c] group-hover:h-full transition-all duration-700 delay-100"></div>
              <div className="absolute bottom-0 right-0 w-0 h-1 bg-[#00ff8c] group-hover:w-full transition-all duration-700 delay-200"></div>
              <div className="absolute bottom-0 left-0 w-1 h-0 bg-[#00ff8c] group-hover:h-full transition-all duration-700 delay-300"></div>
              
              <div className="aspect-ratio-1/1 bg-black/40 rounded-lg mb-4 overflow-hidden relative group">
                {/* Ici vous pourrez ajouter votre photo */}
                <div className="absolute inset-0 flex items-center justify-center terminal-text text-xl">
                  [PHOTO]
                </div>
                <div className="absolute inset-0 border border-[#00ff8c]/30"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#00ff8c]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-3 right-3 w-2 h-2 bg-[#00ff8c] rounded-full animate-pulse"></div>
                
                {/* Bruit numérique */}
                <div className="absolute inset-0 opacity-20 pointer-events-none z-0 bg-noise"></div>
                
                {/* Lignes de scan */}
                <div className="absolute inset-0">
                  <div className="absolute h-[1px] w-full bg-[#00ff8c]/20 top-[20%] left-0 animate-[scan_2s_linear_infinite]"></div>
                  <div className="absolute h-[1px] w-full bg-[#00ff8c]/20 top-[80%] left-0 animate-[scan_3s_linear_infinite_reverse]"></div>
                </div>
              </div>
              
              <div className="terminal-text text-sm mb-2 flex items-center group">
                <span className="text-[#00ff8c] mr-2">$</span> whoami
                <span className="ml-2 h-4 w-px bg-[#00ff8c] animate-blink"></span>
              </div>
              
              <h3 className="text-2xl font-bold mb-2 glow-text">Un informaticien en devenir</h3>
              
              <div className="mt-6 space-y-4">
                <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-2 flex items-center">
                  <span className="h-px w-3 bg-[#00ff8c] mr-2"></span>
                  Compétences & Passions
                  <span className="h-px flex-grow bg-[#00ff8c]/20 ml-2"></span>
                </h4>
                
                <div className="grid grid-cols-2 gap-3">
                  {tags.map((tag, index) => (
                    <motion.div 
                      key={tag.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 255, 140, 0.05)' }}
                      className="px-3 py-2 bg-black/30 border border-[#00ff8c]/20 rounded-md relative overflow-hidden group/tag flex items-center"
                    >
                      <div className="mr-2 text-lg" style={{ color: tag.color }}>
                        {tag.icon}
                      </div>
                      <span className="relative z-10 text-sm font-medium">{tag.name}</span>
                      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#00ff8c]/50 group-hover/tag:w-full transition-all duration-500"></div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="p-3 mt-4 bg-black/20 border border-[#00ff8c]/10 rounded-md"
                >
                  <div className="flex items-center mb-2">
                    <span className="text-[#00ff8c] mr-2 text-xs">〉</span>
                    <span className="text-sm font-semibold">Disponibilité</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Status:</span>
                    <span className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-[#00ff8c] mr-2 animate-pulse"></span>
                      <span className="text-[#00ff8c]">Actif</span>
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:col-span-7 terminal p-6 relative backdrop-blur-md"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <div className="flex-1 text-center text-xs text-gray-500">about_me.txt</div>
              </div>
              
              <div className="space-y-4 text-[#f0f0f0]">
                {[
                  "Développeur passionné avec sa propre expertise en sécurité informatique et développement web. J'explore constamment les nouvelles technologies pour créer des solutions innovantes.",
                  "Mon parcours mêle programmation et cybersécurité, me permettant d'adopter une approche complète dans mes projets. Je m'efforce de produire du code non seulement fonctionnel, mais aussi sécurisé et optimisé. Je peux aussi servir de \"\"\"professeur\"\"\" partiellement si vous souhaitez acquérier du savoir dans des domaines que je maîtrise.",
                  "En veille technologique permanente, je m'intéresse particulièrement à <span class=\"text-[#00ff8c]\">la manière dont les hackers utilisent l'informatique</span>, à la <span class=\"text-[#00ff8c]\">sécurité des applications</span> et aux <span class=\"text-[#00ff8c]\">nouveautés dans le monde du code</span>."
                ].map((text, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + (index * 0.15) }}
                    className="relative"
                  >
                    <span className="text-[#00ff8c] mr-2">❯</span> 
                    <span dangerouslySetInnerHTML={{ __html: text }}></span>
                  </motion.p>
                ))}
              </div>
              
              <motion.div 
                className="mt-8 pt-4 border-t border-[#00ff8c]/20 relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="absolute -top-px left-0 h-px w-0 bg-gradient-to-r from-[#00ff8c] to-transparent animate-[loadingBar_2s_ease-in-out_forwards]"></div>
                
                <h4 className="text-[#00ff8c] mb-3">$ cd ./expérience</h4>
                <ul className="space-y-3">
                  {[
                    {
                      title: "Développeur Full Stack",
                      period: "Since 2018",
                      description: "Développement d'applications web sécurisées avec des frameworks modernes comme Next.js ou Django"
                    },
                    {
                      title: "Pentester",
                      period: "Since 2023",
                      description: "A mes heures perdues je me suis formé à la cybersécurité et j'ai pu tester des systèmes d'exploitation, des applications, des réseaux wifi, etc.."
                    },
                    {
                      title: "Informaticien",
                      period: "Since 2025",
                      description: "J'ai eu l'occasion de suivre une formation très enrichissante chez Dawan pour comprendre le monde de l'informatique plus en profondeur et notamment l'Active Directory et les architectures réseaux en entreprise."
                    }
                  ].map((job, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.2 + (index * 0.2) }}
                      className="flex items-start group"
                    >
                      <span className="text-[#00ff8c] mr-2 transition-transform duration-300 group-hover:translate-x-1">▶</span>
                      <div>
                        <span className="font-semibold">{job.title}</span> 
                        <span className="text-sm text-gray-400 ml-2">{job.period}</span>
                        <p className="text-sm mt-1 text-gray-300 group-hover:text-white transition-colors duration-300">{job.description}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About; 