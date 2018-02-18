import React, { Component } from 'react';
import './App.css';
import { graphql } from 'react-apollo';

import { LOGGED_IN_USER_QUERY } from './api/loggedInUser';

import Header from './components/Header';
import Questions from './components/Questions/QuestionsContainer';
import SignUp from './components/SignUp/SignUpContainer';
import NewQuestion from './components/NewQuestion';

const AskMyTalk = ({ user, isLoading }) => {
  return (
    <main className='askMyTalk'>
      <Header />
      {!isLoading && (
        <div className='questionsAndNewQuestion__wrapper'>
          {!user && <SignUp />}
          <Questions user={user} />
          {user && <NewQuestion />}
        </div>
      )}
    </main>
  );
};

class AskMyTalkContainer extends Component {
  render() {
    const { loggedInUserQuery } = this.props;
    const isLoading = loggedInUserQuery && loggedInUserQuery.loading;

    const user = loggedInUserQuery && loggedInUserQuery.loggedInUser;

    return <AskMyTalk isLoading={isLoading} user={user} />;
  }
}

export default graphql(LOGGED_IN_USER_QUERY, { name: 'loggedInUserQuery' })(
  AskMyTalkContainer
);
