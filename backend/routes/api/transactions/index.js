const router = require('express').Router();
const controller = require('../../../controllers');

router.get('/', (req, res) => {
  controller.transactions.all(req, res);
});

router.post('/', (req, res) => {
  controller.transactions.add(req, res);
});

router.delete('/:id', (req, res) => {
  controller.transactions.delete(req, res);
});

router.patch('/:id', (req, res) => {
  controller.transactions.update(req, res);
});

router.get('/categories', (req, res) => {
  controller.transactions.category(req, res);
});

module.exports = router;
