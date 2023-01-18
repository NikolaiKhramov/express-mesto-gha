import express from 'express';
import {
  getAllCards, createNewCard, deleteCard, setLike, removeLike,
} from '../controllers/cards';

const cardsRoutes = express.Router();

cardsRoutes.get('/', getAllCards);
cardsRoutes.post('/', createNewCard);
cardsRoutes.delete('/:cardId', deleteCard);
cardsRoutes.put('/:cardId/likes', setLike);
cardsRoutes.delete('/:cardId/likes', removeLike);

export default cardsRoutes;
