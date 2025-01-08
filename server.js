import { index } from "./app/models/index.js";
import { createUser, deleteUserById, findAllUsers, findUserById, updateUserById } from "./app/controller/user.controller.js";
import { createBootcamp, addUser, findBootcampById, findAllBootcamps } from "./app/controller/bootcamp.controller.js";

// ===== Este archivo tiene comentarios unicamente para facilitar su revisión =====

const main = async () => {
    //========================================
    //Ejecuta la conexión con sequelize a la base de datos y los modelos
    await index();
    //========================================
    //Creando Usuarios 
    const newUser1 = await createUser("Mateo", "Díaz", "mateo.diaz@correo.com");
    const newUser2 = await createUser("Santiago", "Mejías", "santiago.mejias@correo.com");
    const newUser3 = await createUser("Lucas", "Rojas", "lucas.rojas@correo.com");
    const newUser4 = await createUser("Facundo", "Fernandez", "facundo.fernandez@correo.com");
    console.log(JSON.stringify(newUser1, null, 2));
    console.log(JSON.stringify(newUser2, null, 2));
    console.log(JSON.stringify(newUser3, null, 2));
    console.log(JSON.stringify(newUser4, null, 2));
    //========================================
    // Creando bootcamps
    const bootcamp1 = await createBootcamp("Introduciendo el bootcamp de React", 10, "React es la librería más usada en JAvaScript para el desarrollo de interfaces.")
    const bootcamp2 = await createBootcamp("Bootcamp Desarrollo Web Full Stack", 12, "Crearás aplicaciones web utilizando las tecnologias y lenguajes mpas populares, como: JavaScript, nodeJS, Angular, MongoDB, ExpressJS.")
    const bootcamp3 = await createBootcamp("Bootcamp Big Data, inteligencia Artificial & Machine Learning", 18, "Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning.")
    console.log(JSON.stringify(bootcamp1, null, 2));
    console.log(JSON.stringify(bootcamp2, null, 2));
    console.log(JSON.stringify(bootcamp3, null, 2));
    //========================================
    //Agregando usuarios a bootcamps
    addUser(1, 1);
    addUser(2, 1);
    addUser(1, 2);
    addUser(1, 3);
    addUser(2, 3);
    addUser(3, 3);
    //==============CONSULTAS=================
        //Para probar las consultas quite los comentarios "//" y luego ejecute el server con "npm start" en la terminal.
    //========================================  
        //1.- Consultando el bootcamp por id, incluyendo los usuarios.
            // findBootcampById(1)
            // findBootcampById(2)
            // findBootcampById(3)
            // findBootcampById(4)
    //========================================
        //2.- Listar todos los bootcamps con sus usuarios
         //findAllBootcamps();
    //========================================
        //3.- Consultar un usuario por id, incluyendo los bootcamp
            // findUserById(1);
            //findUserById(2);
            //findUserById(3);
    //========================================
        //4.- Listar los usuarios con sus bootcamps
            //findAllUsers();
    //========================================
        //5.- Actualizar el usuario según su id; por ejemplo: actualizar el ususario con id=1 por Pedro Sánchez
            //updateUserById('1','Pedro','Sanchez','pedro.sanchez@correo.com')
    //========================================
        //6.- Eliminar un usuario por id; por ejemplo: el ususario con id=1
            //deleteUserById('1');
    //========================================
};
main();