import PropTypes from "prop-types";
import { Button, TextInput, Select } from "flowbite-react";

const MCQForm = ({
  options,
  correctAnswer,
  addOption,
  updateOption,
  deleteOption,
  setCurrentQuestion,
}) => {
  return (
    <div className="space-y-4">
      <TextInput
        type="text"
        placeholder="Enter question (max 20 characters)"
        value={correctAnswer}
        onChange={(e) =>
          setCurrentQuestion((prev) => ({
            ...prev,
            question: e.target.value.slice(0, 20),
          }))
        }
        required
      />

      {options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <TextInput
            type="text"
            value={option}
            onChange={(e) => updateOption(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
          />
          <Button color="red" onClick={() => deleteOption(index)}>
            Delete
          </Button>
        </div>
      ))}

      <Button onClick={addOption} disabled={options.length >= 4}>
        Add Option
      </Button>

      <Select
        name="correctAnswer"
        value={correctAnswer}
        onChange={(e) =>
          setCurrentQuestion((prev) => ({
            ...prev,
            correctAnswer: e.target.value,
          }))
        }
        required
      >
        <option value="">Select Correct Answer</option>
        {options.map((_, index) => (
          <option key={index} value={index}>
            Option {index + 1}
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
};

export default MCQForm;
