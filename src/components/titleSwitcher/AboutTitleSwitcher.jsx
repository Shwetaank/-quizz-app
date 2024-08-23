import { useState, useEffect, useRef } from "react";

const AboutTitleSwitcher = () => {
  // State to track the current index of the title to display
  const [titleIndex, setTitleIndex] = useState(0);

  // Ref to hold the interval ID for clearing the interval on component unmount
  const intervalRef = useRef(null);

  // Array of titles to be displayed in rotation
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
    <h2
      className="text-2xl sm:text-4xl font-semibold mb-6 p-4 text-center animate-fadeInOut"
      // Displays the current title based on the titleIndex state
    >
      {titles[titleIndex]}
    </h2>
  );
};

export default AboutTitleSwitcher;
