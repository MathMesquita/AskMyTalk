// @flow
import gql from 'graphql-tag';

export const QUESTIONS_QUERY = gql`
  query AllQuestions($loggedInUser: ID!) {
    allQuestions {
      id
      text
      owner {
        name
        githubUsername
      }
      upVotes(filter: { id_in: [$loggedInUser] }) {
        id
      }
      downVotes(filter: { id_in: [$loggedInUser] }) {
        id
      }
      _downVotesMeta {
        count
      }
      _upVotesMeta {
        count
      }
    }
  }
`;
