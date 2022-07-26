import { NextFunction, Request, Response } from "express";

export default function errorHandlerMiddlewares(error, req: Request, res: Response, next: NextFunction) {
    if (error.type === "conflict") {
        return res.status(409).send(error.mensage);
    }

    if (error.type === "not found") {
        return res.status(404).send(error.mensage);
    }

    if (error.type === "unauthorized") {
        return res.status(401).send(error.mensage);
    }

    console.log(error);
    res.status(500).send("Unknown error");
}