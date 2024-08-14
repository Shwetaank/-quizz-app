// src/pages/PlayQuiz.jsx
import { useDispatch, useSelector } from "react-redux";
import { Button, Radio } from "flowbite-react";
import { setUserAnswer, resetQuizState } from "../store/quizSlice";

const PlayQuiz = () => {
  const currentQuiz = useSelector((state) => state.quiz.currentQuiz);
  const userAnswers = useSelector((state) => state.quiz.userAnswers);
  const dispatch = useDispatch();

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    dispatch(setUserAnswer({ questionIndex, answer: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    const correctAnswers = currentQuiz.questions.map(
      (question, index) => userAnswers[index] === question.correctAnswer
    );
    const score = correctAnswers.filter(Boolean).length;
    alert(`Your score is ${score} / ${currentQuiz.questions.length}`);
    dispatch(resetQuizState());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-red-100 flex flex-col">
      <main className="flex-grow container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-6">Play Quiz</h2>
        {currentQuiz ? (
          <>
            <h3 className="text-xl font-semibold mb-4">{currentQuiz.title}</h3>
            <div>
              {currentQuiz.questions.map((question, index) => (
                <div key={index} className="mb-4">
                  <span className="font-semibold">{question.question}</span>
                  <div>
                    {Array.isArray(question.options) && question.options.map((option, oIndex) => (
                      <div key={oIndex} className="mb-2">
                        <Radio
                          id={`option-${index}-${oIndex}`}
                          name={`quiz-${index}`}
                          label={option}
                          onChange={() => handleAnswerSelect(index, oIndex)}
                          checked={userAnswers[index] === oIndex}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Button color="green" onClick={handleSubmitQuiz}>
              Submit Quiz
            </Button>
          </>
        ) : (
          <p>No quiz selected.</p>
        )}
      </main>
    </div>
  );
};

export default PlayQuiz;
