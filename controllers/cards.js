import { constants } from 'http2';
import Card from '../models/card';

export const getAllCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes.[]'])
    .then((cards) => {
      res.status(constants.HTTP_STATUS_OK).send(cards);
    })
    .catch(() => {
      res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Непредвиденная ошибка на сервере.' });
    });
};

export const createNewCard = (req, res) => {
  const { name, link } = req.body;
  const cardOwner = req.user._id;

  Card.create({ name, link, owner: cardOwner })
    .then((createdCard) => {
      res.status(constants.HTTP_STATUS_CREATED).send(createdCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Некорректные данные для создания новой карточки.' });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Непредвиденная ошибка на сервере.' });
      }
    });
};

export const deleteCard = (req, res) => {
  const id = req.params.cardId;

  Card.findByIdAndRemove(id)
    .then((cardToDelete) => {
      if (!cardToDelete) {
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка с указанным id не найдена.' });
        return;
      }
      res.status(constants.HTTP_STATUS_OK).send(cardToDelete);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Невалидный id карточки.' });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Непредвиденная ошибка на сервере.' });
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
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка с указанным id не найдена.' });
        return;
      }
      res.status(constants.HTTP_STATUS_OK).send(likedCard);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Некорректный id карточки.' });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Непредвиденная ошибка на сервере.' });
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
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка с указанным id не найдена.' });
        return;
      }
      res.status(constants.HTTP_STATUS_OK).send(dislikedCard);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Некорректный id карточки.' });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Непредвиденная ошибка на сервере.' });
      }
    });
};
