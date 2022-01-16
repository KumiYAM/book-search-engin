import { gql } from "@apollo/client";

// export const QUERY_BOOKS = gql`
//   query books($username: String) {
//     books(username: $username) {
//       _id
//       bookText
//       createdAt
//       username
//     }
//   }
// `;

export const GET_ME = gql`
  query me {
    user(username: $username) {
      _id
      username
      email
      bookCount
      savedBooks {
        booId
        authors
        title
        description
        image
        link
      }
    }
  }
`;
