import DataTypes from "sequelize";
import db_bootcamp from '../config/db.Config.js';
import Bootcamp from "./bootcamp.model.js";
const User = db_bootcamp.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notNull: { "msg": "El campo firstName es obligatorio" }
        }
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notNull: { "msg": "El campo lastName es obligatorio" }
        }
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notNull: { "msg": "El campo email es obligatorio" }
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    }
})
Bootcamp.belongsToMany(User, {
    through: 'user_bootcamp',
    foreignKey:'bootcamp_id'
});
User.belongsToMany(Bootcamp, {
    through: 'user_bootcamp',
    foreignKey: 'user_id'
});
export default User;