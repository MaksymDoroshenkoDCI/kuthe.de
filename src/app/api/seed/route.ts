import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // First let's check if user exists
    let existingUser = await prisma.user.findUnique({
      where: { email: 'admin@kuthe.de' },
    });

    if (existingUser) {
      // Update password just in case
      existingUser = await prisma.user.update({
        where: { email: 'admin@kuthe.de' },
        data: { password: hashedPassword, role: 'DIRECTOR' },
      });
      return NextResponse.json({ success: true, message: 'Admin user updated successfully in current Vercel DB.', email: existingUser.email });
    }

    // Create user
    const newUser = await prisma.user.create({
      data: {
        email: 'admin@kuthe.de',
        name: 'KUTHE Director',
        password: hashedPassword,
        role: 'DIRECTOR',
      },
    });

    return NextResponse.json({ success: true, message: 'Admin user CREATED successfully in current Vercel DB!', email: newUser.email });

  } catch (error: any) {
    console.error("Seeding error:", error);
    return NextResponse.json({ success: false, error: String(error.message || error) }, { status: 500 });
  }
}
