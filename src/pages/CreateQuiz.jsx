import { useState, useEffect } from "react";
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
  });
  const [questions, setQuestions] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("failure");
  const [showAlert, setShowAlert] = useState(false); // New state for alert visibility
  const dispatch = useDispatch();

  useEffect(() => {
    if (alertMessage) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
        setAlertMessage(""); // Clear alert message
      }, 4000); // Hide alert after 4 seconds

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [alertMessage]);

  const handleQuestionTypeChange = (type) => {
    setSelectedQuestionType(type);
    setIsModalOpen(false);
  };

  const handleSaveQuestion = () => {
    if (
      currentQuestion.question &&
      (selectedQuestionType === "mcq-single"
        ? currentQuestion.options.length >= 2 &&
          currentQuestion.correctAnswer !== ""
        : true) &&
      (selectedQuestionType === "mcq-single"
        ? currentQuestion.options[currentQuestion.correctAnswer] !== undefined
        : true)
    ) {
      setQuestions([
        ...questions,
        {
          ...currentQuestion,
          number: questions.length + 1,
          type: selectedQuestionType,
          createdDate: new Date().toISOString(),
        },
      ]);
      setCurrentQuestion({
        question: "",
        options: [],
        correctAnswer: "",
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
          index: -1, // Example index; adjust as needed
          quiz: {
            title: quizDetails.title,
            description: quizDetails.description,
            questions: questions.map(question => ({
              number: question.number,
              question: question.question,
              type: question.type,
              options: question.options, // Include options if available
              correctAnswer: question.correctAnswer // Include correct answer if available
            })),
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

        {showAlert && alertMessage && (
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

            {selectedQuestionType === "mcq-single" && (
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

            {selectedQuestionType === "short-answer" && (
              <ShortAnswerForm
                answer={currentQuestion.question}
                setCurrentQuestion={(newQuestion) =>
                  setCurrentQuestion((prev) => ({
                    ...prev,
                    question: newQuestion.question,
                  }))
                }
              />
            )}

            {selectedQuestionType === "description" && (
              <DescriptionForm
                description={currentQuestion.question}
                setCurrentQuestion={(newQuestion) =>
                  setCurrentQuestion((prev) => ({
                    ...prev,
                    question: newQuestion.question,
                  }))
                }
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
