import express from 'express';

import { getUserIdFromToken } from '../helpers/getUserIdFromToken.js';
import Budget from '../model/budget.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { budgetYear, budgetMonth, currency } = req.body;

    if (!(budgetYear && budgetMonth && currency)) {
      return res.status(400).send('All input is required');
    }

    const userId = await getUserIdFromToken(req);

    if (!userId) {
      return res.status(401).send('User is unauthorized');
    }

    const budgetExists = await Budget.findOne({ author: userId });

    if (budgetExists) {
      return res.status(400).send('Budget alredy exists');
    }

    const budget = await Budget.create({
      budgetYear,
      budgetMonth,
      currency,
      author: userId,
    });

    res.status(200).json(budget);
  } catch (err) {
    console.log(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);

    if (!userId) {
      res.status(401).send('User is unauthorized');
    }

    const budget = await Budget.findOne({ author: userId });

    res.status(200).json(budget);
  } catch (err) {
    console.log(err);
  }
});

export default router;
