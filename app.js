import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/index';
import { NOTFOUND_CODE } from './constants/statusCodes';

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
  res.status(NOTFOUND_CODE).send({ message: 'Запрашиваемая страница не существует' });
});

app.listen(PORT, () => {
  console.log(`Server listens port ${PORT}`);
});
