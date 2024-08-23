import PropTypes from "prop-types";
import { Modal, Button } from "flowbite-react";
import { getQuizTypeLabel } from "../../utils/getQuizTypeLabel";

const QuizDetailModal = ({ isOpen, onClose, quiz }) => {
  // Render nothing if modal is not open or quiz data is missing
  if (!isOpen || !quiz) return null;

  // Close modal handler
  const handleClose = () => {
    onClose();
  };

  // Render details for a single question
  const renderQuestionDetails = (question, index) => (
    <div key={index} className="mb-4">
      <h3 className="text-lg font-semibold">Question {index + 1}</h3>
      <p className="mb-2">{question.question}</p>
      {quiz.type === "MCQ-Single" ? (
        <ul className="list-disc pl-5">
          {question.options.map((option, idx) => (
            <li
              key={idx}
              className={`mb-1 ${
                question.correctAnswer === option ? "font-bold" : ""
              }`}
            >
              {option} {question.correctAnswer === option ? "(Correct)" : ""}
            </li>
          ))}
        </ul>
      ) : quiz.type === "Short Answer" ? (
        <p className="text-gray-600 font-semibold">
          Answer: {question.answer || "No answer provided"}
        </p>
      ) : null}
    </div>
  );

  return (
    <Modal
      show={isOpen}
      onClose={handleClose}
      size="lg"
      className="bg-opacity-50 bg-black backdrop-blur-sm"
    >
      <Modal.Header>
        {quiz.title} ({getQuizTypeLabel(quiz.type)})
      </Modal.Header>
      <Modal.Body>
        {/* Render details for each question in the quiz */}
        {quiz.questions.map((question, index) =>
          renderQuestionDetails(question, index)
        )}
      </Modal.Body>
      <Modal.Footer>
        {/* Button to close the modal */}
        <Button
          onClick={handleClose}
          className="ml-auto"
          gradientMonochrome="purple"
        >
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Define prop types for the component
QuizDetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  quiz: PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string),
        correctAnswer: PropTypes.string,
        answer: PropTypes.string,
      })
    ).isRequired,
  }),
};

export default QuizDetailModal;
