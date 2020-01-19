const jwt = require('jsonwebtoken');
const db = require('../models');

exports.all = async (req, res) => {
  const { token } = req.body;

  try {
    const payload = jwt.verify(token, process.env.SECRETE_KEY);
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

exports.add = async (req, res) => {
  const {
    token, date, category, breakdown, price,
  } = req.body;

  try {
    const payload = jwt.verify(token, process.env.SECRETE_KEY);
    await db.transactions.create({
      user_id: payload.user_id,
      date,
      category,
      breakdown,
      price,
    });
    res.json({
      success: true,
    });
  } catch (err) {
    res.json({
      success: false,
    });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.body;

  try {
    await db.transactions.destroy({
      where: {
        id: parseInt(id, 10),
      },
    });
    res.json({
      success: true,
    });
  } catch (err) {
    res.json({
      success: false,
    });
  }
};

exports.update = async (req, res) => {
  const {
    id, date, category, breakdown, price,
  } = req.body;

  try {
    await db.transactions.update({
      date,
      category,
      breakdown,
      price,
    }, {
      where: {
        id,
      },
    });

    res.json({
      success: true,
    });
  } catch (err) {
    res.json({
      success: false,
    });
  }
};

exports.category = async (req, res) => {
  const { token } = req.body;

  try {
    const payload = jwt.verify(token, process.env.SECRETE_KEY);
    const categories = await db.transactions.findAll({
      attributes: ['category'],
      where: {
        user_id: payload.user_id,
      },
    });

    res.json({
      data: categories,
      success: true,
    });
  } catch (err) {
    res.json({
      data: [],
      success: false,
    });
  }
};
