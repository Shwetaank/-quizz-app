import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Card } from "flowbite-react";
import { FaPlayCircle, FaTachometerAlt, FaGift } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  const { isSignedIn } = useUser();

  const cards = [
    {
      to: "/play-quiz",
      bgColor: "bg-blue-600",
      icon: <FaPlayCircle className="text-4xl mb-2" aria-label="Play Quiz" />,
      title: "Play Quiz",
      description:
        "Start a new quiz and test your knowledge across various topics.",
    },
    {
      to: "/my-quizzes",
      bgColor: "bg-green-600",
      icon: (
        <FaTachometerAlt
          className="text-4xl mb-2"
          aria-label="Active Quizzes"
        />
      ),
      title: "Active Quizzes",
      description:
        "View and manage your active quizzes. Track your progress and continue where you left off.",
      condition: isSignedIn,
    },
    {
      to: "/surprise-quiz-form",
      bgColor: "bg-purple-600",
      icon: <FaGift className="text-4xl mb-2" aria-label="Surprise Quiz" />,
      title: "Surprise Quiz",
      description:
        "Take a random quiz powered by Trivia API and challenge yourself with unexpected questions.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-red-100 flex flex-col">
      <Header />

      <main className="w-full max-w-7xl border border-gray-300 rounded-lg shadow-md p-6 mx-auto my-8">
        <h1 className="text-2xl sm:text-4xl font-semibold mb-6 text-center text-gray-900">
          Welcome to AlmaBetter Quiz App
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-8 text-center">
          Test your knowledge and learn something new every day!
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {cards.map(
            (card, index) =>
              (card.condition === undefined || card.condition) && (
                <Link to={card.to} key={index} className="w-full sm:w-1/2 lg:w-1/3">
                  <Card
                    className={`${card.bgColor} text-white rounded-md p-6 font-bold text-center cursor-pointer transition-transform transform hover:scale-105 duration-300 hover:shadow-lg`}
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    {card.icon}
                    <p>{card.title}</p>
                    <p className="text-sm mt-2 font-normal">
                      {card.description}
                    </p>
                  </Card>
                </Link>
              )
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
