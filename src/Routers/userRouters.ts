import { Router } from "express";
import { signInController, signUpController } from "../Controllers/userControllers.js";
import { schemaValidation } from "../Middlewares/schemasValidation.js";
import { signInSchema, signUpSchema } from "../Schemas/userSchemas.js";

const userRouters = Router();

userRouters.post("/sign-up", schemaValidation(signUpSchema), signUpController);
userRouters.post("/sign-in", schemaValidation(signInSchema), signInController);

export default userRouters;