import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { verifyAdminPassword } from '@/app/lib/db';

// Type pour les erreurs Prisma
type PrismaError = {
  code?: string;
  name?: string;
  message?: string;
};

// PUT - Marquer un message comme lu
export async function PUT(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any
) {
  try {
    console.log('[DEBUG] Route PUT /api/messages/[id] appelée');
    const messageId = params.id;
    console.log('[DEBUG] ID du message:', messageId);
    
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      console.log('[DEBUG] Erreur: Pas d\'en-tête d\'autorisation');
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }
    
    const isValid = await verifyAdminPassword(authHeader);
    if (!isValid) {
      console.log('[DEBUG] Erreur: Mot de passe admin invalide');
      return NextResponse.json(
        { error: 'Mot de passe incorrect' },
        { status: 401 }
      );
    }
    
    // Vérifier que l'ID est valide
    if (!messageId) {
      console.log('[DEBUG] Erreur: ID du message manquant');
      return NextResponse.json(
        { error: 'ID du message manquant' },
        { status: 400 }
      );
    }
    
    // Tentative de mise à jour
    const message = await prisma.contactMessage.update({
      where: { id: messageId },
      data: { isRead: true }
    });
    
    console.log('[DEBUG] Message marqué comme lu avec succès:', messageId);
    return NextResponse.json(message);
  } catch (error: unknown) {
    // Gérer les erreurs de type NotFound de Prisma
    console.log('[DEBUG] Erreur complète:', error);
    const prismaError = error as PrismaError;
    
    if (prismaError.code === 'P2025' || prismaError.name === 'NotFoundError') {
      console.log('[DEBUG] Erreur: Message non trouvé:', params?.id);
      return NextResponse.json(
        { error: 'Message non trouvé' },
        { status: 404 }
      );
    }
    
    console.error('[DEBUG] Erreur serveur:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la mise à jour du message' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un message
export async function DELETE(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any
) {
  try {
    console.log('[DEBUG] Route DELETE /api/messages/[id] appelée');
    const messageId = params.id;
    console.log('[DEBUG] ID du message:', messageId);
    
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      console.log('[DEBUG] Erreur: Pas d\'en-tête d\'autorisation');
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }
    
    const isValid = await verifyAdminPassword(authHeader);
    if (!isValid) {
      console.log('[DEBUG] Erreur: Mot de passe admin invalide');
      return NextResponse.json(
        { error: 'Mot de passe incorrect' },
        { status: 401 }
      );
    }
    
    // Vérifier que l'ID est valide
    if (!messageId) {
      console.log('[DEBUG] Erreur: ID du message manquant');
      return NextResponse.json(
        { error: 'ID du message manquant' },
        { status: 400 }
      );
    }
    
    // Tentative de suppression
    await prisma.contactMessage.delete({
      where: { id: messageId }
    });
    
    console.log('[DEBUG] Message supprimé avec succès:', messageId);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    // Gérer les erreurs de type NotFound de Prisma
    console.log('[DEBUG] Erreur complète:', error);
    const prismaError = error as PrismaError;
    
    if (prismaError.code === 'P2025' || prismaError.name === 'NotFoundError') {
      console.log('[DEBUG] Erreur: Message non trouvé:', params?.id);
      return NextResponse.json(
        { error: 'Message non trouvé' },
        { status: 404 }
      );
    }
    
    console.error('[DEBUG] Erreur serveur:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la suppression du message' },
      { status: 500 }
    );
  }
} 