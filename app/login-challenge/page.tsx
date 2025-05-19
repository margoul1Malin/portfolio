'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginChallenge() {
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  // Pour le challenge, on vérifie désormais directement avec l'API
  // et non plus avec un mot de passe codé en dur
  
  useEffect(() => {
    // Focus sur l'input au chargement
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Easter egg: supprimer l'indice dans la console pour le vrai site
    // console.log('%c Indice: Le mot de passe est tellement simple... Essayez "hackme123" 🤫', 'color: #00ff8c; font-size: 10px;');
    
    // Simulation d'un terminal qui s'initialise
    const timer = setTimeout(() => {
      setShowHint(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setGlitchEffect(true);
    
    try {
      // Vérifier avec l'API d'authentification
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Si authentification réussie, stocker le mot de passe et rediriger
        localStorage.setItem('admin_password', password);
        router.push('/admin');
      } else {
        // Mauvais mot de passe
        setAttempts(prev => prev + 1);
        setErrorMessage(`Tentative #${attempts + 1} échouée. Essayez encore.`);
        setPassword('');
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    } catch (error) {
      console.error('Erreur d\'authentification:', error);
      setErrorMessage('Erreur de connexion. Tentative échouée.');
    } finally {
      setIsLoading(false);
      setGlitchEffect(false);
    }
  };
  
  // Générer un indice codé en fonction du nombre de tentatives
  const getHint = () => {
    if (attempts < 3) return null;
    
    if (attempts < 5) {
      return "Indice: Trouve le framework tu trouveras ou se situe le mot de passe...";
    } else if (attempts < 10) {
      return "Indice: Inspecte peut-être le code source...";
    } else {
      return "Indice final: Tu croyais vraiment que j'allais te donner le mot de passe dans des indices pour froisser mon site ? T'es malade mdrr";
    }
  };
  
  const hint = getHint();
  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Effet de bruit de fond */}
      <div className="absolute inset-0 bg-noise opacity-10"></div>
      
      {/* Grille cyberpunk */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,255,140,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,140,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      {/* Ligne de scan */}
      <div className="scanline"></div>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`terminal p-8 w-full max-w-md relative z-10 ${glitchEffect ? 'glitch' : ''}`}
      >
        <div className="mb-6 flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <div className="flex-1 text-center text-xs text-gray-500">auth.sh</div>
        </div>
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#ff00ff] mb-2">Authentification requise</h1>
          
          <div className="space-y-2 terminal-text">
            <p className="flex items-center">
              <span className="text-[#00ff8c] mr-2">$</span> 
              <span className="typing-animation">Connexion au système administrateur...</span>
            </p>
            
            {showHint && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-gray-400 text-sm"
              >
                Try to find me :)
              </motion.p>
            )}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2 terminal-text">
              $ Entrez le mot de passe système:
            </label>
            <input
              ref={inputRef}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-[#00ff8c]/50 rounded-md p-2 text-white terminal-text focus:outline-none focus:ring-2 focus:ring-[#00ff8c]/50 focus:border-transparent"
              required
            />
          </div>
          
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-3 bg-[#ff0000]/10 border border-[#ff0000]/30 rounded text-sm text-[#ff0000]"
            >
              <p>{errorMessage}</p>
              {hint && (
                <p className="mt-2 text-[#00ff8c] text-xs">{hint}</p>
              )}
            </motion.div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full hacker-btn py-2 px-4 rounded-md relative overflow-hidden group"
          >
            <span className="relative z-10">
              {isLoading ? 'Vérification...' : 'Accéder au système'}
            </span>
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            <span className="text-[#ff00ff]">ATTENTION:</span> Toutes les tentatives sont enregistrées. (Je rigole j&apos;ai pas que ça à foutre)
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Tentatives: {attempts} | Essayez de brute-forcer ou de trouver des indices
          </p>
        </div>
        
        <div className="absolute bottom-2 right-2">
          <div className="text-xs text-[#00ff8c]/30 font-mono">v1.0.0</div>
        </div>
      </motion.div>
    </div>
  );
} 