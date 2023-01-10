import express from 'express';
import {
  getAllUsers, getUserById, createNewUser, updateUserInfo, updateUserAvatar,
} from '../controllers/users';

const usersRoutes = express.Router();

usersRoutes.get('/', getAllUsers);
usersRoutes.get('/:id', getUserById);
usersRoutes.post('/', express.json(), createNewUser);
usersRoutes.patch('/me', express.json(), updateUserInfo);
usersRoutes.patch('/me/avatar', express.json(), updateUserAvatar);

export default usersRoutes;
