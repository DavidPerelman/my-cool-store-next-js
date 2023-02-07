const mongoose = require('mongoose');
const Category = require('./categoryModel');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  price_id: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
  },
  brand: {
    type: String,
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  thumbnail: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  rating: {
    rate: { type: Number },
    count: { type: Number },
  },
});

module.exports = mongoose.model('Product', productSchema);
