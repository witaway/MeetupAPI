// Described in best practices page
// https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
import { PrismaClient } from '@prisma/client';
import * as process from 'process';

const globalForPrisma = global as unknown as {
	prisma: PrismaClient | undefined;
};

const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		log: ['query'],
	});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
