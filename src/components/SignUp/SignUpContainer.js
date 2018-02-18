// @flow
import React, { Component } from 'react';
import SignUp from './SignUp';
import { graphql } from 'react-apollo';

import requestGithubAuthentication from './requestGithubAuthentication';
import type { GithubResponse } from './requestGithubAuthentication';

import { AUTH_WITH_GITHUB_MUTATION } from './authenticateWithGithub';
import type { UserAuthenticationResponse } from './authenticateWithGithub';

import { updateLoggedInQueryAfterUserSignUp } from '../../api/loggedInUser';
import type { User } from '../../api/loggedInUser';

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
          },
          update: (store, { data: { authenticateUser } }) => {
            updateLoggedInQueryAfterUserSignUp(store, authenticateUser);
          }
        })
        .then((response) => response.data.authenticateUser);

      localStorage.setItem('graphcoolToken', user.token);
    } catch (error) {
      this._stopLoading();
      console.error(error);
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
