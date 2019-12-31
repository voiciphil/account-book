const router = require('express').Router();
const controller = require('../../../controllers');

router.post('/all', (req, res, next) => {
  controller.trans.all(req, res, next);
});

router.post('/add', (req, res, next) => {
  controller.trans.add(req, res, next);
});

module.exports = router;