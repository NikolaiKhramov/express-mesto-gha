import { constants } from 'http2';
import User from '../models/user';

export const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(constants.HTTP_STATUS_OK).send(users);
    })
    .catch(() => {
      res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Непредвиденная ошибка на сервере.' });
    });
};

export const getUserById = (req, res) => {
  const userId = req.params.id;

  User.findById(userId)
    .then((foundUser) => {
      if (!foundUser) {
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь с указанным id не найден.' });
        return;
      }
      res.status(constants.HTTP_STATUS_OK).send({ foundUser });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Некорректный id пользователя.' });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Непредвиденная ошибка на сервере.' });
      }
    });
};

export const createNewUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((createdUser) => {
      res.status(constants.HTTP_STATUS_CREATED).send(createdUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Некорректные данные для создания нового пользователя.' });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Непредвиденная ошибка на сервере.' });
      }
    });
};

export const updateUserInfo = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate({ _id: userId }, { name, about }, { new: true, runValidators: true })
    .then((userUpdated) => {
      if (!userUpdated) {
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь с указанным id не найден.' });
      }
      res.status(constants.HTTP_STATUS_OK).send({ userUpdated });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Некорректные данные для обновления информации пользователя.' });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Непредвиденная ошибка на сервере.' });
      }
    });
};

export const updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate({ _id: userId }, { avatar }, { new: true, runValidators: true })
    .then((userUpdated) => {
      if (!userUpdated) {
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь с указанным id не найден.' });
        return;
      }
      res.status(constants.HTTP_STATUS_OK).send({ userUpdated });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Некорректные данные для обновления аватара пользователя.' });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Непредвиденная ошибка на сервере.' });
      }
    });
};
