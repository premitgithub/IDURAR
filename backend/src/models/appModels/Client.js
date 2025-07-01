const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { uniqueId } = require('lodash');

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
  /* -------------------------------------------------------------- */
  // Student fields
  course: String,
  password: String,
  userID: {
    type: String,
    unique: true,
  },
  phoneNo: String,
  degree: String,
  academicYear: String,
  email: {
    type: String,
    unique: true,
  },

  // Faculty fields
  department: String,
  joiningDate: String,
  experience: String,
  // Faculty file upload (if stored as filename or URL)
  documents: [String],// for multiple file names or URLs
  /* -------------------------------------------------------------- */
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


/* -------------------------------------------------------------- */
//Hash Password
schema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);//creates salt for hashing the password
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
/* -------------------------------------------------------------- */

schema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Client', schema);
