import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "flowbite-react";
import { setUserAnswer, setResult, resetQuizState } from "../store/quizSlice";
import { getQuizTypeLabel } from "../utils/getQuizTypeLabel";
import ResultLoadingSpinner from "../components/spinner/ResultLoadingSpinner";

const QuizPage = () => {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Memoize the quiz
  const quiz = useSelector((state) =>
    state.quiz.quizzes.find((q) => q.id === quizId)
  );

  // Memoize questions to avoid recalculations
  const questions = useMemo(() => quiz?.questions || [], [quiz]);

  // Memoize the current question
  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex],
    [questions, currentQuestionIndex]
  );

  const userAnswers = useSelector(
    (state) => state.quiz.userAnswers[quizId] || {}
  );

  useEffect(() => {
    dispatch(resetQuizState({ quizId }));
    return () => {
      dispatch(resetQuizState({ quizId }));
    };
  }, [dispatch, quizId]);

  const handleAnswerChange = (value) => {
    dispatch(
      setUserAnswer({
        quizId,
        questionId: currentQuestion.id,
        answer: value.trim().toLowerCase(),
      })
    );
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      calculateScore();
      navigate(`/results/${quizId}`);
    }, 2000);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question) => {
      const userAnswer = userAnswers[question.id]?.trim().toLowerCase() || "";
      const correctAnswer = question.correctAnswer.trim().toLowerCase();

      if (
        (question.type === "mcq-single" && userAnswer === correctAnswer) ||
        (question.type === "short-answer" && userAnswer === correctAnswer)
      ) {
        score += 1;
      }
    });
    dispatch(setResult({ quizId, score }));
  };

  if (!quiz) return <div>Quiz not found</div>;

  return (
    <div className="w-full h-auto py-8 flex flex-col items-center justify-center px-4 sm:px-8 text-xl">
      <Card className="w-full max-w-3xl border border-gray-300 rounded-lg shadow-md p-4">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-4 text-center">
          {quiz.title}
        </h1>
        <p className="text-lg font-semibold mb-4 text-center">
          {getQuizTypeLabel(quiz.type)}
        </p>
        {loading ? (
          <ResultLoadingSpinner />
        ) : (
          <div>
            {questions.length > 0 ? (
              <div>
                <div className="mb-4">
                  <p className="font-bold text-lg">
                    {currentQuestion.question}
                  </p>
                  {currentQuestion.type === "mcq-single" ? (
                    <div className="flex flex-col">
                      {currentQuestion.options.map((option) => (
                        <label
                          key={option}
                          className="block mb-2 cursor-pointer hover:text-blue-500 transition-colors duration-300"
                        >
                          <input
                            type="radio"
                            name={`question-${currentQuestion.id}`}
                            value={option}
                            checked={userAnswers[currentQuestion.id] === option}
                            onChange={() => handleAnswerChange(option)}
                            className="mr-2"
                            aria-label={option}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={userAnswers[currentQuestion.id] || ""}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      aria-label="Your answer"
                    />
                  )}
                </div>
                <div className="flex justify-between">
                  {currentQuestionIndex > 0 && (
                    <Button
                      onClick={handlePrevious}
                      gradientMonochrome="gray"
                      disabled={loading}
                    >
                      Previous
                    </Button>
                  )}
                  {currentQuestionIndex < questions.length - 1 ? (
                    <Button
                      onClick={handleNext}
                      gradientMonochrome="purple"
                      disabled={loading}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      gradientMonochrome="green"
                      disabled={loading}
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <p>No questions available.</p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default QuizPage;
