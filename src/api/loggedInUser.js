// @flow
import gql from 'graphql-tag';

type User = {
  id: string,
  token?: string,
  name?: string,
  email?: string,
  githubUsername?: string,
  avatarUrl?: string
};
export type { User };

export const LOGGED_IN_USER_QUERY = gql`
  {
    loggedInUser {
      id
      name
      githubUsername
    }
  }
`;
