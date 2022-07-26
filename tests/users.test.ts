import app from "../src/app.js";
import supertest from "supertest";
import userBody, { createUserTest } from "./Factories/userFactories.js";
import prisma from "../src/config/db.js"


beforeEach( async () => {
    await prisma.$executeRaw`DELETE FROM "Users" WHERE email = 'mateus@teste.com'`
})
describe("users tests (post signup)", () => {
    it("if a user was successfully created and inserted into the database", async () => {
        await createUserTest()
    });

    it("if user tries to register with email already in use", async () => {
        await createUserTest()

        const response2 = await supertest(app).post("/sign-up").send(userBody());
        const status2 = response2.status;
        expect(status2).toEqual(409);
    })

    it("if the passwords does not match", async () => {
        const response = await supertest(app).post("/sign-up").send({
            email: "mateus@teste.com",
            password: "123",
            passwordConfirmed: "1234"
        });
        const status = response.status;
        expect(status).toEqual(422);
    })

    it("if input is invalid", async () => {
        const noPassword = await supertest(app).post("/sign-up").send({
            email: "mateus@teste.com",
            password: "",
            passwordConfirmed: ""
        });
        const status = noPassword.status;
        expect(status).toEqual(422);

        const noEmail = await supertest(app).post("/sign-up").send({
            email: "mateustestecom",
            password: "123",
            passwordConfirmed: "123"
        });
        const status2 = noEmail.status;
        expect(status2).toEqual(422);
    })

})

describe("users tests (post signin)", () => {
    it("login sucess", async () => {
        await createUserTest()
        
        const user = await supertest(app).post("/sign-in").send({
            email: "mateus@teste.com",
            password: "123"
        })
        expect(user.status).toEqual(200);
        
    })

    it("incorrect email pattern", async () => {
        await createUserTest()
        
        const user = await supertest(app).post("/sign-in").send({
            email: "mateusteste.com",
            password: "123"
        })
        expect(user.status).toEqual(422);
        
    })

    it("email not found", async () => {
        await createUserTest()
        
        const user = await supertest(app).post("/sign-in").send({
            email: "mateus@test.com",
            password: "123"
        })
        expect(user.status).toEqual(404);
        
    })

    it("incorrect password", async () => {
        await createUserTest()
        
        const user = await supertest(app).post("/sign-in").send({
            email: "mateus@teste.com",
            password: "123245346"
        })
        expect(user.status).toEqual(401);
        
    })

    
})

afterAll(async () => {
    await prisma.$disconnect()
})