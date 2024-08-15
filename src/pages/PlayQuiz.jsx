import { useSelector } from "react-redux";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";

const PlayQuiz = () => {
  const quizzes = useSelector((state) => state.quiz.quizzes);

  // Filter active quizzes
  const activeQuizzes = quizzes.filter((quiz) => quiz.active);

  return (
    <div className="w-full h-auto py-8 flex flex-col items-center justify-center px-4 sm:px-8 text-xl">
      <div className="w-full max-w-7xl">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 p-4 border-b border-gray-300 text-center">
          Play Quizzes
        </h2>
        {activeQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeQuizzes.map((quiz) => (
              <Card key={quiz.id} className="shadow-lg">
                <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
                <p className="mb-4">
                  Type: {quiz.questions.length > 0
                    ? quiz.questions[0].type === "mcq-single"
                      ? "MCQ (Single Correct)"
                      : "Short Answer"
                    : "N/A"}
                </p>
                <Link to={`/quiz/${quiz.id}`}>
                  <Button gradientMonochrome="purple" className="w-full">
                    Start Quiz
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center p-4">
            <p className="text-lg mb-4">No active quizzes available.</p>
            <Link to="/create-quiz">
              <Button gradientMonochrome="purple">Create Your Quiz</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayQuiz;
