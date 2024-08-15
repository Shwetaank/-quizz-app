import PropTypes from "prop-types";
import { Modal, Button } from "flowbite-react";
import { useEffect, useRef } from "react";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      className="bg-transparent backdrop-blur-sm"
    >
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg">
        <Modal.Header className="text-center text-lg font-semibold">
          Confirm Deletion
        </Modal.Header>
        <Modal.Body className="py-6">
          <p>Are you sure you want to delete this quiz?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="red" onClick={onConfirm} gradientMonochrome="purple">
            Delete
          </Button>
          <Button color="gray" outline onClick={onClose}>
            Cancel
          </Button> 
        </Modal.Footer>
      </div>
    </Modal>
  );
};

ConfirmDeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmDeleteModal;
