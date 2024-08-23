import { useState, useEffect, useRef } from "react";

const SetupTitleSwitcher = () => {
  // State to track the current index of the title to display
  const [titleIndex, setTitleIndex] = useState(0);

  // Ref to hold the interval ID for clearing the interval on component unmount
  const intervalRef = useRef(null);

  // Array of titles to be displayed in rotation
  const titles = [
    "Configure Your Trivia Challenge",
    "Select Your Trivia Parameters",
    "Customize Your Quiz Experience",
    "Setup Your Quiz Preferences",
    "Prepare for Your Trivia Adventure",
    "Fine-Tune Your Quiz Settings",
    "Optimize Your Trivia Quiz",
    "Craft Your Perfect Quiz",
  ];

  useEffect(() => {
    // Set up an interval to change the title every 4 seconds
    intervalRef.current = setInterval(() => {
      // Update the title index, cycling through the titles array
      setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 4000); // 4000 milliseconds = 4 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [titles.length]); // Dependency array ensures effect runs only when titles.length changes

  return (
    <h1 className="text-2xl sm:text-4xl font-semibold mb-6 text-center ">
      {titles[titleIndex]}
    </h1>
  );
};

export default SetupTitleSwitcher;
