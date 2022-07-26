import joi, { string } from "joi";

export const testSchema = joi.object({
    name: joi.string().required(),
    pdfUrl: joi.string().pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/).required(),
    categoryId: joi.number().required(),
    teacherDisciplineId: joi.number().required(),
});