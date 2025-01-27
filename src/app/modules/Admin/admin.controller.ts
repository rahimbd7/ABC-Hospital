import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields, optionsFields, } from "./admin.constant";



const getAllAdmin = async (req: Request, res: Response) => {
    try {
        const reqQuery = pick(req.query, adminFilterableFields);
        const options = pick(req.query, optionsFields);
        const result = await AdminService.getAllAdminFromDB(reqQuery, options);
        res.status(200).json({
            success: true,
            message: "Admin fetched successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error?.name || "Failed to fetch Admin",
            error: error
        })
    }
};

export const AdminController = {
    getAllAdmin
}