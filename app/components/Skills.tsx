'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaReact, FaPython, FaDatabase, FaLinux, FaGithub, FaWindows, FaCode, FaLock, FaWifi, FaSearch, FaShieldAlt, FaUsers } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiC, SiMongodb, SiGnubash } from "react-icons/si";
import { HiOutlineEye } from "react-icons/hi";

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'security' | 'computer';
  icon: React.ReactNode;
}

const Skills = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  const skills: Skill[] = [
    // Frontend
    { name: 'React', level: 75, category: 'frontend', icon: <FaReact className="text-[#61DAFB] text-2xl" /> },
    { name: 'TypeScript', level: 75, category: 'frontend', icon: <SiTypescript className="text-[#3178C6] text-2xl" /> },
    { name: 'Next.js', level: 75, category: 'frontend', icon: <SiNextdotjs className="text-white text-2xl" /> },
    { name: 'CSS/Tailwind', level: 95, category: 'frontend', icon: <SiTailwindcss className="text-[#06B6D4] text-2xl" /> },
    
    // Backend
    { name: 'Python', level: 85, category: 'backend', icon: <FaPython className="text-[#3776AB] text-2xl" /> },
    { name: 'SQL', level: 50, category: 'backend', icon: <FaDatabase className="text-[#FF9900] text-2xl" /> },
    { name: 'NoSQL', level: 50, category: 'backend', icon: <SiMongodb className="text-[#47A248] text-2xl" /> },
    { name: 'C/C++', level: 15, category: 'backend', icon: <SiC className="text-[#A8B9CC] text-2xl" /> },
    { name: 'PowerShell', level: 20, category: 'backend', icon: <FaCode className="text-[#5391FE] text-2xl" /> },
    { name: 'Bash / Zsh', level: 40, category: 'backend', icon: <SiGnubash className="text-[#5391FE] text-2xl" /> },
    // Sécurité
    { name: 'Pentesting', level: 45, category: 'security', icon: <FaShieldAlt className="text-[#ff3e00] text-2xl" /> },
    { name: 'Forensics', level: 45, category: 'security', icon: <FaSearch className="text-[#E6E6E6] text-2xl" /> },
    { name: 'Cryptographie', level: 30, category: 'security', icon: <FaLock className="text-[#FFD700] text-2xl" /> },
    { name: 'Réseau', level: 65, category: 'security', icon: <FaWifi className="text-[#00BFFF] text-2xl" /> },
    { name: 'OSINT', level: 80, category: 'security', icon: <HiOutlineEye className="text-[#9ACD32] text-2xl" /> },
    
    // DevOps
    { name: 'Windows', level: 53, category: 'computer', icon: <FaWindows className="text-[#0078D6] text-2xl" /> },
    { name: 'Linux', level: 75, category: 'computer', icon: <FaLinux className="text-[#FCC624] text-2xl" /> },
    { name: 'Git', level: 70, category: 'computer', icon: <FaGithub className="text-white text-2xl" /> },
    { name: 'Active Directory', level: 40, category: 'computer', icon: <FaUsers className="text-[#5C2D91] text-2xl" /> },
  ];
  
  // Correction du filtrage: faire correspondre activeFilter avec les catégories exactes
  const getFilteredSkills = () => {
    if (activeFilter === 'all') {
      return skills;
    }
    
    if (activeFilter === 'frontend') {
      return skills.filter(skill => skill.category === 'frontend');
    }
    
    if (activeFilter === 'backend') {
      return skills.filter(skill => skill.category === 'backend');
    }
    
    if (activeFilter === 'security') {
      return skills.filter(skill => skill.category === 'security');
    }
    
    if (activeFilter === 'computer') {
      return skills.filter(skill => skill.category === 'computer');
    }
    
    return skills;
  };
  
  const filteredSkills = getFilteredSkills();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  return (
    <section id="competences" className="py-20 relative">
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/circuit-pattern.png')] bg-repeat"></div>
      </div>
      
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
            <span className="text-gradient">Compétences</span>
          </h2>
          <div className="w-24 h-1 bg-[#00ff8c] mx-auto rounded-full"></div>
          <p className="mt-4 max-w-2xl mx-auto text-gray-300">
            Un aperçu des technologies et outils que j&apos;utilise pour développer des applications sécurisées.
          </p>
        </motion.div>
        
        <div className="flex justify-center mb-10 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            {['all', 'frontend', 'backend', 'security', 'computer'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-md transition-all duration-300 whitespace-nowrap ${
                  activeFilter === filter 
                    ? 'bg-[#00ff8c]/20 text-[#00ff8c] border border-[#00ff8c]/50 glow-border' 
                    : 'bg-black/30 text-gray-300 border border-white/10 hover:border-[#00ff8c]/30'
                }`}
              >
                {filter === 'all' ? 'Tout' : 
                 filter === 'frontend' ? 'Frontend' : 
                 filter === 'backend' ? 'Backend' : 
                 filter === 'security' ? 'Sécurité' : 
                 filter === 'computer' ? 'Informatique' : 'DevOps'}
              </button>
            ))}
          </div>
        </div>
        
        {filteredSkills && filteredSkills.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            key={activeFilter} // Force re-render when filter changes
          >
            {filteredSkills.map((skill) => (
              <motion.div 
                key={`${activeFilter}-${skill.name}`} 
                className="card p-4 backdrop-blur-sm relative overflow-hidden group"
                variants={itemVariants}
              >
                <div className="absolute top-3 right-3">{skill.icon}</div>
                <h3 className="text-xl font-semibold mb-3 terminal-text pr-10">{skill.name}</h3>
                
                <div className="h-2 bg-black/50 rounded-full overflow-hidden mb-2">
                  <motion.div 
                    className={`h-full ${
                      skill.level < 30 
                        ? 'bg-gradient-to-r from-red-500 to-orange-500' 
                        : skill.level < 60 
                          ? 'bg-gradient-to-r from-yellow-500 to-green-500' 
                          : 'bg-gradient-to-r from-[#00ff8c] to-[#00ffcc]'
                    }`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                  ></motion.div>
                </div>
                
                <div className="flex justify-between text-sm opacity-80">
                  <span>Niveau</span>
                  <span>{skill.level}%</span>
                </div>
                
                <div className="absolute inset-0 border border-transparent group-hover:border-[#00ff8c]/30 transition-all duration-300 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#00ff8c]/30 group-hover:w-full transition-all duration-700"></div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#00ff8c] text-lg">Aucune compétence trouvée pour ce filtre.</p>
          </div>
        )}
        
        <motion.div 
          className="mt-16 terminal p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-lg">
            <span className="text-[#00ff8c] font-mono">$</span> L&apos;apprentissage est un processus continu.{' '}
            <span className="blink">_</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 