const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get all orders for a user
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate('items.product')
      .sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'خطا در دریافت سفارشات' });
  }
});

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product')
      .populate('user', 'name email');
    
    if (!order) {
      return res.status(404).json({ message: 'سفارش یافت نشد' });
    }

    // Check if user owns the order
    if (order.user._id.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'دسترسی غیرمجاز' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'خطا در دریافت اطلاعات سفارش' });
  }
});

// Create new order
router.post('/', async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalPrice } = req.body;

    const order = new Order({
      user: req.user.userId,
      items,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'خطا در ثبت سفارش' });
  }
});

module.exports = router; 