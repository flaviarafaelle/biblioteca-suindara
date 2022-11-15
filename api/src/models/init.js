import Prisma from "@prisma/client";

// PrismaClient is not available when testing
const { PrismaClient } = Prisma || {};
const prisma = PrismaClient ? new PrismaClient() : {};

export const User = prisma.user;
export const Book = prisma.book;
export const Category = prisma.category;
export const BookCategory = prisma.bookCategory;
export const Comment = prisma.comment;
export const FavoriteBook = prisma.favoriteBook;
export const Permission = prisma.permission;
export const Rent = prisma.rent;
export const Role = prisma.role;
export const RolePermission = prisma.rolePermission;
export const UserRole = prisma.userRole;
export const UserInfo = prisma.userInfo;
