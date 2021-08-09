import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../model/user.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log('reqBody: ', req.body);
    const { email, login, password } = req.body;

    if (!(email && password && login)) {
      return res.status(400).send('All input is required');
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: email.toLowerCase(),
      login,
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: '2h',
      },
    );

    console.log('token: ', token);

    user.token = token;

    console.log('user: ', user);

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

export default router;
