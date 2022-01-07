const { gql } = require('apollo-server-express');

const typeDefs = gql`
 type Query {
    me: User
    users: [User]
    user(username: String!): User
    books(username: String): [Book]
    book(_id: ID!): Book
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    //saveBook(bookAuthor: string!, description: String!, title: String!, bookId: String!, image: String!, link: String!): User
    //addReaction(bookId: ID!, reactionBody: String!): Book
    removeBook(book: ID!): User
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookID: _id
    authorsText: [String]
    description: String
    title: String
    //image: Img
    //link: Link
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;