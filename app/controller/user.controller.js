import { Sequelize } from "sequelize";
import User from "../models/user.model.js";
import db_bootcamp from "../config/db.Config.js";

export const crearUsuario = async (firstName, lastName, email) => {
    const transaccion = await db_bootcamp.transaction();
    try {
        const newUser = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email
        },
        {transaction:transaccion}
    );
    await transaccion.commit()
    return newUser;
    } catch (error) {
        console.error(error.stack);
        await transaccion.rollback();
    }
}