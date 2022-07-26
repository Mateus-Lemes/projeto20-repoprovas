import { Router } from "express";
import testRouters from "./testRouters.js";
import userRouters from "./userRouters.js";

const router = Router();

router.use(userRouters);
router.use(testRouters)

export default router;