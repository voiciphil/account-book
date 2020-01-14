const router = require('express').Router();
const auth = require('./auth');
const transactions = require('./transactions');

router.use('/auth', auth);
router.use('/transactions', transactions);

module.exports = router;
