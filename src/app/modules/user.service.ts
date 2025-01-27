import { UserRole, UserStatus } from "@prisma/client"
import bcrypt from "bcrypt"
import prisma from "../../shared/prisma";

const createAdminIntoDB = async (data: any) => {
  const hashPassword = await bcrypt.hash(data.password, 10);
  const userData = {
    email: data.admin.email,
    password: hashPassword,
    role: UserRole.ADMIN,
  }

  // console.log(userData);
  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData
    })
    const createdAdmin = await tx.admin.create({
      data: data.admin
    })
    return createdAdmin
  })

 return result;
}

export const UserService = {
  createAdminIntoDB
}