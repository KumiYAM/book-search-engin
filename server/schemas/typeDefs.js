const { gql } = require('apollo-server-express');

const typeDefs = gql`
 type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookID: ID
    authorsText: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

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
    saveBook(bookAuthor: [String!], description: String!, title: String!, bookId: String!, image: String!, link: String!): Book
    removeBook(book: ID!): Book
  }
`;

module.exports = typeDefs;