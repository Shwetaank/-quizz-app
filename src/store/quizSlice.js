import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

// Initial state of the quiz slice
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
    // Add a new quiz with a unique ID
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

    // Remove a quiz by its ID
    deleteQuiz(state, action) {
      state.quizzes = state.quizzes.filter((quiz) => quiz.id !== action.payload);
      localStorage.setItem("quizzes", JSON.stringify(state.quizzes));
    },

    // Load quizzes from localStorage
    loadQuizzes(state) {
      const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
      state.quizzes = quizzes;
    },

    // Set the currently active quiz
    setCurrentQuiz(state, action) {
      state.currentQuiz = action.payload;
    },

    // Save user answers for a specific quiz
    setUserAnswer(state, action) {
      const { quizId, questionId, answer } = action.payload;
      if (!state.userAnswers[quizId]) {
        state.userAnswers[quizId] = {};
      }
      state.userAnswers[quizId][questionId] = answer;
    },

    // Reset quiz state for a specific quiz or globally
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

    // Store the result (score) for a specific quiz
    setResult(state, action) {
      const { quizId, score } = action.payload;
      state.results[quizId] = score;
    },

    // Toggle the active status of a quiz
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

// Export actions for use in components
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

// Export the reducer to be used in the store
export default quizSlice.reducer;
