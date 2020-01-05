const db = require('../models');
const jwt = require('jsonwebtoken');

exports.all = async (req, res, next) => {
  const { token } = req.body;
  const payload = jwt.verify(token, process.env.SECRETE_KEY);

  try {
    const transactions = await db.transactions.findAll({
      where: {
        user_id: payload.user_id,
      },
    });

    res.json({
      data: transactions,
      message: 'success',
    });
  } catch (err) {
    res.json({
      data: [],
      message: err.toString(),
    });
  }
};

exports.add = (req, res, next) => {
  const { token, date, category, breakdown, price } = req.body;
  const payload = jwt.verify(token, process.env.SECRETE_KEY);

  try {
    db.transactions.create({
      user_id: payload.user_id,
      date: date,
      category: category,
      breakdown: breakdown,
      price: price,
    });
    res.json({
      success: true,
    });
  } catch {
    res.json({
      success: false,
    });
  }
};

exports.delete = (req, res, next) => {
  const { id } = req.body;

  try {
    db.transactions.destroy({
      where: {
        id: parseInt(id),
      },
    });
    res.json({
      success: true,
    });
  }
  catch (err) {
    res.json({
      success: false,
    });
  }
};