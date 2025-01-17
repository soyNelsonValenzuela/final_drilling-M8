import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import morgan from 'morgan';
// Importar los módulos propios
import userRoutes from './app/routes/user.routes.js';

config();

const app = express();
const { SERVERPORT } = process.env;

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Llamado a las rutas
app.use(userRoutes);

// Levantar el servidor e inicializar datos
(async function startServer() {
  try {
    app.listen(SERVERPORT, () => {
      console.log(`Servidor escuchando en http://localhost:${SERVERPORT}`);
    });

    //console.log("Inicializando la base de datos...");
    //await initializeDatabase(); // Llamar a la inicialización de la base de datos
    //console.log("Base de datos inicializada correctamente.");
  } catch (error) {
    //console.error("Error al iniciar el servidor o inicializar la base de datos:", error);
  }
})();