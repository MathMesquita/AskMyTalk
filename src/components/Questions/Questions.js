import React from 'react';

import { calculateQuestionVotes } from './orderQuestionsByVotes';

const Questions = ({ questions }) => {
  return (
    <section className='questions'>
      {questions.map((question) => (
        <article key={question.id} className='question'>
          <h2 className='question-owner'>{question.owner.name}</h2>
          <p className='question-content'>{question.text}</p>
          <div className='question-votes'>
            <button className='vote-upvoteAct'>+</button>
            <span className='vote-quantity'>
              {calculateQuestionVotes(question)}
            </span>
            <button className='vote-downvoteAct'>-</button>
          </div>
        </article>
      ))}
    </section>
  );
};

export default Questions;
