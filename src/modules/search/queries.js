import gql from "graphql-tag";

export const SEARCH_USER_QUERY = gql`
  query($userLogin: String!) {
    user(login: $userLogin) {
      name
      id
      avatarUrl
      bio
      company
      createdAt
      email
      followers {
        totalCount
      }
      location
      organizations {
        totalCount
      }
    }
  }
`;

// export const FETCH_REPOSITORIES_QUERY = gql`
//     query ($userLogin: String!)
//         {

//             repositoryOwner(login: $userLogin) {
//             id
//             avatarUrl
//             name
//             repositories(privacy: PUBLIC, isLocked: false, isFork: false, first: 10) {
//                 totalCount
//                 nodes {
//                 id
//                 name
//                 createdAt
//                 description
//                 primaryLanguage {
//                     name
//                 }
//                 assignableUsers(first: 10) {
//                     nodes {
//                         id
//                         name
//                         login
//                         company
//                     }
//                 }
//                 }
//             }
//             }
//         }
//     }
// `
