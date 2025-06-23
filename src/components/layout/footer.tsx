"use client";

import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaGithub,
    FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full p-6 bg-white dark:bg-slate-950 shadow-xl rounded-t-2xl mt-5">
            <div className="max-w-[90%] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        &copy; {currentYear} My Website. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <a
                            href="#"
                            className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                        >
                            <FaFacebook size={20} />
                        </a>
                        <a
                            href="#"
                            className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                        >
                            <FaTwitter size={20} />
                        </a>
                        <a
                            href="#"
                            className="text-gray-500 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200"
                        >
                            <FaInstagram size={20} />
                        </a>
                        <a
                            href="#"
                            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
                        >
                            <FaGithub size={20} />
                        </a>
                        <a
                            href="#"
                            className="text-gray-500 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                        >
                            <FaLinkedin size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;