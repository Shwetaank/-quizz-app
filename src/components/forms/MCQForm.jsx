import PropTypes from "prop-types";
import { Button, TextInput, Select, Alert } from "flowbite-react";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";

const MCQForm = ({
  options,
  correctAnswer,
  addOption,
  updateOption,
  deleteOption,
  setCurrentQuestion,
  currentQuestion,
}) => {
  const [warningMessage, setWarningMessage] = useState("");

  const handleOptionChange = (index, value) => {
    if (options.includes(value) && value !== options[index]) {
      setWarningMessage("Option is already in the list.");
    } else {
      setWarningMessage("");
      updateOption(index, value);
    }
  };

  const handleAddOption = () => {
    if (options.length < 4) {
      const newOption = "";
      if (options.includes(newOption)) {
        setWarningMessage("This option already exists.");
      } else {
        setWarningMessage("");
        addOption();
      }
    }
  };

  const handleCorrectAnswerChange = (e) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      correctAnswer: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col items-center p-6 border rounded-lg shadow-lg bg-white w-full max-w-4xl mx-auto">
      {/* Input for the question */}
      <TextInput
        type="text"
        placeholder="Enter question (max 100 characters)"
        value={currentQuestion.question}
        onChange={(e) =>
          setCurrentQuestion((prev) => ({
            ...prev,
            question: e.target.value.slice(0, 100),
          }))
        }
        required
        className="mb-4 w-full"
      />

      {/* Display warning message if any */}
      {warningMessage && (
        <Alert color="failure" className="mb-4">
          {warningMessage}
        </Alert>
      )}

      {/* Options list with input fields and delete buttons */}
      <div className="flex flex-col space-y-4 w-full">
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2 w-full">
            <TextInput
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              className="flex-1"
            />
            <Button
              gradientMonochrome="purple"
              onClick={() => deleteOption(index)}
              className="ml-2"
            >
              <HiOutlineTrash />
            </Button>
          </div>
        ))}
      </div>

      {/* Button to add a new option */}
      <Button
        gradientMonochrome="purple"
        onClick={handleAddOption}
        disabled={options.length >= 4}
        className="mt-4 w-full"
      >
        Add Option
      </Button>

      {/* Dropdown for selecting the correct answer */}
      <Select
        name="correctAnswer"
        value={correctAnswer}
        onChange={handleCorrectAnswerChange}
        required
        className="mt-4 w-full"
      >
        <option value="">Select Correct Answer</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  );
};

MCQForm.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctAnswer: PropTypes.string.isRequired,
  addOption: PropTypes.func.isRequired,
  updateOption: PropTypes.func.isRequired,
  deleteOption: PropTypes.func.isRequired,
  setCurrentQuestion: PropTypes.func.isRequired,
  currentQuestion: PropTypes.shape({
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    correctAnswer: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
};

export default MCQForm;
