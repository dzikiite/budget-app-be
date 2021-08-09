import express from 'express';
import jwt from 'jsonwebtoken';

import User from '../model/user.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      res.status(400).send('Invalid token');
    }

    const userData = jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => decoded);

    const user = await User.findOne({ email: userData.email });

    if (!user) {
      res.status(400).send('User not exists');
    } else {
      res.status(200).json(user || {});
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
