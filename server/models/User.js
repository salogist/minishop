const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'نام کاربر الزامی است'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'ایمیل الزامی است'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'لطفا یک ایمیل معتبر وارد کنید']
  },
  password: {
    type: String,
    required: [true, 'رمز عبور الزامی است'],
    minlength: [6, 'رمز عبور باید حداقل 6 کاراکتر باشد']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(\+98|0)?9\d{9}$/.test(v);
      },
      message: props => `${props.value} یک شماره موبایل معتبر نیست!`
    }
  },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema); 