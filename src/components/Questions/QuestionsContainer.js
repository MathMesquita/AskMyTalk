// @flow
import React, { Component } from 'react';
import { withApollo } from 'react-apollo';

import Questions from './Questions';
import { QUESTIONS_QUERY } from './queryAllQuestions';

type Question = {
  id: string,
  text: string,
  owner: {
    name: string,
    githubUsername: string
  },
  upVotes: Array<string>,
  downVotes: Array<string>,
  _upVotesMeta: {
    count: number
  },
  _downVotesMeta: {
    count: number
  }
};

class QuestionsContainer extends Component<
  {},
  { isLoading: boolean, questions: Array<Question> }
> {
  state = {
    isLoading: true,
    questions: []
  };
  async componentWillMount() {
    const questions: Array<Question> = await this.props.client
      .query({
        query: QUESTIONS_QUERY,
        variables: {
          loggedInUser: `${this.props.user && this.props.user.id}`
        }
      })
      .then((r) => r.data.allQuestions);

    this.setState({ isLoading: false, questions });
  }

  render() {
    return <Questions questions={this.state.questions} />;
  }
}

export default withApollo(QuestionsContainer);
