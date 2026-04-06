'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createProperty(formData: FormData) {
  const name = formData.get('name') as string;
  const address = formData.get('address') as string;
  const city = formData.get('city') as string;
  const zipCode = formData.get('zipCode') as string;
  const type = formData.get('type') as string;
  const description = formData.get('description') as string;

  if (!name || !address || !city || !zipCode || !type) {
    return { error: 'Alle Pflichtfelder müssen ausgefüllt werden.' };
  }

  try {
    await prisma.property.create({
      data: {
        name,
        address,
        city,
        zipCode,
        type: type as any,
        description: description || null,
        imageUrl: [],
      },
    });

    revalidatePath('/dashboard');
    revalidatePath('/dashboard/properties');
    return { success: true };
  } catch (err) {
    console.error('createProperty error:', err);
    return { error: 'Fehler beim Speichern des Objekts.' };
  }
}
