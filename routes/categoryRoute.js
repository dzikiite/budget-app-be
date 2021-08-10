import express from 'express';

import Budget from '../model/budget.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { budgetId, category } = req.body;

    if (!budgetId || !category) {
      return res.status(400).send('All input is required');
    }

    const budget = await Budget.findOneAndUpdate(
      { _id: budgetId },
      {
        $push: {
          categories: category,
        },
      },
      (error) => {
        if (error) {
          return res.status(400).send(error);
        }
      },
    );

    res.status(200).send(budget);
  } catch (err) {
    console.log(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const { budgetId } = req.body;

    if (!budgetId) {
      return res.status(400).send('Budget ID is required');
    }

    const budget = await Budget.findById(budgetId);

    if (!budget) {
      return res.status(400).send('Budget dont exists');
    }

    console.log('budget: ', budget);
    res.status(200).send(budget.categories);
  } catch (err) {
    console.log(err);
  }
});

export default router;
