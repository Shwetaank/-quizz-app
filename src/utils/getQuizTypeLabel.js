// src/utils/getQuizTypeLabel.js
export const getQuizTypeLabel = (type) => {
  switch (type) {
    case 'MCQ-Single':
      return 'MCQ (Single Correct)';
    case 'Short Answer':
      return 'Short Answer';
    default:
      return 'Not Specified';
  }
};
