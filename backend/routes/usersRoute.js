import { Router } from "express";
import { getloginuser} from "../controller/loginUserController";
import { getregisteruser } from "../controller/registerUserController";

const router  = Router()

router.post("/register", getregisteruser);

router.post("/login", getloginuser);



export default router;