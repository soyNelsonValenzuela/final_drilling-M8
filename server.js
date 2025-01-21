import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import userRoutes from './src/routes/user.routes.js';
import bootcampRoutes from './src/routes/bootCamp.routes.js';
config();
const app = express();
const { SERVERPORT } = process.env;
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(userRoutes);
app.use(bootcampRoutes);
(async function startServer() {
  try {
    app.listen(SERVERPORT, () => {
      console.log(`Servidor escuchando en http://localhost:${SERVERPORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor o inicializar la base de datos:", error);
  }
})();