const router = require('express').Router();
const auth = require('./auth');
const transactions = require('./transactions');
const categories = require('./categories');

router.use('/auth', auth);
router.use('/transactions', transactions);
router.use('/categories', categories);

module.exports = router;
