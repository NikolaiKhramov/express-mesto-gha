import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError';

const checkAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Ошибка авторизации.'));
    return;
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'top-secret-phrase');
  } catch (err) {
    next(new UnauthorizedError('Ошибка авторизации.'));
    return;
  }

  req.user = payload;

  next();
};

export default checkAuth;
