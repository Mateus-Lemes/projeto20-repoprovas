import { Request, Response } from "express";
import { createTestService, getCategoriesService, getTestsByDisciplinesService, getTestsByTeachersService } from "../Services/testServices.js";


export async function getCategoriesController(req: Request, res: Response) {

    const categories = await getCategoriesService()

    res.status(200).send(categories);
    
}

export async function createTestController(req:Request, res: Response) {
    const {body} = req;

    await createTestService(body);

    res.sendStatus(201);
}

export async function getTestController(req:Request, res: Response) {
    const {groupBy} = req.query;

    if(groupBy === "teachers") {
        const tests = await getTestsByTeachersService();
        res.status(200).send(tests); 
    }

    if(groupBy === "disciplines") {
        const tests = await getTestsByDisciplinesService();
        res.status(200).send(tests); 
    }
}