import { FaJs, FaReact, FaNodeJs, FaGithub } from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiTypescript,
  SiRedux,
  SiNextdotjs,
  SiMariadb,
} from "react-icons/si";
import profilePic from "../assets/profile-pic.jpg";
import AboutTitleSwitcher from "../components/titleSwitcher/AboutTitleSwitcher";

// Skill icons and labels
const skills = [
  { icon: FaJs, label: "JavaScript" },
  { icon: FaReact, label: "React" },
  { icon: SiTailwindcss, label: "Tailwind CSS" },
  { icon: FaNodeJs, label: "Node.js" },
  { icon: SiExpress, label: "Express.js" },
  { icon: SiMongodb, label: "MongoDB" },
  { icon: SiMariadb, label: "MariaDB" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: SiRedux, label: "Redux" },
  { icon: SiNextdotjs, label: "Next.js" },
];

// Project details
const projects = [
  {
    name: "AlmaBetter Quiz App",
    description:
      "An advanced quiz platform that features quizzes, user authentication, and surprise quizzes. Users can take quizzes, track their progress, and see their performance.",
    features: [
      "Create and store quizzes that can be played at any time.",
      "Surprise quizzes powered by the Trivia API to challenge users' knowledge unexpectedly.",
      "User authentication by Clerk.",
      "Fully Mobile Responsive",
    ],
    technologies: [
      "React-Vite",
      "Flowbite-react",
      "Redux-ToolKit",
      "Tailwind CSS",
      "Node.js",
      "axios",
      "nanoid",
      "react-icons",
    ],
    link: "https://github.com/Shwetaank/almabetter-quizz-app",
    duration: "July 2024 - August 2024",
    challenges:
      "One of the main challenges was deploying the surprise quizzes feature to fetch data from the Trivia API and render it dynamically. This involved handling asynchronous data fetching and ensuring smooth integration with the existing app architecture.",
    techExplanation:
      "The tech stack was chosen for its efficiency and compatibility: React-Vite for fast development and build times, Flowbite-react for UI components, Redux-ToolKit for state management, Tailwind CSS for rapid styling, Node.js for backend services, axios for HTTP requests, nanoid for unique ID generation, and react-icons for accessible and scalable icons.",
    futureImprovements: [
      "Add a leaderboard feature to increase user engagement and competition.",
      "Integrate additional question types such as drag-and-drop and image-based questions.",
      "Implement social sharing features so users can challenge their friends to quizzes.",
    ],
    impact:
      "It is anticipated to significantly enhance user engagement with its interactive quiz features and surprise elements. Once launched, it is expected to attract a wide range of users, providing them with an engaging way to test and improve their knowledge.",
  },
];

const AboutMe = () => (
  <div className="w-full h-auto py-8 flex flex-col items-center justify-center px-4 sm:px-8 text-xl">
    <div className="w-full max-w-7xl border border-gray-300 rounded-lg shadow-md">
      <div className="text-2xl sm:text-4xl font-semibold mb-8 text-center shadow-md">
        <AboutTitleSwitcher />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-4">
        {/* Profile Section */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left px-4 border-r border-gray-300">
          <div className="flex flex-col items-center">
            <img
              src={profilePic}
              alt="Profile picture of Shwetank Morey"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mb-4 shadow-lg border-8 border-white transition-transform transition-border duration-500 ease-in-out hover:scale-105 hover:border-transparent cursor-pointer hover:border-0"
            />
            <p className="text-lg sm:text-xl text-justify">
              Hello, I&apos;m <strong>Shwetank</strong>, a Full Stack Engineer
              from Pune, India. Leveraging my background in Mechanical
              Engineering, I specialize in blending creativity with technology
              to elevate your digital presence. My focus is on delivering
              exceptional results and driving success for your business.
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-lg sm:text-2xl font-semibold mb-8">My Skills</h2>
          <div className="flex flex-wrap justify-center items-center border border-gray-300 rounded-lg shadow-md p-4">
            {skills.map(({ icon: Icon, label }, index) => (
              <div
                key={index}
                className="flex flex-col items-center py-2 mx-4 mb-6 sm:mb-8"
              >
                <Icon
                  className="text-4xl w-full flex justify-center items-center transition-transform transform hover:scale-125 duration-300 hover:text-blue-500 cursor-pointer"
                  title={label}
                />
                <p className="text-sm sm:text-base mt-2">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Projects Section */}
    <div className="w-full max-w-7xl mt-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 p-4 border-b border-gray-300 text-center">
        About These Projects
      </h2>
      <div className="flex justify-center p-4">
        <div className="w-full flex flex-col space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg shadow-lg p-4 w-full text-justify"
            >
              <h3 className="text-xl font-semibold mb-2 text-center">
                {project.name}
              </h3>
              <p className="mb-4">{project.description}</p>

              {/* Features Subsection */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2">Features:</h4>
                <ul className="list-disc list-inside space-y-2">
                  {project.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>

              {/* Technologies Used Subsection */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2">
                  Technologies Used:
                </h4>
                <ul className="list-disc list-inside space-y-2">
                  {project.technologies.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
              </div>

              {/* Duration */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2">Duration:</h4>
                <p>{project.duration}</p>
              </div>

              {/* Challenges & Solutions */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2">
                  Challenges & Solutions:
                </h4>
                <p>{project.challenges}</p>
              </div>

              {/* Tech Stack Explanation */}
              {project.techExplanation && (
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-2">
                    Tech Stack Explanation:
                  </h4>
                  <p>{project.techExplanation}</p>
                </div>
              )}

              {/* Future Improvements */}
              {project.futureImprovements && (
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-2">
                    Future Improvements:
                  </h4>
                  <ul className="list-disc list-inside space-y-2">
                    {project.futureImprovements.map((improvement, i) => (
                      <li key={i}>{improvement}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Impact */}
              {project.impact && (
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-2">Impact:</h4>
                  <p>{project.impact}</p>
                </div>
              )}

              {/* GitHub Repo Link */}
              <div className="flex justify-center">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Github Repo"
                  className="inline-flex items-center font-semibold border border-gray-300 p-2 rounded-md shadow-lg hover:text-blue-500 transition-colors duration-300"
                >
                  Give a Star on
                  <FaGithub className="ml-2 text-4xl transition-transform transform hover:scale-125 duration-300" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AboutMe;
