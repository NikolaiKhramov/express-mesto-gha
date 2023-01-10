import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/index';

dotenv.config();

const app = express();
const { PORT = 3000, MONGODB_URL } = process.env;
mongoose.connect(MONGODB_URL);

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

app.listen(PORT, () => {
  console.log(`Server listens port ${PORT}`);
});
