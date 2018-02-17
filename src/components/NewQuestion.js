import React from 'react';

const NewQuestion = () => {
  return (
    <section className="newQuestion">
      <h3 className="newQuestion-title">Me pergunte algo:</h3>
      <textarea className="newQuestion-content" />
      <button className="newQuestion-sendAct -loading">Perguntar</button>
    </section>
  );
};

export default NewQuestion;
