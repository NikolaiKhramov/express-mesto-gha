import express from 'express';
import usersRoutes from './users';
import cardsRouter from './cards';

const routes = express.Router();

routes.use('/users', usersRoutes);
routes.use('/cards', cardsRouter);

export default routes;
