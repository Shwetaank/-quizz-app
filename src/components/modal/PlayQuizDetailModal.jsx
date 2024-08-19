import PropTypes from "prop-types";
import { Modal, Button } from "flowbite-react";
import { useDispatch } from "react-redux";
import { setCurrentQuiz } from "../../store/quizSlice";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { getQuizTypeLabel } from "../../utils/getQuizTypeLabel";

const calculateTimeAllocation = (numQuestions) => {
  if (numQuestions >= 2 && numQuestions <= 5) {
    return 4; // minutes
  } else if (numQuestions > 5 && numQuestions <= 10) {
    return 8; // minutes
  } else {
    return 0;
  }
};

const PlayQuizDetailModal = ({ quiz, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useUser();

  const handleStartQuiz = () => {
    dispatch(setCurrentQuiz(quiz));
    navigate(`/quiz/${quiz.id}`);
  };

  // Calculate time allocation based on the number of questions
  const timeAllocation = calculateTimeAllocation(quiz.questions.length);

  // Get the quiz type label
  const quizType = getQuizTypeLabel(quiz.type);

  return (
    <Modal show={true} onClose={onClose} dismissible={true}>
      <Modal.Header>{quiz.title}</Modal.Header>
      <Modal.Body>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">{quizType}</h2>
          <p className="mb-4">{quiz.description}</p>
          <p className="mb-4">
            Welcome <strong>{user?.firstName || "Guest"}</strong>! Below are the{" "}
            <strong>rules</strong> and <strong>guidelines</strong> for taking
            this quiz:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>Maintain integrity</strong> and avoid any form of cheating.
            </li>
            <li>
              You will have <strong>{timeAllocation} minutes</strong> to complete the quiz, based on the number of questions.
            </li>
            <li>
              <strong>Answer all questions</strong> to the best of your ability.
            </li>
            <li>
              Ensure a <strong>stable internet connection</strong> throughout the quiz.
            </li>
            <li>
              <strong>Review your answers</strong> before submitting the quiz.
            </li>
            <li>
              <strong>Avoid external aids</strong> such as search engines or textbooks.
            </li>
            <li>
              If you experience any <strong>technical issues</strong>, contact support immediately.
            </li>
          </ul>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <div className="w-full flex justify-end gap-4">
          <Button
            gradientMonochrome="pink"
            onClick={handleStartQuiz}
            className="font-bold transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Start Quiz
          </Button>
          <Button
            outline
            gradientDuoTone="purpleToPink"
            onClick={onClose}
            className="font-bold transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Go Back
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

PlayQuizDetailModal.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["MCQ-Single", "Short Answer"]).isRequired,
    description: PropTypes.string,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PlayQuizDetailModal;
