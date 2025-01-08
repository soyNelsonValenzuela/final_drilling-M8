import { Sequelize } from "sequelize";
import User from "../models/user.model.js";
import Bootcamp from "../models/bootcamp.model.js";
import db_bootcamp from "../config/db.Config.js";
export const createUser = async (firstName, lastName, email) => {
    const transaction = await db_bootcamp.transaction();
    try {
        const newUser = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email
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
export const findUserById = async (userId) => {
    try {
        // Buscar el usuario por ID
        const usuario = await User.findByPk(userId, { logging: false });
        if (!usuario) {
            throw new Error(`No se encontró el usuario con ID ${userId}`);
        }
        const bootcamps = await usuario.getBootcamps({ logging: false });
        if (bootcamps.length === 0) {
            console.log(`*********************************`);
            console.log(`El usuario con ID ${userId} no está inscrito en ningún bootcamp.`);
            console.log(`*********************************`);
            console.log("");
        } else {
            console.log(`*********************************`);
            console.log(`Bootcamps inscritos por el usuario con ID ${userId}:`);
            bootcamps.forEach((bootcamp) => {
                console.log(`- ID: ${bootcamp.id}, Nombre: ${bootcamp.title}`);
            });
            console.log(`*********************************`);
            console.log("");
        }
    } catch (error) {
        console.error(`Error al obtener los bootcamps del usuario: ${error.message}`);
    }
};
export const findAllUsers = async () => {
    try {
        const users = await User.findAll({
            include: {
                model: Bootcamp,
                attributes: ['id', 'title', 'cue', 'description'],
                through: []
            },
            attributes: ['id', 'firstName', 'lastName', 'email'],
            logging: false
        });
        if (users.length === 0) {
            console.log("No se encontraron ususarios en la base de datos");
        } else {
            console.log('==== Listado de ususarios y sus bootcamps ====');
            users.forEach((user) => {
                console.log(`\n*********************************`);
                console.log(`Usuario: ${user.firstName} ${user.lastName} (ID: ${user.id})`)
                console.log(`Email: ${user.email}`);
                if (user.bootcamps.length === 0) {
                    console.log('\nEl usuario no esta inscrito en ningún bootcamp ');
                } else {
                    console.log('\nBootcamps inscritos:');
                    user.bootcamps.forEach((bootcamp) => {
                        console.log(`\n-Bootcamp: ${bootcamp.title} (ID: ${bootcamp.id})`);
                        console.log(` CUE: ${bootcamp.cue}`);
                        console.log(` Descripción: ${bootcamp.description}`)
                    });
                };
                console.log(`*********************************`);
            });
        }
    } catch (error) {
        console.error(`Error al listar usuarios y sus bootcapms: ${error.message}`);
    }
};
export const updateUserById = async (id, firstName, lastName, email) => {
    const transaction = await db_bootcamp.transaction({ logging: false });
    try {
        const user = await User.findByPk(id, { logging: false, transaction })
        if (user) {
            const userToUpdate = await User.update({ firstName, lastName, email }, { where: { id: id }, returning: true, logging: false, transaction })
            console.log(`Usuario id: ${id} actualizado exitosamente.`);
            await transaction.commit();
        } else {
            console.error(`El usuario con id: ${id} no existe`);
            await transaction.rollback();
        }
    } catch (error) {
        console.error(`Error al actualizar el usuario id: ${id}: ${error.stack}`);
        await transaction.rollback();
    };
};
export const deleteUserById = async (id) => {
    const transaction = await db_bootcamp.transaction({ logging: false });
    try {
        const user = await User.findByPk(id, { logging: false, transaction });
        if (user) {
            await user.destroy({ logging: false });
            console.log(`Usuario id: ${id} eliminado exitosamente.`);

            await transaction.commit();
        } else {
            console.error(`Usuario con id:${id} no existe.`);
            transaction.rollback();
        }
    } catch (error) {
        console.error(`Error al eliminar el usuario id:${id}: ${error.stack}`);
        transaction.rollback();
    }
};