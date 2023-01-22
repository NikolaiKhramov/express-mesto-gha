import express from 'express';
import { createNewUser, login } from '../controllers/users';
import { signUpDataValidation, signInDataValidation } from '../utils/validation';

const rootRoutes = express.Router();

rootRoutes.get('/', (req, res) => {
  res.send('Server is still being developed');
});
rootRoutes.post('/signup', signUpDataValidation, createNewUser);
rootRoutes.post('/signin', signInDataValidation, login);

export default rootRoutes;
