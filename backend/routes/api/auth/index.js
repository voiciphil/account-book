const router = require('express').Router();
const controller = require('../../../controllers');

router.post('/sign-in', (req, res) => {
  controller.auth.signIn(req, res);
});

router.post('/verify', (req, res) => {
  controller.auth.verify(req, res);
});

router.post('/sign-up', (req, res) => {
  controller.auth.signUp(req, res);
});

module.exports = router;
