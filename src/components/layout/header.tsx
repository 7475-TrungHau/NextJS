"use client"

import { ModeToggle } from "@/components/mode-toggle";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "@/providers/app-provider";
import UserMenu from "@/components/user/user-menu";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { sessionToken } = useAppContext();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            <div className="max-w-[90%] mx-auto">
                <header className="w-full p-4 bg-white dark:bg-slate-950 backdrop-blur-lg shadow-xl rounded-b-2xl mb-5">
                    {/* Desktop Header */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-lg md:text-xl font-bold">My Website</h1>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:block">
                            <ul className="flex gap-2">
                                <li className="hover:scale-105 rounded-md p-2 transition-all duration-200 ease-in-out">
                                    <Link
                                        className="hover:bg-slate-200 rounded-md bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-800 py-2 px-4 font-bold"
                                        href="/"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="hover:scale-105 rounded-md p-2 transition-all duration-200 ease-in-out">
                                    <Link
                                        href="/about"
                                        className="hover:bg-slate-200 rounded-sm dark:hover:bg-slate-800 py-2 px-4 hover:text-blue-600"
                                    >
                                        About
                                    </Link>
                                </li>
                                <li className="hover:scale-105 rounded-md p-2 transition-all duration-200 ease-in-out">
                                    <Link
                                        href="/contact"
                                        className="hover:bg-slate-200 rounded-sm dark:hover:bg-slate-800 py-2 px-4 hover:text-blue-600"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        {/* Desktop Actions */}
                        <div className="hidden md:flex gap-4 items-center">
                            <ModeToggle />
                            {sessionToken ? (
                                <UserMenu />
                            ) : (
                                <div className="flex gap-2">
                                    <Link href="/login"><Button variant="link" className="px-3">Login</Button></Link>
                                    <Link href="/register"><Button className="px-4">Register</Button></Link>
                                </div>
                            )}
                        </div>


                        {/* Mobile Menu Button & Theme Toggle */}
                        <div className="flex md:hidden items-center gap-2">
                            <ModeToggle />
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={toggleMenu}
                                className="md:hidden"
                            >
                                {isMenuOpen ? (
                                    <X className="h-[1.2rem] w-[1.2rem]" />
                                ) : (
                                    <Menu className="h-[1.2rem] w-[1.2rem]" />
                                )}
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                            <nav className="mb-4">
                                <ul className="flex flex-col gap-2">
                                    <li>
                                        <Link
                                            className="block w-full text-left hover:bg-slate-200 rounded-md bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-800 py-3 px-4 font-bold transition-colors"
                                            href="/"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Home
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            href="/about"
                                            className="block w-full text-left hover:bg-slate-200 dark:hover:bg-slate-800 py-3 px-4 hover:text-blue-600 rounded-md transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/contact"
                                            className="block w-full text-left hover:bg-slate-200 dark:hover:bg-slate-800 py-3 px-4 hover:text-blue-600 rounded-md transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            </nav>

                            {/* Mobile Auth Buttons */}
                            {sessionToken ? (
                                <div className="flex justify-center pt-2 border-t border-slate-200 dark:border-slate-700">
                                    <UserMenu />
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant="outline" className="w-full justify-center">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                                        <Button className="w-full justify-center">
                                            Register
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </header>
            </div>
        </div>
    );
};

export default Header;
