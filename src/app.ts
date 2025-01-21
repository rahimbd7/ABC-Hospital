import express, { Application, Request, Response } from "express";
import { userRoutes } from "./app/modules/user.routes";
import cors from 'cors'
import { adminRoutes } from "./app/modules/Admin/admin.routes";
const app:Application = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req:Request, res:Response) => {
    res.send({
        message: "Hello World"
    })
});

//users apis
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/admins', adminRoutes);

export default app;