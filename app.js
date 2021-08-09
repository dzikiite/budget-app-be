import dotenv from 'dotenv';
import express from 'express';

import { routes } from './constants.js';
import connectToDb from './config/database.js';
import loginRoute from './routes/loginRoute.js';
import registerRoute from './routes/registerRoute.js';
import userRoute from './routes/userRoute.js';
import auth from './middleware/auth.js';

dotenv.config();
connectToDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes.register, registerRoute);
app.use(routes.login, loginRoute);
app.use(routes.user, auth, userRoute);

const { API_PORT } = process.env;
const port = API_PORT || 9009;

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
