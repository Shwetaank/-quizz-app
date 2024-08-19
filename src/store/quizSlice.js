import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  quizzes: [],
  currentQuiz: null,
  userAnswers: {}, 
  results: {},     
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    addQuiz(state, action) {
      const newQuiz = {
        ...action.payload.quiz,
        id: nanoid(),
        type: action.payload.quiz.type,
        active: action.payload.quiz.active ?? true,
      };
      state.quizzes.push(newQuiz);
      localStorage.setItem("quizzes", JSON.stringify(state.quizzes));
    },
    deleteQuiz(state, action) {
      state.quizzes = state.quizzes.filter((quiz) => quiz.id !== action.payload);
      localStorage.setItem("quizzes", JSON.stringify(state.quizzes));
    },
    loadQuizzes(state) {
      const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
      state.quizzes = quizzes;
    },
    setCurrentQuiz(state, action) {
      state.currentQuiz = action.payload;
    },
    setUserAnswer(state, action) {
      const { quizId, questionId, answer } = action.payload;
      if (!state.userAnswers[quizId]) {
        state.userAnswers[quizId] = {};
      }
      state.userAnswers[quizId][questionId] = answer;
    },
    resetQuizState(state, action) {
      const { quizId } = action.payload;
      if (quizId) {
        state.userAnswers[quizId] = {};
      } else {
        state.currentQuiz = null;
        state.userAnswers = {};
        state.results = {};
      }
    },
    setResult(state, action) {
      const { quizId, score } = action.payload;
      state.results[quizId] = score;
    },
    toggleQuizStatus(state, action) {
      const { id, status } = action.payload;
      const quiz = state.quizzes.find((quiz) => quiz.id === id);
      if (quiz) {
        quiz.active = status;
        localStorage.setItem("quizzes", JSON.stringify(state.quizzes));
      }
    },
  },
});

export const {
  addQuiz,
  deleteQuiz,
  loadQuizzes,
  setCurrentQuiz,
  setUserAnswer,
  resetQuizState,
  setResult,
  toggleQuizStatus,
} = quizSlice.actions;

export default quizSlice.reducer;
