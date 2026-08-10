const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET all orders for Admin
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new order from Cart
router.post('/', async (req, res) => {
  const { customerName, phone, note, items, totalAmount } = req.body;
  const order = new Order({
    customerName,
    phone,
    note,
    items,
    totalAmount
  });

  try {
    const newOrder = await order.save();
    
    // Emit new order event
    const io = req.app.get('io');
    if (io) {
      io.emit('new_order', newOrder);
    }
    
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) order status
router.put('/:id/status', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.status = req.body.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
