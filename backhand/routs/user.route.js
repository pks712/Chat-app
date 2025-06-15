import express from "express";
import  {Signup, Login, Logout, getUserProfile } from "../controller/user.controller.js";
import secureRoute from "../middelware/secureRoute.js";

const router = express.Router();

router.post('/signup', Signup)
router.post('/login', Login)
router.post('/logout', Logout)
router.get('/getUserProfile',secureRoute, getUserProfile)



export default router;