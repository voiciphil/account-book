const router = require('express').Router();
const controller = require('../../../controllers');

router.post('/sign-in', (req, res, next) => {
  controller.auth.signIn(req, res, next);
});

router.post('/verify', (req, res, next) => {
  controller.auth.verify(req, res, next);
});

router.post('/sign-up', (req, res, next) => {
  controller.auth.signUp(req, res, next);
})

module.exports = router;