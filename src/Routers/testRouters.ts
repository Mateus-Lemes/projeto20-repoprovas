import { Router } from "express";
import { createTestController, getCategoriesController, getTestController } from "../Controllers/testControllers.js";
import { authValidation } from "../Middlewares/authValidation.js";
import { schemaValidation } from "../Middlewares/schemasValidation.js";
import { testSchema } from "../Schemas/testSchemas.js";

const testRouters = Router();

testRouters.use(authValidation)
testRouters.get("/categories", getCategoriesController)
testRouters.post("/tests", schemaValidation(testSchema), createTestController)
testRouters.get("/tests", getTestController)

export default testRouters;