import { index } from '../models/index.js';
import User from '../models/user.model.js';
import Bootcamp from '../models/bootcamp.model.js';
import db_bootcamp from './db.Config.js';
import bcrypt from 'bcryptjs';
const createBootcamp = async (bootcamp) => {
  const { title, cue, description } = bootcamp;
  const transaccion = await db_bootcamp.transaction();
  try {
    const newBootcamp = await Bootcamp.create({
      title: title,
      cue: cue,
      description: description
    },
      { transaction: transaccion }
    );
    await transaccion.commit();
    return newBootcamp;
  } catch (error) {
    console.error(error.stack);
    await transaccion.rollback();
  }
};
const addUser = async (userBootcamp) => {
  const { idUser, idBootcamp } = userBootcamp
  const transaction = await db_bootcamp.transaction({ logging: false });
  try {
    const usuario = await User.findByPk(idUser, { transaction, logging: false });
    const bootcamp = await Bootcamp.findByPk(idBootcamp, { transaction, logging: false });
    if (!usuario || !bootcamp) {
      throw new Error('Usuario o Bootcamp no encontrado');
    }
    await usuario.addBootcamp(bootcamp, { transaction, logging: false });
    await transaction.commit();
    console.log(`*********************************`);
    console.log(`Agregado el usuario id=${idUser} al bootcamp con id=${idBootcamp}.`);
    console.log(`*********************************`);
    console.log("");
  } catch (error) {
    await transaction.rollback();
    console.error(`*********************************`);
    console.error('Error al agregar usuario al bootcamp:', error.message);
    console.error(`*********************************`);
  }
};
const createUser = async (user) => {
  const transaction = await db_bootcamp.transaction({ logging: false });
  try {
    const newUser = await User.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: await bcrypt.hash(user.password, 10)
    },
      { transaction }
    );
    await transaction.commit()
    return newUser;
  } catch (error) {
    console.error(error.stack);
    await transaction.rollback();
  }
};
export const initializeDatabase = async () => {
  try {
    await index();
    const newUser1 = await createUser({
      firstName: "Mateo",
      lastName: "Díaz",
      email: "mateo.diaz@correo.com",
      password: "mateo123456"
    });
    const newUser2 = await createUser({
      firstName: "Santiago",
      lastName: "Mejías",
      email: "santiago.mejias@correo.com",
      password: "santiago123456"
    });
    const newUser3 = await createUser({
      firstName: "Lucas",
      lastName: "Rojas",
      email: "lucas.rojas@correo.com",
      password: "lucas123456"
    });
    const newUser4 = await createUser({
      firstName: "Facundo",
      lastName: "Fernandez",
      email: "facundo.fernandez@correo.com",
      password: "facundo123456"
    });
    console.log("Usuarios creados:");
    console.log(JSON.stringify([newUser1, newUser2, newUser3, newUser4], null, 2));
    const bootcamp1 = await createBootcamp({
      title: "Introduciendo el bootcamp de React",
      cue: 10,
      description: "React es la librería más usada en JavaScript para el desarrollo de interfaces."
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
    console.log("Bootcamps creados:");
    console.log(JSON.stringify([bootcamp1, bootcamp2, bootcamp3], null, 2));
    await addUser({ idBootcamp: 1, idUser: 1 });
    await addUser({ idBootcamp: 1, idUser: 2 });
    await addUser({ idBootcamp: 2, idUser: 1 });
    await addUser({ idBootcamp: 3, idUser: 1 });
    await addUser({ idBootcamp: 3, idUser: 2 });
    await addUser({ idBootcamp: 3, idUser: 3 });
    console.log("Usuarios asignados a bootcamps.");
  } catch (error) {
    console.error("Error inicializando la base de datos:", error);
  }
};
initializeDatabase();