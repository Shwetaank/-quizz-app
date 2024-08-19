import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card } from "flowbite-react";

const ResultPage = () => {
  const { quizId } = useParams();
  const quiz = useSelector((state) => state.quiz.quizzes.find((q) => q.id === quizId));
  const score = useSelector((state) => state.quiz.results[quizId]);
  const totalQuestions = quiz?.questions.length || 0;

  if (!quiz || score === undefined) return <div>No result found</div>;

  return (
    <div className="w-full h-auto py-8 flex flex-col items-center justify-center px-4 sm:px-8 text-xl">
      <Card className="w-full max-w-3xl border border-gray-300 rounded-lg shadow-md p-4">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-4 text-center">
          Quiz Results
        </h1>
        <p className="text-lg font-semibold mb-4 text-center">
          Quiz: {quiz.title} ({quiz.type})
        </p>
        <p className="text-lg font-semibold mb-4 text-center">
          Your Score: {score} / {totalQuestions}
        </p>
        <p className="text-gray-600 text-center">
          {score >= 0.8 * totalQuestions
            ? "Excellent job!"
            : score >= 0.5 * totalQuestions
            ? "Good effort!"
            : "Keep trying!"}
        </p>
      </Card>
    </div>
  );
};

export default ResultPage;
