import PropTypes from "prop-types";
import { TextInput } from "flowbite-react";

const ShortAnswerForm = ({ question, answer, setCurrentQuestion }) => {
  return (
    <div className="flex flex-col items-center p-6 border rounded-lg shadow-lg bg-white w-full max-w-4xl mx-auto">
      {/* Input for the question text */}
      <TextInput
        type="text"
        placeholder="Enter the question"
        value={question}
        onChange={(e) =>
          setCurrentQuestion((prev) => ({
            ...prev,
            question: e.target.value,
          }))
        }
        required
        className="mb-4 w-full"
      />
      {/* Input for the short answer with a character limit */}
      <TextInput
        type="text"
        placeholder="Enter the short answer (max 10 characters)"
        value={answer}
        onChange={(e) =>
          setCurrentQuestion((prev) => ({
            ...prev,
            answer: e.target.value.slice(0, 10), // Limit answer to 10 characters
          }))
        }
        required
        className="mb-4 w-full"
      />
    </div>
  );
};

// PropTypes for validating component props
ShortAnswerForm.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  setCurrentQuestion: PropTypes.func.isRequired,
};

export default ShortAnswerForm;
