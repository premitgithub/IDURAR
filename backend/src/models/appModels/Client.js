const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },

   name: String,
  role: String,

  // Student fields
  course: String,
  password: String,
  userid: String,
  degree: String,
  academicYear: String,
  email: String,

  // Faculty fields
  department: String,
  joiningDate: Date,
  experience: String,
  // Faculty file upload (if stored as filename or URL)
  documents: [String],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'Admin' },
  assigned: { type: mongoose.Schema.ObjectId, ref: 'Admin' },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
},{ timestamps: true });

schema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

schema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Client', schema);
