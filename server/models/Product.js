const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'نام محصول الزامی است'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'برند محصول الزامی است']
  },
  description: {
    type: String,
    required: [true, 'توضیحات محصول الزامی است']
  },
  price: {
    type: Number,
    required: [true, 'قیمت محصول الزامی است'],
    min: [0, 'قیمت نمی‌تواند منفی باشد']
  },
  images: [{
    type: String,
    required: [true, 'حداقل یک تصویر الزامی است']
  }],
  specifications: {
    screen: {
      size: String,
      resolution: String,
      technology: String
    },
    camera: {
      main: String,
      selfie: String
    },
    battery: {
      capacity: String,
      type: String
    },
    storage: {
      ram: String,
      internal: String
    }
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  colors: [{
    name: String,
    code: String
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema); 