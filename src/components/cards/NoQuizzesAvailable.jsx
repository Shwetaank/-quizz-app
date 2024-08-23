import { Link } from "react-router-dom";
import { Button, Card } from "flowbite-react";
import img3 from "../../assets/NoData.jpg";
import { HiOutlineArrowRight } from "react-icons/hi";

const NoQuizzesAvailable = () => {
  return (
    <div className="flex justify-center items-center h-full py-8 px-4 sm:px-8">
      {/* Card component with hover effect */}
      <Card className="max-w-sm bg-transparent transform transition-transform duration-300 hover:scale-105">
        <img
          src={img3}
          alt="No data Available"
          className="w-full h-40 object-fit rounded-t-lg"
        />
        <div className="p-4">
          {/* Title with hover underline effect */}
          <h5 className="text-xl font-bold tracking-tight flex justify-start cursor-pointer hover:underline">
            No Quizzes Available
          </h5>
          {/* Description text */}
          <p className="font-normal text-gray-700 dark:text-gray-400 mt-2 text-justify">
            It looks like you haven&apos;t created any quizzes yet. Start creating
            your first quiz to get started!
          </p>
          {/* Button to navigate to quiz creation page */}
          <div className="mt-8 flex justify-center">
            <Link to="/create-quiz">
              <Button
                gradientMonochrome="purple"
                className="font-bold transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Create Your First Quiz
                <HiOutlineArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NoQuizzesAvailable;
