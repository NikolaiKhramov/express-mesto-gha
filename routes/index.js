import express from 'express';
import usersRoutes from './users';
import cardsRoutes from './cards';

const routes = express.Router();

routes.use('/users', usersRoutes);
routes.use('/cards', cardsRoutes);

export default routes;
