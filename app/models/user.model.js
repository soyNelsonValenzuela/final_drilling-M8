import { DataTypes } from "sequelize";
import db from '../config/dbConfig';

const User = db.define('usuarios',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoincrement:true,
        allowNull:false
    },
    
})