const { Schema } = require('mongoose');
const { saveReview } = require('../controllers/user-controller');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const reviewSchema = new Schema({
  user: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },

  review: {
    type: Number, min: 1, max: 5
  },
});

module.exports = reviewSchema;
