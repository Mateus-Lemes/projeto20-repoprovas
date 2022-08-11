import prisma from "../config/db.js";

export interface createTest {
    name: string
    pdfUrl: string
    categoryId: number
    teacherDisciplineId: number 
}

export async function createTest(body: createTest) {
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

export async function getTestsByDisciplines() {
    const tests = await prisma.terms.findMany({
        where: {},
        select: {
            number: true,
            disiciplines: {
                select: {
                    name: true,
                    teachersDisciplines: {
                        select: {
                            tests: {
                                select: {
                                    name: true,
                                    category: true,
                                    pdfUrl: true
                                }
                            },
                            teacher: true
                        }
                    }
                }
            }
        }
    });
    return tests;
}

export async function getTestsByTeachers() {
    const tests = await prisma.teachers.findMany({
        where: {},
        select: {
            name: true,
            teachersDisciplines: {
                select: {
                    tests: {
                        select: {
                            name: true,
                            pdfUrl: true,
                            category: true
                        }
                    },
                    discipline: true
                }
            }
        }
    });
    return tests;
}