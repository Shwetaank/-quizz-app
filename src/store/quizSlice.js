// src/store/quizSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
  currentQuiz: null,
  userAnswers: {},
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    addQuiz(state, action) {
      // Initialize active status for new quizzes if it's missing
      const newQuiz = { ...action.payload.quiz, active: action.payload.quiz.active || true };
      state.quizzes.push(newQuiz);
      localStorage.setItem("quizzes", JSON.stringify(state.quizzes));
    },
    deleteQuiz(state, action) {
      state.quizzes = state.quizzes.filter((_, index) => index !== action.payload);
      localStorage.setItem("quizzes", JSON.stringify(state.quizzes));
    },
    loadQuizzes(state) {
      const savedQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
      state.quizzes = savedQuizzes;
    },
    setCurrentQuiz(state, action) {
      state.currentQuiz = action.payload;
    },
    setUserAnswer(state, action) {
      const { questionIndex, answer } = action.payload;
      state.userAnswers[questionIndex] = answer;
    },
    resetQuizState(state) {
      state.currentQuiz = null;
      state.userAnswers = {};
    },
    toggleQuizStatus(state, action) {
      const { index, status } = action.payload;
      if (state.quizzes[index]) {
        state.quizzes[index].active = status;
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
  toggleQuizStatus,
} = quizSlice.actions;

export default quizSlice.reducer;
