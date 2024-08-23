import { useState, useEffect, useRef } from "react";

const PlayTitleSwitcher = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const intervalRef = useRef(null);

  // Array of titles to be displayed
  const titles = [
    "Select Your Next Challenge",
    "Choose a Quiz to Play",
    "Start Your Quiz Adventure",
    "Explore Available Quizzes",
    "Find Your Perfect Quiz",
    "Get Ready to Test Your Skills",
    "Discover New Quiz Experiences",
    "Play and Learn",
  ];

  useEffect(() => {
    // Set up interval to switch titles
    intervalRef.current = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 4000);

    // Cleanup interval on component unmount
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

export default PlayTitleSwitcher;
