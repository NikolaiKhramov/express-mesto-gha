import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError';

// eslint-disable-next-line import/prefer-default-export
export const checkAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Ошибка авторизации.');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'top-secret-phrase');
  } catch (err) {
    next(new UnauthorizedError('Ошибка авторизации.'));
  }

  req.user = payload;

  next();
};
