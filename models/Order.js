const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  name: String,
  price: String,
  quantity: Number,
  image: String
});

const OrderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  note: {
    type: String
  },
  items: [OrderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Mới', 'Hoàn thành', 'Đã hủy'],
    default: 'Mới'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
