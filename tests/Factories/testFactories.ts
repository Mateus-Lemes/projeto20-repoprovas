function testBody() {
    const body = {
        name: "prova teste 1",
        pdfUrl: "https://i.pinimg.com/236x/8b/ee/9a/8bee9a0f5485ac940546c6009bfb679e.jpg",
        categoryId: 1,
        teacherDisciplineId: 1
    }

    return body
}

function testBodyCategoryId() {
    const body = {
        name: "prova teste 1",
        pdfUrl: "https://i.pinimg.com/236x/8b/ee/9a/8bee9a0f5485ac940546c6009bfb679e.jpg",
        categoryId: 213443322,
        teacherDisciplineId: 1
    }

    return body
}

function testBodyTeacherDisciplineId() {
    const body = {
        name: "prova teste 1",
        pdfUrl: "https://i.pinimg.com/236x/8b/ee/9a/8bee9a0f5485ac940546c6009bfb679e.jpg",
        categoryId: 1,
        teacherDisciplineId: 213443322
    }

    return body
}

const factories = {
    testBody,
    testBodyCategoryId,
    testBodyTeacherDisciplineId
}

export default factories