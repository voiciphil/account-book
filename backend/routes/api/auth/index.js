const router = require('express').Router();
const controller = require('../../../controllers');

router.post('/login', (req, res, next) => {
  controller.auth.login(req, res, next);
});

module.exports = router;