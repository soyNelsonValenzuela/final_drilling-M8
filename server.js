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
    const newUser1 = await createUser({
        firstName: "Mateo",
        lastName: "Díaz",
        email: "mateo.diaz@correo.com"
    });
    const newUser2 = await createUser({
        firstName: "Santiago",
        lastName: "Mejías",
        email: "santiago.mejias@correo.com"
    });
    const newUser3 = await createUser({
        firstName: "Lucas",
        lastName: "Rojas",
        email: "lucas.rojas@correo.com"
    });
    const newUser4 = await createUser({
        firstName: "Facundo",
        lastName: "Fernandez",
        email: "facundo.fernandez@correo.com"
    });
    console.log(JSON.stringify(newUser1, null, 2));
    console.log(JSON.stringify(newUser2, null, 2));
    console.log(JSON.stringify(newUser3, null, 2));
    console.log(JSON.stringify(newUser4, null, 2));
    //========================================
    // Creando bootcamps
    const bootcamp1 = await createBootcamp({
        title: "Introduciendo el bootcamp de React",
        cue: 10,
        description: "React es la librería más usada en JAvaScript para el desarrollo de interfaces."
    });
    const bootcamp2 = await createBootcamp({
        title: "Bootcamp Desarrollo Web Full Stack",
        cue: 12,
        description: "Crearás aplicaciones web utilizando las tecnologias y lenguajes más populares, como: JavaScript, nodeJS, Angular, MongoDB, ExpressJS."
    });
    const bootcamp3 = await createBootcamp({
        title: "Bootcamp Big Data, inteligencia Artificial & Machine Learning",
        cue: 18,
        description: "Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning."
    });
    console.log(JSON.stringify(bootcamp1, null, 2));
    console.log(JSON.stringify(bootcamp2, null, 2));
    console.log(JSON.stringify(bootcamp3, null, 2));
    //========================================
    //Agregando usuarios a bootcamps
    addUser({
        idBootcamp: 1,
        idUser: 1
    });
    addUser({
        idBootcamp: 1,
        idUser: 1
    });
    addUser({
        idBootcamp: 1,
        idUser: 2
    });
    addUser({
        idBootcamp: 2,
        idUser: 1
    });
    addUser({
        idBootcamp: 3,
        idUser: 1
    });
    addUser({
        idBootcamp: 3,
        idUser: 2
    });
    addUser({
        idBootcamp: 3,
        idUser: 3
    });
    //==============CONSULTAS=================
    //Para probar las consultas quite los comentarios "//" y luego ejecute el server con "npm start" en la terminal.
    //========================================  
    //1.- Consultando el bootcamp por id, incluyendo los usuarios.
        //findBootcampById({id:1})
        //findBootcampById({id:2})
        //findBootcampById({id:3})
        //findBootcampById({id:4})
    //========================================
    //2.- Listar todos los bootcamps con sus usuarios
        //findAllBootcamps();
    //========================================
    //3.- Consultar un usuario por id, incluyendo los bootcamp
        //findUserById({id:1});
        // findUserById({id:2});
        // findUserById({id:3});
    //========================================
    //4.- Listar los usuarios con sus bootcamps
        //findAllUsers();
    //========================================
    //5.- Actualizar el usuario según su id; por ejemplo: actualizar el ususario con id=1 por Pedro Sánchez
        /*
        updateUserById({
                id: 1,
                firstName: 'Pedro',
                lastName: 'Sanchez',
                email: 'pedro.sanchez@correo.com'
            });
        */
    //========================================
    //6.- Eliminar un usuario por id; por ejemplo: el ususario con id=1
        deleteUserById({id:1});
    //========================================
};
main();