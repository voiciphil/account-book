const jwt = require('jsonwebtoken');
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

    if (user.user_pw === Buffer.from(pw, 'base64').toString('ascii')) {
      const payload = {
        user_id: user.user_id,
      };
      const option = {
        expiresIn: '60m',
      };
      res.json({
        token: jwt.sign(payload, process.env.SECRETE_KEY, option),
        message: 'login success',
      });
    } else {
      res.json({
        token: '',
        message: 'passwords do not match',
      });
    }
  } catch (err) {
    res.json({
      token: '',
      message: 'ID not registered',
    });
  }
};

exports.verify = (req, res) => {
  const { token } = req.body;

  try {
    jwt.verify(token, process.env.SECRETE_KEY);
    res.json({
      verified: true,
    });
  } catch (err) {
    res.json({
      verified: false,
    });
  }
};

exports.signUp = async (req, res) => {
  const { id, pw } = req.body;

  try {
    await db.users.create({
      user_id: id,
      user_pw: pw,
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
