import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL || "postgres://dummy:dummy@localhost:5432/dummy";
  
  if (connectionString.startsWith('prisma')) {
     const { withAccelerate } = require('@prisma/extension-accelerate');
     return new PrismaClient({ accelerateUrl: connectionString }).$extends(withAccelerate());
  } else {
     const pool = new Pool({ connectionString });
     const adapter = new PrismaPg(pool);
     return new PrismaClient({ adapter });
  }
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma as any;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma as any;
