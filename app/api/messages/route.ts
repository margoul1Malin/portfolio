import { NextRequest, NextResponse } from 'next/server';
import { getContactMessages, markMessageAsRead, deleteMessage, verifyAdminPassword } from '@/app/lib/db';

// Fonction utilitaire pour vérifier l'authentification
async function validateAuth(request: Request | NextRequest): Promise<{
  auth: boolean;
  response?: NextResponse;
}> {
  // Récupérer le mot de passe depuis les headers
  const adminPassword = request.headers.get('Authorization') || request.headers.get('authorization');
  
  if (!adminPassword) {
    return { 
      auth: false, 
      response: NextResponse.json({ error: 'Non autorisé' }, { status: 401 }) 
    };
  }
  
  // Le mot de passe est directement dans le header Authorization
  const isValid = await verifyAdminPassword(adminPassword);
  
  if (!isValid) {
    return { 
      auth: false, 
      response: NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    };
  }
  
  return { auth: true };
}

// GET - Récupérer tous les messages
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Vérifier l'authentification
    const auth = await validateAuth(request);
    if (!auth.auth) return auth.response!;
    
    // Récupérer les messages
    const messages = await getContactMessages();
    
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error);
    return NextResponse.json(
      { error: 'Une erreur s\'est produite lors de la récupération des messages' },
      { status: 500 }
    );
  }
}

// PATCH - Marquer un message comme lu
export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    // Vérifier l'authentification
    const auth = await validateAuth(request);
    if (!auth.auth) return auth.response!;
    
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID du message requis' },
        { status: 400 }
      );
    }
    
    const updatedMessage = await markMessageAsRead(id);
    
    return NextResponse.json({
      success: true,
      message: 'Message marqué comme lu',
      data: updatedMessage
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du message:', error);
    return NextResponse.json(
      { error: 'Une erreur s\'est produite lors de la mise à jour du message' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un message
export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    // Vérifier l'authentification
    const auth = await validateAuth(request);
    if (!auth.auth) return auth.response!;
    
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID du message requis' },
        { status: 400 }
      );
    }
    
    await deleteMessage(id);
    
    return NextResponse.json({
      success: true,
      message: 'Message supprimé avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du message:', error);
    return NextResponse.json(
      { error: 'Une erreur s\'est produite lors de la suppression du message' },
      { status: 500 }
    );
  }
} 