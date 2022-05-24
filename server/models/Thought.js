const { Schema, model } = require("mongoose");

// Schema that to define the shape of document within the collection, will be used to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // get method to format the timestamp on query
    },
    username: {
      type: String,
      required: true,
    },
    // Subdocument schema
    reactions: [
      {
        reactionId: {
          // Mongoose's ObjectId data type
          // Default value is set to a new ObjectId
        },
        reactionBody: {
          type: String,
          required: true,
          maxlength: 280,
        },
        username: {
          type: String,
          required: true,
        },
        createAt: {
          type: Date,
          default: Date.now,
        // get method to format the timestamp on query
        },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Create a virtual
thoughtSchema
  // Name virtual
  .virtual("reactionCount")
  //Function to retrieve the length of reactions
  .get(function () {
    return this.reactions.length;
  });

// Create/Initialize User model.
const Thought = model("thought", thoughtSchema);

// Export model
module.exports = Thought;
