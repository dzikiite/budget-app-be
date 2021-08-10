import jwt from 'jsonwebtoken';

import User from '../model/user.js';

export const getUserIdFromToken = async (req) => {
  const { TOKEN_KEY } = process.env;

  const token = req.headers['x-access-token'];

  if (!token) {
    return null;
  }

  const userData = jwt.verify(token, TOKEN_KEY, (err, decoded) => decoded);
  const user = await User.findOne({ email: userData.email });

  return user._id;
};
