import { Sequelize } from "sequelize";
import Bootcamp from "../models/bootcamp.model.js";
import User from "../models/user.model.js";
import db_bootcamp from "../config/db.Config.js";
export const createBootcamp = async (title, cue, description) => {
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
export const addUser = async (userId, bootcampId) => {
    const transaction = await db_bootcamp.transaction({ logging: false });
    try {
        const usuario = await User.findByPk(userId, { transaction, logging: false });
        const bootcamp = await Bootcamp.findByPk(bootcampId, { transaction, logging: false });
        if (!usuario || !bootcamp) {
            throw new Error('Usuario o Bootcamp no encontrado');
        }
        await usuario.addBootcamp(bootcamp, { transaction, logging: false });
        await transaction.commit();
        console.log(`*********************************`);
        console.log(`Agregado el usuario id=${userId} al bootcamp con id=${bootcampId}.`);
        console.log(`*********************************`);
        console.log("");
    } catch (error) {
        await transaction.rollback();
        console.error(`*********************************`);
        console.error('Error al agregar usuario al bootcamp:', error.message);
        console.error(`*********************************`);
    }
};
export const findBootcampById = async (bootcampId) => {
    try {
        const bootcamp = await Bootcamp.findByPk(bootcampId, { 
            include: {
                model: User, // Modelo relacionado
                attributes: ['id', 'firstName', 'lastName', 'email'], // Campos del usuario a incluir
                through: { attributes: [] }, // Excluir datos de la tabla intermedia
            },
            attributes: ['id', 'title','cue', 'description'], // Campos del bootcamp a incluir
            logging: false });
        if (!bootcamp) {
            console.log(`No se encontró el bootcamp con ID ${bootcampId}.`);
            return null;
        }
        console.log(`\n*********************************`);
        console.log(`Bootcamp: ${bootcamp.title} (ID: ${bootcamp.id})`);
        console.log(`CUE: ${bootcamp.cue}`);
        console.log(`Descripción: ${bootcamp.description}`);
        if (bootcamp.users.length === 0) {
            console.log('No hay usuarios inscritos en este bootcamp.');
        } else {
            console.log('Usuarios inscritos:');
            bootcamp.users.forEach((user) => {
                console.log(`  - ID: ${user.id}, Nombre: ${user.firstName} ${user.lastName}, Email: ${user.email}`);
            });
        };
        console.log(`*********************************`);
        return bootcamp;
    } catch (error) {
        console.error(`Error al obtener el bootcamp con ID ${bootcampId}: ${error.message}`);
        return null;
    }
};
export const findAllBootcamps = async () => {
    try {
        const bootcamps = await Bootcamp.findAll({
            include: {
                model: User, // Modelo relacionado
                attributes: ['id', 'firstName', 'lastName', 'email'], // Campos del usuario a incluir
                through: { attributes: [] }, // Excluir datos de la tabla intermedia
            },
            attributes: ['id', 'title','cue', 'description'], // Campos del bootcamp a incluir
            logging: false
        });
        if (bootcamps.length === 0) {
            console.log('No se encontraron bootcamps en la base de datos.');
            return;
        }
        console.log('Listado de Bootcamps y sus Usuarios:');
        bootcamps.forEach((bootcamp) => {
            console.log(`\n*********************************`);
            console.log(`Bootcamp: ${bootcamp.title} (ID: ${bootcamp.id})`);
            console.log(`CUE: ${bootcamp.cue}`);
            console.log(`Descripción: ${bootcamp.description}`);
            if (bootcamp.users.length === 0) {
                console.log('No hay usuarios inscritos en este bootcamp.');
            } else {
                console.log('\nUsuarios inscritos:');
                bootcamp.users.forEach((user) => {
                    console.log(`  - ID: ${user.id}, Nombre: ${user.firstName} ${user.lastName}, Email: ${user.email}`);
                });
            }
            console.log(`*********************************`);
        });
    } catch (error) {
        console.error(`Error al listar bootcamps y usuarios: ${error.message}`);
    }
};