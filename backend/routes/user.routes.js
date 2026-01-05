import { Router } from "express";
import {
  register,
  login,
  uploadProfilePicture,
  updateUserProfile,
  getUserProfile
} from "../controllers/user.controller.js";
import multer from "multer";

const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

router
  .route("/update_profile_picture")
  .post(uploads.single("profile_picture"), uploadProfilePicture);

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/user_update").post(updateUserProfile);
router.route("/get_user_and_profile").get(getUserProfile);

export default router;
