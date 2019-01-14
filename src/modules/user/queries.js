import gql from "graphql-tag";

export const REPOS_ON_PAGE = 7;

export const USER_REPOSITORIES_QUERY = gql`
  query ($userLogin: String!, $reposCursor: String) {
    repositoryOwner(login: $userLogin) {
      id
      avatarUrl
      repositories(privacy: PUBLIC, isLocked: false, isFork: false, first: 5, after: $reposCursor) {
        totalCount
        edges {
          node {
            id
            name
            createdAt
            description
            primaryLanguage {
                name
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;
// "assignableUsers(first: 10) {
//   nodes {
//       id
//       name
//       login
//       company
//   }
// }"
