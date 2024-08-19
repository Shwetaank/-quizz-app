import { useState, useEffect, useRef } from "react";

const ResultTitleSwitcher = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const intervalRef = useRef(null);

  const titles = [
    "Quiz Results",
    "Your Performance",
    "How Did You Do?",
    "Review Your Results",
    "Check Your Score",
    "Results Awaiting",
    "See Your Results",
    "Evaluate Your Performance",
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

export default ResultTitleSwitcher;
