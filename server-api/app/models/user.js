const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const bcrypt = require('bcrypt-nodejs');

const { USER_ROLES } = require('./../services/roles/definitions');

const UserSchema = mongoose.Schema({
    first_name: {
        type: String,
        max: 255,
    },
    last_name: {
        type: String,
        max: 255,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: [
            USER_ROLES.shipper,
            USER_ROLES.manager,
            USER_ROLES.biker,
        ],
    },
}, {
    collection: 'users',
});

UserSchema.plugin(timestamps, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

UserSchema.pre('validate', function (next) {
    if (this.confirm_password) {
        delete this.confirm_password;
    }

    next();
});

UserSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }

        bcrypt.hash(this.password, salt, null, (err, hash) => {
          if (err) { return next(err); }

          this.password = hash;

          next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) { return callback(err); }

      callback(null, isMatch);
    });
  };

const User = mongoose.model('User', UserSchema);

global.User = User;

module.exports = User;