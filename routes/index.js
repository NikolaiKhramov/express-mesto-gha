import express from 'express';
import usersRoutes from './users';
import cardsRoutes from './cards';
import { checkAuth } from '../middlewares/auth';

const routes = express.Router();

routes.use('/users', checkAuth, usersRoutes);
routes.use('/cards', checkAuth, cardsRoutes);

export default routes;
