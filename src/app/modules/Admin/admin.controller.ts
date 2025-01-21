import { Request, Response } from "express";
import { AdminService } from "./admin.service";


const getAllAdmin = async (req: Request, res: Response) => {
    try {
        const result = await AdminService.getAllAdminFromDB(req.query);
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