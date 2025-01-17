import { Router } from "express";
import { createUser, findUserById, findAllUsers, updateUserById, deleteUserById, signIn, logout } from "../controller/user.controller.js";
import { verifyToken } from "../middlewares/auth.js";
const router = Router();
router.post('/api/signup', createUser)
router.post('/api/signin', signIn)
router.get('/api/user/:id', verifyToken, findUserById)
router.get('/api/user', verifyToken, findAllUsers)
router.put('/api/user/:id', verifyToken, updateUserById)
router.delete('/api/user/:id', verifyToken, deleteUserById)
router.post('/api/logout', verifyToken, logout);
export default router;