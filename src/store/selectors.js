import { createSelector } from 'reselect';

// Selectors specific to quiz data
const selectQuizzes = (state) => state.quiz.quizzes;
const selectUserAnswers = (state) => state.quiz.userAnswers;

// Selector for a specific quiz by ID
export const selectQuizById = createSelector(
  [selectQuizzes, (state, quizId) => quizId],
  (quizzes, quizId) => quizzes.find((quiz) => quiz.id === quizId)
);

// Selector for user answers for a specific quiz by ID
export const selectUserAnswersByQuizId = createSelector(
  [selectUserAnswers, (state, quizId) => quizId],
  (userAnswers, quizId) => userAnswers[quizId] || {}
);
