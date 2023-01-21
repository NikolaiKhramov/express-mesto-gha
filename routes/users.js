import express from 'express';
import {
  getAllUsers, getUserById, getCurrentUser, updateUserInfo, updateUserAvatar,
} from '../controllers/users';
import { profileUpdateValidation, avatarUpdateValidation, userIdValidation } from '../utils/validation';

const usersRoutes = express.Router();

usersRoutes.get('/', getAllUsers);
usersRoutes.get('/me', getCurrentUser);
usersRoutes.get('/:id', userIdValidation, getUserById);
usersRoutes.patch('/me', profileUpdateValidation, updateUserInfo);
usersRoutes.patch('/me/avatar', avatarUpdateValidation, updateUserAvatar);

export default usersRoutes;
