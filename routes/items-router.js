const db = require('../models/items-model.js');
const router = require('express').Router();
const auth = require('../middleware/authenticate-middleware');

//Getting all items

router.get('/', async (req, res, next) => {
  try {
    res.json(await db.find());
  } catch (err) {
    next(err);
  }
});

//Getting a specific item

router.get('/:id', async (req, res, next) => {
  try {
    const item = await db.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        message: 'That item is no longer available.',
      });
    }

    res.json(item);
  } catch (err) {
    next(err);
  }
});

//Creating a new item

router.post('/', auth(), async (req, res, next) => {
  const { item } = req.body;
  try {
    const id = await db.add(item);
    const newItem = await db.findById(id);

    return res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
});

//Updating an item

router.put('/:id', auth(), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { item } = req.body;
    const itemToUpdate = await db.update(id, item);

    if (itemToUpdate) {
      res.json(item);
    } else {
      return res.status(404).json({
        message: 'Item not found.',
      });
    }
  } catch (err) {
    next(err);
  }
});

//Deleting an item

router.delete('/:id', auth(), async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await db.remove(id).where({ id: req.params.id }).del();

    return res.status(200).json({ id: req.params.id });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
