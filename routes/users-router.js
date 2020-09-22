const db = require('../models/users-model.js');
const router = require('express').Router();
const auth = require('../middleware/authenticate-middleware.js');

//Getting all users

router.get('/', async (req, res, next) => {
  try {
    res.json(await db.find());
  } catch (err) {
    next(err);
  }
});

//Getting a specific user

router.get('/:id', async (req, res, next) => {
  try {
    const user = await db.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found.',
      });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
