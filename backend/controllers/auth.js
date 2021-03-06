const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('../models');
require('dotenv').config();

exports.signIn = async (req, res) => {
  const { id, pw } = req.body;

  try {
    const user = await db.users.findOne({
      where: {
        user_id: id,
      },
    });

    if (crypto.createHash('sha256').update(pw).digest('base64') === user.user_pw) {
      const payload = {
        user_id: user.user_id,
      };
      const option = {
        expiresIn: '60m',
      };
      res.json({
        token: jwt.sign(payload, process.env.SECRET_KEY, option),
        message: 'login success',
      });
    } else {
      res.status(400).json({
        token: '',
        message: 'password do not match',
      });
    }
  } catch (err) {
    res.status(400).json({
      token: '',
      message: 'id not registered',
    });
  }
};

exports.verify = (req, res) => {
  const token = req.headers['x-access-token'];

  try {
    jwt.verify(token, process.env.SECRET_KEY);
    res.json({
      success: true,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
    });
  }
};

exports.signUp = async (req, res) => {
  const { id, pw } = req.body;

  try {
    await db.users.create({
      user_id: id,
      user_pw: crypto.createHash('sha256').update(pw).digest('base64'),
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
