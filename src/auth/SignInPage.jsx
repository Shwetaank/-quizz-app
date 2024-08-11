import { SignIn } from "@clerk/clerk-react";
import { FaGithub } from "react-icons/fa";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <SignIn
          appearance={{
            elements: {
              card: "bg-transparent shadow-none",
              formButtonPrimary:
                "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300",
              inputField:
                "border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-2 px-4 mb-4",
              headerTitle: "text-2xl font-semibold text-center mb-4",
              headerSubtitle:
                "text-center text-sm text-gray-500 bg-transparent mb-6",
              footer: "text-center text-gray-500 text-sm mt-6",
            },
            layout: {
              logoPlacement: "none",
              headerPlacement: "inside",
              headerContent: "AlmaBetter Quiz App",
            },
          }}
        />
        <div className="mt-6 sm:mt-8 text-center">
          <a
            href="https://github.com/Shwetaank/almabetter-quizz-app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-semibold border border-gray-300 py-2 px-4 rounded-md shadow-lg hover:text-blue-600 transition-colors duration-300"
          >
            <span> Give Star Me on </span>
            <FaGithub className="text-4xl ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
