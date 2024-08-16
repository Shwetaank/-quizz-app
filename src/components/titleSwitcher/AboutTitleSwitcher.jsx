import { useState, useEffect, useRef } from "react";

const AboutTitleSwitcher = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const intervalRef = useRef(null);

  const titles = [
    "Welcome to My Journey",
    "Discover My Story",
    "Learn About Me",
    "Get to Know the Person Behind the Screen",
    "Explore My Background",
    "Find Out More About My Passions",
    "Uncover My Achievements",
    "See What Drives Me",
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

export default AboutTitleSwitcher;
