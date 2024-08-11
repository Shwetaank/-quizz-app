// import { UserButton } from "@clerk/clerk-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-b from-blue-100 to-red-100">
        <h1 className="text-4xl font-bold mb-4 text-white">
          Welcome to Quiz Platform
        </h1>
        <p className="text-lg text-white mb-6">
          Your go-to place for fun and challenging quizzes!
        </p>
        <div className="flex gap-4">
          <Link to="/play-quiz">
            <button className="bg-black text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-800">
              Play Quiz
            </button>
          </Link>
          <Link to="/create-quiz">
            <button className="bg-green-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-600">
              Create Quiz
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
