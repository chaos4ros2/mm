import { PrismaClient } from '@prisma/client';

// if (process.env.NODE_ENV === 'production') {
//     prisma = new PrismaClient();
// } else {
//     if (!global.prisma) {
//         global.prisma = new PrismaClient();
//     }
//     prisma = global.prisma;
// }

const prisma = new PrismaClient({
    log: ["query", "error", "info", "warn"],
});

export default prisma;

export * from "@prisma/client";