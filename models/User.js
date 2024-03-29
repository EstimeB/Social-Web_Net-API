// Require validator to validate emails
// const { validator } = require("validator");
//
const { Schema, model } = require("mongoose");
// Importing Thought model


// Schema that to define the shape of document within the collection, will be used to create User model
const userSchema = new Schema(
  {
    
    username: {
      type: String,
      unique: true,
      required: true,
      // To remove white spaces from username
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // To confirm that the email is accurate/true/exist
      match: [/.+@.+\..+/, 'Must match an email address!'],
      // validate: {
      //   validator: validator.isEmail,
      //   // If not throw message
      //   message: "{Value} is invalid",
      //   //Set to false to enable mongoose
      //   isAsync: false,
      // },
    },
    // Referencing Thought Model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    //Self-reference
    // friends: [this],
    friends: [{ type: String, ref: 'User' }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id:false
  }
);

// Create a virtual
userSchema
  // Name virtual
  .virtual('friendCount')
  //Function to retrieve the length of user's friends
  .get(function () {
    return this.friends.length;
  });

// Create/Initialize User model.
const User = model('User', userSchema);

// Export model
module.exports = User;
