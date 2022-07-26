import { Request, Response } from "express";
import { signInService, signUpService } from "../Services/userServices.js";


export async function signUpController(req: Request, res: Response ) {
    const body = req.body;

    await signUpService(body);

    res.sendStatus(201);
}

export async function signInController(req: Request, res: Response) {
    const body = req.body;

    const token = await signInService(body);

    res.status(200).send(token);
}