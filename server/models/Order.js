import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  image: String,
  restaurantId: String,
  restaurantName: String
});

const orderSchema = new mongoose.Schema({
  clerkUserId: {
    type: String,
    required: true
  },
  orderNumber: {
    type: String,
    unique: true
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  deliveryFee: {
    type: Number,
    default: 40
  },
  tax: {
    type: Number,
    required: true
  },
  finalAmount: {
    type: Number,
    required: true
  },
  deliveryInfo: {
    name: String,
    phone: String,
    address: String,
    landmark: String,
    deliveryInstructions: String
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'card', 'upi'],
    default: 'cod'
  },
  status: {
    type: String,
    enum: ['pending', 'preparing', 'on_the_way', 'delivered', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Indexes are automatically created due to unique: true on orderNumber
// Additional index for clerkUserId for faster user-specific queries
orderSchema.index({ clerkUserId: 1 });

// Generate order number before saving
orderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    this.orderNumber = 'ORD' + Date.now() + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  }
  next();
});

// Alternative: use pre-validate to ensure orderNumber is set before validation
orderSchema.pre('validate', function(next) {
  if (!this.orderNumber) {
    this.orderNumber = 'ORD' + Date.now() + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;