/**
 * Returns a user-friendly label for a given quiz type.
 *
 * @param {string} type - The type of the quiz (e.g., 'MCQ-Single', 'Short Answer').
 * @returns {string} - A descriptive label for the quiz type.
 */
export const getQuizTypeLabel = (type) => {
  switch (type) {
    case "MCQ-Single":
      return "MCQ (Single Correct)"; // Label for multiple-choice questions with a single correct answer
    case "Short Answer":
      return "Short Answer"; // Label for questions requiring short text answers
    default:
      return "Not Specified"; // Default label for unrecognized or unspecified quiz types
  }
};
