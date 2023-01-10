import express from 'express';
import {
  getAllCards, createNewCard, deleteCard, setLike, removeLike,
} from '../controllers/cards';

const cardsRouter = express.Router();

cardsRouter.get('/', getAllCards);
cardsRouter.post('/', express.json(), createNewCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/:cardId/likes', setLike);
cardsRouter.delete('/:cardId/likes', removeLike);

export default cardsRouter;
