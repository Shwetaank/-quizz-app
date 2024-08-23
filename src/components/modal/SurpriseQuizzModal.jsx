import PropTypes from 'prop-types';
import { Modal, Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const SurpriseQuizzModal = ({ showModal, setShowModal }) => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleStartQuiz = () => {
    navigate('/quiz-setupForm');
  };

  return (
    <Modal show={showModal} onClose={() => setShowModal(false)} dismissible={true}>
      <Modal.Header>
        Surprise Quiz
      </Modal.Header>
      <Modal.Body>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">Welcome to the Surprise Quiz!</h2>
          <p className="mb-4">
            Hello <strong>{user?.firstName || 'Guest'}</strong>! You are about to embark on a Surprise Quiz that will test your knowledge with random questions.
          </p>
          <p className="mb-4">
            You will be asked to select the number of questions, categories, difficulties, and types of questions. Please follow the instructions to complete the quiz.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>Prepare</strong> for various types of questions.
            </li>
            <li>
              <strong>Follow</strong> the instructions carefully.
            </li>
            <li>
              Ensure <strong>stable internet connection</strong> throughout the quiz.
            </li>
            <li>
              <strong>Review</strong> your answers before submission.
            </li>
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="w-full flex justify-end gap-4">
          <Button
            gradientMonochrome="purple"
            onClick={() => setShowModal(false)}
            className="font-bold transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Go Back
          </Button>
          <Button
            gradientMonochrome="pink"
            onClick={handleStartQuiz}
            className="font-bold transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Start Quiz
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

SurpriseQuizzModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

export default SurpriseQuizzModal;
