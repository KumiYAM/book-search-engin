const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, { email, password }, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("saveBooks");
      }
      throw new AuthenticationError("You need to be logged in!");
    }
  },

  //       throw new AuthenticationError("Not logged in");
  //     },
  //     users: async () => {
  //       return User.find().select("-__v -password").populate("books");
  //     },
  //     user: async (parent, { username }) => {
  //       return User.findOne({ username })
  //         .select("-__v -password")
  //         .populate("books");
  //     },
  //     books: async (parent, { username }) => {
  //       const params = username ? { username } : {};
  //       return Book.find(params).sort({ createdAt: -1 });
  //     },
  //     books: async (parent, { _id }) => {
  //       return Book.findOne({ _id });
  //     }
  //   },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPW = await user.isCorrectPassword(password);

      if (!correctPW) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (
      parent,
      { bookId, title, description, authors, image, link },
      context
    ) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              savedbooks: { bookId, titel, description, authors, image, link }
            }
          },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        console.log(err);
      }
    }

    // removeBook: async (parent, { bookId }, context) => {
    //     try {
    //        const updatedUser = await User.findByIdAndUpdate(
    //          { _id: context.user._id },
    //          { $pull: { savedBooks: { bookId } } },
    //          { new: true }
    //         );
    //           return updatedUser;
    //     }
    //                catch(err) {
    //              console.log(err);
    //         }
    //         If ( !updatedUser ) {
    //            throw new AuthenticationError("Couldn't find user with this id!");
    //         }
    // }
  }
};

module.exports = resolvers;
