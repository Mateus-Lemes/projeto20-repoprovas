import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { findByUserId } from "../Services/userServices.js";

export async function authValidation(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
        throw {
            type: "unauthorized",
            message: "Authorization header invalid or inexistent"
        }
    }

    const token = authorization.replace("Bearer ", "").trim();
    if (!token) {
        throw {
            type: "unauthorized",
            message: "Token inexistent"
        }
    }

    try {

        const secretKey = process.env.SECRET_KEY;
        const { userId } = jwt.verify(token, secretKey) as {userId: number};
        const user = await findByUserId(userId);
        res.locals.user = user;

        next();

    } catch (error) {
        throw {
            type:"unauthorized",
            message: "Token invalid"
        }
    }
}