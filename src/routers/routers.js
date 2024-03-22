import {Router} from 'express';

//importamos los callbacks
import {home, login, registro, crud, post, postcontroller, submitcontroller, loginController, mostrarObtener, mostrarModificar, mostrarBorrar} from '../controllers/controllers.js'
import { obtenerdatos, modificardatos, borrardatos } from '../db/db.js';


const router = Router(); 

router.get ('/', home);
router.get ('/login', login );
router.get ('/registro', registro,  );
router.get('/crud', crud);
router.get('/post', post);


router.get('/datos', mostrarObtener);
router.get('/datos',obtenerdatos);
router.post('/post', postcontroller);
router.get('/datos', mostrarModificar);
router.get('/datos', modificardatos);
router.get('/datos', mostrarBorrar);
router.get('/datos', borrardatos);
router.post('/submit', submitcontroller);
router.post('/login', loginController);


export default router;