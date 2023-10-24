import React, { useState } from "react";
// import { BiSolidVolumeMute } from "react-icons/bi";
import IconComponent from "./IconComponent";
import Volume from "./Volume";
export default function Header() {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  return (
    <header>
      <h1 className="welcome">Welcome to the React music quiz</h1>
      <div className="control_wrapper">
        <Volume />
        {/* <button
          className="btn btn_ternary"
          title="Click to enable or disable visualisation"
        >
          Disable/enable visualisation
        </button> */}
        <button
          className="btn btn_ternary"
          title={isMuted ? "Unmute" : "Mute"}
          onClick={toggleMute}
        >
          <IconComponent />
        </button>
      </div>
    </header>
  );
}
