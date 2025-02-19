// import { PrismaClient } from '@prisma/client';
// CommonJS
const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// import bcrypt from 'bcryptjs';
const bcrypt = require('bcryptjs');


const prisma = new PrismaClient();
const adminName= process.env.ADMIN_NAME || 'Admin';
const adminPassword= process.env.ADMIN_PASSWORD || 'admin';
const adminEmail= process.env.ADMIN_EMAIL || 'user@mail.com';

async function main() {
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: adminName,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });