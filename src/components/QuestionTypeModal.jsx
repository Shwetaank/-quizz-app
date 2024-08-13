import PropTypes from 'prop-types';
import { Modal, Button } from "flowbite-react";
import { useEffect, useRef } from 'react';

const QuestionTypeModal = ({ isOpen, onClose, onSelectType, selectedType }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      
    >
      <div
        ref={modalRef}
        className=" sm:h- bg-white rounded-lg shadow-lg"
      >
        <Modal.Header className="text-center text-lg font-semibold">
          Select Question Type
        </Modal.Header>
        <Modal.Body className="py-6">
          <div className="flex flex-col gap-4">
            <Button
              gradientMonochrome="purple"
              onClick={() => onSelectType("mcq-single")}
              color={selectedType === "mcq-single" ? "primary" : "light"}
              className="w-full text-left"
            >
              MCQ (Single Correct)
            </Button>
            <Button
              gradientMonochrome="purple"
              onClick={() => onSelectType("short-answer")}
              color={selectedType === "short-answer" ? "primary" : "light"}
              className="w-full text-left"
            >
              Short Answer (2 words)
            </Button>
            <Button
              gradientMonochrome="purple"
              onClick={() => onSelectType("description")}
              color={selectedType === "description" ? "primary" : "light"}
              className="w-full text-left"
            >
              Description (2-4 sentences)
            </Button>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

QuestionTypeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelectType: PropTypes.func.isRequired,
  selectedType: PropTypes.string.isRequired,
};

export default QuestionTypeModal;
