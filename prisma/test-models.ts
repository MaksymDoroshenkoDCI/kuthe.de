import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

async function test() {
  console.log('Available models:', Object.keys(prisma).filter(k => !k.startsWith('_') && !k.startsWith('$')));
  try {
    const count = await (prisma as any).unit.count();
    console.log('Unit count:', count);
  } catch (e) {
    console.error('Error accessing unit:', (e as Error).message);
  }
}

test().finally(() => pool.end());
