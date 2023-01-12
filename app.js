import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { constants } from 'http2';
import routes from './routes/index';

dotenv.config();

const app = express();
const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '63b6a89181454eef4d7d9c3c',
  };

  next();
});

app.use(routes);

app.get('/', (req, res) => {
  res.send('Server is still being developed');
});

app.use((req, res) => {
  res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Запрашиваемая страница не существует' });
});

app.listen(PORT, () => {
  console.log(`Server listens port ${PORT}`);
});
