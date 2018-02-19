// @flow
import React, { Component } from 'react';
import { withApollo } from 'react-apollo';

import type { User } from '../../api/loggedInUser';
import type { Question } from './Question.type';

import Questions from './Questions';
import { mountQuestionsQueryRequest } from './queryAllQuestions';

import orderQuestionsByVotes from './orderQuestionsByVotes';

class QuestionsContainer extends Component<
  { client: Object, user: User },
  { isLoading: boolean, questions: Array<Question> }
> {
  state = {
    isLoading: true,
    questions: []
  };

  async componentWillMount() {
    const loggedInUser: string = `${this.props.user && this.props.user.id}`;

    const questions: Array<Question> = await this.props.client
      .query(mountQuestionsQueryRequest(loggedInUser))
      .then((response) => response.data.allQuestions);

    this.setState({ isLoading: false, questions });
  }

  render() {
    const orderedQuestions = orderQuestionsByVotes(this.state.questions);

    return <Questions questions={orderedQuestions} />;
  }

  upVoteHandler = () => {};

  downVoteHandler = () => {};
}

export default withApollo(QuestionsContainer);
