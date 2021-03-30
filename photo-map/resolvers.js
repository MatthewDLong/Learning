const { AuthenticationError, PubSub } = require("apollo-server");
const Pin = require("./models/Pin");
const { PIN_ADDED, PIN_UPDATED, PIN_DELETED } = require("./constants");

const pubSub = new PubSub();

const authenticated = (next) => (root, args, ctx) => {
  if (!ctx.currentUser) {
    // throw new AuthenticationError('You must be logged in');
  }
  return next(root, args, ctx);
};

module.exports = {
  Query: {
    me: authenticated((root, args, ctx) => ctx.currentUser),
    getPins: async (root, args, ctx) => {
      const pins = await Pin.find({})
        .populate("author")
        .populate("comments.author");

      return pins;
    },
  },
  Mutation: {
    createPin: authenticated(async (root, args, ctx) => {
      const newPin = await new Pin({
        ...args.input,
        author: ctx.currentUser._id,
      }).save();

      const pinAdded = await Pin.populate(newPin, "author");
      pubSub.publish(PIN_ADDED, { pinAdded });
      return pinAdded;
    }),
    deletePin: authenticated(async (root, args, ctx) => {
      const pinDeleted = await Pin.findOneAndDelete({ _id: args.pinId }).exec();
      pubSub.publish(PIN_DELETED, { pinDeleted });
      return pinDeleted;
    }),
    createComment: authenticated(async (root, args, ctx) => {
      const newComment = { text: args.text, author: ctx.currentUser._id };
      const pinUpdated = await Pin.findOneAndUpdate(
        { _id: args.pinId },
        { $push: { comments: newComment } },
        { new: true }
      )
        .populate("author")
        .populate("comments.author");
      pubSub.publish(PIN_UPDATED, { pinUpdated });
      return pinUpdated;
    }),
  },
  Subscription: {
    pinAdded: {
      subscribe: () => pubSub.asyncIterator(PIN_ADDED),
    },
    pinUpdated: {
      subscribe: () => pubSub.asyncIterator(PIN_UPDATED),
    },
    pinDeleted: {
      subscribe: () => pubSub.asyncIterator(PIN_DELETED),
    },
  },
};
