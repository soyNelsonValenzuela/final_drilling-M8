import { Sequelize } from "sequelize";
import Bootcamp from "../models/bootcamp.model.js";
import User from "../models/user.model.js";
import db_bootcamp from "../config/db.Config.js";
export const createBootcamp = async (bootcamp) => {
    const {title,cue,description} = bootcamp;
    const transaccion = await db_bootcamp.transaction();
    try {
        const newBootcamp = await Bootcamp.create({
            title: title,
            cue: cue,
            description: description
        },
            { transaction: transaccion }
        );
        await transaccion.commit();
        return newBootcamp;
    } catch (error) {
        console.error(error.stack);
        await transaccion.rollback();
    }
};
export const addUser = async (userBootcamp) => {
    const { idUser, idBootcamp} = userBootcamp
    const transaction = await db_bootcamp.transaction({ logging: false });
    try {
        const usuario = await User.findByPk(idUser, { transaction, logging: false });
        const bootcamp = await Bootcamp.findByPk(idBootcamp, { transaction, logging: false });
        if (!usuario || !bootcamp) {
            throw new Error('Usuario o Bootcamp no encontrado');
        }
        await usuario.addBootcamp(bootcamp, { transaction, logging: false });
        await transaction.commit();
        console.log(`*********************************`);
        console.log(`Agregado el usuario id=${idUser} al bootcamp con id=${idBootcamp}.`);
        console.log(`*********************************`);
        console.log("");
    } catch (error) {
        await transaction.rollback();
        console.error(`*********************************`);
        console.error('Error al agregar usuario al bootcamp:', error.message);
        console.error(`*********************************`);
    }
};
export const findBootcampById = async (dataBootcamp) => {
    const {id}=dataBootcamp;
    try {
        const bootcamp = await Bootcamp.findByPk(id, { 
            include: {
                model: User, // Modelo relacionado
                attributes: ['id', 'firstName', 'lastName', 'email'], // Campos del usuario a incluir
                through: { attributes: [] }, // Excluir datos de la tabla intermedia
            },
            attributes: ['id', 'title', 'cue', 'description','createdAt','updatedAt'], // Campos del bootcamp a incluir
            logging: false,
        });

        if (!bootcamp) {
            throw new Error (`No se encontró el bootcamp con ID ${id}.`)
            //console.log(`No se encontró el bootcamp con ID ${curso.id}.`);
            //return null;// se podra retornar un error ?
        }
        const result = {
            id: bootcamp.id,
            title: bootcamp.title,
            cue: bootcamp.cue,
            description: bootcamp.description,
            createdAt: bootcamp.createdAt,
            updateAt: bootcamp.updatedAt,
            users: bootcamp.users.map(user => ({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }))
        };
        console.log(`*********************************`);
        console.log(JSON.stringify(result,null,2));
        return JSON.stringify(result,null,2);
    } catch (error) {
        console.error(`Error al obtener la información: ${error.message}`);
        return {message: `Error al obtener la información: ${error.message}`};
    }
};
export const findAllBootcamps = async () => {
    try {
        const bootcamps = await Bootcamp.findAll({
            include: {
                model: User, // Modelo relacionado
                attributes: ['id', 'firstName', 'lastName', 'email'], 
                through: { attributes: [] }, 
            },
            attributes: ['id', 'title', 'cue', 'description', 'createdAt', 'updatedAt'], 
            logging: false,
        });
        if (bootcamps.length === 0) {
            throw new Error ('No se encontraron bootcamps en la base de datos.')
        };
        const result = bootcamps.map(bootcamp => ({
            id: bootcamp.id,
            title: bootcamp.title,
            cue: bootcamp.cue,
            description: bootcamp.description,
            createdAt: bootcamp.createdAt,
            updatedAt: bootcamp.updatedAt,
            users: bootcamp.users.map(user => ({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            })),
        }));
        console.log(JSON.stringify(result,null,2));
        return JSON.stringify(result,null,2);
    } catch (error) {
        console.error(`Error al obtener información: ${error.message}`);
        return {message: `Error al obtener información: ${error.message}`};
    }
};