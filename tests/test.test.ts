import app from "../src/app.js";
import supertest from "supertest";
import prisma from "../src/config/db.js";
import userBody from "./Factories/userFactories.js";
import factories from "./Factories/testFactories.js";

beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM "Users" WHERE email = 'mateus@teste.com'`
    await prisma.$executeRaw`DELETE FROM "Tests" WHERE id = 1`
})

describe("exames tests (get test)", () => {
    it("create exames sucess", async () => {
        const {testBody} = factories 
        await supertest(app).post("/sign-up").send(userBody());
        const login = await supertest(app).post("/sign-in").send({
            email: "mateus@teste.com",
            password: "123"
        });
        const token = login.text
        const response = await supertest(app).post("/tests").set("Authorization", `Bearer ${token}`).send(testBody());
        const status = response.status
        expect(status).toEqual(201)
    })

    it("categoryId and teacherDisciplineId do not exist", async () => {
        const {testBodyCategoryId, testBodyTeacherDisciplineId} = factories 
        await supertest(app).post("/sign-up").send(userBody());
        const login = await supertest(app).post("/sign-in").send({
            email: "mateus@teste.com",
            password: "123"
        });
        const token = login.text
        const categoryId = await supertest(app).post("/tests").set("Authorization", `Bearer ${token}`).send(testBodyCategoryId());
        const status1 = categoryId.status
        expect(status1).toEqual(404)

        const teacherDisciplineId = await supertest(app).post("/tests").set("Authorization", `Bearer ${token}`).send(testBodyTeacherDisciplineId());
        const status2 = teacherDisciplineId.status
        expect(status2).toEqual(404)
    })
})