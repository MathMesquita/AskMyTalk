import React, { Component } from 'react';
import './App.css';

import Header from './components/Header';
import Questions from './components/Questions';
import SignUp from './components/SignUp/SignUpContainer';
import NewQuestion from './components/NewQuestion';

class App extends Component {
  render() {
    return (
      <main className='askMyTalk'>
        <Header />
        <div className='questionsAndNewQuestion__wrapper'>
          <Questions />
          <SignUp />
          <NewQuestion />
        </div>
      </main>
    );
  }
}

export default App;
