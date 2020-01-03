const db = require('../models');
const jwt = require('jsonwebtoken');

exports.all = async (req, res, next) => {
  const { token } = req.body;
  const payload = jwt.verify(token, process.env.SECRETE_KEY);

  try {
    const category = await db.categories.findAll({
      where: {
        user_id: payload.user_id,
      },
    });

    res.json({
      data: category,
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
  const { token, category } = req.body;
  const payload = jwt.verify(token, process.env.SECRETE_KEY);

  try {
    db.categories.create({
      user_id: payload.user_id,
      category: category,
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
    db.categories.destroy({
      where: {
        id: parseInt(id),
      },
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