import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useUser } from "@clerk/clerk-react";
import { format } from "date-fns";
import NoQuizzesAvailable from "../components/cards/NoQuizzesAvailable";
import PlayTitleSwitcher from "../components/titleSwitcher/PlayTitleSwitcher";
import PlayQuizDetailModal from "../components/modal/PlayQuizDetailModal";
import { motion } from "framer-motion";

import img1 from "../assets/mcq.jpg";
import img2 from "../assets/shortAnswer.jpg";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" },
  tap: { scale: 0.95 },
};

const PlayQuiz = () => {
  const quizzes = useSelector((state) => state.quiz.quizzes);
  const { user } = useUser();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const activeQuizzes = quizzes.filter((quiz) => quiz.active);

  const formatDate = (date) => {
    try {
      return format(new Date(date), "dd-MM-yy hh:mm a");
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid Date";
    }
  };

  const handleOpenModal = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleCloseModal = () => {
    setSelectedQuiz(null);
  };

  return (
    <motion.div
      className="w-full h-auto py-8 flex flex-col items-center justify-center px-4 sm:px-8 text-xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full max-w-7xl">
        {/* Title section */}
        <div className="text-2xl sm:text-4xl font-semibold mb-8 text-center shadow-md">
          <PlayTitleSwitcher />
        </div>

        {/* Display quizzes or no quizzes available message */}
        {activeQuizzes.length > 0 ? (
          <motion.div
            className={`grid ${
              activeQuizzes.length === 1
                ? "place-items-center"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            } gap-6`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {activeQuizzes.map((quiz) => (
              <motion.div
                key={quiz.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <Card
                  className="max-w-sm bg-transparent shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <img
                    src={
                      quiz.questions.length > 0 &&
                      quiz.questions[0].type === "mcq-single"
                        ? img1
                        : img2
                    }
                    alt={quiz.title ? `${quiz.title} Image` : "Quiz Image"}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3
                      className="text-xl font-bold mb-1 flex justify-center cursor-pointer"
                      onClick={() => handleOpenModal(quiz)}
                    >
                      {quiz.title || "Untitled Quiz"}
                    </h3>
                    <p className="mb-2 font-thin text-sm flex justify-end">
                      <strong>By</strong>: {user?.firstName || "Unknown Author"}
                    </p>
                    <p className="font-semibold text-sm text-center">
                      {quiz.questions.length > 0
                        ? quiz.questions[0].type === "mcq-single"
                          ? "MCQ (Single Correct)"
                          : "Short Answer"
                        : "N/A"}
                    </p>
                    <p
                      className="mb-2 flex justify-start text-left text-sm text-gray-600 font-thin overflow-hidden"
                      style={{ maxHeight: "3rem", lineHeight: "1.5rem" }}
                    >
                      {quiz.description || "No description available"}
                    </p>
                    <p className="mb-4 text-gray-600 font-thin text-sm flex justify-end">
                      {formatDate(quiz.createdDate) || "Date not available"}
                    </p>
                    <div className="flex justify-end">
                      <motion.div
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Button
                          gradientMonochrome="purple"
                          className="w-full font-bold transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
                          onClick={() => handleOpenModal(quiz)}
                        >
                          Start Quiz
                          <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <NoQuizzesAvailable />
        )}

        {/* Quiz detail modal */}
        {selectedQuiz && (
          <PlayQuizDetailModal quiz={selectedQuiz} onClose={handleCloseModal} />
        )}
      </div>
    </motion.div>
  );
};

export default PlayQuiz;
