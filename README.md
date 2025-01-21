# Proyecto Final Drilling - M8

## Descripción
Este proyecto es una aplicación backend desarrollada para gestionar usuarios y bootcamps. Implementa autenticación y autorización utilizando JSON Web Tokens (JWT). La base de datos está configurada con Sequelize y utiliza PostgreSQL como sistema gestor de base de datos.

---

## Requisitos
- Tener instalado Node.js (versión 14 o superior).
- Tener instalado npm para la gestión de dependencias.
- Tener una base de datos relacional creada con PostgreSQL. El nombre de la base de datos debe ser `db_jwtbootcamp`.

---

## Instalación

1. Clonar este repositorio:

   ```bash
   git clone https://github.com/soyNelsonValenzuela/final_drilling-M8.git
   cd final_drilling-M8
   ```

2. Instalar las dependencias:

   ```bash
   npm i
   ```

3. Crear un archivo llamado `.env` en la raíz del proyecto y configurar las variables de entorno necesarias, segun el formato que se encuentra en el aarchivo .envexample

- ejemplo:

```
USER=postgres
HOST=localhost
DATABASE=db_jwtbootcamp
PASSWORD=rootroot
PORT=5432
SERVERPORT=3001
SECRET=SECRETPHRASE
```
---

## Uso

1. Inicializar la base de datos:
   
   ```bash
   npm run initDb
   ```

   Este comando sincroniza la base de datos mediante Sequelize y luego crea usuarios, bootcamps y relaciones entre ellos para tener datos iniciales en las tablas.

2. Iniciar el servidor:

   ```bash
   npm start
   ```


---

## Funcionalidades

- Usar Postman o cualquier cliente HTTP para realizar solicitudes a las rutas definidas.
- El numero del puerto dependerá del que configures en el archivo `.env`. En este ejemplo utilizaremos el puerto 3001 

### Registrar un usuario (acceso público)
- **Ruta:** POST `http://localhost:3001/api/signup`
- **Validaciones:** La contraseña debe tener más de 8 caracteres. El correo electrónico debe ser único en la base de datos. Los campos no pueden estar vacíos.
- **Body:**

  ```json
  {
    "firstName": "Nelson",
    "lastName": "Valenzuela",
    "email": "nelson@correo.com",
    "password": "12345678"
  }
  ```
- **Respuesta:**

  ```json
  {
    "message": "Usuario registrado exitosamente",
    "id": 5,
    "firstName": "Nelson",
    "lastName": "Valenzuela",
    "email": "nelson@correo.com",
    "password": "<hash>",
    "createdAt": "<timestamp>",
    "updatedAt": "<timestamp>"
  }
  ```

### Inicio de sesión (acceso público)
- **Ruta:** POST `http://localhost:3001/api/signin`
- **Validaciones:** El usuario debe estar registrado. Los campos no pueden estar vacíos.
- **Body:**

  ```json
  {
    "email": "mateo.diaz@correo.com",
    "password": "mateo123456"
  }
  ```
- **Respuesta:**

  ```json
  {
    "id": 1,
    "firstName": "Mateo",
    "lastName": "Díaz",
    "email": "mateo.diaz@correo.com",
    "accesToken": "<jwt_token>"
  }
  ```

### Crear un bootcamp (requiere inicio de sesión)
- **Ruta:** POST `http://localhost:3001/api/bootcamp`
- **Validaciones:** Los campos no pueden estar vacíos.
- **Body:**

  ```json
  {
    "title": "Bootcamp de prueba",
    "cue": 12,
    "description": "Esta es una descripción de prueba"
  }
  ```
- **Respuesta:**

  ```json
  {
    "message": "Bootcamp creado exitosamente",
    "id": 4,
    "title": "Bootcamp de prueba",
    "cue": 12,
    "description": "Esta es una descripción de prueba",
    "createdAt": "<timestamp>",
    "updatedAt": "<timestamp>"
  }
  ```

### Agregar un usuario a un bootcamp (requiere inicio de sesión)
- **Ruta:** POST `http://localhost:3001/api/bootcamp/adduser`
- **Validaciones:** Los campos no pueden estar vacíos.
- **Body:**

  ```json
  {
    "idUser": 4,
    "idBootcamp": 3
  }
  ```
- **Respuesta:**

  ```json
  {
    "id": 3,
    "title": "Bootcamp Big Data",
    "cue": 18,
    "description": "Domina Data Science y herramientas avanzadas.",
    "createdAt": "<timestamp>",
    "updatedAt": "<timestamp>"
  }
  ```

### Listar todos los usuarios (requiere inicio de sesión)
- **Ruta:** GET `http://localhost:3001/api/user`
- **Respuesta:** Array de usuarios con sus bootcamps asociados.

### Listar usuario por ID (requiere inicio de sesión)
- **Ruta:** GET `http://localhost:3001/api/user/:id`
- **Respuesta:** Usuario con su información y los bootcamps asociados.

### Actualizar usuario por ID (requiere inicio de sesión)
- **Ruta:** PUT `http://localhost:3001/api/user/:id`
- **Validaciones:** Validar que el usuario exista. Los campos no pueden estar vacíos.
- **Body:**

  ```json
  {
    "firstName": "Pedro",
    "lastName": "Sanchez",
    "email": "pedro.sanchez@correo.com",
    "password": "pedro123456"
  }
  ```

### Eliminar usuario por ID (requiere inicio de sesión)
- **Ruta:** DELETE `http://localhost:3001/api/user/:id`
- **Validaciones:** Validar que el usuario exista.
- **Respuesta:**

  ```json
  {
    "message": "Usuario eliminado exitosamente."
  }
  ```

### Listar bootcamp por ID con usuarios inscritos (requiere inicio de sesión)
- **Ruta:** GET `http://localhost:3001/api/bootcamp/:id`
- **Respuesta:** Bootcamp con información de los usuarios inscritos.

### Listar todos los bootcamps (acceso público)
- **Ruta:** GET `http://localhost:3001/api/bootcamp`
- **Respuesta:** Array de bootcamps con usuarios inscritos.

### Cerrar sesión (requiere inicio de sesión)
- **Ruta:** POST `http://localhost:3001/api/signout`
- **Respuesta:**

  ```json
  {
    "message": "Sesión cerrada exitosamente."
  }