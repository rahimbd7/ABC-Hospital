import { Request, Response } from "express";
import { UserService } from "./user.service";

const createAdmin = async (req:Request, res:Response) => {
    // console.log(req.body);
    const result = await UserService.createAdminIntoDB(req.body);
    res.status(200).json({
        success: true,
        message: "Admin created successfully",
        data: result
    })                                          
};

export const UserController = {
    createAdmin,
};