/* Require Schemma & model */
const { Schema, model } = require("mongoose");

/* Create Schema */
const ReactionRoleSchema = new Schema(
  {
    channelId: {
        type: String,
        required: true,
      },
    messageId: {
      type: String,
      required: true,
    },
    emojiId: {
        type: String,
        required: true,
      },
    roles: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/* Create model and export */
module.exports = model("ReactionRole", ReactionRoleSchema);
