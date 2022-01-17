import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        bookCount
        savedBooks {
          bookId
          authors
          title
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        bookCount
        savedBooks {
          bookId
        }
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(
    $bookId: String!
    $title: String!
    $description: String!
    $image: String!
    $link: String!
    $authors: [String]
  ) {
    saveBook(
      bookId: $bookId
      title: $title
      description: $description
      image: $image
      link: $link
      authors: $authors
    ) {
      _id
      email
      username
      bookCount
      savedBooks {
        bookId
        title
        description
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      savedBooks {
        bookId
        title
        authors
      }
    }
  }
`;
