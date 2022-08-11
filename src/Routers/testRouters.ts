import { Router } from "express";
import { createTestController, getTestController } from "../Controllers/testControllers.js";
import { authValidation } from "../Middlewares/authValidation.js";
import { schemaValidation } from "../Middlewares/schemasValidation.js";
import { testSchema } from "../Schemas/testSchemas.js";

const testRouters = Router();

testRouters.post("/tests", authValidation, schemaValidation(testSchema), createTestController)
testRouters.get("/tests", authValidation, getTestController)

export default testRouters;