const router = require('express').Router();
const controller = require('../../../controllers');

router.post('/login', (req, res, next) => {
  controller.auth.login(req, res, next);
});

router.post('/verify', (req, res, next) => {
  controller.auth.verify(req, res, next);
});

router.post('/signup', (req, res, next) => {
  controller.auth.signup(req, res, next);
})

module.exports = router;