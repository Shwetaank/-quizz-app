import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "flowbite-react";
import Switch from "react-switch";
import { Link } from "react-router-dom";
import { loadQuizzes, deleteQuiz, toggleQuizStatus } from "../store/quizSlice";
import ConfirmDeleteModal from "../components/modal/ConfirmDeleteModal";

const MyQuizzes = () => {
  const dispatch = useDispatch();
  const quizzes = useSelector((state) => state.quiz.quizzes);

  const memoizedQuizzes = useMemo(() => quizzes || [], [quizzes]);

  const [modalOpen, setModalOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);

  useEffect(() => {
    dispatch(loadQuizzes());
  }, [dispatch]);

  const handleDelete = useCallback(() => {
    if (quizToDelete !== null) {
      dispatch(deleteQuiz(quizToDelete));
      setModalOpen(false);
      setQuizToDelete(null);
    }
  }, [quizToDelete, dispatch]);

  const handleStatusToggle = useCallback(
    (index, currentStatus) => {
      dispatch(toggleQuizStatus({ index, status: !currentStatus }));
    },
    [dispatch]
  );

  const openDeleteModal = useCallback((index) => {
    setQuizToDelete(index);
    setModalOpen(true);
  }, []);

  return (
    <div className="w-full h-auto py-8 flex flex-col items-center justify-center px-4 sm:px-8 text-xl">
      <div className="w-full max-w-7xl border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 p-4 border-b border-gray-300 text-center">
          My Quizzes
        </h2>
        {memoizedQuizzes.length > 0 ? (
          <div className="overflow-x-auto">
            <Table hoverable={true} className="min-w-full">
              <Table.Head>
                <Table.HeadCell>Number</Table.HeadCell>
                <Table.HeadCell>Type of Quiz</Table.HeadCell>
                <Table.HeadCell>Title</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Date Created</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {memoizedQuizzes.map((quiz, index) => (
                  <Table.Row key={index} className="bg-white">
                    <Table.Cell className="whitespace-nowrap">
                      {index + 1}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {quiz.type}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {quiz.title}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap flex items-center">
                      <span
                        className={`mr-2 ${
                          quiz.active ? "text-purple-600" : "text-gray-500"
                        }`}
                      >
                        {quiz.active ? "Active" : "Inactive"}
                      </span>
                      <Switch
                        checked={quiz.active}
                        onChange={() => handleStatusToggle(index, quiz.active)}
                        onColor="#6b7280"
                        offColor="#d1d5db"
                        onHandleColor="#ffffff"
                        offHandleColor="#ffffff"
                        handleDiameter={22}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={28}
                        width={48}
                        aria-label={`Toggle status for ${quiz.title}`}
                      />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {new Date(quiz.createdDate).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      <Button
                        color="red"
                        gradientMonochrome="purple"
                        onClick={() => openDeleteModal(index)}
                        className="w-full"
                      >
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        ) : (
          <div className="text-center p-4">
            <p className="text-lg mb-4">No quizzes available.</p>
            <Link to="/create-quiz">
              <Button gradientMonochrome="purple">Create Your Quiz</Button>
            </Link>
          </div>
        )}
      </div>
      <ConfirmDeleteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        gradientMonochrome="purple"
      />
    </div>
  );
};

export default MyQuizzes;
