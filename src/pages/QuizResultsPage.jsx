import { useEffect, useState } from "react";
import { Button, Card } from "flowbite-react";
import { FaRedo, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import SurpriseQuizzModal from "../components/modal/SurpriseQuizzModal";
import ResultTitleSwitcher from "../components/titleSwitcher/ResultTitleSwitcher";
import DownloadCertificate from "../components/DownloadCertificate";

const quotes = {
  low: {
    feedback: "🚫 You failed the test. Keep trying!",
    quote:
      "“Success is not final, failure is not fatal: It is the courage to continue that counts.” — Winston Churchill",
  },
  medium: {
    feedback: "👍 Good effort! Keep working to improve.",
    quote:
      "“Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.” — Albert Schweitzer",
  },
  high: {
    feedback: "🌟 Excellent job! You did very well.",
    quote:
      "“Success is not the result of spontaneous combustion. You must set yourself on fire.” — Arnold H. Glasow",
  },
  perfect: {
    feedback: "🎉 Perfect score! You nailed it!",
    quote:
      "“The only limit to our realization of tomorrow is our doubts of today.” — Franklin D. Roosevelt",
  },
};

const QuizResultsPage = () => {
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(15);
  const [feedback, setFeedback] = useState("");
  const [quote, setQuote] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const storedScore = localStorage.getItem("quizScore");
    const storedQuestions = localStorage.getItem("totalQuestions");

    if (storedScore && storedQuestions) {
      const parsedScore = parseInt(storedScore, 10);
      const parsedQuestions = parseInt(storedQuestions, 10) || totalQuestions;
      setScore(parsedScore);
      setTotalQuestions(parsedQuestions);

      setFeedbackAndQuote((parsedScore / parsedQuestions) * 100);
    } else {
      navigate("/quiz-setupForm");
    }
  }, [navigate, totalQuestions]);

  const setFeedbackAndQuote = (accuracy) => {
    if (accuracy < 65) {
      setFeedback(quotes.low.feedback);
      setQuote(quotes.low.quote);
    } else if (accuracy < 96) {
      setFeedback(quotes.medium.feedback);
      setQuote(quotes.medium.quote);
    } else if (accuracy < 100) {
      setFeedback(quotes.high.feedback);
      setQuote(quotes.high.quote);
    } else {
      setFeedback(quotes.perfect.feedback);
      setQuote(quotes.perfect.quote);
    }
  };

  const handleRetake = () => {
    localStorage.removeItem("quizData");
    localStorage.removeItem("quizScore");
    navigate("/quiz-setupForm");
  };

  return (
    <div className="w-full h-auto py-8 flex flex-col items-center justify-center px-4 sm:px-8 text-xl">
      <motion.div
        className="w-full bg-transparent max-w-3xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full bg-transparent border border-gray-300 rounded-lg shadow-md p-4">
          <motion.div
            className="text-center border border-gray-300 rounded-lg shadow-md mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ResultTitleSwitcher title="Your Score" />
            <p className="text-lg font-bold mb-2">
              {score} / {totalQuestions} (
              {((score / totalQuestions) * 100).toFixed(2)}%)
            </p>
          </motion.div>
          <p className="text-lg font-semibold mb-4 text-center">
            Dear {user?.firstName || "User"},
          </p>
          <p className="text-lg font-semibold mb-4 text-center">{feedback}</p>
          <p
            className="text-gray-600 text-center mb-4"
            aria-live="polite"
            dangerouslySetInnerHTML={{ __html: quote }}
          />
          {feedback.startsWith("🎉") && (
            <DownloadCertificate
              score={score}
              totalQuestions={totalQuestions}
            />
          )}
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
              onClick={() => navigate("/quiz-setupForm")}
              className="ml-2"
              gradientMonochrome="purple"
              icon={FaHome}
            >
              Go Home
            </Button>
          </div>
        </Card>
      </motion.div>
      <SurpriseQuizzModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default QuizResultsPage;
