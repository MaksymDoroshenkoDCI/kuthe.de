import { PrismaClient, UserRole, PropertyType } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

import "dotenv/config";
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Створення адміністратора
  const admin = await prisma.user.upsert({
    where: { email: 'admin@kuthe.de' },
    update: {},
    create: {
      email: 'admin@kuthe.de',
      name: 'KUTHE Director',
      password: hashedPassword,
      role: 'DIRECTOR' as any,
    },
  });

  console.log('Seed: User admin@kuthe.de created.');

  // Тестові об'єкти нерухомості
  const properties = [
    {
      name: 'Berlin-Vertical Office',
      address: 'Alexanderplatz 1',
      city: 'Berlin',
      zipCode: '10178',
      type: 'OFFICE_BUILDING' as any,
      status: 'ACTIVE' as any,
      imageUrl: ['/images/hero.png'],
    },
    {
      name: 'Loft Factory Yards',
      address: 'Rungestraße 20',
      city: 'Berlin',
      zipCode: '10179',
      type: 'FACTORY_YARD' as any,
      status: 'ACTIVE' as any,
      imageUrl: ['/images/industrial.png'],
    },
  ];

  for (const prop of properties) {
    await prisma.property.create({
      data: {
        ...prop,
        ownerId: admin.id,
      },
    });
  }

  console.log('Seed: Test properties created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
