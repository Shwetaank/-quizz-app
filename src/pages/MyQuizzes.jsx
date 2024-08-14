// src/pages/MyQuizzes.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, ToggleSwitch } from "flowbite-react";
import { loadQuizzes, deleteQuiz, setCurrentQuiz, toggleQuizStatus } from "../store/quizSlice";

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

  const handleStatusToggle = (index, currentStatus) => {
    dispatch(toggleQuizStatus({ index, status: !currentStatus }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-red-100 flex flex-col">
      <main className="flex-grow container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-6">My Quizzes</h2>
        {Array.isArray(quizzes) && quizzes.length > 0 ? (
          <Table hoverable={true}>
            <Table.Head>
              <Table.HeadCell>Number</Table.HeadCell>
              <Table.HeadCell>Type of Quiz</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {quizzes.map((quiz, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{quiz.type}</Table.Cell>
                  <Table.Cell>{quiz.title}</Table.Cell>
                  <Table.Cell>
                    <ToggleSwitch
                      checked={quiz.active}
                      onChange={() => handleStatusToggle(index, quiz.active)}
                    />
                  </Table.Cell>
                  <Table.Cell>{new Date(quiz.createdDate).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color="blue"
                      onClick={() => handleEdit(quiz)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button color="red" onClick={() => handleDelete(index)}>
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <p className="text-center text-lg">No quizzes available.</p>
        )}
      </main>
    </div>
  );
};

export default MyQuizzes;
