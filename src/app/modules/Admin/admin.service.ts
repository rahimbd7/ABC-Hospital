import { Prisma } from "@prisma/client";
import { adminSearchableFields } from "./admin.constant";
import { calculatePagination } from "../../../helper/paginationHelper";
import prisma from "../../../shared/prisma";



const getAllAdminFromDB = async (params: any, options: any) => {

    const { searchTerm, ...filtersData } = params;
    const { limit, page, sortBy, sortOrder,skip } = calculatePagination(options);
    const andConditions: Prisma.AdminWhereInput[] = [];
    if (params.searchTerm) {
        andConditions.push({
            OR: adminSearchableFields.map(field => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }


    // console.log(Object.keys(filtersData));

    if (Object.keys(filtersData).length) {
        andConditions.push({
            AND: Object.keys(filtersData).map(key => ({
                [key]: {
                    // equals: (filtersData as any)[key]
                    equals: filtersData[key]
                }
            }))
        })
    }

    const whereConditions: Prisma.AdminWhereInput = { AND: andConditions }
    const result = await prisma.admin.findMany({
        where: whereConditions,
        skip: skip,
        take: limit,
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
    })
    return result;
};

export const AdminService = {
    getAllAdminFromDB
};