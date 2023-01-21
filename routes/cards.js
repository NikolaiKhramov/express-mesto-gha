import express from 'express';
import {
  getAllCards, createNewCard, deleteCard, setLike, removeLike,
} from '../controllers/cards';
import { newCardDataValidation, cardIdValidator } from '../utils/validation';

const cardsRoutes = express.Router();

cardsRoutes.get('/', getAllCards);
cardsRoutes.post('/', newCardDataValidation, createNewCard);
cardsRoutes.delete('/:cardId', cardIdValidator, deleteCard);
cardsRoutes.put('/:cardId/likes', cardIdValidator, setLike);
cardsRoutes.delete('/:cardId/likes', cardIdValidator, removeLike);

export default cardsRoutes;
