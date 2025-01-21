import { Sequelize } from "sequelize";
import User from "../models/user.model.js";
export const verificarEmail =  async (req, res, next) => {
    const { email } = req.body;
    const usuarioExiste = await User.findOne({
        where: {
            email: email
        }
    })
    if (usuarioExiste) {
        return res.status(400).json({ message: 'El email ya está registrado' });
    }
    next();
};