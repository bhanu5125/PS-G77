import React from "react";
import "./Gamepage.css"; // Create a separate CSS file for styling
import AnagramCP from "./assests/Anagram_cp.jpg";
import ColourPatternCP from "./assests/ColourPatterns_cp.jpg.png";
import EmotionCP from "./assests/EmotionCover_pic.jpg";
export default function Gamepage() {
  return (
    <div className="gamepage-container">
      <div className="row">
        <h1 className="d-flex align-items-center justify-content-center mt-5">
          Autism
        </h1>
        <div className="boxgamepage">
          Anagram
          <img className="imgcolourpattern" src={AnagramCP}></img>
        </div>
        <div className="boxgamepage">
          Colour Pattern
        <img className="imgcolourpattern" src={ColourPatternCP}></img>
</div>
        <div className="boxgamepage">
        <img className="imgemotion" src={EmotionCP}></img>
</div>
      </div>

      <div className="row">
        <h1 className="d-flex align-items-center justify-content-center ">
          Dyslexia
        </h1>
        <div className="boxgamepage">Box 4</div>
        <div className="boxgamepage">Box 5</div>
      </div>
    </div>
  );
}