import { Router } from "express";
import { createUser, signUser, updateUserAvatar, updateUserLocation, updateUserNames, updateUserPhoneNumber, verifyUser, viewAllUsers, viewAllVerifiedUsers } from "../controller/userController";
import { upload } from "../utils/multer";


const router:Router = Router()

router.route("/register-user").post(createUser);
router.route("/verify-user/:userID").patch(verifyUser);
router.route("/sign-user").post(signUser);
router.route("/update-user-name/:userID").patch(updateUserNames);
router.route("/update-user-location").patch(updateUserLocation);
router.route("/view-all-user").get(viewAllUsers);
router.route("/view-all-signin-user").get(viewAllVerifiedUsers);
router.route("/update-user-phoneNumber").patch(updateUserPhoneNumber);
router.route("/update-user-avatar/:userID").patch(upload, updateUserAvatar);

export default router;
