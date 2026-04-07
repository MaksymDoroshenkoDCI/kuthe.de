import { PrismaClient, UnitStatus, PropertyStatus, PropertyType, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Створення адміністратора
  const admin = await prisma.user.upsert({
    where: { email: 'admin@kuthe.de' },
    update: {
      password: hashedPassword
    },
    create: {
      email: 'admin@kuthe.de',
      name: 'KUTHE Director',
      password: hashedPassword,
      role: UserRole.DIRECTOR,
    },
  });

  console.log('Seed: User admin@kuthe.de created.');

  // Тестові об'єкти нерухомості
  const propertyData = [
    {
      name: 'Arnold Kuthe Office Center',
      address: 'Alexanderplatz 1',
      city: 'Berlin',
      zipCode: '10178',
      type: PropertyType.OFFICE_BUILDING,
      status: PropertyStatus.ACTIVE,
      units: {
        create: [
          { number: 'EG 01', floor: '0', area: 120.5, baseRent: 2450.00, utilityPrepay: 450.00, status: UnitStatus.RENTED },
          { number: 'OG 01', floor: '1', area: 250.0, baseRent: 5200.00, utilityPrepay: 850.00, status: UnitStatus.RENTED },
          { number: 'OG 02', floor: '1', area: 85.0, baseRent: 1800.00, utilityPrepay: 220.00, status: UnitStatus.VACANT },
        ]
      }
    },
    {
      name: 'Rungestraße Factory Loft',
      address: 'Rungestraße 20',
      city: 'Berlin',
      zipCode: '10179',
      type: PropertyType.FACTORY_YARD,
      status: PropertyStatus.ACTIVE,
      units: {
        create: [
          { number: 'Halle A', floor: '0', area: 850.0, baseRent: 12500.00, utilityPrepay: 2100.00, status: UnitStatus.RENTED },
          { number: 'Atelier 1', floor: '2', area: 45.5, baseRent: 950.00, utilityPrepay: 150.00, status: UnitStatus.RENTED },
        ]
      }
    },
  ];

  for (const prop of propertyData) {
    const createdProp = await prisma.property.create({
      data: {
        ...prop,
        ownerId: admin.id,
      },
      include: { units: true }
    });

    // Add tenants for rented units
    for (const unit of createdProp.units) {
      if (unit.status === UnitStatus.RENTED) {
        const tenant = await prisma.tenant.create({
          data: {
            unitId: unit.id,
            firstName: unit.number === 'EG 01' ? 'Max' : 'Sophie',
            lastName: unit.number === 'EG 01' ? 'Mustermann' : 'Schmidt',
            email: `tenant.${unit.id.substring(0,4)}@example.com`,
            moveInDate: new Date('2023-01-01'),
            deposit: Number(unit.baseRent) * 3,
          }
        });

        // Add some payments
        await prisma.payment.create({
          data: {
            tenantId: tenant.id,
            amount: Number(unit.baseRent) + Number(unit.utilityPrepay),
            date: new Date(),
            type: 'RENT',
            status: 'COMPLETED',
            reference: `Miete ${new Date().toLocaleString('de-DE', { month: 'long' })}`
          }
        });
      }
    }

    // Add some meters
    await prisma.meter.create({
      data: {
        propertyId: createdProp.id,
        type: 'WATER_COLD',
        serialNumber: `WC-${createdProp.id.substring(0,5)}`,
        readings: {
          create: [
            { date: new Date('2024-01-01'), value: 1250.450 },
            { date: new Date('2024-02-01'), value: 1285.120 },
          ]
        }
      }
    });

    await prisma.meter.create({
      data: {
        propertyId: createdProp.id,
        type: 'ELECTRICITY',
        serialNumber: `EL-${createdProp.id.substring(0,5)}`,
        readings: {
          create: [
            { date: new Date('2024-01-01'), value: 85420.000 },
            { date: new Date('2024-02-01'), value: 86150.500 },
          ]
        }
      }
    });
  }

  console.log('Seed: Complex property data created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
