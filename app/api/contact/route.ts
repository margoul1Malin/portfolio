import { NextResponse } from 'next/server';
import { createContactMessage } from '@/app/lib/db';
import { sendContactNotification } from '@/app/lib/email';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validation basique
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Validation du format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Créer le message dans la base de données
    const contactMessage = await createContactMessage({
      name,
      email,
      subject,
      message
    });

    // Envoyer l'email de notification
    const emailResult = await sendContactNotification({
      name,
      email,
      subject,
      message
    });

    if (!emailResult.success) {
      console.error('Erreur lors de l\'envoi de l\'email de notification:', emailResult.error);
      // On continue même si l'email échoue, le message est sauvegardé
    }

    return NextResponse.json({
      success: true,
      message: 'Message envoyé avec succès',
      data: contactMessage,
      emailSent: emailResult.success
    }, { status: 201 });
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    return NextResponse.json(
      { error: 'Une erreur s\'est produite lors de l\'envoi de votre message' },
      { status: 500 }
    );
  }
} 