import DataTypes from "sequelize";
import db_bootcamp from '../config/db.Config.js';
const Bootcamp = db_bootcamp.define('bootcamps', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(80),
        allowNull: false,
        validate: {
            notNull: { "msg": "El campo Nombre title es obligatorio" }
        }
    },
    cue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 5,
            max: 20, //en la descripción del ejercicio decia que implementaramos un maximo de 10, pero luego pide que ingresemos 18, por lo tanto lo aumente a 20 para que se ejecutara exitosamente. 
            notNull: { "msg": "El campo cue es obligatorio" }
        }
    },
    description: {
        type: DataTypes.STRING(250),
        allowNull: false,
        validate: {
            notNull: { "msg": "El campo email es obligatorio" }
        }
    }
});
export default Bootcamp;