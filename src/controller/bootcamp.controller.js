import { Sequelize } from "sequelize";
import Bootcamp from "../models/bootcamp.model.js";
import User from "../models/user.model.js";
import db_bootcamp from "../config/db.Config.js";
export const createBootcamp = async (req, res) => {
    const transaccion = await db_bootcamp.transaction();
    try {
        const { title, cue, description } = req.body;
        if (!title || !cue || !description) {
            await transaccion.rollback();
            return res.status(404).json({ message: "Los campos no puedes estar vacios" })
        } else {
            const newBootcamp = await Bootcamp.create({
                title: title,
                cue: cue,
                description: description
            },
                { transaction: transaccion }
            );
            await transaccion.commit();
            return res.status(201).json({
                message: 'Bootcamp creado exitosamente',
                ...newBootcamp.dataValues
            });
        };
    } catch (error) {
        await transaccion.rollback();
        return res.status(500).json({ message: `Ha ocurrido un error ${error.stack}` })
    }
};
export const addUser = async (req, res) => {
    const transaction = await db_bootcamp.transaction({ logging: false });
    try {
        const { idUser, idBootcamp } = req.body
        const usuario = await User.findByPk(idUser, { transaction, logging: false });
        const bootcamp = await Bootcamp.findByPk(idBootcamp, { transaction, logging: false });
        if (!usuario || !bootcamp) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Usuario o Bootcamp no encontrado' });
        } else {
            await usuario.addBootcamp(bootcamp, { transaction, logging: false });
            await transaction.commit();
            res.status(200).json(bootcamp.dataValues)
        }
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ message: `Ha ocurrido un error ${error}` })
    }
};
export const findBootcampById = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const bootcamp = await Bootcamp.findByPk(id, {
            include: {
                model: User, // Modelo relacionado
                attributes: ['id', 'firstName', 'lastName', 'email'], // Campos del usuario a incluir
                through: { attributes: [] }, // Excluir datos de la tabla intermedia
            },
            attributes: ['id', 'title', 'cue', 'description', 'createdAt', 'updatedAt'], // Campos del bootcamp a incluir
            logging: false,
        });
        if (!bootcamp) {
            return res.status(404).json({ message: `No se encontró el bootcamp con ID ${id}.` });
        } else {
            return res.status(200).json({...bootcamp.dataValues})
        }
    } catch (error) {
        return res.status(500).json({ message: `Error al obtener la información: ${error}` });
    }
};
export const findAllBootcamps = async (req,res) => {
    try {
        const bootcamps = await Bootcamp.findAll({
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName', 'email'],
                through: { attributes: [] },
            },
            attributes: ['id', 'title', 'cue', 'description', 'createdAt', 'updatedAt'],
            logging: false,
        });
        if (bootcamps.length === 0) {
            return res.status(404).json({ message: "No se encontraron bootcamps en la base de datos" })
        };
        const result = bootcamps.map(bootcamp => {
            const users = bootcamp.users.map(user => ({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }));
            return {
               ...bootcamp.dataValues,
                ...(users.length > 0 && { users })
            };
        });
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json ({ message: `Error al obtener información: ${error.stack}` });
    }
};