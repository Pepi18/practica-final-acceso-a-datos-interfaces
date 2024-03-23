import {Router} from 'express';

//importamos los callbacks
import {home, login, registro, crud, post, postcontroller, submitcontroller, loginController, searchPosts, eliminarRegistro} from '../controllers/controllers.js'

const router = Router(); 

router.get ('/', home);
router.get ('/login', login );
router.get ('/registro', registro);
router.get('/crud', crud);
router.get('/post', post);
router.get('/search', searchPosts);



router.post('/post', postcontroller);
router.post('/submit', submitcontroller);
router.post('/login', loginController);

router.delete('/eliminar/:id', eliminarRegistro);


export default router;