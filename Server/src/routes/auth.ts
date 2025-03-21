import { Router} from 'express';
import {login , register , getAllUsers} from '../handlers/authHandlres'
const router = Router();

router.post('/login',login );
router.post('/register', register);
router.get('/users',getAllUsers)



export default router;  