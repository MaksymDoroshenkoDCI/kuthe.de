import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const prismaClientSingleton = () => {
  // Use a custom variable first to bypass locked Vercel integration variables if they are broken
  let connectionString = process.env.KUTHE_DATABASE_URL || process.env.PRISMA_DATABASE_URL || process.env.POSTGRES_URL || process.env.DATABASE_URL || "postgres://dummy:dummy@localhost:5432/dummy";
  connectionString = connectionString.replace(/^["']|["']$/g, '');
  
  if (connectionString.startsWith('prisma://') || connectionString.startsWith('prisma+postgres://')) {
    const { withAccelerate } = require('@prisma/extension-accelerate');
    return new PrismaClient({ accelerateUrl: connectionString }).$extends(withAccelerate());
  }
  
  // Natively support Vercel's standard "postgres://" Prisma Postgres links
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma as any;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma as any;
