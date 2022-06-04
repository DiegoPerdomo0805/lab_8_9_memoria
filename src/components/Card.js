import React from "react";
import "./Card.css";
import back from "../img/EldenRing.jpg";

export default function Card({ card, Click, Flip, found,}){
  const Selected = () => {
    if (!found) {
      Click(card);
    }
  };

  return (
    <div className="Card">
      <div className={Flip ? "Flip" : ""}>
        <img className="art" src={card.src} />
        <img className="back" src={back} onClick={Selected}/>
      </div>
    </div>
  );
}
