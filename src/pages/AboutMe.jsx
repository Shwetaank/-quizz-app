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

const projects = [
  {
    name: "AlmaBetter Quiz App",
    description:
      "An advanced quiz platform that features quizzes, leaderboards, user authentication, and more. Users can take quizzes, track their progress, and see their performance on leaderboards.",
    link: "https://github.com/Shwetaank/almabetter-quizz-app",
  },
];

const AboutMe = () => (
  <div className="w-full h-auto py-8 flex flex-col items-center justify-center px-4 sm:px-8 text-xl">
    <div className="w-full max-w-7xl border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl sm:text-4xl font-semibold mb-6 p-4 border-b border-gray-300 text-center">
        About Me
      </h2>
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
              Hello, I'm <strong>Shwetank</strong>, a Full Stack Engineer from
              Pune, India. Leveraging my background in Mechanical Engineering, I
              specialize in blending creativity with technology to elevate your
              digital presence. My focus is on delivering exceptional results
              and driving success for your business.
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
        <div className="w-full flex justify-center">
          {projects.map((project, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg shadow-lg p-4 w-full text-justify"
            >
              <h3 className="text-xl font-semibold mb-2 text-center">
                {project.name}
              </h3>
              <p className=" mb-4">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                title="Github Repo"
                className="inline-flex items-center font-semibold border border-gray-300 p-2 rounded-md shadow-lg  hover:text-blue-500 transition-colors duration-300"
              >
                Give a Star on
                <FaGithub className="mr-4 ml-4 text-4xl transition-transform transform hover:scale-125 duration-300 " />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AboutMe;
