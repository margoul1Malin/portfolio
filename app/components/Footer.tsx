'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useJsDetection } from '../lib/js-detection';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { jsAvailable } = useJsDetection();

  // Version statique pour les bots
  if (!jsAvailable) {
    return (
      <footer className="relative py-8 border-t border-[#00ff8c]/20 bg-black/40 backdrop-blur-sm">
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-lg">
            <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-full">
              <path d="M-8.17,75.50 C207.95,-129.75 381.73,202.10 500.00,80.20 L500.00,150.00 L0.00,150.00 Z" className="fill-[#00ff8c]/10"></path>
            </svg>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center">
              <div className="mr-2 w-1.5 h-8 bg-[#00ff8c] animate-pulse"></div>
              <span className="terminal-text text-xl font-bold">Développeur & Hacker</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="#accueil" className="text-sm opacity-70 hover:opacity-100 hover:text-[#00ff8c] transition-all">
                ./accueil
              </Link>
              <Link href="#apropos" className="text-sm opacity-70 hover:opacity-100 hover:text-[#00ff8c] transition-all">
                ./à_propos
              </Link>
              <Link href="#competences" className="text-sm opacity-70 hover:opacity-100 hover:text-[#00ff8c] transition-all">
                ./compétences
              </Link>
              <Link href="#projets" className="text-sm opacity-70 hover:opacity-100 hover:text-[#00ff8c] transition-all">
                ./projets
              </Link>
              <Link href="#contact" className="text-sm opacity-70 hover:opacity-100 hover:text-[#00ff8c] transition-all">
                ./contact
              </Link>
            </div>
            
            <div className="text-sm text-gray-400 font-mono">
              <span>&copy; {currentYear} |</span>
              <span className="ml-2 inline-flex items-center">
                <span className="mr-1 opacity-70">Crée avec</span>
                <span className="text-[#00ff8c]">❮❯</span>
              </span>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center">
            <div className="text-xs text-gray-500 text-center max-w-xl">
              <p>
                La sécurité n&apos;est pas juste une fonctionnalité, c&apos;est un état d&apos;esprit.
                <span className="ml-1 h-4 w-0.5 bg-[#00ff8c] inline-block animate-pulse"></span>
              </p>
              <Link href="https://www.oxelya.com" className="text-gray-400 hover:text-[#00ff8c] transition-colors">
                Développé par Oxelya
              </Link>
            </div>
            
            <div className="mt-4 flex gap-4">
              <Link
                href="https://github.com/margoul1Malin" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00ff8c] transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </Link>
              <Link 
                href="https://instagram.com/oxelya.fr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00ff8c] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
              <Link 
                href="https://x.com/@OxelyaFr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00ff8c] transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Version interactive pour les utilisateurs
  return (
    <footer className="relative py-8 border-t border-[#00ff8c]/20 bg-black/40 backdrop-blur-sm">
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-lg">
          <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-full">
            <path d="M-8.17,75.50 C207.95,-129.75 381.73,202.10 500.00,80.20 L500.00,150.00 L0.00,150.00 Z" className="fill-[#00ff8c]/10"></path>
          </svg>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center">
            <div className="mr-2 w-1.5 h-8 bg-[#00ff8c] animate-pulse"></div>
            <span className="terminal-text text-xl font-bold">Développeur & Hacker</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="#accueil" className="text-sm opacity-70 hover:opacity-100 hover:text-[#00ff8c] transition-all">
              ./accueil
            </Link>
            <Link href="#apropos" className="text-sm opacity-70 hover:opacity-100 hover:text-[#00ff8c] transition-all">
              ./à_propos
            </Link>
            <Link href="#competences" className="text-sm opacity-70 hover:opacity-100 hover:text-[#00ff8c] transition-all">
              ./compétences
            </Link>
            <Link href="#projets" className="text-sm opacity-70 hover:opacity-100 hover:text-[#00ff8c] transition-all">
              ./projets
            </Link>
            <Link href="#contact" className="text-sm opacity-70 hover:opacity-100 hover:text-[#00ff8c] transition-all">
              ./contact
            </Link>
          </div>
          
          <div className="text-sm text-gray-400 font-mono">
            <span>&copy; {currentYear} |</span>
            <span className="ml-2 inline-flex items-center">
              <span className="mr-1 opacity-70">Crée avec</span>
              <span className="text-[#00ff8c]">❮❯</span>
            </span>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-xs text-gray-500 text-center max-w-xl"
          >
            <p>
              La sécurité n&apos;est pas juste une fonctionnalité, c&apos;est un état d&apos;esprit.
              <span className="ml-1 h-4 w-0.5 bg-[#00ff8c] inline-block animate-pulse"></span>
            </p>
            <Link href="https://www.oxelya.com" className="text-gray-400 hover:text-[#00ff8c] transition-colors">
              Développé par Oxelya
            </Link>
          </motion.div>
          
          <div className="mt-4 flex gap-4">
            <Link
              href="https://github.com/margoul1Malin" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#00ff8c] transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </Link>
            <Link 
              href="https://instagram.com/oxelya.fr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#00ff8c] transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </Link>
            <Link 
              href="https://x.com/@OxelyaFr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#00ff8c] transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 