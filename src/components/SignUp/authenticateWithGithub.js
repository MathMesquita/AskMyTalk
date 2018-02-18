// @flow
import gql from 'graphql-tag';

type UserAuthenticationResponse = {
  token: string
};
export type { UserAuthenticationResponse };

const AUTH_WITH_GITHUB_MUTATION = gql`
  mutation AuthWithGithub($githubCode: String!) {
    authenticateUser(githubCode: $githubCode) {
      id
      token
      githubUsername
      name
    }
  }
`;

export { AUTH_WITH_GITHUB_MUTATION };
