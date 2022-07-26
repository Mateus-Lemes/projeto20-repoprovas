import supertest from "supertest";
import app from "../../src/app.js";
import prisma from "../../src/config/db.js";

export default function userBody(){
    const body = {
        email: "mateus@teste.com",
        password: "123",
        passwordConfirmed: "123"
    }
    return body
}

export async function createUserTest(){
    const response = await supertest(app).post("/sign-up").send(userBody());
    const status = response.status;
    expect(status).toEqual(201);

    const userInserted = await prisma.users.findFirst({
        where: {
            email: userBody().email
        }})
    return expect(userInserted.email).toEqual(userBody().email)
}