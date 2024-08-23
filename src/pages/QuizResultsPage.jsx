import { useEffect, useState } from "react";
import { Button, Card } from "flowbite-react";
import { FaRedo, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const QuizResultsPage = () => {
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(15);
  const [feedback, setFeedback] = useState("");
  const [quote, setQuote] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedScore = localStorage.getItem("quizScore");
    const storedQuestions = localStorage.getItem("totalQuestions");

    if (storedScore) {
      const parsedScore = parseInt(storedScore, 10);
      const parsedQuestions = parseInt(storedQuestions, 10) || totalQuestions;
      setScore(parsedScore);
      setTotalQuestions(parsedQuestions);

      setFeedbackAndQuote((parsedScore / parsedQuestions) * 100);
    } else {
      navigate("/");
    }
  }, [navigate, totalQuestions]);

  const setFeedbackAndQuote = (accuracy) => {
    if (accuracy < 65) {
      setFeedback("🚫 You failed the test. Keep trying!");
      setQuote(
        "“Success is not final, failure is not fatal: It is the courage to continue that counts.” — Winston Churchill"
      );
    } else if (accuracy < 96) {
      setFeedback("👍 Good effort! Keep working to improve.");
      setQuote(
        "“Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.” — Albert Schweitzer"
      );
    } else if (accuracy < 100) {
      setFeedback("🌟 Excellent job! You did very well.");
      setQuote(
        "“Success is not the result of spontaneous combustion. You must set yourself on fire.” — Arnold H. Glasow"
      );
    } else {
      setFeedback("🎉 Perfect score! You nailed it!");
      setQuote(
        "“The only limit to our realization of tomorrow is our doubts of today.” — Franklin D. Roosevelt"
      );
    }
  };

  const handleRetake = () => {
    localStorage.removeItem("quizData");
    localStorage.removeItem("quizScore");
    navigate("/");
  };

  return (
    <div className="w-full h-auto py-8 flex flex-col items-center justify-center px-4 sm:px-8 text-xl">
      <Card className="w-full max-w-3xl border border-gray-300 rounded-lg shadow-xl p-4 bg-transparent text-center">
        <div className="text-center border border-gray-300 rounded-lg shadow-md mb-4">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Your Score</h1>
          <p className="text-lg font-bold mb-2">
            {score} / {totalQuestions} ({((score / totalQuestions) * 100).toFixed(2)}%)
          </p>
        </div>
        <p className="text-lg font-semibold mb-4 text-center" aria-live="polite">
          {feedback}
        </p>
        <p className="text-gray-600 text-center mb-4" aria-live="polite">
          {quote}
        </p>
        <div className="flex justify-center mt-4 gap-10">
          <Button
            onClick={handleRetake}
            className="mr-2"
            gradientMonochrome="purple"
            icon={FaRedo}
          >
            Retake Quiz
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

export default QuizResultsPage;
