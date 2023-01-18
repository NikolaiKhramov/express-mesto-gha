import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { constants } from 'http2';
import routes from './routes/index';
import { createNewUser, login } from './controllers/users';

dotenv.config();

const app = express();
const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.post('/signup', createNewUser);
app.post('/signin', login);

app.use(routes);

app.get('/', (req, res) => {
  res.send('Server is still being developed');
});

app.use((req, res) => {
  res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Запрашиваемая страница не существует' });
});

app.use((err, req, res, next) => {
  const {
    statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
    message,
  } = err;

  res.status(statusCode).send({
    message: statusCode === constants.HTTP_STATUS_INTERNAL_SERVER_ERROR
      ? 'Непредвиденная ошибка на сервере.'
      : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Server listens port ${PORT}`);
});
