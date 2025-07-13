'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaTwitter, FaLock, FaDiscord } from 'react-icons/fa';
import {SiSession} from 'react-icons/si';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Votre message a été envoyé avec succès! Je vous répondrai dans les plus brefs délais.'
        });
        // Réinitialiser le formulaire
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Une erreur s\'est produite lors de l\'envoi du message. Veuillez réessayer.'
        });
      }
    } catch (error) {
      console.error('Erreur d\'envoi:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Une erreur de connexion s\'est produite. Veuillez vérifier votre connexion internet.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="py-20 relative">
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
            <span className="text-gradient">Contact</span>
          </h2>
          <div className="w-24 h-1 bg-[#00ff8c] mx-auto rounded-full"></div>
          <p className="mt-4 max-w-2xl mx-auto text-gray-300">
            Vous avez un projet en tête ou souhaitez simplement discuter? N&apos;hésitez pas à me contacter.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <motion.div 
            className="md:col-span-5 terminal p-6 backdrop-blur-sm relative group"
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
            
            <div className="mb-4 flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <div className="flex-1 text-center text-xs text-gray-500">contact_info.sh</div>
            </div>
            
            <h3 className="text-xl font-bold mb-6 terminal-text flex items-center">
              <span className="text-[#00ff8c] mr-2">$</span>
              <span className="typing-animation">./contact_info</span>
              <span className="ml-2 h-4 w-px bg-[#00ff8c] animate-blink"></span>
            </h3>
            
            <div className="space-y-6">
              <motion.div 
                className="p-4 border border-[#00ff8c]/20 bg-black/40 rounded-md hover:bg-[#00ff8c]/5 transition-colors"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center text-[#00ff8c]">
                  <FaEnvelope className="text-xl mr-3" />
                  <h4 className="text-base font-medium">Email</h4>
                </div>
                <a 
                  href="mailto:contact@example.com" 
                  className="mt-2 block text-gray-300 hover:text-white transition-colors pl-8"
                >
                  margoul1dev@gmail.com
                </a>
              </motion.div>
              
              <motion.div 
                className="p-4 border border-[#00ff8c]/20 bg-black/40 rounded-md hover:bg-[#00ff8c]/5 transition-colors"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center text-[#00ff8c]">
                  <FaMapMarkerAlt className="text-xl mr-3" />
                  <h4 className="text-base font-medium">Localisation</h4>
                </div>
                <p className="mt-2 text-gray-300 pl-8">France, Bordeaux</p>
              </motion.div>
              
              <motion.div 
                className="p-4 border border-[#00ff8c]/20 bg-black/40 rounded-md hover:bg-[#00ff8c]/5 transition-colors"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center text-[#00ff8c]">
                  <FaLock className="text-xl mr-3" />
                  <h4 className="text-base font-medium">Réseaux sociaux</h4>
                </div>
                <div className="mt-3 flex flex-wrap gap-3 pl-8">
                  <a 
                    href="https://github.com/margoul1Malin" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center bg-black/60 px-3 py-2 rounded-md border border-[#00ff8c]/20 hover:border-[#00ff8c]/60 transition-all"
                  >
                    <FaGithub className="mr-2" />
                    <span>GitHub</span>
                  </a>
                  <a 
                    href="https://x.com/PinokioS1ffredi" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center bg-black/60 px-3 py-2 rounded-md border border-[#00ff8c]/20 hover:border-[#00ff8c]/60 transition-all"
                  >
                    <FaTwitter className="mr-2" />
                    <span>Twitter</span>
                  </a>
                  <a
                    href="https://discord.gg/margoulins"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-black/60 px-3 py-2 rounded-md border border-[#00ff8c]/20 hover:border-[#00ff8c]/60 transition-all"
                  >
                    <FaDiscord className="mr-2" />
                    <span>Discord</span>
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                className="p-4 border border-[#00ff8c]/20 bg-black/40 rounded-md hover:bg-[#00ff8c]/5 transition-colors"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center text-[#00ff8c]">
                  <SiSession className="text-xl mr-3" />
                  <h4 className="text-base font-medium">Session</h4>
                </div>
                <div className="mt-2 text-gray-300 pl-8 font-mono flex items-center">
                  <span className="bg-black/50 px-3 py-1 rounded border border-[#00ff8c]/30 truncate">05a0f4f752a89998a567224ed87f701ff91b612838efe98fe18a54519a8ccc4b2d</span>
                  <button 
                    className="ml-2 text-xs text-[#00ff8c] border border-[#00ff8c]/30 px-2 py-1 rounded hover:bg-[#00ff8c]/10 transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText('05a0f4f752a89998a567224ed87f701ff91b612838efe98fe18a54519a8ccc4b2d');
                      alert('ID Session copié!');
                    }}
                  >
                    Copier
                  </button>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-6 text-xs text-gray-500 pl-4 border-l-2 border-[#00ff8c]/20">
              <p>Trouvé tous les flags cachés?</p>
              <p className="mt-1">Mentionnez-les dans votre message ! Je serai ravi de voir ce qu&apos;on peut faire ensemble.</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:col-span-7 terminal p-6 flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <div className="flex-1 text-center text-xs text-gray-500">new_message.sh</div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6 my-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-[#00ff8c]/50 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00ff8c]/50 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-[#00ff8c]/50 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00ff8c]/50 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="flex flex-col">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-[#00ff8c]/50 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00ff8c]/50 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="flex flex-col">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-black/50 border border-[#00ff8c]/50 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00ff8c]/50 focus:border-transparent"
                  required
                ></textarea>
              </div>
              
              {submitStatus.type && (
                <div className={`p-3 rounded-md text-sm ${
                  submitStatus.type === 'success' 
                    ? 'bg-[#00ff8c]/10 border border-[#00ff8c]/30 text-[#00ff8c]' 
                    : 'bg-[#ff0000]/10 border border-[#ff0000]/30 text-[#ff0000]'
                }`}>
                  {submitStatus.message}
                </div>
              )}
              
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="hacker-btn py-3 px-6 rounded-md relative overflow-hidden group disabled:opacity-50"
                >
                  <span className="relative z-10">
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  </span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 