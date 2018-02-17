import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import Questions from './components/Questions';
import NewQuestion from './components/NewQuestion';

class App extends Component {
  render() {
    return (
      <main className="askMyTalk">
        <Header />
        <div className="questionsAndNewQuestion__wrapper">
          <Questions />
          <NewQuestion />
        </div>
      </main>
    );
  }
}

export default App;
