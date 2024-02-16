import React, { useState, useEffect } from 'react';
import './contest.css';

const ScratchCard = () => {
  const [deviceType, setDeviceType] = useState({ touch: false });

  useEffect(() => {
    const canvas = document.getElementById("scratch");
    const context = canvas.getContext("2d");

    const init = () => {
      let gradientColor = context.createLinearGradient(0, 0, 135, 135);
      gradientColor.addColorStop(0, "#c3a3f1");
      gradientColor.addColorStop(1, "#6114e9");
      context.fillStyle = gradientColor;
      context.fillRect(0, 0, 200, 200);
    };

    let mouseX = 0;
    let mouseY = 0;
    let isDragged = false;

    const scratch = (x, y) => {
      context.globalCompositeOperation = "destination-out";
      context.beginPath();
      context.arc(x, y, 12, 0, 2 * Math.PI);
      context.fill();
    };

    const handleStart = (event) => {
      isDragged = true;
      getXY(event);
      scratch(mouseX, mouseY);
    };

    const handleMove = (event) => {
      if (!deviceType.touch) {
        event.preventDefault();
      }
      if (isDragged) {
        getXY(event);
        scratch(mouseX, mouseY);
      }
    };

    const handleEnd = () => {
      isDragged = false;
    };

    const getXY = (e) => {
      mouseX = (!deviceType.touch ? e.pageX : e.touches[0].pageX) - rectLeft;
      mouseY = (!deviceType.touch ? e.pageY : e.touches[0].pageY) - rectTop;
    };

    const canvasEvents = {
      down: deviceType.touch ? "touchstart" : "mousedown",
      move: deviceType.touch ? "touchmove" : "mousemove",
      up: deviceType.touch ? "touchend" : "mouseup"
    };

    canvas.addEventListener(canvasEvents.down, handleStart);
    canvas.addEventListener(canvasEvents.move, handleMove);
    canvas.addEventListener(canvasEvents.up, handleEnd);
    canvas.addEventListener("mouseleave", handleEnd);

    const isTouchDevice = () => {
      try {
        document.createEvent("TouchEvent");
        return true;
      } catch (e) {
        return false;
      }
    };

    setDeviceType({ touch: isTouchDevice() });

    let rectLeft = canvas.getBoundingClientRect().left;
    let rectTop = canvas.getBoundingClientRect().top;

    init();
  }, []);

  return (
    <div className="container">
      <div className="base">
        <img src='./c.png'/>
      </div>
      <canvas
        id="scratch"
        width="200"
        height="200"
      ></canvas>
    </div>
  );
};

export default ScratchCard;
