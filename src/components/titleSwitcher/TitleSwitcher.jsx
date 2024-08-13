import { useState, useEffect, useRef } from "react";

const TitleSwitcher = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const intervalRef = useRef(null);

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
    intervalRef.current = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 4000);

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

export default TitleSwitcher;
