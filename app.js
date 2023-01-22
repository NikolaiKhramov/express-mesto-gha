import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import routes from './routes/index';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();
const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.use(routes);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listens port ${PORT}`);
});
