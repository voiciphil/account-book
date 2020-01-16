const router = require('express').Router();
const controller = require('../../../controllers');

router.post('/all', (req, res) => {
  controller.transactions.all(req, res);
});

router.post('/add', (req, res) => {
  controller.transactions.add(req, res);
});

router.post('/delete', (req, res) => {
  controller.transactions.delete(req, res);
});

router.post('/update', (req, res) => {
  controller.transactions.update(req, res);
});

router.post('/category', (req, res) => {
  controller.transactions.category(req, res);
});

module.exports = router;
