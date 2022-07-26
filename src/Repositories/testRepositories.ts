import prisma from "../config/db.js";

export interface createTest {
    name: string
    pdfUrl: string
    categoryId: number
    teacherDisciplineId: number 
}

export async function getCategoriesRepositories() {
    const categories = await prisma.categories.findMany();

    return categories;
}

export async function createTestRepositories(body: createTest) {
    await prisma.tests.create({
        data: body
    })
}

export async function findByCategoryId(id:number) {
    const categorie = await prisma.categories.findFirst({
        where: {
            id
        }
    })
    return categorie;
}

export async function findByTeacherDisciplineId(id:number) {
    const teacherDisciplineId = await prisma.teachersDisciplines.findFirst({
        where: {
            id
        }
    })
    return teacherDisciplineId;
}

export async function getTerms() {
    const terms = await prisma.terms.findMany()
    return terms
}

export async function getDisciplines() {
    const disciplines = await prisma.disciplines.findMany()
    return disciplines
}

export async function getTestsRepositories() {
    const tests = await prisma.tests.findMany({
        where: {},
        include: {
            category: {},
            teacherDiscipline: {
                include: {
                    teacher: {},
                    discipline: {
                        include: {
                            terms: {}
                        }
                    }
                }
            }
        }
    });
    return tests;
}