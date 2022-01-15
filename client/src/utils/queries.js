import { gql } from "@apollo/client";

export const QUERY_BOOKS = gql`
  query books($username: String) {
    books(username: $username) {
      _id
      bookText
      createdAt
      username
    }
  }
`;

// export const QUERY_BOOKS = gql`
//   query books($id: ID!) {
//     book(_id: $id) {
//       _id
//       bookText
//       createdAt
//       username
//       }
//     }
//   }
// `;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      bookCount
      books {
        _id
        username
      }
      books {
        _id
        bookText
        createdAt
      }
    }
  }
`;

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      books {
        _id
        bookText
        createdAt
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      bookCount
      books {
        _id
        username
      }
    }
  }
`;
