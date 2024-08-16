import { useState, useEffect, useRef } from "react";

const MyQuizzesTitleSwitcher = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const intervalRef = useRef(null);

  const titles = [
    "Manage Your Quizzes",
    "View All Your Created Quizzes",
    "Organize and Edit Your Quizzes",
    "Check Your Quiz History",
    "Explore Your Quiz Collection",
    "Track Your Quiz Progress",
    "Edit or Delete Quizzes Here",
    "Your Quiz Dashboard",
  ];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 4000); // Change title every 4 seconds

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [titles.length]);

  return (
    <h2 className="text-2xl sm:text-4xl font-semibold mb-6 p-4 text-center animate-fadeInOut">
      {titles[titleIndex]}
    </h2>
  );
};

export default MyQuizzesTitleSwitcher;
