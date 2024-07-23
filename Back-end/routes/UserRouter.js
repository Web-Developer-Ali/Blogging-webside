import express from 'express';
import { createUser, getUserDetails, loginUser, LogoutUser } from '../controllers/UserController.js';
import { upload } from '../middleware/MulterMiddleware.js';
import { LoginMiddleware } from '../middleware/LoginMiddleware.js';

const router = express.Router();

router.post('/create/user', upload.single('avatar'), createUser);
router.post('/login/user',loginUser);
router.get("/getUser",LoginMiddleware,getUserDetails)
router.get("/Logout/user",LogoutUser)
// router.get("/user",getUser)


export default router;
