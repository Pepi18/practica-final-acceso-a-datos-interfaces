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
export const obtenerdatos = async () => {};
export const modificardatos = async () => {};
export const borrardatos = async () => {};
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
export const verifyCredentials = async (username, password) => {
    console.log('Iniciando verificación de credenciales...');
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

