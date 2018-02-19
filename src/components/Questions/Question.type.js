type Question = {
  id: string,
  text: string,
  owner: {
    name: string,
    githubUsername: string
  },
  upVotes: Array<string>,
  downVotes: Array<string>,
  _upVotesMeta: {
    count: number
  },
  _downVotesMeta: {
    count: number
  }
};
export type { Question };
