import PropTypes from "prop-types";
import { TextInput } from "flowbite-react";

const DescriptionForm = ({ description, setCurrentQuestion }) => {
  return (
    <TextInput
      className="mb-4"
      type="text"
      name="description"
      placeholder="Enter the description"
      value={description}
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

DescriptionForm.propTypes = {
  description: PropTypes.string.isRequired,
  setCurrentQuestion: PropTypes.func.isRequired,
};

export default DescriptionForm;
