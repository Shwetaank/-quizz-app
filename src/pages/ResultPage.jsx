import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button } from "flowbite-react";
import { FaRedo, FaHome, FaGift } from "react-icons/fa";
import { useUser } from "@clerk/clerk-react";
import ResultTitleSwitcher from "../components/titleSwitcher/ResultTitleSwitcher";
import { useEffect, useState } from "react";

const ResultPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  
  // Always call hooks
  const quiz = useSelector((state) =>
    state.quiz.quizzes.find((q) => q.id === quizId)
  );
  const score = useSelector((state) => state.quiz.results[quizId]);

  // Use local state to handle conditional logic
  const [storedQuiz, setStoredQuiz] = useState(null);
  const [storedScore, setStoredScore] = useState(null);

  useEffect(() => {
    // Retrieve quiz data from local storage
    const localQuiz = JSON.parse(localStorage.getItem(`quiz-${quizId}`));
    const localScore = localStorage.getItem(`score-${quizId}`);

    setStoredQuiz(localQuiz || quiz);
    setStoredScore(localScore ? parseInt(localScore) : score);
  }, [quizId, quiz, score]);

  const currentQuiz = storedQuiz;
  const currentScore = storedScore;
  const totalQuestions = currentQuiz?.questions.length || 0;
  const accuracy = totalQuestions ? (currentScore / totalQuestions) * 100 : 0;

  // Default feedback and quote
  let feedback = "";
  let quote = "";
  let button = null;

  // Determine feedback, quote, and button based on accuracy
  if (accuracy < 65) {
    feedback = "🚫 You failed the test. Keep trying!";
    quote = "“Success is not final, failure is not fatal: It is the courage to continue that counts.” — Winston Churchill";
  } else if (accuracy < 96) {
    feedback = "👍 Good effort! Keep working to improve.";
    quote = "“Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.” — Albert Schweitzer";
  } else if (accuracy < 100) {
    feedback = "🌟 Excellent job! You did very well.";
    quote = "“Success is not the result of spontaneous combustion. You must set yourself on fire.” — Arnold H. Glasow";
  } else {
    feedback = "🎉 Perfect score! You nailed it!";
    quote = "“The only limit to our realization of tomorrow is our doubts of today.” — Franklin D. Roosevelt";
    button = (
      <Button
        onClick={() => navigate("/surprise-quiz")}
        className="mt-4"
        gradientMonochrome="pink"
        icon={FaGift}
      >
        Try Our Special Surprise Quiz
      </Button>
    );
  }

  // Render fallback UI if quiz or score is not found
  if (!currentQuiz || currentScore === undefined) {
    return (
      <div className="w-full h-auto py-8 flex flex-col items-center justify-center px-4 sm:px-8 text-xl">
        <Card className="w-full bg-transparent max-w-3xl border border-gray-300 rounded-lg shadow-md p-4">
          <p className="text-lg font-semibold mb-4 text-center">No result found</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full h-auto py-8 flex flex-col items-center justify-center px-4 sm:px-8 text-xl">
      <Card className="w-full bg-transparent max-w-3xl border border-gray-300 rounded-lg shadow-md">
        <div className="text-center border border-gray-300 rounded-lg shadow-md">
          <ResultTitleSwitcher />
          <p className="mb-2">
            Quiz Type :- {currentQuiz.title} ({currentQuiz.type})
          </p>
        </div>
        <p className="text-lg font-semibold mb-4 text-center">
          Dear {user?.firstName || "User"}
        </p>
        <p className="text-lg font-semibold mb-4 text-center">
          Your Score: {currentScore} / {totalQuestions} ({accuracy.toFixed(2)}%)
        </p>
        <p className="text-gray-600 text-center mb-4" aria-live="polite">
          {feedback}
        </p>
        <p className="text-gray-600 text-center mb-4" aria-live="polite">
          {quote}
        </p>
        {button}
        <div className="flex justify-center mt-4 gap-10">
          <Button
            onClick={() => navigate(`/quiz/${quizId}`)}
            className="mr-2"
            gradientMonochrome="purple"
            icon={FaRedo}
          >
            Try Again
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="ml-2"
            gradientMonochrome="purple"
            icon={FaHome}
          >
            Go Home
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ResultPage;
