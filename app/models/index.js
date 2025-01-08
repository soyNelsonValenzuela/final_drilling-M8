import User from "./user.model.js";
import Bootcamp from "./bootcamp.model.js";
import db_bootcamp from "../config/db.Config.js";
export const index = async () => {
    try {
        await db_bootcamp.authenticate();
        console.log("La conexión a la base de datos fue exitosa");
        await db_bootcamp.sync({ force: true })
        console.log("Se creo la tabla de manera correcta");
    } catch (error) {
        console.error(error);
    }
}