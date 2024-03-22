import {pool, createpost, createsubmit, verifyCredentials } from '../db/db.js';

export const home=(req, res) => res.render ('home', {title:"home"});
export const login = (req, res) => {
    // Verificar si req.session está definido y si tiene un mensaje de error
    const errorMessage = (req.session && req.session.errorMessage) ? req.session.errorMessage : undefined;
    
    // Limpiar el mensaje de error de la sesión una vez que se haya mostrado
    if (req.session && req.session.errorMessage) {
        delete req.session.errorMessage;
    }

    res.render('login',{ title: "login", errorMessage });
};

export const  registro=(req, res) => res.render ('registro', {title:"registro"});
export const  crud=(req, res) => res.render ('crud', {title:"crud"});
export const  post=(req, res) => res.render ('post', {title:"post"});

export const postcontroller = async (req, res) => {
    console.log(req.body); 
    const { titulo, texto } = req.body;

    try {
        await createpost(titulo, texto);
        res.redirect('/post');
    } catch (error) {
        console.error('Error al guardar el post:', error);
        res.status(500).send('Error al guardar el post');
    }
};
export const mostrarObtener = (req, res) => {res.render('obtener')};
export const mostrarModificar = (req, res) => {res.render('modificar')};
export const mostrarBorrar = (req, res) => {res.render('borrar')};
export const submitcontroller = async (req, res) => {
    console.log(req.body); 
    const { username, email, password } = req.body;

    try {
        await createsubmit(username, email, password);
        res.render('registro.ejs', { title:'registro.ejs', successMessage: 'Registro exitoso' });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).send('Error en el resgitro');
    }
};

// Controlador para el inicio de sesión
export const loginController = async (req, res) => {
    const { username, password } = req.body;

    // Verificar las credenciales consultando la base de datos
    try {
        const isAuthenticated = await verifyCredentials(username, password);

        if (isAuthenticated) {
            // Las credenciales son correctas, redirigir a la zona personal
            return res.redirect('/personal');
        } else {
            // Usuario o contraseña incorrectos
            return res.status(401).render('login', { errorMessage: 'Usuario o contraseña incorrectos', title: 'Login' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).send('Error al iniciar sesión');
    }
};

