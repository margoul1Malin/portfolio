'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [text, setText] = useState('');
  const fullTextLines = useMemo(() => [
    '> Initialisation système...',
    '> Chargement profil...',
    '> Accès autorisé',
    '> Type: Hacker / Développeur / Programmeur & Plus...',
    '> Bienvenue sur mon portfolio'
  ], []);
  const [currentLine, setCurrentLine] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  
  // Effet de typing terminal
  useEffect(() => {
    if (currentLine < fullTextLines.length) {
      const typingInterval = setInterval(() => {
        if (charIndex < fullTextLines[currentLine].length) {
          setText(prev => prev + fullTextLines[currentLine][charIndex]);
          setCharIndex(prev => prev + 1);
        } else {
          setDisplayedLines(prev => [...prev, text]);
          setText('');
          setCharIndex(0);
          setCurrentLine(prev => prev + 1);
          clearInterval(typingInterval);
        }
      }, 50);
      
      return () => clearInterval(typingInterval);
    }
  }, [currentLine, charIndex, displayedLines, text, fullTextLines]);
  
  // Animation variables
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };
  
  return (
    <section id="accueil" className="min-h-screen pt-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
        <div className="absolute inset-0 bg-[url('/matrix-bg.jpg')] opacity-10"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-[calc(100vh-80px)] flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div 
            className="terminal p-6 mb-8 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <div className="flex-1 text-center text-xs text-gray-500">terminal</div>
            </div>
            
            <div className="font-mono">
              {displayedLines.map((line, index) => (
                <div key={index} className="text-green-400">{line}</div>
              ))}
              <div className="flex items-center">
                <span className="text-green-400">{text}</span>
                <span className="ml-1 h-5 w-2 bg-green-400 animate-pulse"></span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center md:text-left"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              <span className="text-gradient">Développeur</span>{' '}
              <span className="glow-text">& Hacker</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="mb-8 text-xl opacity-80"
            >
              Je transforme les idées en <span className="text-[#00ff8c]">code.</span> Puis je vous montre comment les <span className="text-[#00ff8c]">sécuriser.</span> Et plus <span className="text-[#00ff8c]">encore...</span>
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <a 
                href="#projets" 
                className="hacker-btn py-3 px-8 rounded-md text-lg font-medium"
              >
                Voir mes projets
              </a>
              <a 
                href="#contact" 
                className="py-3 px-8 rounded-md border border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 text-lg font-medium"
              >
                Me contacter
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#apropos" className="flex flex-col items-center text-sm opacity-60 hover:opacity-100 transition-opacity">
          <span className="mb-2">Défiler</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero; 