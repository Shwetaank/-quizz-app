import { FaLinkedin, FaYoutube, FaTwitter } from "react-icons/fa";
import { FaSuitcase } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

const socials = [
  {
    id: 1,
    name: "LinkedIn",
    icon: <FaLinkedin />,
    link: "https://www.linkedin.com/in/shwetank-morey-a35484257",
  },
  {
    id: 2,
    name: "YouTube",
    icon: <FaYoutube />,
    link: "https://www.youtube.com/@Sin_Greed",
  },
  {
    id: 4,
    name: "Instagram",
    icon: <FaSquareInstagram />,
    link: "https://www.instagram.com/shwetaank_/",
  },
  {
    id: 5,
    name: "Twitter",
    icon: <FaTwitter />,
    link: "https://x.com/Sin_Greed___",
  },
  {
    id: 6,
    name: "My Portfolio",
    icon: <FaSuitcase />,
    link: "https://shwet-tech.com/",
  },
];

const Footer = () => {
  return (
    <footer className="w-full h-auto py-4 flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 text-xl border-t border-gray-300 shadow-[0_-4px_8px_-2px_rgba(0,0,0,0.3)]">
      <div className="flex flex-col items-center w-full">
        {/* Social icons */}
        <div className="flex justify-center items-center  w-full">
          {socials.map((social) => (
            <a
              key={social.id}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              title={social.name}
              className="text-4xl  w-full flex justify-center items-center transition-transform transform hover:scale-125 duration-300 hover:text-blue-500"
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Footer text */}
        <p className="text-center font-semibold text-sm sm:text-base mt-6">
          © 2024 All Rights Reserved. Made by Sin_Greed
        </p>
      </div>
    </footer>
  );
};

export default Footer;
