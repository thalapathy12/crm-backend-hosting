const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  clientId: { type: String, required: true, unique: true },

  // Basic Info
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  alternatePhone: { type: String },
  website: { type: String },

  // Address Info
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zipCode: { type: String }
  },

  // Business Info
  industry: { type: String },
  source: { type: String },
  status: { type: String, enum: ['active', 'inactive', 'prospect'], default: 'active' },
  assignedTo: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String }
  },
  notes: { type: String },

  // Attachments
  attachments: [{ fileName: String, fileUrl: String }],

  // Payments Section
  payments: [
    {
      paymentDate: { type: Date, required: true },
      amountPaid: { type: Number, required: true },
      paymentMethod: { type: String, enum: ['cash', 'bank transfer', 'credit card', 'upi'] },
      transactionId: { type: String },
      notes: { type: String }
    }
  ],

  // Meetings Section
  meetings: [
    {
      meetingDate: { type: Date, required: true },
      mode: { type: String, enum: ['online', 'offline'], required: true },
      meetingUrl: { type: String }, // added as you requested
      notes: { type: String },
      attendees: [{ name: String, role: String }]
    }
  ],

  // Interactions Section
  interactions: [
    {
      type: { type: String, enum: ['Email', 'Call', 'Meeting', 'Other'] },
      message: { type: String },
      date: { type: Date, default: Date.now }
    }
  ],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

module.exports = mongoose.model('Client', clientSchema);
