import React from 'react';
import './HeroPage.css';
import { Link } from 'react-router-dom';

window.onload = function () {
    var shadowRoot = document.querySelector("spline-viewer").shadowRoot;
    shadowRoot.querySelector("#logo").remove();
  };

const HeroPage = () => {
  return (
    <div className="h-full w-full flex items-center bg-[#000000]">
      <div className="text-center">
        <h1 id='title' className=" absolute text-5xl font-bold items-center text-white mt-[100px]">Welcome to Radius</h1>
        <spline-viewer url="https://prod.spline.design/SistC4lDrw8X0SxA/scene.splinecode"></spline-viewer>
        <Link to="/chat">
            <button id='startButton' className="absolute bg-white hover:bg-blue text-black font-bold py-2 px-4 rounded">Start Chatting</button>
        </Link>
      </div>
    </div>
  );
};

export default HeroPage;