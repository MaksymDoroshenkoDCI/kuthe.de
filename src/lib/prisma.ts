import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const prismaClientSingleton = () => {
  // Use Vercel's provided Postgres URLs first, fallback to DATABASE_URL
  let connectionString = process.env.PRISMA_DATABASE_URL || process.env.POSTGRES_URL || process.env.DATABASE_URL || "postgres://dummy:dummy@localhost:5432/dummy";
  
  // Clean up potential quotes
  connectionString = connectionString.replace(/^["']|["']$/g, '');
  
  if (connectionString.startsWith('prisma://') || connectionString.startsWith('prisma+postgres://')) {
     const { withAccelerate } = require('@prisma/extension-accelerate');
     return new PrismaClient({ accelerateUrl: connectionString }).$extends(withAccelerate());
  } else {
     // If they accidentally entered something wrong, or it's a standard postgres:// URL
     // we ensure it starts with postgres or just pass it to the pool
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
