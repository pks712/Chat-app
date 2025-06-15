import express from "express";
import { getMessage, sendMesage } from "../controller/message.controller.js";
import secureRoute from "../middelware/secureRoute.js";
const router = express.Router();


router.post('/send/:id' ,secureRoute, sendMesage)

router.get('/get/:id' ,secureRoute,getMessage)

export default router;