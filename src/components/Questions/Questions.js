import React from 'react';

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
              {question._upVotesMeta.count + question._downVotesMeta.count}
            </span>
            <button className='vote-downvoteAct'>-</button>
          </div>
        </article>
      ))}
    </section>
  );
};

export default Questions;
