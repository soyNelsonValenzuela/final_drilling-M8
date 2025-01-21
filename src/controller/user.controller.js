import { Sequelize } from "sequelize";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { expressjwt } from "express-jwt";
import User from "../models/user.model.js";
import Bootcamp from "../models/bootcamp.model.js";
import db_bootcamp from "../config/db.Config.js";
import { SECRET } from "../config/auth.config.js";
export const createUser = async (req, res) => {
    const transaction = await db_bootcamp.transaction();
    try {
        const { firstName, lastName, email } = req.body;
        let { password } = req.body;
        console.log(password);
        if (!firstName || !lastName || !email || !password) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Los campos no pueden estar vacios' })
        } else if (password.length < 8) {
            await transaction.rollback();
            return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' })
        } else {
            password = await bcrypt.hash(password, 10);
            const usuario = await User.create({
                firstName,
                lastName,
                email,
                password
            })
            await transaction.rollback();
            return res.status(201).json({
                message: 'Usuario registrado exitosamente',
                ...usuario.dataValues
            })
        }
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ message: `Ha ocurrido un error ${error}` })
    }
};
export const findUserById = async (req, res) => {
    const { id } = req.params; // Obtener el ID de los parámetros de la ruta
    try {
        const usuario = await User.findByPk(id, {
            include: {
                model: Bootcamp, // Modelo relacionado
                attributes: ['id', 'title', 'cue', 'description'], // Campos del usuario a incluir
                through: { attributes: [] }, // Excluir datos de la tabla intermedia
            },
            attributes: ['id', 'firstName', 'lastName', 'email', 'password', 'createdAt', 'updatedAt'], // Campos del bootcamp a incluir
            logging: false,
        });
        if (!usuario) {
            return res.status(404).json({ message: `No se encontró el usuario con ID ${id}` });
        }
        const result = {
            ...usuario.dataValues,
            bootcamps: usuario.bootcamps.map(bootcamp => ({
                id: bootcamp.id,
                title: bootcamp.title,
                cue: bootcamp.cue
            }))
        };
        console.log(`*********************************`);
        console.log(JSON.stringify(result, null, 2));
        return res.status(200).json(result); // Responder con JSON al cliente
    } catch (error) {
        console.error(`Error al obtener la información: ${error.message}`);
        return res.status(500).json({ message: `Error al obtener la información: ${error.message}` });
    }
};
export const findAllUsers = async (req, res) => {
    try {
        const usuarios = await User.findAll({
            include: {
                model: Bootcamp,
                attributes: ['id', 'title', 'cue', 'description'],
                through: { attributes: [] },
            },
            attributes: ['id', 'firstName', 'lastName', 'email', 'password', 'createdAt', 'updatedAt'],
            logging: false,
        });
        if (usuarios.length === 0) {
            return res.status(404).json({ message: "No se encontraron usuarios en la base de datos" })
        }
        const result = usuarios.map(user => {
            const bootcamps = user.bootcamps.map(bootcamp => ({
                id: bootcamp.id,
                title: bootcamp.title,
                cue: bootcamp.cue
            }));
            return {
                ...user.dataValues,
                ...(bootcamps.length > 0 && { bootcamps })
            };
        });
        return res.status(200).json(result); // Responder con JSON al cliente
    } catch (error) {
        return res.status(500).json({ message: `Error al obtener información: ${error}` });
    }
};
export const updateUserById = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);
    const { id } = req.params;
    const transaction = await db_bootcamp.transaction({ logging: false });
    try {
        const user = await User.findByPk(id, { logging: false, transaction })
        if (user) {
            const userToUpdate = await User.update({ firstName, lastName, email, password }, { where: { id: id }, returning: true, logging: false, transaction })
            console.log(`Usuario id: ${id} actualizado exitosamente.`);
            console.log(JSON.stringify(userToUpdate[1][0].dataValues, null, 2));
            await transaction.commit();
            return res.status(200).json({
                message: `Usuario id: ${id} actualizazdo exitosamente`,
                ...userToUpdate[1][0].dataValues
            })
        } else {
            await transaction.rollback();
            res.status(404).json({ message: `El usuario con id: ${id} no existe` });
        }
    } catch (error) {
        console.error(`Error al actualizar información: ${error.message}`);
        await transaction.rollback();
        res.status(500).json({ message: `Error al actualizar información: ${error.message}` });
    };
};
export const deleteUserById = async (req, res) => {
    const { id } = req.params;
    const transaction = await db_bootcamp.transaction({ logging: false });
    try {
        const user = await User.findByPk(id, { logging: false, transaction });
        if (user) {
            const userData = user.dataValues; // Guarda los datos del usuario antes de eliminarlo
            await user.destroy({ logging: false });
            console.log(`Usuario id: ${id} eliminado exitosamente.`);
            console.log(JSON.stringify(userData, null, 2));
            await transaction.commit();
            return res.status(200).json({
                message: `Usuario con id: ${id} eliminado exitosamente.`,
                ...userData
            });
        } else {
            await transaction.rollback();
            return res.status(404).json({ message: `El usuario con id: ${id} no existe` });
        }
    } catch (error) {
        console.error(`Error al actualizar información: ${error.message}`);
        await transaction.rollback();
        return res.status(500).json({ message: `Error al actualizar información: ${error.message}` });
    }
};
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Los campos no pueden estar vacíos' });
        }
        const usuario = await User.findOne({ where: { email } });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no registrado' });
        }
        const validarPassword = await bcrypt.compare(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({ message: 'Datos inválidos!!!' });
        }
        const payload = {
            email,
            id: usuario.id,
            exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expira en 1 hora
        };
        const token = jwt.sign(payload, SECRET);
        // Configurar cookie con el token
        res.cookie('jwt', token, {
            httpOnly: true, // Solo accesible desde el servidor
            maxAge: 60 * 60 * 1000, // 1 hora
        });
        res.status(200).json({

            id: usuario.id,
            firstName: usuario.firstName,
            lastName: usuario.lastName,
            email: usuario.email,
            accesToken: token
        }
        );
    } catch (error) {
        return res.status(500).json({ message: `Error al iniciar sesión: ${error.message}` });
    }
};
export const logout = (req, res) => {
    try {
        // Limpiar la cookie "jwt"
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Solo en producción
            sameSite: 'strict', // Prevenir CSRF
        });
        res.status(200).json({ message: 'Sesión cerrada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: `Error al cerrar sesión: ${error.message}` });
    }
};