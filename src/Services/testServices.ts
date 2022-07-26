import { createTest, createTestRepositories, findByCategoryId, findByTeacherDisciplineId, getCategoriesRepositories, getTestsRepositories} from "../Repositories/testRepositories.js";


export async function getCategoriesService() {
    const categories = await getCategoriesRepositories();

    return categories;
}

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

    await createTestRepositories(body);
}

export async function getTestsByTeachersService() {
    const testByTeachers = await getTestsRepositories()
    console.log("esse é do Teachers")
    return testByTeachers;
}
export async function getTestsByDisciplinesService() {
    const testByDisciplines = await getTestsRepositories()
    console.log("esse é do Disciplines")
    return testByDisciplines;
}