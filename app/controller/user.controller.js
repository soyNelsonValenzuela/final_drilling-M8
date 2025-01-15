import { Sequelize } from "sequelize";
import User from "../models/user.model.js";
import Bootcamp from "../models/bootcamp.model.js";
import db_bootcamp from "../config/db.Config.js";
export const createUser = async (user) => {
    const transaction = await db_bootcamp.transaction();
    try {
        const newUser = await User.create({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        },
            { transaction }
        );
        await transaction.commit()
        return newUser;
    } catch (error) {
        console.error(error.stack);
        await transaction.rollback();
    }
};
export const findUserById = async (userData) => {
    const {id}=userData;
    try {
        const usuario = await User.findByPk(id, {
            include: {
                model: Bootcamp, // Modelo relacionado
                attributes: ['id', 'title', 'cue', 'description'], // Campos del usuario a incluir
                through: { attributes: [] }, // Excluir datos de la tabla intermedia
            },
            attributes: ['id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt'], // Campos del bootcamp a incluir
            logging: false,
        });

        if (!usuario) {
            throw new Error(`No se encontró el usuario con ID ${id}`);
        }
        const result = {
            id: usuario.id,
            firstName: usuario.firstName,
            lastName: usuario.lastName,
            email: usuario.email,
            createdAt: usuario.createdAt,
            updateAt: usuario.updatedAt,
            bootcamps: usuario.bootcamps.map(bootcamp => ({
                id: bootcamp.id,
                title: bootcamp.title,
                cue: bootcamp.cue
            }))
        };
        console.log(`*********************************`);
        console.log(JSON.stringify(result, null, 2));
        return JSON.stringify(result, null, 2);
    } catch (error) {
        console.error(`Error al obtener la información: ${error.message}`);
        return { message: `Error al obtener la información: ${error.message}` };
    }
};
export const findAllUsers = async () => {
    try {
        const usuarios = await User.findAll({
            include: {
                model: Bootcamp,
                attributes: ['id', 'title', 'cue', 'description'],
                through: { attributes: [] },
            },
            attributes: ['id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt'],
            logging: false,
        });
        if (usuarios.length === 0) {
            throw new Error("No se encontraron usuarios en la base de datos");
        }
        const result = usuarios.map(user => {
            const bootcamps = user.bootcamps.map(bootcamp => ({
                id: bootcamp.id,
                title: bootcamp.title,
                cue: bootcamp.cue
            }));
            return {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                ...(bootcamps.length > 0 && { bootcamps })
            };
        });
        console.log(JSON.stringify(result, null, 2));
        return JSON.stringify(result, null, 2);
    } catch (error) {
        console.error(`Error al obtener información: ${error.message}`);
        return { message: `Error al obtener información: ${error.message}` };
    }
};
export const updateUserById = async (userdata) => {
    const { id, firstName, lastName, email } = userdata
    const transaction = await db_bootcamp.transaction({ logging: false });
    try {
        const user = await User.findByPk(id, { logging: false, transaction })
        if (user) {
            const userToUpdate = await User.update({ firstName, lastName, email }, { where: { id: id }, returning: true, logging: false, transaction })
            console.log(`Usuario id: ${id} actualizado exitosamente.`);
            console.log(JSON.stringify(userToUpdate[1][0].dataValues, null, 2));
            await transaction.commit();
            return (JSON.stringify(userToUpdate[1][0].dataValues, null, 2))
        } else {
            throw new Error(`El usuario con id: ${id} no existe`);
        }
    } catch (error) {
        console.error(`Error al actualizar información: ${error.message}`);
        await transaction.rollback();
        return { message: `Error al actualizar información: ${error.message}` };
    };
};
export const deleteUserById = async (userData) => {
    const { id } = userData;
    const transaction = await db_bootcamp.transaction({ logging: false });
    try {
        const user = await User.findByPk(id, { logging: false, transaction });
        if (user) {
            await user.destroy({ logging: false });
            console.log(`Usuario id: ${id} eliminado exitosamente.`);
            console.log(JSON.stringify(user.dataValues,null,2));
            await transaction.commit();
            return (JSON.stringify(user.dataValues,null,2));
        } else {
            throw new Error(`El usuario con id: ${id} no existe`);
        }
    } catch (error) {
        console.error(`Error al actualizar información: ${error.message}`);
        await transaction.rollback();
        return { message: `Error al actualizar información: ${error.message}` };
    }
};