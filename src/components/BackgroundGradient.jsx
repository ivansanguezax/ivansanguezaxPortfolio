"use client";
import { cn } from "../lib/utils";  
import React from "react";
import { motion } from "framer-motion";
 
export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  
  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#60A5FA,transparent),radial-gradient(circle_farthest-side_at_100%_0,#3B82F6,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#2563EB,transparent),radial-gradient(circle_farthest-side_at_0_0,#1E40AF,#141316)]"
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1]",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#60A5FA,transparent),radial-gradient(circle_farthest-side_at_100%_0,#3B82F6,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#2563EB,transparent),radial-gradient(circle_farthest-side_at_0_0,#1E40AF,#141316)]"
        )}
      />
 
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};