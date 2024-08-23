import PropTypes from "prop-types";
import { Modal, Button } from "flowbite-react";
import { useEffect, useRef } from "react";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  // Reference to the modal element to detect clicks outside
  const modalRef = useRef(null);

  useEffect(() => {
    // Handler to close the modal when clicking outside of it
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    // Add event listener when modal is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up event listener when modal is closed or unmounted
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
        <Modal.Footer className="flex justify-end gap-4">
          {/* Button to cancel and close the modal */}
          <Button gradientMonochrome="purple" outline onClick={onClose}>
            Cancel
          </Button>
          {/* Button to confirm deletion */}
          <Button onClick={onConfirm} gradientMonochrome="pink">
            Delete
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

// Define prop types for the component
ConfirmDeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmDeleteModal;
