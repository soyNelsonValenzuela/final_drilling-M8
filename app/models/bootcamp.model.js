import  DataTypes from "sequelize";
import db_bootcamp from '../config/db.Config.js';
const Bootcamp = db_bootcamp.define('bootcamps', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull:false,
        validate:{
            notNull: {"msg":"El campo Nombre title es obligatorio"}
        }
    },
    cue: {
        type: DataTypes.INTEGER,
        allowNull:false,
        validate:{
            min: 5,
            max: 10,
            notNull: {"msg":"El campo cue es obligatorio"}
        }
    },
    description: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate:{
            notNull: {"msg":"El campo email es obligatorio"}
        }
    }
})
export default Bootcamp;