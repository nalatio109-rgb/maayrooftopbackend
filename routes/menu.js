const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// @route   GET /api/menu
// @desc    Get all menu items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find().sort({ customId: 1 });
    res.json(menuItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/menu
// @desc    Add a new menu item
// @access  Private
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, category, desc, price } = req.body;
    
    // Determine the image URL
    let img = '/images/matchalatte.png';
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      img = `data:${req.file.mimetype};base64,${b64}`;
    } else if (req.body.img) {
      img = req.body.img; // Fallback to raw string if provided
    }
    
    // Get highest customId
    const maxItem = await MenuItem.findOne().sort({ customId: -1 });
    const nextId = maxItem ? maxItem.customId + 1 : 1;

    const newItem = new MenuItem({
      name,
      category,
      desc,
      price: price.toString().endsWith('K') ? price : price + 'K',
      img,
      customId: nextId
    });

    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/menu/:id
// @desc    Update a menu item
// @access  Private
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, category, desc, price, status } = req.body;
    let updateData = { name, category, desc, status };

    if (price) {
      updateData.price = price.toString().endsWith('K') ? price : price + 'K';
    }

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      updateData.img = `data:${req.file.mimetype};base64,${b64}`;
    } else if (req.body.img) {
      updateData.img = req.body.img;
    }

    const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Product not found' });
    
    res.json(updatedItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/menu/:id
// @desc    Delete a menu item
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
