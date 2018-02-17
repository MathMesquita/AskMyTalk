import React from 'react';

const Questions = () => {
  return (
    <section className="questions">
      <article className="question">
        <h2 className="question-owner">Matheus</h2>
        <p className="question-content">Como funciona a precificação?</p>
        <div className="question-votes">
          <button className="vote-upvoteAct">+</button>
          <span className="vote-quantity">4</span>
          <button className="vote-downvoteAct">-</button>
        </div>
      </article>
      <article className="question">
        <h2 className="question-owner">Carlos</h2>
        <p className="question-content">Qual a curva de aprendizagem?</p>
        <div className="question-votes -loading">
          <button className="vote-upvoteAct">+</button>
          <span className="vote-quantity">42</span>
          <button className="vote-downvoteAct">-</button>
        </div>
      </article>
      <article className="question">
        <h2 className="question-owner">Carlos</h2>
        <p className="question-content">Qual a curva de aprendizagem?</p>
        <div className="question-votes -upvoted">
          <button className="vote-upvoteAct">+</button>
          <span className="vote-quantity">42</span>
          <button className="vote-downvoteAct">-</button>
        </div>
      </article>
      <article className="question">
        <h2 className="question-owner">Carlos</h2>
        <p className="question-content">Qual a curva de aprendizagem?</p>
        <div className="question-votes -downvoted">
          <button className="vote-upvoteAct">+</button>
          <span className="vote-quantity">42</span>
          <button className="vote-downvoteAct">-</button>
        </div>
      </article>
    </section>
  );
};

export default Questions;
