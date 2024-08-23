import { useState, useEffect } from "react";
import { Button, Select, Spinner, Alert } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SetupTitleSwitcher from "../titleSwitcher/SetupTitleSwitcher";

const QuizSetupForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    difficulty: "",
    type: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch categories from OpenTDB API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://opentdb.com/api_category.php");
        setCategories(response.data.trivia_categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load quiz categories. Please try again.");
      }
    };
    fetchCategories();
  }, []);

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
    <div className="w-full h-auto py-8 flex flex-col items-center justify-center px-4 sm:px-8 text-xl">
      <motion.div
        className="w-full max-w-7xl border border-gray-300 rounded-lg shadow-md p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Title Section */}
        <div className="text-2xl sm:text-4xl font-semibold mb-8 text-center p-4 border border-gray-300 rounded-lg">
          <SetupTitleSwitcher className="h-20" />
        </div>

        {/* Form Section */}
        <div className="flex justify-center">
          <motion.form
            onSubmit={handleSubmit}
            className="w-full max-w-lg p-6 bg-transparent border border-gray-300 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {error && (
              <div className="mb-4" aria-live="assertive">
                <Alert color="failure">{error}</Alert>
              </div>
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
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading categories...</option>
                )}
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

            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  type="submit"
                  gradientMonochrome="purple"
                  className="w-full font-bold p-2 rounded-md shadow-md"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner size="sm" className="mr-2" />
                  ) : (
                    "Start Quiz"
                  )}
                </Button>
              </motion.div>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizSetupForm;
