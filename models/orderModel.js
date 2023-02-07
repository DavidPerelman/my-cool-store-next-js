const mongoose = require('mongoose');
const moment = require('moment-timezone');
const User = require('./userModel');
const Product = require('./productModel');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  created: {
    type: String,
    required: true,
    default: () => moment().format('DD/MM/YYYY hh:mm'),
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      productQuantity: {
        type: Number,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    },
  ],
  discount: { type: Number },
  totalPayment: {
    type: Number,
    required: true,
  },
  isPaid: {
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    stripe_payment_id: {
      type: String,
    },
  },
  isOpen: {
    type: Boolean,
    required: true,
    default: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Open',
  },
});

module.exports = mongoose.model('Order', orderSchema);
