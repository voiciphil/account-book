const jwt = require('jsonwebtoken');
const db = require('../models');

exports.all = async (req, res) => {
  const { token } = req.body;

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
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
    const errMsg = err.toString();
    const response = {
      data: [],
      message: errMsg,
    };

    if (errMsg.substr(0, 17) === 'JsonWebTokenError') {
      res.status(401).json(response);
    } else {
      res.status(500).json(response);
    }
  }
};

exports.add = async (req, res) => {
  const {
    token, date, category, breakdown, price,
  } = req.body;

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
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
    const response = {
      success: false,
    };

    if (err.toString().substr(0, 17) === 'JsonWebTokenError') {
      res.status(401).json(response);
    } else {
      res.status(500).json(response);
    }
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
    res.status(500).json({
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
    res.status(500).json({
      success: false,
    });
  }
};

exports.category = async (req, res) => {
  const { token } = req.body;

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
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
    const response = {
      success: false,
    };

    if (err.toString().substr(0, 17) === 'JsonWebTokenError') {
      res.status(401).json(response);
    } else {
      res.status(500).json(response);
    }
  }
};
