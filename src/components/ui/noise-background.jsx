"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

export function NoiseBackground({
  children,
  className,
  containerClassName,
  gradientColors = [
    "rgb(255, 100, 150)",
    "rgb(100, 150, 255)",
    "rgb(255, 200, 100)",
  ],
  noiseIntensity = 0.2,
  speed = 0.1,
  backdropBlur = false,
  animating = true,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resize();
    window.addEventListener("resize", resize);

    // Create noise texture
    const createNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value; // R
        data[i + 1] = value; // G
        data[i + 2] = value; // B
        data[i + 3] = 255 * noiseIntensity; // A
      }

      return imageData;
    };

    const draw = () => {
      const rect = container.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        resize();
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (animating) {
        timeRef.current += speed * 0.01;
      }

      // Draw gradient layers
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.max(canvas.width, canvas.height) * 1.5;

      ctx.globalCompositeOperation = "screen";

      gradientColors.forEach((color, index) => {
        const angle = (timeRef.current + index * (Math.PI * 2) / gradientColors.length);
        const offsetX = Math.cos(angle) * (canvas.width * 0.3);
        const offsetY = Math.sin(angle) * (canvas.height * 0.3);

        const gradient = ctx.createRadialGradient(
          centerX + offsetX,
          centerY + offsetY,
          0,
          centerX + offsetX,
          centerY + offsetY,
          maxRadius
        );

        gradient.addColorStop(0, color);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      ctx.globalCompositeOperation = "source-over";

      // Draw noise overlay
      if (noiseIntensity > 0) {
        const noise = createNoise();
        ctx.putImageData(noise, 0, 0);
      }

      if (animating) {
        animationFrameRef.current = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gradientColors, noiseIntensity, speed, backdropBlur, animating]);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", containerClassName)}>
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 w-full h-full",
          backdropBlur && "backdrop-blur-sm"
        )}
      />
      <div className={cn("relative z-10", className)}>
        {children}
      </div>
    </div>
  );
}

