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

    const result = [];
    transactions.forEach((item) => {
      result.push(item.dataValues);
    })

    res.json({
      data: result,
      message: 'success',
    });
  } catch (err) {
    res.json({
      data: [],
      message: err.toString(),
    })
  }
};

exports.add = (req, res, next) => {
  const { token, date, breakdown, price } = req.body;
  const payload = jwt.verify(token, process.env.SECRETE_KEY);

  try {
    db.transactions.create({
      user_id: payload.user_id,
      date: date,
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