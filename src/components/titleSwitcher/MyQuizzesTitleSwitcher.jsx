import { useState, useEffect, useRef } from "react";

const MyQuizzesTitleSwitcher = () => {
  // State to track the current index of the title
  const [titleIndex, setTitleIndex] = useState(0);

  // Ref to hold the interval ID for cleanup
  const intervalRef = useRef(null);

  // Array of titles to display
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
    // Set up an interval to change the title every 4 seconds
    intervalRef.current = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 4000); // Change title every 4 seconds

    // Cleanup interval on component unmount
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [titles.length]); // Dependency array ensures the effect runs only once

  return (
    <h2 className="text-2xl sm:text-4xl font-semibold mb-6 p-4 text-center animate-fadeInOut">
      {titles[titleIndex]} {/* Display the current title */}
    </h2>
  );
};

export default MyQuizzesTitleSwitcher;
