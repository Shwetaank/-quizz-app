import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ClerkProvider } from "@clerk/clerk-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store";
import SignInPage from "./auth/SignInPage.jsx";
import Home from "./pages/Home";
import AboutMe from "./pages/AboutMe";
import PlayQuiz from "./pages/PlayQuiz";
import MyQuizzes from "./pages/MyQuizzes";
import CreateQuiz from "./pages/CreateQuiz.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import QuizSetupForm from "./components/forms/QuizSetupForm .jsx";
import QuizPlayPage from "./pages/QuizPlayPage.jsx";
import QuizResultsPage from "./pages/QuizResultsPage.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/play-quiz",
        element: <PlayQuiz />,
      },
      {
        path: "/my-quizzes",
        element: <MyQuizzes />,
      },
      {
        path: "/about-me",
        element: <AboutMe />,
      },
      {
        path: "/create-quiz",
        element: <CreateQuiz />,
      },
      {
        path: "/quiz/:quizId",
        element: <QuizPage />,
      },
      {
        path: "/results/:quizId",
        element: <ResultPage />,
      },
      {
        path: "/quiz-setupForm",
        element: <QuizSetupForm />,
      },
      {
        path: "/quiz-play",
        element: <QuizPlayPage />,
      },
      {
        path: "/quiz-results",
        element: <QuizResultsPage />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <div className="w-screen h-screen bg-gradient-to-b from-blue-100 to-red-100">
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <RouterProvider router={router} />
        </ClerkProvider>
      </div>
    </Provider>
  </StrictMode>
);
