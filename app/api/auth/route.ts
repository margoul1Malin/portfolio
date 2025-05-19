import { NextResponse } from 'next/server';
import { verifyAdminPassword } from '@/app/lib/db';

export async function POST(request: Request) {
  try {
    // Extraire le mot de passe de la requête
    const { password } = await request.json();
    
    if (!password) {
      return NextResponse.json({ 
        success: false, 
        message: 'Mot de passe manquant' 
      }, { status: 400 });
    }
    
    console.log('Tentative d\'authentification avec le mot de passe:', password);
    console.log('Variable d\'environnement ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD);
    
    // Vérifier le mot de passe
    const isValid = await verifyAdminPassword(password);
    console.log('Résultat de la vérification:', isValid);
    
    if (isValid) {
      return NextResponse.json({ 
        success: true, 
        message: 'Authentification réussie' 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Mot de passe incorrect' 
      }, { status: 401 });
    }
    
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Erreur lors de l\'authentification',
      error: (error as Error).message
    }, { status: 500 });
  }
} 