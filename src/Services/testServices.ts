import { createTest, findByCategoryId, findByTeacherDisciplineId, getTestsByDisciplines, getTestsByTeachers} from "../Repositories/testRepositories.js";

export async function createTestService(body: createTest) {
    const {categoryId, teacherDisciplineId} = body;

    const categorieExist = await findByCategoryId(categoryId);
    if(!categorieExist) {
        throw {
            type: "not found",
            message: "Não existe esta categoria"
        }
    }

    const teacherDisciplineIdExist = await findByTeacherDisciplineId(teacherDisciplineId);
    if(!teacherDisciplineIdExist) {
        throw {
            type: "not found",
            message: "Não existe esta disciplina para este professor"
        }
    }

    await createTest(body);
}

export async function getTestsByTeachersService() {
    const testByTeachers = await getTestsByTeachers()
    
    return testByTeachers;
}
export async function getTestsByDisciplinesService() {
    const testByDisciplines = await getTestsByDisciplines()
    
    return testByDisciplines;
}