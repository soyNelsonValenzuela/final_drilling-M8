import  DataTypes from "sequelize";
import db_bootcamp from '../config/db.Config.js';
import Bootcamp from "./bootcamp.model.js";
const User = db_bootcamp.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull:false,
        validate:{
            notNull: {"msg":"El campo Nombre firstName es obligatorio"}
        }
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull:false,
        validate:{
            notNull: {"msg":"El campo Nombre lastName es obligatorio"}
        }
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique:true,
        validate:{
            isEmail:true,
            notNull: {"msg":"El campo email es obligatorio"}
        }
    }
})
Bootcamp.belongsToMany(User, {
    through: 'user_bootcamp'
});
User.belongsToMany(Bootcamp,{
    through: 'user_bootcamp'
});
export default User;