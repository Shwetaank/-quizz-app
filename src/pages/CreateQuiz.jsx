import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Alert, TextInput, Textarea } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { addQuiz } from "../store/quizSlice";
import QuestionTypeModal from "../components/QuestionTypeModal";
import MCQForm from "../components/forms/MCQForm";
import TitleSwitcher from "../components/titleSwitcher/TitleSwitcher";

const CreateQuiz = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [currentQuestion, setCurrentQuestion] = useState({
    title: "",
    description: "",
    question: "",
    options: [],
    correctAnswer: "",
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
      currentQuestion.options.length >= 2 &&
      currentQuestion.correctAnswer !== ""
    ) {
      setQuestions([...questions, currentQuestion]);
      setCurrentQuestion({
        ...currentQuestion,
        question: "",
        options: [],
        correctAnswer: "",
      });
      setAlertMessage("Question added successfully.");
      setAlertType("success");
    } else {
      setAlertMessage("Please fill all required fields.");
      setAlertType("failure");
    }
  };

  const handleSubmitQuiz = () => {
    if (questions.length >= 5 && questions.length <= numQuestions) {
      dispatch(
        addQuiz({
          title: currentQuestion.title,
          description: currentQuestion.description,
          questions,
        })
      );
      setAlertMessage("Quiz submitted successfully.");
      setAlertType("success");
    } else {
      setAlertMessage("Please add at least 5 questions.");
      setAlertType("failure");
    }
  };

  return (
    <div className="w-full h-auto py-8 flex flex-col items-center justify-center px-4 sm:px-8 text-xl">
      <main className="w-full max-w-7xl border border-gray-300 rounded-lg shadow-md">
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
          <div className="mb-8 space-y-4">
            <TextInput
              className="mb-4"
              type="number"
              name="numQuestions"
              placeholder="Enter number of questions (5-15)"
              value={numQuestions}
              onChange={(e) =>
                setNumQuestions(Math.min(15, Math.max(5, e.target.value)))
              }
              min={5}
              max={15}
              required
            />
            <TextInput
              className="mb-4"
              type="text"
              name="title"
              placeholder="Enter quiz title"
              value={currentQuestion.title}
              onChange={(e) =>
                setCurrentQuestion({
                  ...currentQuestion,
                  title: e.target.value,
                })
              }
              required
            />
            <Textarea
              className="mb-4"
              name="description"
              placeholder="Enter quiz description (optional)"
              value={currentQuestion.description}
              onChange={(e) =>
                setCurrentQuestion({
                  ...currentQuestion,
                  description: e.target.value.slice(0, 50),
                })
              }
              maxLength={50}
            />
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
            />
            <div className="flex space-x-4">
              <Button onClick={handleSaveQuestion}>Save and Go to Next Question</Button>
              <Button
                onClick={handleSubmitQuiz}
                disabled={questions.length < 5}
              >
                Complete Quiz
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CreateQuiz;
