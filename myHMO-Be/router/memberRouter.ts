import {Router} from "express";
import { createMember, loginMember, verifyMember } from "../controller/memberController";

const router:Router= Router()


router.route("/create-member").post(createMember)
router.route("/verify-member/:userID").patch(verifyMember)
router.route("/login-member/:userID").post(loginMember)

export default router;