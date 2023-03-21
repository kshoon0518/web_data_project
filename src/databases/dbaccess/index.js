import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export { prisma };
export * from "./userAccess";
export * from "./stationAccess";
export * from "./wishAccess";
export * from "./adminAccess";
export * from "./reviewAccess";
export * from "./dataAccess";
export * from "./mainAccess";
export * from "./kakaologinAccess";
