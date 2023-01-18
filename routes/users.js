import express from 'express';
import {
  getAllUsers, getUserById, getCurrentUser, updateUserInfo, updateUserAvatar,
} from '../controllers/users';

const usersRoutes = express.Router();

usersRoutes.get('/', getAllUsers);
usersRoutes.get('/me', getCurrentUser);
usersRoutes.get('/:id', getUserById);
usersRoutes.patch('/me', updateUserInfo);
usersRoutes.patch('/me/avatar', updateUserAvatar);

export default usersRoutes;
