'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Composant pour les liens de navigation
const NavLink = ({ href, active, onClick, children }: {
  href: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className={`hover:text-[#00ff8c] transition-colors py-1 group ${active ? 'text-[#00ff8c]' : 'text-gray-300'}`}
  >
    <span>{children}</span>
    {active && (
      <motion.div 
        className="h-0.5 bg-[#00ff8c] mt-1"
        layoutId="navbar-indicator"
        transition={{ type: 'spring', duration: 0.5 }}
      />
    )}
  </Link>
);

const NavBar = () => {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('accueil');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Effet de typographie pour simuler un terminal
  useEffect(() => {
    const text = "margoul1 portfolio";
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setAnimationComplete(true);
      }
    }, 150);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      // Changer l'apparence de la navbar au scroll
      setScrolled(window.scrollY > 50);
      
      // Détecter la section active
      const sections = ['accueil', 'apropos', 'competences', 'projets', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Vérifier si on est sur une page spéciale
  const isSpecialPage = pathname !== '/';
  
  // Petit indice caché dans les commentaires pour les curieux ;)
  // Inspectez vos cookies pour trouver un trésor caché!
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  return (
    <motion.header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || isSpecialPage ? 'bg-black/80 backdrop-blur-md py-2' : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center" onClick={() => setActiveSection('accueil')}>
              <span className="glow-text terminal-text font-bold text-lg mr-1">{displayText}</span>
              <span className={`${animationComplete ? 'animate-pulse' : 'hidden'}`}>_</span>
              
              {/* Indice cookies dans un commentaire HTML discret */}
              <span 
                className="sr-only" 
                title="Des cookies secrets se cachent peut-être sur ce site..."
                dangerouslySetInnerHTML={{ 
                  __html: '<!-- Indice pour les chasseurs de flags: vérifiez vos cookies ! -->' 
                }}
              />
            </Link>
          </div>
          
          {/* Menu pour desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/#accueil" active={activeSection === 'accueil'} onClick={() => setActiveSection('accueil')}>
              ./accueil
            </NavLink>
            <NavLink href="/#apropos" active={activeSection === 'apropos'} onClick={() => setActiveSection('apropos')}>
              ./à_propos
            </NavLink>
            <NavLink href="/#competences" active={activeSection === 'competences'} onClick={() => setActiveSection('competences')}>
              ./compétences
            </NavLink>
            <NavLink href="/#projets" active={activeSection === 'projets'} onClick={() => setActiveSection('projets')}>
              ./projets
            </NavLink>
            <NavLink href="/#contact" active={activeSection === 'contact'} onClick={() => setActiveSection('contact')}>
              ./contact
            </NavLink>
            <NavLink href="/login-challenge" active={activeSection === 'admin'} onClick={() => setActiveSection('admin')}>
              <span className="text-[#ff00ff]">./admin</span>
            </NavLink>
          </div>
          
          {/* Bouton menu mobile */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="hacker-btn py-1 px-3 rounded">
              {menuOpen ? 'x' : '≡'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Menu pour mobile */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg border-t border-[#00ff8c]/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/#accueil" className="block px-3 py-2 text-[#00ff8c]" onClick={() => { setActiveSection('accueil'); setMenuOpen(false); }}>
              ./accueil
            </Link>
            <Link href="/#apropos" className="block px-3 py-2 text-white hover:text-[#00ff8c]" onClick={() => { setActiveSection('apropos'); setMenuOpen(false); }}>
              ./à_propos
            </Link>
            <Link href="/#competences" className="block px-3 py-2 text-white hover:text-[#00ff8c]" onClick={() => { setActiveSection('competences'); setMenuOpen(false); }}>
              ./compétences
            </Link>
            <Link href="/#projets" className="block px-3 py-2 text-white hover:text-[#00ff8c]" onClick={() => { setActiveSection('projets'); setMenuOpen(false); }}>
              ./projets
            </Link>
            <Link href="/#contact" className="block px-3 py-2 text-white hover:text-[#00ff8c]" onClick={() => { setActiveSection('contact'); setMenuOpen(false); }}>
              ./contact
            </Link>
            <Link href="/login-challenge" className="block px-3 py-2 text-[#ff00ff] hover:text-[#ff00ff]/80" onClick={() => { setActiveSection('admin'); setMenuOpen(false); }}>
              ./admin
            </Link>
          </div>
        </div>
      )}
    </motion.header>
  );
};

export default NavBar; 