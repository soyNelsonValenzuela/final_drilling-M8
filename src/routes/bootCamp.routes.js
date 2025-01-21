import {Router} from "express";
import {createBootcamp,addUser,findBootcampById,findAllBootcamps} from "../controller/bootcamp.controller.js";
import { verifyToken } from "../middlewares/index.js";
const router = Router();
router.post('/api/bootcamp',verifyToken,createBootcamp);
router.post('/api/bootcamp/adduser',verifyToken, addUser);
router.get('/api/bootcamp/:id',verifyToken,findBootcampById);
router.get('/api/bootcamp',findAllBootcamps);
export default router;