import { fromEvent, FunctionEvent } from 'graphcool-lib';
import { GraphQLClient } from 'graphql-request';
import * as fetch from 'isomorphic-fetch';

interface User {
  id: string;
  githubUsername: string;
  avatarUrl: string;
  name: string;
  email: string;
}

interface GithubUser {
  id: string;
  login: string;
  avatar_url: string;
  name: string;
  email: string;
}

interface EventData {
  githubCode: string;
}

// read Github credentials from environment variables
const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;

export default async (event: FunctionEvent<EventData>) => {
  console.log(event);

  if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
    console.log('Please provide a valid client id and secret!');
    return { error: 'Github Authentication not configured correctly.' };
  }

  try {
    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const { githubCode } = event.data;

    // get github token
    const githubToken: string = await getGithubToken(githubCode);

    // call github API to obtain user data
    const githubUser = await getGithubUser(githubToken);

    // get graphcool user by github id
    const userId: string | null = await getGraphcoolUserId(api, githubUser.id);

    let user: User;

    // check if graphcool user exists, and create new one if not
    if (!userId) {
      user = await createGraphcoolUser(api, githubUser);
    } else {
      user = await updateGraphcoolUser(api, githubUser, userId);
    }

    // generate node token for User node
    const token = await graphcool.generateNodeToken(user.id!, 'User');

    return {
      data: {
        token,
        id: user.id,
        name: user.name,
        avatarUrl: user.avatarUrl,
        githubUsername: user.githubUsername,
        email: user.email
      }
    };
  } catch (e) {
    console.log(e);
    return { error: 'An unexpected error occured during authentication.' };
  }
};

async function getGithubToken(githubCode) {
  const endpoint = 'https://github.com/login/oauth/access_token';

  const data = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      code: githubCode
    })
  }).then((response) => response.json());

  if (data.error) {
    throw new Error(JSON.stringify(data.error));
  }

  return data.access_token;
}

async function getGithubUser(githubToken: string): Promise<GithubUser> {
  const endpoint = `https://api.github.com/user?access_token=${githubToken}`;
  const data = await fetch(endpoint).then((response) => response.json());

  if (data.error) {
    throw new Error(JSON.stringify(data.error));
  }

  return data;
}

async function getGraphcoolUserId(
  api: GraphQLClient,
  githubUserId: string
): Promise<string | null> {
  const query = `
    query getUser($githubUserId: String!) {
      User(githubUserId: $githubUserId) {
        id
      }
    }
  `;

  const variables = {
    // need to 'cast' to string, otherwise it will be seen as integer by GraphQL (because it's a number string)
    githubUserId: `${githubUserId}`
  };

  return api
    .request<{ User: User | null }>(query, variables)
    .then((r) => r.User && r.User.id);
}

async function updateGraphcoolUser(
  api: GraphQLClient,
  githubUser: GithubUser,
  userId: string
): Promise<User> {
  const mutation = `
    mutation UpdateUser(
      $userId: ID!, 
      $githubUserId: String!, 
      $githubUsername: String, 
      $avatarUrl: String, 
      $githubName: String,
      $githubEmail: String
    ){
      updateUser(
        id: $userId, 
        githubUserId: $githubUserId, 
        githubUsername: $githubUsername, 
        avatarUrl: $avatarUrl, 
        name: $githubName,
        email: $githubEmail
      ) {
        id
        name
        email
        avatarUrl
        githubUsername
      }
    }
  `;

  const variables = {
    // need to 'cast' to string, otherwise it will be seen as integer by GraphQL (because it's a number string)
    userId: `${userId}`,
    githubUserId: `${githubUser.id}`,
    githubUsername: `${githubUser.login}`,
    avatarUrl: `${githubUser.avatar_url}`,
    githubName: `${githubUser.name}`,
    githubEmail: `${githubUser.email}`
  };

  return api
    .request<{ updateUser: User }>(mutation, variables)
    .then((r) => r.updateUser);
}

async function createGraphcoolUser(
  api: GraphQLClient,
  githubUser: GithubUser
): Promise<User> {
  const mutation = `
    mutation createUser(
      $githubUserId: String!, 
      $githubUsername: String,
      $avatarUrl: String, 
      $githubName: String,
      $githubEmail: String
    ) {
      createUser(
        githubUserId: $githubUserId, 
        githubUsername: $githubUsername, 
        avatarUrl: $avatarUrl, 
        name: $githubName,
        email: $githubEmail
      ) {
        id
        name
        email
        avatarUrl
        githubUsername
      }
    }
  `;

  const variables = {
    // need to 'cast' to string, otherwise it will be seen as integer by GraphQL (because it's a number string)
    githubUserId: `${githubUser.id}`,
    githubUsername: `${githubUser.login}`,
    avatarUrl: `${githubUser.avatar_url}`,
    githubName: `${githubUser.name}`,
    githubEmail: `${githubUser.email}`
  };

  return api
    .request<{ createUser: User }>(mutation, variables)
    .then((r) => r.createUser);
}
