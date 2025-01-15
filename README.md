# Final Drilling M7

Este proyecto implementa una solución para la gestión de usuarios y cursos Bootcamp utilizando Node.js, Sequelize, y una base de datos relacional. El sistema permite registrar usuarios, administrar cursos, y establecer relaciones entre ellos.

## Requisitos

- Node.js instalado en tu máquina.
- Una base de datos configurada y accesible.
- Los modelos y controladores predefinidos en este repositorio.

## Instalación

1. Clona este repositorio:

   ```
   git clone https://github.com/soyNelsonValenzuela/Final_Drilling-M7.git
   cd Final_Drilling-M7
   ```

2.	Instala las dependencias necesarias:

    ```
    npm i
    ```

3.	Configura la base de datos en el archivo config/db.config.js con los detalles de tu entorno.

## Uso

Inicia el servidor con el siguiente comando:

    ```
    npm start
    ```

## Funcionalidades

El servidor está dividido en dos grupos principales de funcionalidades:

**1. Configuración de la Base de Datos**

1.1 **Conexión a la base de datos**
Ejecuta la conexión con Sequelize y los modelos definidos:

    ```
    await index();
    ```

1.2 **Crear usuarios en la tabla** users
Ejemplo:

    ```
    const newUser1 = await createUser("Mateo", "Díaz", "mateo.diaz@correo.com");
    ```

1.3 **Crear cursos en la tabla** bootcamps
Ejemplo:

    ```
    const bootcamp1 = await createBootcamp("Introduciendo el bootcamp de React", 10, "React es la librería más usada en JavaScript para el desarrollo de interfaces.");
    ```

1.4 **Asignar usuarios a los cursos**
Ejemplo:

    ```
    await addUser(1, 1);
    ```

**2. Consultas**

2.1 **Consultar un curso por ID e incluir los usuarios asociados**
Ejemplo:

    ```
    await findBootcampById(1);
    ```

2.2 **Listar todos los cursos con sus usuarios asociados**
Ejemplo:

    ```
    await findAllBootcamps();
    ```

2.3 **Consultar un usuario por ID e incluir los cursos asociados**
Ejemplo:

    ```
    await findUserById(1);
    ```

2.4 **Listar todos los usuarios con sus cursos asociados**
Ejemplo:

    ```javscript
    await findAllUsers();
    ```

2.5 **Actualizar un usuario por ID**
Ejemplo:

    ```javascript
    await updateUserById(1, "Pedro", "Sánchez", "pedro.sanchez@correo.com");
    ```

2.6 **Eliminar un usuario por ID**
Ejemplo:

    ```
    await deleteUserById(1);
    ```
## Autor

[Nelson Valenzuela](https://www.linkedin.com/in/nelsonvalenzuelagomez/)
