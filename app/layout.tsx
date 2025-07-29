import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import { Providers } from './providers';
import Footer from './components/Footer';
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Développeur & Hacker",
  description: "Portfolio de développeur, programmeur et hacker spécialisé en cybersécurité et développement web",
  keywords: ["développeur", "programmeur", "hacker", "cybersécurité", "portfolio", "web", "margoul1", "oxelya", "watson", "drhead", "aosint", "godseye", "rubberduckies", "hakboard", "oxelya shop"],
  authors: [{ name: "Margoul1", url: "https://www.margoul1.xyz" }],
  creator: "Margoul1",
  publisher: "Margoul1",
  openGraph: {
    title: "Portfolio | Développeur & Hacker",
    description: "Portfolio de développeur, programmeur et hacker spécialisé en cybersécurité et développement web",
    url: "https://www.margoul1.xyz",
    siteName: "Portfolio | Développeur & Hacker",
    images: [
      { url: "https://www.margoul1.xyz/", width: 1200, height: 630, alt: "Portfolio | Développeur & Hacker" },
    ],
    locale: "fr_FR",
  },
  alternates: {
    canonical: "https://www.margoul1.xyz",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
        <Providers>
          {/* Script pour définir un cookie caché */}
          <Script id="secret-flag-cookie" strategy="afterInteractive">
            {`
              try {
                // Vérifier si le cookie existe déjà
                if (!document.cookie.includes('debug_flag=')) {
                  // Créer un cookie avec un flag secret qui expire dans 7 jours
                  document.cookie = "debug_flag=FLAG{C00KI3_M0NST3R}; path=/; max-age=604800; samesite=strict";
                  console.log('%c 🍪 Des cookies ont été déposés sur ce site...', 'color: #00ff8c; font-size: 10px;');
                }
              } catch (e) {
                // Silencieux en cas d'erreur
              }
            `}
          </Script>
          
          {/* Script pour le jeu de devinette dans la console */}
          <Script id="console-riddle-game" strategy="afterInteractive">
            {`
              (function() {
                try {
                  // Vérifier si la devinette a déjà été complétée
                  if (!localStorage.getItem('console_riddle_completed')) {
                    // Style pour le texte de la console
                    const titleStyle = 'color: #00ff8c; font-size: 14px; font-weight: bold; text-shadow: 0 0 5px rgba(0,255,140,0.5);';
                    const textStyle = 'color: #f0f0f0; font-size: 12px;';
                    const hintStyle = 'color: #ff00ff; font-style: italic; font-size: 12px;';
                    
                    console.log('%c🔐 DÉFI CONSOLE DÉTECTÉ! (Ouai même la console on l\\'a pimpée)', titleStyle);
                    console.log('%c╔════════════════════════════════════════════╗', textStyle);
                    console.log('%c║ Je suis un fichier spécial dans un système UNIX ║', textStyle);
                    console.log('%c║ Ma présence peut accorder plus de pouvoir     ║', textStyle);
                    console.log('%c║ Je peux te transformer temporairement en root ║', textStyle);
                    console.log('%c║ Mais mal configuré, je deviens une faille     ║', textStyle);
                    console.log('%c║ Qui suis-je ?                                 ║', textStyle);
                    console.log('%c╚════════════════════════════════════════════╝', textStyle);
                    console.log('%cIndice: Pour répondre, utilisez la fonction checkRiddleAnswer("votre_réponse")', hintStyle);
                    
                    // Fonction pour vérifier la réponse
                    window.checkRiddleAnswer = function(answer) {
                      const normalizedAnswer = answer.toLowerCase().trim();
                      if (normalizedAnswer === 'suid' || normalizedAnswer === 'setuid') {
                        console.log('%c🎉 FÉLICITATIONS! Réponse correcte!', titleStyle);
                        console.log('%c╔════════════════════════════════════════════╗', textStyle);
                        console.log('%c║ Voici votre flag:                          ║', textStyle);
                        console.log('%c║ FLAG{C0NS0L3_M4ST3R_H4CK3R}               ║', textStyle);
                        console.log('%c╚════════════════════════════════════════════╝', textStyle);
                        console.log('%cN\\'oubliez pas de mentionner ce flag dans le formulaire de contact!', hintStyle);
                        
                        // Marquer la devinette comme complétée
                        localStorage.setItem('console_riddle_completed', 'true');
                        return true;
                      } else {
                        console.log('%c❌ Essayez encore! Ce n\\'est pas la bonne réponse.', 'color: #ff0000;');
                        return false;
                      }
                    };
                  } else {
                    // Message pour les utilisateurs qui ont déjà résolu l'énigme
                    console.log('%c🔓 Vous avez déjà résolu l\\'énigme de la console et obtenu le FLAG{C0NS0L3_M4ST3R_H4CK3R}', 'color: #00ff8c; font-size: 12px;');
                  }
                } catch (e) {
                  // Silencieux en cas d'erreur
                  console.error('Erreur dans le jeu console:', e);
                }
              })();
            `}
          </Script>

          <div className="scanline"></div>
          <NavBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
