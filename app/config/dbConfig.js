import {config} from "dotenv";
import { Sequelize } from "sequelize";
config();
const {USER,HOST,DATABASE,PASSWORD,PORT} = process.env;

const db = new Sequelize(
    DATABASE,
    USER,
    PASSWORD,
    {
        host:HOST,
        port: PORT,
        dialect:'postgres'
    }
);

export default db;