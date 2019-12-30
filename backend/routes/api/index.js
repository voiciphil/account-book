const router = require('express').Router();
const auth = require('./auth');
const trans = require('./trans');

router.use('/auth', auth);
router.use('/trans', trans);

module.exports = router;
