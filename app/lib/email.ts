import nodemailer from 'nodemailer';

// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Interface pour les données du message de contact
interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Fonction pour envoyer un email de notification de nouveau message
export async function sendContactNotification(data: ContactEmailData) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Tu recevras l'email sur ton adresse
      subject: `Nouveau message de contact: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00ff8c; border-bottom: 2px solid #00ff8c; padding-bottom: 10px;">
            Nouveau message de contact
          </h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Informations du contact</h3>
            <p><strong>Nom:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Sujet:</strong> ${data.subject}</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #00ff8c;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #e8f5e8; border-radius: 5px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              Ce message a été envoyé depuis votre portfolio à l'adresse: ${process.env.NEXT_PUBLIC_SITE_URL}
            </p>
          </div>
        </div>
      `,
      text: `
        Nouveau message de contact
        
        Nom: ${data.name}
        Email: ${data.email}
        Sujet: ${data.subject}
        
        Message:
        ${data.message}
        
        Envoyé depuis: ${process.env.NEXT_PUBLIC_SITE_URL}
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return { success: false, error: error };
  }
}

// Fonction pour vérifier la configuration SMTP
export async function verifyEmailConfig() {
  try {
    await transporter.verify();
    console.log('Configuration SMTP validée avec succès');
    return true;
  } catch (error) {
    console.error('Erreur de configuration SMTP:', error);
    return false;
  }
} 