import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Alert, TextInput, Textarea } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { addQuiz } from "../store/quizSlice";
import QuestionTypeModal from "../components/QuestionTypeModal";
import MCQForm from "../components/forms/MCQForm";
import ShortAnswerForm from "../components/forms/ShortAnswerForm";
import DescriptionForm from "../components/forms/DescriptionForm";
import TitleSwitcher from "../components/titleSwitcher/TitleSwitcher";

const CreateQuiz = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const [quizDetails, setQuizDetails] = useState({
    title: "",
    description: "",
  });
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: [],
    correctAnswer: "",
    description: "",
  });
  const [questions, setQuestions] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("failure");
  const dispatch = useDispatch();

  const handleQuestionTypeChange = (type) => {
    setSelectedQuestionType(type);
    setIsModalOpen(false);
  };

  const handleSaveQuestion = () => {
    if (
      currentQuestion.question &&
      (selectedQuestionType === "MCQ" ? currentQuestion.options.length >= 2 && currentQuestion.correctAnswer !== "" : true)
    ) {
      setQuestions([...questions, { ...currentQuestion, number: questions.length + 1, createdDate: new Date().toISOString() }]);
      setCurrentQuestion({
        question: "",
        options: [],
        correctAnswer: "",
        description: "",
      });
      setAlertMessage("Question added successfully.");
      setAlertType("success");
    } else {
      setAlertMessage("Please fill all required fields correctly.");
      setAlertType("failure");
    }
  };

  const handleSubmitQuiz = () => {
    if (questions.length >= 2 && questions.length <= 15) {
      dispatch(
        addQuiz({
          index: -1,
          quiz: {
            title: quizDetails.title,
            description: quizDetails.description,
            questions,
          },
        })
      );
      // Reset quiz details and questions
      setQuizDetails({
        title: "",
        description: "",
      });
      setQuestions([]);
      setCurrentQuestion({
        question: "",
        options: [],
        correctAnswer: "",
        description: "",
      });
      setAlertMessage("Quiz submitted successfully.");
      setAlertType("success");
    } else {
      setAlertMessage("Please add at least 2 questions.");
      setAlertType("failure");
    }
  };

  return (
    <div className="w-full h-auto py-8 flex flex-col items-center justify-center px-4 sm:px-8 text-xl">
      <main className="w-full max-w-7xl border border-gray-300 rounded-lg shadow-md p-8">
        <TitleSwitcher />

        {alertMessage && (
          <Alert color={alertType} icon={HiInformationCircle} className="mb-4">
            <span className="font-medium">
              {alertType === "success" ? "Success!" : "Error!"}
            </span>{" "}
            {alertMessage}
          </Alert>
        )}

        <QuestionTypeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelectType={handleQuestionTypeChange}
          selectedType={selectedQuestionType}
        />

        {selectedQuestionType && (
          <div className="flex flex-col items-center">
            <TextInput
              className="mb-4 border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 w-full max-w-4xl mx-auto"
              type="text"
              name="title"
              placeholder="Enter quiz title"
              value={quizDetails.title}
              onChange={(e) =>
                setQuizDetails({
                  ...quizDetails,
                  title: e.target.value,
                })
              }
              required
            />

            <Textarea
              className="mb-4 border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 w-full max-w-4xl mx-auto"
              name="description"
              placeholder="Describe the quiz (max 20 characters)"
              value={quizDetails.description}
              onChange={(e) =>
                setQuizDetails({
                  ...quizDetails,
                  description: e.target.value.slice(0, 20),
                })
              }
              maxLength={20}
              rows={2}
            />

            {selectedQuestionType === "MCQ" && (
              <MCQForm
                options={currentQuestion.options}
                correctAnswer={currentQuestion.correctAnswer}
                addOption={() =>
                  setCurrentQuestion((prev) => ({
                    ...prev,
                    options: [...prev.options, ""],
                  }))
                }
                updateOption={(index, value) =>
                  setCurrentQuestion((prev) => ({
                    ...prev,
                    options: prev.options.map((opt, i) =>
                      i === index ? value : opt
                    ),
                  }))
                }
                deleteOption={(index) =>
                  setCurrentQuestion((prev) => ({
                    ...prev,
                    options: prev.options.filter((_, i) => i !== index),
                  }))
                }
                setCurrentQuestion={setCurrentQuestion}
                currentQuestion={currentQuestion}
              />
            )}

            {selectedQuestionType === "Short Answer" && (
              <ShortAnswerForm
                question={currentQuestion.question}
                setCurrentQuestion={setCurrentQuestion}
              />
            )}

            {selectedQuestionType === "Description" && (
              <DescriptionForm
                question={currentQuestion.question}
                description={currentQuestion.description}
                setCurrentQuestion={setCurrentQuestion}
              />
            )}

            <div className="flex justify-between w-full mt-8 space-x-4">
              <Button onClick={handleSaveQuestion} gradientMonochrome="purple">
                Save & Next
              </Button>
              <Button
                onClick={handleSubmitQuiz}
                gradientMonochrome="purple"
                disabled={questions.length === 0}
              >
                Submit Quiz
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CreateQuiz;
