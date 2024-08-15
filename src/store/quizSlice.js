import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

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
      const newQuiz = {
        ...action.payload.quiz,
        id: nanoid(),
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
      const savedQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
      state.quizzes = savedQuizzes;
    },
    setCurrentQuiz(state, action) {
      state.currentQuiz = state.quizzes.find((quiz) => quiz.id === action.payload);
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
  toggleQuizStatus,
} = quizSlice.actions;

export default quizSlice.reducer;
