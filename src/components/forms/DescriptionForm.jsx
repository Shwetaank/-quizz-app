import PropTypes from "prop-types";
import { TextInput, Textarea } from "flowbite-react";

const DescriptionForm = ({ description, setCurrentQuestion }) => {
  return (
    <div className="flex flex-col items-center p-6 border rounded-lg shadow-lg bg-white w-full max-w-4xl mx-auto">
      <TextInput
        type="text"
        placeholder="Enter the question"
        value={description}
        onChange={(e) =>
          setCurrentQuestion((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
        required
        className="mb-4 w-full"
      />
      <Textarea
        placeholder="Enter the description"
        value={description}
        onChange={(e) =>
          setCurrentQuestion((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
        required
        className="w-full"
      />
    </div>
  );
};

DescriptionForm.propTypes = {
  description: PropTypes.string.isRequired,
  setCurrentQuestion: PropTypes.func.isRequired,
};

export default DescriptionForm;
