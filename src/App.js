import React, { Component } from 'react';
import './App.css';
import { graphql } from 'react-apollo';

import { LOGGED_IN_USER } from './api/loggedInUser';

import Header from './components/Header';
import Questions from './components/Questions';
import SignUp from './components/SignUp/SignUpContainer';
import NewQuestion from './components/NewQuestion';

const AskMyTalk = ({ user, isLoading }) => {
  return (
    <main className='askMyTalk'>
      <Header />
      <div className='questionsAndNewQuestion__wrapper'>
        {!isLoading && !user && <SignUp />}
        <Questions />
        {!isLoading && user && <NewQuestion />}
      </div>
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

export default graphql(LOGGED_IN_USER, { name: 'loggedInUserQuery' })(
  AskMyTalkContainer
);
