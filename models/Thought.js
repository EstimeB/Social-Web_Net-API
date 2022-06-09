const { Schema, model, Types } = require("mongoose");

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
          type: Schema.Types.ObjectId,
          // Default value is set to a new ObjectId
          default: () => new Types.ObjectId(),
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
    id:false
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
const Thought = model("Thought", thoughtSchema);

// Export model
module.exports = Thought;
