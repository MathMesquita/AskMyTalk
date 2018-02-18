import React from 'react';
import GITHUB_LOGO from '../../assets/githublogo.png';

const SignUp = ({ signUpHandler, isLoading }) => {
  return (
    <section
      onClick={signUpHandler}
      className={`signUp ${isLoading && '-loading'}`}>
      <img className='signUp-image' src={GITHUB_LOGO} />
      <p className='signUp-text'>Entre com o Github para interagir</p>
    </section>
  );
};

export default SignUp;
