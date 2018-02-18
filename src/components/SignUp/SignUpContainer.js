// @flow
import React, { Component } from 'react';
import SignUp from './SignUp';
import { graphql } from 'react-apollo';

import requestGithubAuthentication from './requestGithubAuthentication';
import type { GithubResponse } from './requestGithubAuthentication';

import { AUTH_WITH_GITHUB_MUTATION } from './authenticateWithGithub';
import type { UserAuthenticationResponse } from './authenticateWithGithub';

type User = {
  id: string,
  token: string,
  name?: string,
  email?: string,
  githubUsername?: string,
  avatarUrl?: string
};

class SignUpContainer extends Component<
  { authWithGithubMutation(obj: Object): Promise<UserAuthenticationResponse> },
  { loading: boolean }
> {
  state = {
    loading: false
  };

  signUpHandler = async () => {
    this._startLoading();

    try {
      const githubResponse: GithubResponse = await requestGithubAuthentication(
        'a48acf80b838758b9f1a',
        'read:user'
      );

      const user: User = await this.props
        .authWithGithubMutation({
          variables: {
            githubCode: githubResponse.code
          }
        })
        .then((response) => response.data.authenticateUser);

      localStorage.setItem('graphcoolToken', user.token);

      console.log(user);

      this._stopLoading();
    } catch (error) {
      this._stopLoading();
      console.log('falhou', error);
    }
  };

  _startLoading = () => {
    this.setState((state) => ({
      loading: true
    }));
  };

  _stopLoading = () => {
    this.setState((state) => ({
      loading: false
    }));
  };

  render() {
    return (
      <SignUp
        {...this.props}
        signUpHandler={this.signUpHandler}
        isLoading={this.state.loading}
      />
    );
  }
}

export default graphql(AUTH_WITH_GITHUB_MUTATION, {
  name: 'authWithGithubMutation'
})(SignUpContainer);
