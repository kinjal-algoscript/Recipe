const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { EXPRESS_SECRET } = require('../config/env');
const { genSaltSync, hashSync, compareSync } = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    normalized_email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    extra1: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true, usePushEach: true }, // UTC format
);

userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.extra1 = this.password;
    this.password = this._hashPassword(this.password);
    return next();
  }
  return next();
});

userSchema.pre('findOneAndUpdate', function(next) {
  const query = this;
  const update = query.getUpdate();
  if (update.password) {
    update.extra1 = update.password;
    update.password = hashSync(update.password, genSaltSync(8), null);
    return next();
  }
  return next();
});

userSchema.methods = {
  authenticateUser(password) {
    return compareSync(password, this.password);
  },

  _hashPassword(password) {
    return hashSync(password, genSaltSync(8), null);
  },

  getUserName() {
    return this.firstName + ' ' + this.lastName;
  },

  createToken() {
    return jwt.sign(
      {
        id: this._id,
        name: `${this.getUserName()}`,
        email: this.email,
        role: this.role,
      },
      EXPRESS_SECRET,
      { expiresIn: 5184000 },
    );
  },

  toAuthJSON() {
    return {
      id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      name: `${this.getUserName()}`,
      email: this.email,
      isActive: this.isActive,
      token: `${this.createToken()}`,
    };
  },

  toJSON() {
    return {
      id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      name: `${this.getUserName()}`,
      email: this.email,
    };
  },
};
module.exports = mongoose.model('users', userSchema);
