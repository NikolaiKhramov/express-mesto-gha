import express from 'express';
import rootRoutes from './rootRoutes';
import usersRoutes from './users';
import cardsRoutes from './cards';
import checkAuth from '../middlewares/auth';
import NotFoundError from '../errors/NotFoundError';

const routes = express.Router();

routes.use('/', rootRoutes);
routes.use('/users', checkAuth, usersRoutes);
routes.use('/cards', checkAuth, cardsRoutes);
routes.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не существует.'));
});

export default routes;
