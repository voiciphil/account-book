const router = require('express').Router();
const controller = require('../../../controllers');

router.post('/all', (req, res, next) => {
  controller.categories.all(req, res, next);
});

router.post('/add', (req, res, next) => {
  controller.categories.add(req, res, next);
});

router.post('/delete', (req, res, next) => {
  controller.categories.delete(req, res, next);
});

module.exports = router;