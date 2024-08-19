"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { setUserAnswer, setResult, resetQuizState } from "../store/quizSlice";
import { selectQuizById, selectUserAnswersByQuizId } from "../store/selectors";
import ResultLoadingSpinner from "../components/spinner/ResultLoadingSpinner";
import { getQuizTypeLabel } from "../utils/getQuizTypeLabel";
import { useUser } from "@clerk/clerk-react"; // Import useUser hook

const NoQuestionsAvailable = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center text-lg font-semibold text-gray-700">
      <p>No questions available at the moment.</p>
      <Button
        onClick={() => navigate("/my-quizzes")}
        gradientMonochrome="purple"
      >
        View Other Quizzes
      </Button>
    </div>
  );
};

const QuizPage = () => {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useUser();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [lastMinute, setLastMinute] = useState(null);

  const quiz = useSelector((state) => selectQuizById(state, quizId));
  const userAnswers = useSelector((state) =>
    selectUserAnswersByQuizId(state, quizId)
  );

  const questions = useMemo(() => quiz?.questions || [], [quiz]);
  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex],
    [questions, currentQuestionIndex]
  );

  useEffect(() => {
    if (!quiz) return;

    dispatch(resetQuizState({ quizId }));

    const totalQuestions = questions.length;
    const initialTime = totalQuestions <= 5 ? 4 * 60 : 8 * 60;
    setTimeLeft(initialTime);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTimeLeft = prev - 1;
        const newMinutes = Math.floor(newTimeLeft / 60);

        if (newTimeLeft <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }

      
        if (lastMinute !== null && newMinutes < lastMinute) {
          showAlertMessage(`${newMinutes} minute(s) remaining!`);
        }
        setLastMinute(newMinutes);

        return newTimeLeft;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      dispatch(resetQuizState({ quizId }));
    };
  }, [dispatch, quizId, questions.length, quiz, lastMinute]);

  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 4000);
  };

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
    if (validateCurrentQuestion()) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    } else {
      showAlertMessage("Please select an option or enter an answer.");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (validateAllQuestions()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        calculateScore();
        navigate(`/results/${quizId}`);
      }, 2000);
    } else {
      showAlertMessage("Please answer all questions before submitting.");
    }
  };

  const validateCurrentQuestion = () => {
    const answer = userAnswers[currentQuestion.id]?.trim();
    return answer !== undefined && answer !== "";
  };

  const validateAllQuestions = () => {
    return questions.every((question) => {
      const answer = userAnswers[question.id]?.trim();
      return answer !== undefined && answer !== "";
    });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question) => {
      const userAnswer = userAnswers[question.id]?.trim().toLowerCase() || "";
      const correctAnswer =
        question.type === "short-answer"
          ? question.answer.trim().toLowerCase()
          : question.correctAnswer.trim().toLowerCase();

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

  // Format the remaining time in minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="w-full h-auto py-8 flex flex-col items-center justify-center px-4 sm:px-8 text-xl">
      <Card className="w-full max-w-3xl border border-gray-300 rounded-lg shadow-xl p-4 bg-transparent">
        {/* Title centered and quiz type below it with border */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold">{quiz.title}</h1>
          <p className="text-lg font-semibold border-b border-gray-300 pb-2 mb-2 shadow-xl">
            {getQuizTypeLabel(quiz.type)}
          </p>
          <p className="text-lg font-semibold text-gray-600 text-left mb-2 mt-2">
            Welcome, <strong> {user?.firstName || "User"}</strong>
          </p>
        </div>
        <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-4 shadow-md">
          <p className="text-lg font-semibold ml-4">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <p className="text-lg font-semibold mr-4">
            Time Left:
            <span className="text-blue-500 ml-2">
              {minutes} M : {seconds < 10 ? `0${seconds}` : seconds} S
            </span>
          </p>
        </div>
        {showAlert && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">{alertMessage}</span>
          </Alert>
        )}
        {loading ? (
          <ResultLoadingSpinner />
        ) : (
          <div>
            {questions.length > 0 ? (
              <div>
                <div className="mb-4">
                  <p className="font-bold text-lg flex justify-center items-center border-b border-gray-300 pb-4 shadow-md">
                    {currentQuestion.question}
                  </p>
                  {currentQuestion.type === "mcq-single" ? (
                    <div className="mt-4">
                      {currentQuestion.options.map((option, index) => (
                        <label key={index} className="block mt-2">
                          <input
                            type="radio"
                            name={`question-${currentQuestion.id}`}
                            value={option}
                            checked={userAnswers[currentQuestion.id] === option}
                            onChange={() => handleAnswerChange(option)}
                            className="mr-2"
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
                      className="w-full border border-gray-300 rounded-lg p-2 shadow-md"
                      aria-label="Short answer"
                    />
                  )}
                </div>
                <div className="flex justify-between mt-4">
                  <Button
                    gradientMonochrome="purple"
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    gradientMonochrome="purple"
                    onClick={handleNext}
                    disabled={currentQuestionIndex === questions.length - 1}
                  >
                    Next
                  </Button>
                </div>
                <div className="mt-4 flex justify-center">
                  <Button
                    gradientMonochrome="pink"
                    onClick={handleSubmit}
                    disabled={timeLeft === 0}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            ) : (
              <NoQuestionsAvailable />
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default QuizPage;
