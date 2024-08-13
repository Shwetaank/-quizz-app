import { useDispatch, useSelector } from "react-redux";
import { Button, Radio } from "flowbite-react"
import { setUserAnswer, resetQuizState } from "../store/quizSlice";

const PlayQuiz = () => {
  const currentQuiz = useSelector((state) => state.quiz.currentQuiz);
  const userAnswers = useSelector((state) => state.quiz.userAnswers);
  const dispatch = useDispatch();

  const handleAnswerSelect = (index) => {
    dispatch(setUserAnswer({ questionIndex: index, answer: userAnswers[index] }));
  };

  const handleSubmitQuiz = () => {
    const correctAnswers = currentQuiz.options.map(
      (opt, index) => userAnswers[index] === opt.correctAnswer
    );
    const score = correctAnswers.filter(Boolean).length;
    alert(`Your score is ${score} / ${currentQuiz.options.length}`);
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
              {currentQuiz.options.map((option, index) => (
                <div key={index} className="mb-4">
                  <Radio
                    id={`option-${index}`}
                    name="quiz-options"
                    label={option}
                    onChange={() => handleAnswerSelect(index)}
                    checked={userAnswers[index] === option}
                  />
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
