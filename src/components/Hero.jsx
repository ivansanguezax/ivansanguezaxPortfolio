import React, { useState, useEffect } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Swal from "sweetalert2";

const Hero = () => {
  const [email, setEmail] = useState("");
  const [canSubscribe, setCanSubscribe] = useState(true);
  const [agreeToNewsletter, setAgreeToNewsletter] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const lastSubscribeTime = localStorage.getItem("lastSubscribeTime");
    if (lastSubscribeTime) {
      const timeDiff = Date.now() - parseInt(lastSubscribeTime);
      const waitTime = 5 * 60 * 1000; // 5 minutes
      if (timeDiff < waitTime) {
        setCanSubscribe(false);
        setTimeLeft(Math.ceil((waitTime - timeDiff) / 1000));
        const timer = setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime <= 1) {
              clearInterval(timer);
              setCanSubscribe(true);
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
        return () => clearInterval(timer);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubscribe) {
      Swal.fire({
        title: "Hold on there, eager beaver!",
        html: `We love your enthusiasm, but you're already subscribed. <br><br>
               Why not grab a coffee and check back in ${Math.floor(
                 timeLeft / 60
               )}:${(timeLeft % 60).toString().padStart(2, "0")}?<br><br>
               We promise, good things come to those who wait!`,
        icon: "info",
        confirmButtonText: "Got it!",
        customClass: {
          container: "font-sans",
        },
      });
      return;
    }
    if (!agreeToNewsletter) {
      Swal.fire({
        title: "Almost there!",
        text: "Just tick the box to confirm you want to receive our awesome newsletter. We promise not to spam!",
        icon: "warning",
        confirmButtonText: "OK, I'll check it",
      });
      return;
    }
    try {
      const response = await axios.post(
        "https://hook.us1.make.com/xte7hf98cwzmy489vlwb6qnthyup88cn",
        { email }
      );
      console.log("Data sent to Make.com successfully:", response.data);
      Swal.fire({
        title: "Welcome aboard!",
        text: "You're all set! Get ready for some amazing content coming your way.",
        icon: "success",
        confirmButtonText: "Can't wait!",
      });
      setEmail("");
      setAgreeToNewsletter(false);
      localStorage.setItem("lastSubscribeTime", Date.now().toString());
      setCanSubscribe(false);
      setTimeLeft(5 * 60);
    } catch (error) {
      console.error("Error sending data to Make.com:", error);
      Swal.fire({
        title: "Oops!",
        text: "Looks like our carrier pigeon got lost. Mind trying again?",
        icon: "error",
        confirmButtonText: "Sure, I'll try again",
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-4 md:px-40 md:py-10 md:gap-10 h-full mt-20 md:mt-0">
      <div className="w-full md:w-4/6 text-gray-800 mb-12 md:mb-0">
        <h3 className="text-2xl mt-5 font-bold mb-4 animate-[fadeIn_2s_ease-out]">
          Hi, my name is Ivan Sangueza
        </h3>
        <h1
          className="text-6xl md:text-7xl font-bold mb-6 text-gray-900 animate-[fadeIn_2s_ease-out]"
          style={{ fontFamily: '"Kanit", Arial, sans-serif' }}
        >
          Grow with passion
        </h1>
        <h3 className="text-xl md:text-2xl font-semibold mb-8 text-gray-700 animate-[fadeIn_2s_ease-out]">
          I'm a Software Engineer, Notion Ambassador, and UX Designer
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col items-start">
          <div className="flex flex-col md:flex-row w-full mb-4">
            <div className="relative flex-grow mb-4 md:mb-0 md:mr-4">
              <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Subscribe to newsletter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-white text-black font-semibold rounded-full border-2 border-black shadow-[0_4px_0_0_#18191F] hover:shadow-[0_6px_0_0_#18191F] transition-all duration-300 transform hover:-translate-y-1"
            >
              Subscribe
            </button>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="agreeNewsletter"
              checked={agreeToNewsletter}
              onChange={(e) => setAgreeToNewsletter(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="agreeNewsletter" className="text-sm text-gray-600">
              Tick this box to receive my free weekly newsletter.
            </label>
          </div>
        </form>
      </div>
      <div className="w-full md:w-4/12 flex justify-center items-center">
        <img
          src="https://res.cloudinary.com/dfgjenml4/image/upload/v1720311811/tip7xyfvup8bgtnvjopv.png"
          alt="Hero"
          className="w-full max-w-[250px] rounded-lg transform hover:scale-105 transition duration-300 animate-[float_6s_ease-in-out_infinite]"
        />
      </div>
    </div>
  );
};

export default Hero;
