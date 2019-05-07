const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// User Schema.
const UserSchema = new mongoose.Schema({
    gender: String,
    name: {
        title: String,
        first: String,
        last: String
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
    },
    dob: {
        date: Date,
        age: Number
    }
});

UserSchema.index( { location : "2dsphere" });

// Export the model.
module.exports = mongoose.model('User', UserSchema);