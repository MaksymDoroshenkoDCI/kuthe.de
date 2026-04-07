import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const prismaClientSingleton = () => {
  // Use a custom variable first to bypass locked Vercel integration variables if they are broken
  let connectionString = process.env.KUTHE_DATABASE_URL || "prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19fY0V1c2YyUU5leVBBa3VaZ3RmU2EiLCJhcGlfa2V5IjoiMDFLTkpUMjBIRUJUNDNZQlRORTc4NUMwOEMiLCJ0ZW5hbnRfaWQiOiJkMjBhNzI3Zjk4Zjk4MWQxOGFmNTg2YmU2ZTYzODc4OWE0Y2M4ZjhjYWFiODlmYTRmYThkYzcyYTYxOTkzZWE5IiwiaW50ZXJuYWxfc2VjcmV0IjoiNjk0NjMyZTYtYTc3NC00OGM3LTk0NTQtOGYxMWIxMDNlZDdmIn0.3yCya46Rv1xJ3a_Y5d390AOPt252o420vfjBpu5I4AM";
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
