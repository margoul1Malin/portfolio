'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FiTrash2, FiCheck } from 'react-icons/fi';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [counter, setCounter] = useState(3);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  
  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError('');
    
    try {
      const adminPassword = localStorage.getItem('admin_password');
      const response = await fetch('/api/messages', {
        method: 'GET',
        headers: {
          'Authorization': adminPassword || '',
        },
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('admin_password');
          router.push('/login-challenge');
        }
        throw new Error('Erreur lors de la récupération des messages');
      }
      
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Erreur:', error);
      setError('Impossible de récupérer les messages. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  }, [router]);
  
  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const adminPassword = localStorage.getItem('admin_password');
    if (!adminPassword) {
      router.push('/login-challenge');
      return;
    }
    
    // Charger les messages une seule fois au début
    fetchMessages();
    
    // Simuler un temps de chargement
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);
    
    // Décompte
    const interval = setInterval(() => {
      setCounter(prev => {
        if (prev <= 1) {
          clearInterval(interval);
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [router, fetchMessages]);
  
  const markAsRead = async (id: string) => {
    setIsProcessing(true);
    console.log('Tentative de marquer comme lu le message:', id);
    
    try {
      const adminPassword = localStorage.getItem('admin_password');
      console.log('Mot de passe admin récupéré:', adminPassword ? 'Présent' : 'Absent');
      
      console.log(`Envoi de la requête PUT à /api/messages/${id}`);
      const response = await fetch(`/api/messages/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': adminPassword || '',
        },
      });
      
      console.log('Réponse reçue:', response.status, response.statusText);
      
      if (!response.ok) {
        if (response.status === 401) {
          console.log('Erreur 401: Non autorisé');
          localStorage.removeItem('admin_password');
          router.push('/login-challenge');
        }
        throw new Error(`Erreur lors de la mise à jour du message: ${response.status} ${response.statusText}`);
      }
      
      const responseData = await response.json();
      console.log('Données de réponse:', responseData);
      
      // Mettre à jour l'état local
      setMessages(messages.map(message => 
        message.id === id ? { ...message, isRead: true } : message
      ));
      
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, isRead: true });
      }
      
      console.log('Message marqué comme lu avec succès');
    } catch (error) {
      console.error('Erreur détaillée:', error);
      setError('Impossible de marquer le message comme lu. Veuillez réessayer.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const deleteMessage = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message?')) {
      console.log('Suppression annulée par l\'utilisateur');
      return;
    }
    
    setIsProcessing(true);
    console.log('Tentative de suppression du message:', id);
    
    try {
      const adminPassword = localStorage.getItem('admin_password');
      console.log('Mot de passe admin récupéré:', adminPassword ? 'Présent' : 'Absent');
      
      console.log(`Envoi de la requête DELETE à /api/messages/${id}`);
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': adminPassword || '',
        },
      });
      
      console.log('Réponse reçue:', response.status, response.statusText);
      
      if (!response.ok) {
        if (response.status === 401) {
          console.log('Erreur 401: Non autorisé');
          localStorage.removeItem('admin_password');
          router.push('/login-challenge');
        }
        throw new Error(`Erreur lors de la suppression du message: ${response.status} ${response.statusText}`);
      }
      
      const responseData = await response.json();
      console.log('Données de réponse:', responseData);
      
      // Mettre à jour l'état local
      setMessages(messages.filter(message => message.id !== id));
      
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
      }
      
      console.log('Message supprimé avec succès');
    } catch (error) {
      console.error('Erreur détaillée:', error);
      setError('Impossible de supprimer le message. Veuillez réessayer.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('admin_password');
    router.push('/');
  };
  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden p-4">
      {/* Fond avec grille */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,255,140,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,140,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30"></div>
      
      {/* Bruit de fond */}
      <div className="absolute inset-0 bg-noise opacity-10"></div>
      
      {/* Scanline */}
      <div className="scanline"></div>
      
      <div className="max-w-6xl w-full z-10">
        {!showContent ? (
          <motion.div 
            className="text-center terminal p-8 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-[#00ff8c]">Initialisation du système administrateur</h2>
            <div className="flex justify-center my-8">
              <div className="h-4 w-4 bg-[#00ff8c] rounded-full animate-pulse mr-3"></div>
              <div className="h-4 w-4 bg-[#00ff8c] rounded-full animate-pulse mr-3" style={{ animationDelay: '0.3s' }}></div>
              <div className="h-4 w-4 bg-[#00ff8c] rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            </div>
            <p className="text-lg terminal-text">Chargement... {counter}s</p>
          </motion.div>
        ) : (
          <motion.div
            className="terminal p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <div className="flex-1 text-center text-xs text-gray-500">admin-panel.sh</div>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold glow-text">Panneau d&apos;administration</h1>
                <div className="flex space-x-4">
                  <button 
                    onClick={fetchMessages}
                    className="hacker-btn py-2 px-4 rounded-md text-sm flex items-center"
                    disabled={loading}
                  >
                    <span className="mr-2">↻</span> Rafraîchir
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="hacker-btn py-2 px-4 rounded-md text-sm bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20"
                  >
                    <span className="mr-2">⬅</span> Déconnexion
                  </button>
                </div>
              </div>
              
              <div className="p-4 bg-black/30 rounded-md border border-[#00ff8c]/30 mb-8">
                <h3 className="text-lg font-semibold text-[#ff00ff] mb-2">Challenge réussi!</h3>
                <p className="text-sm text-gray-300">
                  T&apos;es trop fort(e) ! T&apos;as trouvé le panel admin ! Non jrigol va te faire enculer tu vas bousiller mon site la dégage stp j&apos;ai mis ce message pour moi parceque j&apos;suis un dépressif égocentrique avec un trouble de l&apos;attention à la base...
                </p>
              </div>
              
              {error && (
                <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-md text-red-400">
                  <p>{error}</p>
                  <button 
                    onClick={fetchMessages}
                    className="mt-2 text-sm underline hover:text-red-300"
                  >
                    Réessayer
                  </button>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <h2 className="text-xl font-semibold mb-4 text-[#00ff8c]">Messages reçus</h2>
                  
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#00ff8c] border-r-transparent"></div>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      Aucun message reçu pour le moment
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                      {messages.map((msg) => (
                        <div 
                          key={msg.id}
                          onClick={() => {
                            setSelectedMessage(msg);
                            if (!msg.isRead) markAsRead(msg.id);
                          }}
                          className={`p-3 rounded-md cursor-pointer transition-all ${
                            selectedMessage?.id === msg.id 
                              ? 'bg-[#00ff8c]/20 border border-[#00ff8c]/50' 
                              : 'bg-black/40 border border-white/10 hover:border-[#00ff8c]/30'
                          } ${!msg.isRead ? 'border-l-4 border-l-[#ff00ff]' : ''}`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <p className="font-medium truncate">{msg.name}</p>
                            {!msg.isRead && (
                              <span className="bg-[#ff00ff]/20 text-[#ff00ff] px-2 py-0.5 rounded-full text-xs">
                                Nouveau
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400 truncate">{msg.subject}</p>
                          <p className="text-xs text-gray-500 mt-1">{formatDate(msg.createdAt)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold mb-4 text-[#00ff8c]">Détails du message</h2>
                  
                  {selectedMessage ? (
                    <div className="bg-black/30 border border-[#00ff8c]/20 p-4 rounded-md">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-xl font-semibold">{selectedMessage.subject}</h3>
                          <p className="text-sm text-gray-400 mt-1">
                            De: <span className="text-white">{selectedMessage.name}</span> ({selectedMessage.email})
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Reçu le: {formatDate(selectedMessage.createdAt)}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          {!selectedMessage.isRead && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(selectedMessage.id);
                              }}
                              disabled={isProcessing}
                              className="flex items-center bg-blue-900/30 hover:bg-blue-900/50 text-blue-300 px-3 py-1 rounded-md text-sm transition-colors"
                            >
                              <FiCheck className="mr-1" /> Marquer comme lu
                            </button>
                          )}
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteMessage(selectedMessage.id);
                            }}
                            disabled={isProcessing}
                            className="flex items-center bg-red-900/30 hover:bg-red-900/50 text-red-300 px-3 py-1 rounded-md text-sm transition-colors"
                          >
                            <FiTrash2 className="mr-1" /> Supprimer
                          </button>
                        </div>
                      </div>
                      
                      <div className="border-t border-[#00ff8c]/10 pt-4 mt-4">
                        <pre className="whitespace-pre-wrap font-sans text-gray-200 leading-relaxed">
                          {selectedMessage.message}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-black/30 border border-white/10 p-8 rounded-md text-center text-gray-400">
                      Sélectionnez un message pour voir les détails
                    </div>
                  )}
                </div>
              </div>
              
            </motion.div>
            
            <div className="mt-12 text-center">
              <p className="text-xs text-[#00ff8c]/30">
                Panneau admin v1.0 - Accès sécurisé
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 