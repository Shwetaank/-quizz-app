import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Alert, TextInput, Textarea } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { nanoid } from "nanoid";
import { addQuiz } from "../store/quizSlice";
import QuestionTypeModal from "../components/modal/QuestionTypeModal";
import MCQForm from "../components/forms/MCQForm";
import ShortAnswerForm from "../components/forms/ShortAnswerForm";
import TitleSwitcher from "../components/titleSwitcher/TitleSwitcher";

// Define motion variants for animation
const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const alertVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" },
  tap: { scale: 0.95 },
};

const CreateQuiz = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const [showCreateQuizButton, setShowCreateQuizButton] = useState(true);
  const [quizDetails, setQuizDetails] = useState({
    title: "",
    description: "",
  });
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: [],
    correctAnswer: "",
    answer: "",
  });
  const [questions, setQuestions] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("failure");
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();
  const currentQuestionNumber = questions.length + 1;

  useEffect(() => {
    if (alertMessage) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
        setAlertMessage("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const handleQuestionTypeChange = (type) => {
    setSelectedQuestionType(type);
    setIsModalOpen(false);
    setShowCreateQuizButton(false);
  };

  const handleSaveQuestion = () => {
    const isMCQValid =
      selectedQuestionType === "mcq-single"
        ? currentQuestion.options.length >= 2 &&
          currentQuestion.correctAnswer !== "" &&
          currentQuestion.options.includes(currentQuestion.correctAnswer)
        : true;

    const isShortAnswerValid =
      selectedQuestionType === "short-answer" &&
      currentQuestion.question !== "" &&
      currentQuestion.answer !== "";

    if (currentQuestion.question && (isMCQValid || isShortAnswerValid)) {
      setQuestions([
        ...questions,
        {
          id: nanoid(),
          number: currentQuestionNumber,
          question: currentQuestion.question,
          type: selectedQuestionType,
          options:
            selectedQuestionType === "mcq-single"
              ? currentQuestion.options
              : [],
          correctAnswer:
            selectedQuestionType === "mcq-single"
              ? currentQuestion.correctAnswer
              : "",
          answer:
            selectedQuestionType === "short-answer"
              ? currentQuestion.answer
              : "",
          createdDate: new Date().toISOString(),
        },
      ]);
      setCurrentQuestion({
        question: "",
        options: [],
        correctAnswer: "",
        answer: "",
      });
      setAlertMessage("Question added successfully.");
      setAlertType("success");
    } else {
      setAlertMessage("Please fill all required fields correctly.");
      setAlertType("failure");
    }
  };

  const handleSubmitQuiz = () => {
    if (!quizDetails.title.trim()) {
      setAlertMessage("Please provide a quiz title.");
      setAlertType("failure");
      return;
    }

    if (questions.length < 2 || questions.length > 10) {
      setAlertMessage(
        "Please add at least 2 questions and no more than 10 questions."
      );
      setAlertType("failure");
      return;
    }

    dispatch(
      addQuiz({
        index: -1,
        quiz: {
          id: nanoid(),
          title: quizDetails.title,
          description: quizDetails.description,
          type:
            selectedQuestionType === "mcq-single"
              ? "MCQ-Single"
              : "Short Answer",
          questions: questions.map((question) => ({
            id: question.id,
            number: question.number,
            question: question.question,
            type: question.type,
            options: question.options,
            correctAnswer: question.correctAnswer,
            answer: question.answer,
          })),
          createdDate: new Date().toISOString(),
          active: true,
        },
      })
    );

    setQuizDetails({
      title: "",
      description: "",
    });
    setQuestions([]);
    setCurrentQuestion({
      question: "",
      options: [],
      correctAnswer: "",
      answer: "",
    });
    setAlertMessage("Quiz submitted successfully.");
    setAlertType("success");
  };

  return (
    <motion.div
      className="w-full h-auto py-8 flex flex-col items-center justify-center px-4 sm:px-8 text-xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <main className="w-full max-w-7xl border border-gray-300 rounded-lg shadow-md p-8">
        <TitleSwitcher />

        {showAlert && alertMessage && (
          <motion.div
            className="mb-4"
            variants={alertVariants}
            initial="hidden"
            animate="visible"
          >
            <Alert color={alertType} icon={HiInformationCircle}>
              <span className="font-medium">
                {alertType === "success" ? "Success!" : "Error!"}
              </span>{" "}
              {alertMessage}
            </Alert>
          </motion.div>
        )}

        <QuestionTypeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelectType={handleQuestionTypeChange}
          selectedType={selectedQuestionType}
        />

        {showCreateQuizButton && (
          <motion.div
            className="w-full flex justify-end mt-4"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              onClick={() => setIsModalOpen(true)}
              gradientMonochrome="purple"
            >
              Create Your Quiz
            </Button>
          </motion.div>
        )}

        {selectedQuestionType && (
          <motion.div
            className="flex flex-col items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="mb-4 text-2xl font-semibold">
              {`${selectedQuestionType
                .replace("-", " ")
                .toUpperCase()} - Question ${currentQuestionNumber}`}
            </h2>

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
              placeholder="Describe the quiz (max 200 characters)"
              value={quizDetails.description}
              onChange={(e) =>
                setQuizDetails({
                  ...quizDetails,
                  description: e.target.value.slice(0, 200),
                })
              }
              maxLength={200}
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
                question={currentQuestion.question}
                answer={currentQuestion.answer}
                setCurrentQuestion={setCurrentQuestion}
              />
            )}

            <motion.div
              className="flex justify-between w-full mt-8 space-x-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  onClick={handleSaveQuestion}
                  gradientMonochrome="purple"
                >
                  Save & Next
                </Button>
              </motion.div>
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  onClick={handleSubmitQuiz}
                  gradientMonochrome="purple"
                  disabled={questions.length === 0}
                  className={`${
                    questions.length === 0 ? "cursor-not-allowed" : ""
                  }`}
                >
                  Submit Quiz
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </main>
    </motion.div>
  );
};

export default CreateQuiz;
