import User from '../models/user';
import {
  OK_CODE, ITEMCREATED_CODE, ERROR_CODE, NOTFOUND_CODE, SERVERERROR_CODE,
} from '../constants/statusCodes';

export const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(OK_CODE).send(users);
    })
    .catch(() => {
      res.status(SERVERERROR_CODE).send({ message: 'Непредвиденная ошибка на сервере.' });
    });
};

export const getUserById = (req, res) => {
  const userId = req.params.id;

  User.findById(userId)
    .then((foundUser) => {
      if (!foundUser) {
        res.status(NOTFOUND_CODE).send({ message: 'Пользователь с указанным id не найден.' });
        return;
      }
      res.status(OK_CODE).send({ foundUser });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Некорректный id пользователя.' });
      } else {
        res.status(SERVERERROR_CODE).send({ message: 'Непредвиденная ошибка на сервере.' });
      }
    });
};

export const createNewUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((createdUser) => {
      res.status(ITEMCREATED_CODE).send(createdUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Некорректные данные для создания нового пользователя.' });
      } else {
        res.status(SERVERERROR_CODE).send({ message: 'Непредвиденная ошибка на сервере.' });
      }
    });
};

export const updateUserInfo = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate({ _id: userId }, { name, about }, { new: true, runValidators: true })
    .then((userUpdated) => {
      if (!userUpdated) {
        res.status(NOTFOUND_CODE).send({ message: 'Пользователь с указанным id не найден.' });
      }
      res.status(OK_CODE).send({ userUpdated });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Некорректные данные для обновления информации пользователя.' });
      } else {
        res.status(SERVERERROR_CODE).send({ message: 'Непредвиденная ошибка на сервере.' });
      }
    });
};

export const updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate({ _id: userId }, { avatar }, { new: true, runValidators: true })
    .then((userUpdated) => {
      if (!userUpdated) {
        res.status(NOTFOUND_CODE).send({ message: 'Пользователь с указанным id не найден.' });
        return;
      }
      res.status(OK_CODE).send({ userUpdated });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Некорректные данные для обновления аватара пользователя.' });
      } else {
        res.status(SERVERERROR_CODE).send({ message: 'Непредвиденная ошибка на сервере.' });
      }
    });
};
