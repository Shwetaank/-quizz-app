import { useState, useEffect, useRef } from "react";

const TitleSwitcher = () => {
  const [titleIndex, setTitleIndex] = useState(0); // State to track the current title index
  const intervalRef = useRef(null); // Ref to store the interval ID

  // Array of titles to cycle through
  const titles = [
    "Create New Quiz",
    "Start Your Quiz Journey",
    "Design Your Quiz Now",
    "Build Your Quiz",
    "Prepare for Fun Challenges",
    "Craft Your Ultimate Quiz",
    "Unleash Your Creativity",
    "Test Your Knowledge",
  ];

  useEffect(() => {
    // Set up interval to change the title every 4 seconds
    intervalRef.current = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 4000);

    // Cleanup the interval when component unmounts
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [titles.length]); // Dependency array ensures the effect runs when `titles.length` changes

  return (
    <h2 className="text-2xl sm:text-4xl font-semibold mb-6 p-4 text-center animate-fadeInOut">
      {titles[titleIndex]} {/* Display the current title */}
    </h2>
  );
};

export default TitleSwitcher;
