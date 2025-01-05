import { index } from "./app/models/index.js";
import { crearUsuario } from "./app/controller/user.controller.js";
const main = async () => {
    //========================================
    //Ejecuta la conexión con sequelize a la base de datos y los modelos
    //await index();
    //========================================
    //Creando Usuarios
    const nuevaMarca1 = await crearUsuario("Mateo", "Díaz", "mateo.diaz@correo.com");
    const nuevaMarca2 = await crearUsuario("Santiago", "Mejías", "santiago.mejias@correo.com");
    const nuevaMarca3 = await crearUsuario("Lucas", "Rojas", "lucas.rojas@correo.com");
    const nuevaMarca4 = await crearUsuario("Facundo", "Fernandez", "facundo.fernandez@correo.com");
    console.log(JSON.stringify(nuevaMarca1, null, 2)); // NUEVAMARCA.TOJSON
    console.log(JSON.stringify(nuevaMarca2, null, 2)); // NUEVAMARCA.TOJSON
    console.log(JSON.stringify(nuevaMarca3, null, 2)); // NUEVAMARCA.TOJSON
    console.log(JSON.stringify(nuevaMarca4, null, 2)); // NUEVAMARCA.TOJSON
    //========================================

    //========================================

    //========================================

    //========================================

    //========================================

    //========================================

};
main();