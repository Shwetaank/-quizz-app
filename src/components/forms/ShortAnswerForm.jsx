import PropTypes from "prop-types";
import { TextInput } from "flowbite-react";

const ShortAnswerForm = ({ answer, setCurrentQuestion }) => {
  return (
    <TextInput
      className="mb-4"
      type="text"
      name="answer"
      placeholder="Enter the short answer"
      value={answer}
      onChange={(e) =>
        setCurrentQuestion((prev) => ({
          ...prev,
          question: e.target.value,
        }))
      }
      required
    />
  );
};

ShortAnswerForm.propTypes = {
  answer: PropTypes.string.isRequired,
  setCurrentQuestion: PropTypes.func.isRequired,
};

export default ShortAnswerForm;
