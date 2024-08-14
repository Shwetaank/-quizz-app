import PropTypes from "prop-types";
import { TextInput, Textarea, Alert } from "flowbite-react";
import { useState } from "react";

const DescriptionForm = ({ question, description, setCurrentQuestion }) => {
  const [warningMessage, setWarningMessage] = useState("");

  const handleQuestionChange = (e) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      question: e.target.value,
    }));
  };

  const handleDescriptionChange = (e) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col items-center p-6 border rounded-lg shadow-lg bg-white w-full max-w-4xl mx-auto">
      <TextInput
        type="text"
        placeholder="Enter the description question"
        value={question}
        onChange={handleQuestionChange}
        required
        className="mb-4 w-full"
      />

      <Textarea
        placeholder="Provide a description"
        value={description}
        onChange={handleDescriptionChange}
        rows={4}
        className="mb-4 w-full"
      />

      {warningMessage && (
        <Alert color="failure" className="mb-4">
          {warningMessage}
        </Alert>
      )}
    </div>
  );
};

DescriptionForm.propTypes = {
  question: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  setCurrentQuestion: PropTypes.func.isRequired,
};

export default DescriptionForm;
