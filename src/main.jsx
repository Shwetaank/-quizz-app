import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./auth/SignInPage.jsx";
import Home from "./pages/Home";
import AboutMe from "./pages/AboutMe";
import { ClerkProvider } from "@clerk/clerk-react";
import PlayQuiz from "./pages/PlayQuiz";
import MyQuizzes from "./pages/MyQuizzes";

// Import your publishable key
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
    <div className="w-screen h-screen bg-gradient-to-b from-blue-100 to-red-100">
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <RouterProvider router={router} />
      </ClerkProvider>
    </div>
  </StrictMode>
);
