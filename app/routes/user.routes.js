import {Router} from "express";
import {createUser,findUserById,findAllUsers,updateUserById,deleteUserById} from "../controller/user.controller.js";
const router = Router();

router.post('/api/signup',createUser) // acceso publico
router.post('/api/signin') // acceso publico
router.get('/api/user/:id',findUserById) // falta token, requiere inicio de sesion
router.get('/api/user',findAllUsers)// falta token, requiere inicio de sesion
router.put('/api/user/:id',updateUserById)// falta token, requiere inicio de sesion
router.delete('/api/user/:id',deleteUserById)// falta token, requiere inicio de sesion


export default router;