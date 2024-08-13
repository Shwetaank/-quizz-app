// src/pages/MyQuizzes.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, Radio } from "flowbite-react";
import { loadQuizzes, deleteQuiz, setCurrentQuiz } from "../store/quizSlice";

const MyQuizzes = () => {
  const dispatch = useDispatch();
  const quizzes = useSelector((state) => state.quiz.quizzes) || [];

  useEffect(() => {
    dispatch(loadQuizzes());
  }, [dispatch]);

  const handleDelete = (index) => {
    dispatch(deleteQuiz(index));
  };

  const handleEdit = (quiz) => {
    dispatch(setCurrentQuiz(quiz));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-red-100 flex flex-col">
      <main className="flex-grow container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-6">My Quizzes</h2>
        {Array.isArray(quizzes) && quizzes.length > 0 ? (
          quizzes.map((quiz, index) => (
            <div key={index} className="mb-6">
              <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
                <Table hoverable={true}>
                  <Table.Head>
                    <Table.HeadCell>Question</Table.HeadCell>
                    <Table.HeadCell>Options</Table.HeadCell>
                    <Table.HeadCell>Correct Answer</Table.HeadCell>
                  </Table.Head>
                  <Table.Body>
                    {Array.isArray(quiz.questions) && quiz.questions.length > 0 ? (
                      quiz.questions.map((question, qIndex) => (
                        <Table.Row key={qIndex}>
                          <Table.Cell>{question.question}</Table.Cell>
                          <Table.Cell>
                            {Array.isArray(question.options) && question.options.map((option, oIndex) => (
                              <div key={oIndex}>
                                <Radio
                                  id={`option-${index}-${qIndex}-${oIndex}`}
                                  name={`quiz-${index}-${qIndex}`}
                                  label={`Option ${oIndex + 1}: ${option}`}
                                  checked={question.correctAnswer === oIndex}
                                  readOnly
                                />
                              </div>
                            ))}
                          </Table.Cell>
                          <Table.Cell>
                            Option {question.correctAnswer + 1}
                          </Table.Cell>
                        </Table.Row>
                      ))
                    ) : (
                      <Table.Row>
                        <Table.Cell colSpan="3" className="text-center">
                          No questions available.
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table>
              </div>
              <div className="flex space-x-2">
                <Button
                  color="blue"
                  onClick={() => handleEdit(quiz)}
                >
                  Edit
                </Button>
                <Button
                  color="red"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg">No quizzes available.</p>
        )}
      </main>
    </div>
  );
};

export default MyQuizzes;
