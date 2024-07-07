import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import {
  Bars4Icon,
  XMarkIcon,
  NewspaperIcon,
  RssIcon,
  ComputerDesktopIcon,
  MicrophoneIcon,
} from "@heroicons/react/20/solid";
import { Toaster, toast } from "react-hot-toast";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const showToast = (section) => {
    toast(`🚧 ${section} coming soon!`, {
      position: "center-top",
      duration: 3000,
    });
  };

  return (
    <div>
      <header
        className={`fixed w-full top-0 left-0 z-50 bg-custom-bg transition-all duration-300 ease-in-out ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-custom-bg inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <Bars4Icon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
            <div className="flex-1 flex justify-center md:justify-start">
              <a href="/" className="flex items-center">
              <img
                  src="https://res.cloudinary.com/dfgjenml4/image/upload/v1720371522/ct1tu7f3fmsyyuwfc7tg.png"
                  alt="Logo AI"
                  className="h-8 w-auto sm:h-10"
                />
              </a>
            </div>
            <div className="hidden md:flex flex-1 justify-center">
              <div className="flex items-baseline space-x-4">
                <NavLink
                  href="#"
                  icon={<NewspaperIcon className="h-5 w-5" />}
                  text="Articles"
                  onClick={() => showToast('Articles')}
                />
                <NavLink
                  href="#"
                  icon={<RssIcon className="h-5 w-5" />}
                  text="Newsletter"
                  onClick={() => showToast('Newsletter')}
                />
                <NavLink
                  href="#"
                  icon={<ComputerDesktopIcon className="h-5 w-5" />}
                  text="Tools"
                  onClick={() => showToast('Tools')}
                />
                <NavLink
                  href="#"
                  icon={<MicrophoneIcon className="h-5 w-5" />}
                  text="Podcast"
                  onClick={() => showToast('Podcast')}
                />
              </div>
            </div>
            <div className="hidden md:flex flex-1 justify-end">
              <a
                href="https://calendly.com/ivansanguezax/mentoria"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border-2 border-black text-sm font-medium rounded-full text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 shadow-[0_4px_0_0_#18191F] hover:shadow-[0_6px_0_0_#18191F] hover:-translate-y-1"
              >
                Agendar mentoría
              </a>
            </div>
            <div className="flex items-center md:hidden">
              <div className="w-10"></div>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {() => (
            <div className="md:hidden" id="mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <MobileNavLink
                  href="#"
                  icon={<NewspaperIcon className="h-5 w-5" />}
                  text="Articles"
                  onClick={() => showToast('Articles')}
                />
                <MobileNavLink
                  href="#"
                  icon={<RssIcon className="h-5 w-5" />}
                  text="Newsletter"
                  onClick={() => showToast('Newsletter')}
                />
                <MobileNavLink
                  href="#"
                  icon={<ComputerDesktopIcon className="h-5 w-5" />}
                  text="Tools and Tech"
                  onClick={() => showToast('Tools and Tech')}
                />
                <MobileNavLink
                  href="#"
                  icon={<MicrophoneIcon className="h-5 w-5" />}
                  text="Podcast"
                  onClick={() => showToast('Podcast')}
                />
                <a
                  href="https://calendly.com/ivansanguezax/mentoria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 rounded-md text-base font-medium text-black bg-white hover:bg-gray-100 border-2 border-black shadow-custom"
                >
                  Agendar mentoría
                </a>
              </div>
            </div>
          )}
        </Transition>
      </header>
      <Toaster />
    </div>
  );
};

const NavLink = ({ href, icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="text-gray-700 hover:bg-gray-100 hover:text-black px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-150 ease-in-out"
  >
    {icon}
    <span className="ml-2">{text}</span>
  </button>
);

const MobileNavLink = ({ href, icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="text-gray-700 hover:bg-gray-100 hover:text-black block px-3 py-2 rounded-md text-base font-medium flex items-center"
  >
    {icon}
    <span className="ml-2">{text}</span>
  </button>
);

export default Header;
