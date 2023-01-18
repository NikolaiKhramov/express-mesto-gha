import { constants } from 'http2';
import Card from '../models/card';
import BadRequestError from '../errors/BadRequestError';
import NotFoundError from '../errors/NotFoundError';
import ForbiddenError from '../errors/ForbiddenError';

export const getAllCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes.[]'])
    .then((cards) => {
      res.status(constants.HTTP_STATUS_OK).send(cards);
    })
    .catch(next);
};

export const createNewCard = (req, res, next) => {
  const { name, link } = req.body;
  const cardOwner = req.user._id;

  Card.create({ name, link, owner: cardOwner })
    .then((createdCard) => {
      res.status(constants.HTTP_STATUS_CREATED).send(createdCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные для создания новой карточки.'));
      } else {
        next(err);
      }
    });
};

export const deleteCard = (req, res, next) => {
  const id = req.params.cardId;

  Card.findByIdAndRemove(id)
    .then((cardToDelete) => {
      if (!cardToDelete) {
        throw new NotFoundError('Карточка с указанным id не найдена.');
      } else if (cardToDelete.owner !== req.user._id) {
        throw new ForbiddenError('Доступ запрещен.');
      }
      res.status(constants.HTTP_STATUS_OK).send(cardToDelete);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id карточки'));
      } else {
        next(err);
      }
    });
};

export const setLike = (req, res, next) => {
  const id = req.params.cardId;

  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: id } },
    { new: true },
  )
    .then((likedCard) => {
      if (!likedCard) {
        throw new NotFoundError('Карточка с указнным id не найдена.');
      }
      res.status(constants.HTTP_STATUS_OK).send(likedCard);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный id карточки.'));
      } else {
        next(err);
      }
    });
};

export const removeLike = (req, res, next) => {
  const id = req.params.cardId;

  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: id } },
    { new: true },
  )
    .then((dislikedCard) => {
      if (!dislikedCard) {
        throw new NotFoundError('Карточка с указанным id не найдена.');
      }
      res.status(constants.HTTP_STATUS_OK).send(dislikedCard);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный id карточки'));
      } else {
        next(err);
      }
    });
};
