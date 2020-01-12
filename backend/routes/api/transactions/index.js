const router = require('express').Router();
const controller = require('../../../controllers');

router.post('/all', (req, res, next) => {
  controller.transactions.all(req, res, next);
});

router.post('/add', (req, res, next) => {
  controller.transactions.add(req, res, next);
});

router.post('/delete', (req, res, next) => {
  controller.transactions.delete(req, res, next);
});

router.post('/update', (req, res, next) => {
  controller.transactions.update(req, res, next);
});

router.post('/category', (req, res, next) => {
  controller.transactions.category(req, res, next);
});

module.exports = router;