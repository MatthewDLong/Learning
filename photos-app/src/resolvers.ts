const resolvers = {
  Query: {
    photos: (parent, args, { Photos }) => Photos.scan().exec(),
  },
};

export default resolvers;
