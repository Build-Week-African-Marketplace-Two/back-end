const db = require('../models/items-model.js');
const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    res.json(await db.find());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
