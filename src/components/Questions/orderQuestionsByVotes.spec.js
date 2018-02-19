import orderQuestionsByVotes, {
  calculateQuestionVotes
} from './orderQuestionsByVotes';

const input = [
  {
    id: 'abc',
    _upVotesMeta: {
      count: 3
    },
    _downVotesMeta: {
      count: 2
    }
  },
  {
    id: 'dce',
    _upVotesMeta: {
      count: 3
    },
    _downVotesMeta: {
      count: 8
    }
  },
  {
    id: 'fgh',
    _upVotesMeta: {
      count: 7
    },
    _downVotesMeta: {
      count: 3
    }
  },
  {
    id: 'ijk',
    _upVotesMeta: {
      count: 2
    },
    _downVotesMeta: {
      count: 2
    }
  }
];

test('questions are ordered by their votes', () => {
  const output = [
    {
      id: 'fgh',
      _upVotesMeta: {
        count: 7
      },
      _downVotesMeta: {
        count: 3
      }
    },
    {
      id: 'abc',
      _upVotesMeta: {
        count: 3
      },
      _downVotesMeta: {
        count: 2
      }
    },
    {
      id: 'ijk',
      _upVotesMeta: {
        count: 2
      },
      _downVotesMeta: {
        count: 2
      }
    },
    {
      id: 'dce',
      _upVotesMeta: {
        count: 3
      },
      _downVotesMeta: {
        count: 8
      }
    }
  ];

  expect(orderQuestionsByVotes(input)).toEqual(output);
});

test('sums the upvotes and downvotes from questions', () => {
  const output = [ 1, -5, 4, 0 ];

  expect(input.map(calculateQuestionVotes)).toEqual(output);
});
