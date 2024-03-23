import mysql2 from 'mysql2'
import {createPool} from 'mysql2/promise';
import {DB_BASE, DB_HOST,DB_PASSWORD,DB_PORT,DB_USER} from '../config.js'

export const pool = createPool({
    host: DB_HOST,
    base: DB_BASE,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT
});

//conecto la BBDD
export const connectDB = async () => {
    try {
        await pool.getConnection();
        console.log('Conexión a la base de datos establecida');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
};

//Guardar post en la base de datos
export const createpost = async (titulo, texto) => {
    const database = 'userlogin'; 
    const query = 'INSERT INTO posts (titulo, texto) VALUES (?, ?)';
    try {
        await pool.query(`USE ${database}`);
        const [result] = await pool.query(query, [titulo, texto]);
        console.log('Post guardado correctamente:', result);
        return result;
    } catch (error) {
        console.error('Error al guardar el post:', error);
        throw error;
    }
};
//Insertar los datos en la base de datos al realizar el registro
export const createsubmit = async (username, email, password) => {
    const database = 'userlogin'; 
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    try {
        await pool.query(`USE ${database}`);
        const [result] = await pool.query(query, [username, email, password]);
        console.log('Usuario Registrado correctamente:', result);
        return result;
    } catch (error) {
        console.error('Error en el registro:', error);
        throw error;
    }

}
//Verificar en la base de datos que las credenciales de inicio de sesión son las correctas
export const verifyCredentials = async (username, password) => {
    console.log('Valor de username:', username);
    console.log('Valor de password:', password);
    const database = 'userlogin';
    const query = 'SELECT username, password FROM users WHERE username = ? LIMIT 1';
    console.log("Valor de username:", username);
    try {
        await pool.query(`USE ${database}`);
        console.log('Conexión exitosa a la base de datos.');

        const [userRows, _] = await pool.query(query, [username]);
        console.log('Consulta ejecutada correctamente:', userRows);

        if (userRows.length === 0) {
            console.log('No se encontró ningún usuario con el nombre de usuario proporcionado.');
            return false;
        }

        const user = userRows[0];
        if (user.password === password) {
            console.log('Contraseña coincidente.');
            return true;
        } else {
            console.log('Contraseña incorrecta.');
            return false;
        }
    } catch (error) {
        console.error('Error al verificar credenciales:', error);
        throw error;
    }
};
//Buscar post en la base de datos pos título
export const searchPostsInDatabase = async (titulo) => {
    const database = 'userlogin';
    const query = 'SELECT * FROM posts WHERE titulo LIKE ?'; // Consulta para buscar publicaciones por título
    
    try {
        // Ejecutar la consulta SQL con el título proporcionado
        await pool.query(`USE ${database}`);
        const [datos, _] = await pool.query(query, [`%${titulo}%`]);
        console.log('Posts encontrados:', datos);
        return datos; // Devolver los resultados de la búsqueda
    } catch (error) {
        console.error('Error al buscar publicaciones por título en la base de datos:', error);
        throw error;
    }
};
//Borrar registro de la base de datos
export const deleteRecord= async (id) => {
    const database = 'userlogin';
    const query = 'DELETE FROM posts WHERE id = ?'; // Consulta para eliminar un registro por su ID
    
    try {
        // Ejecutar la consulta SQL con el ID proporcionado
        await pool.query(`USE ${database}`);
        const [result, _] = await pool.query(query, [id]);
        console.log('Registro eliminado correctamente');
        return result; // Devolver el resultado de la operación de eliminación
    } catch (error) {
        console.error('Error al eliminar el registro:', error);
        throw error;
    }
};
