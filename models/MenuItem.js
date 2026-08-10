const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: String, required: true },
  img: { type: String, required: true },
  // Keeping the numerical id to match frontend fallback or sort logic if needed
  customId: { type: Number, required: true } 
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
