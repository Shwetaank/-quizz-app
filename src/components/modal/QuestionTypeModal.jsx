import PropTypes from 'prop-types';
import { Modal, Button } from "flowbite-react";
import { useEffect, useRef } from 'react';

const QuestionTypeModal = ({ isOpen, onClose, onSelectType, selectedType }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    // Function to handle clicks outside the modal
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    // Add event listener if the modal is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up event listener when the modal is closed
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      className="bg-transparent backdrop-blur-sm"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg"
      >
        <Modal.Header className="text-center text-lg font-semibold">
          Select Question Type
        </Modal.Header>
        <Modal.Body className="py-6">
          <div className="flex flex-col gap-4">
            {/* Button for selecting MCQ (Single Correct) */}
            <Button
              gradientMonochrome="purple"
              onClick={() => onSelectType("mcq-single")}
              color={selectedType === "mcq-single" ? "primary" : "light"}
              className="w-full text-left"
            >
              MCQ (Single Correct)
            </Button>
            {/* Button for selecting Short Answer */}
            <Button
              gradientMonochrome="purple"
              onClick={() => onSelectType("short-answer")}
              color={selectedType === "short-answer" ? "primary" : "light"}
              className="w-full text-left"
            >
              Short Answer (2 words)
            </Button>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

// PropTypes for type-checking props
QuestionTypeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelectType: PropTypes.func.isRequired,
  selectedType: PropTypes.string.isRequired,
};

export default QuestionTypeModal;
