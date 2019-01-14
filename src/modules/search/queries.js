import gql from "graphql-tag";

export const SEARCH_USER_QUERY = gql`
  query($userLogin: String!) {
    user(login: $userLogin) {
      login
      url
      name
      bio
      company
      email
      followers {
        totalCount
      }
      location
      organizations {
        totalCount
      }
      repositories (privacy: PUBLIC, isFork: false) {
        totalCount
      }
    }
  }
`;
