import { useState } from "react";
import { Button, Select, Spinner, Alert } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const QuizSetupForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    difficulty: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://opentdb.com/api.php", {
        params: {
          amount: 15,
          category: formData.category,
          difficulty: formData.difficulty,
          type: formData.type,
        },
      });

      localStorage.setItem("quizData", JSON.stringify(response.data.results));
      navigate("/quiz-play");
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      setError("Failed to fetch quiz data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-100 to-red-100 p-6">
      <h1 className="text-2xl sm:text-4xl font-semibold mb-6 text-center">
        Create Your Quiz
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-4 bg-white rounded-lg shadow-lg"
      >
        {error && (
          <Alert color="failure" className="mb-4">
            {error}
          </Alert>
        )}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <Select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="17">Science & Nature</option>
            {/* Add more categories as needed */}
          </Select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="difficulty"
          >
            Difficulty
          </label>
          <Select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            required
          >
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="type"
          >
            Question Type
          </label>
          <Select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True/False</option>
          </Select>
        </div>

        <Button
          type="submit"
          gradientMonochrome="purple"
          className="w-full font-bold transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
          disabled={loading}
          aria-label="Start Quiz"
        >
          {loading ? <Spinner size="sm" className="mr-2" /> : "Start Quiz"}
        </Button>
      </form>
    </div>
  );
};

export default QuizSetupForm;
