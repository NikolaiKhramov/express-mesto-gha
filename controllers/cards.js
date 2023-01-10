import Card from '../models/card';
import {
  OK_CODE, ITEMCREATED_CODE, ERROR_CODE, NOTFOUND_CODE, SERVERERROR_CODE,
} from '../constants/statusCodes';

export const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(OK_CODE).send(cards);
    })
    .catch(() => {
      res.status(SERVERERROR_CODE).send({ message: 'Непредвиденная ошибка на сервере.' });
    });
};

export const createNewCard = (req, res) => {
  const { name, link } = req.body;
  const cardOwner = req.user._id;

  Card.create({ name, link, owner: cardOwner })
    .then((createdCard) => {
      res.status(ITEMCREATED_CODE).send(createdCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Некорректные данные для создания новой карточки.' });
      } else {
        res.status(SERVERERROR_CODE).send({ message: 'Непредвиденная ошибка на сервере.' });
      }
    });
};

export const deleteCard = (req, res) => {
  const id = req.params.cardId;

  Card.findByIdAndRemove(id)
    .then((cardToDelete) => {
      if (!cardToDelete) {
        res.status(NOTFOUND_CODE).send({ message: 'Карточка с указанным id не найдена.' });
        return;
      }
      res.status(OK_CODE).send(cardToDelete);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Невалидный id карточки.' });
      } else {
        res.status(SERVERERROR_CODE).send({ message: 'Непредвиденная ошибка на сервере.' });
      }
    });
};

export const setLike = (req, res) => {
  const id = req.params.cardId;

  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: id } },
    { new: true },
  )
    .then((likedCard) => {
      if (!likedCard) {
        res.status(NOTFOUND_CODE).send({ message: 'Карточка с указанным id не найдена.' });
        return;
      }
      res.status(OK_CODE).send(likedCard);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Некорректный id карточки.' });
      } else {
        res.status(SERVERERROR_CODE).send({ message: 'Непредвиденная ошибка на сервере.' });
      }
    });
};

export const removeLike = (req, res) => {
  const id = req.params.cardId;

  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: id } },
    { new: true },
  )
    .then((dislikedCard) => {
      if (!dislikedCard) {
        res.status(NOTFOUND_CODE).send({ message: 'Карточка с указанным id не найдена.' });
        return;
      }
      res.status(OK_CODE).send(dislikedCard);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Некорректный id карточки.' });
      } else {
        res.status(SERVERERROR_CODE).send({ message: 'Непредвиденная ошибка на сервере.' });
      }
    });
};
