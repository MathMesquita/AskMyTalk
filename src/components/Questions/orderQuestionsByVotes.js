// @flow
import type { Question } from './Question.type';

export default function orderQuestionsByVotes(
  questions: Array<Question>
): Array<Question> {
  return [ ...questions ].sort(compareQuestionsVotes);
}
function compareQuestionsVotes(questionA: Question, questionB: Question) {
  return calculateQuestionVotes(questionB) - calculateQuestionVotes(questionA);
}

export function calculateQuestionVotes(question: Question) {
  return question._upVotesMeta.count - question._downVotesMeta.count;
}
