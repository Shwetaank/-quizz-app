import PropTypes from "prop-types";
import { TextInput, Alert } from "flowbite-react";
import { useState } from "react";

const ShortAnswerForm = ({ question, setCurrentQuestion }) => {
  const [warningMessage, setWarningMessage] = useState("");

  const handleQuestionChange = (e) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      question: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col items-center p-6 border rounded-lg shadow-lg bg-white w-full max-w-4xl mx-auto">
      <TextInput
        type="text"
        placeholder="Enter the short answer question"
        value={question}
        onChange={handleQuestionChange}
        required
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

ShortAnswerForm.propTypes = {
  question: PropTypes.string.isRequired,
  setCurrentQuestion: PropTypes.func.isRequired,
};

export default ShortAnswerForm;
