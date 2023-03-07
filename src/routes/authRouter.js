import * as userController from '../controllers/userController.js';
import * as signUpController from '../controllers/signUpController.js';
import { validateUserAndPassword } from '../middlewares/validationMiddleware.js'
import { Router } from 'express';

const router = Router();

router.post('/login', validateUserAndPassword, userController.login); 

router.post('/sign-up', signUpController.signUp); 

router.post('/sign-up/address', signUpController.signUpAddress); 

export default router;