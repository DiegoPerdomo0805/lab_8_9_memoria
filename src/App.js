import React from "react";
import "./App.css";
import Card from "./components/Card.js";
import Friede from "./img/Friede.png";
import Godfrey from "./img/Godfrey.png";
import malenia from "./img/malenia.png";
import Malenia from "./img/MaleniaBladeOfMiquella.png";
import Manus from "./img/Manus.png";
import Radagon from "./img/radagon.png";
import Radhann from "./img/Radhann.png";
import Sullyvhan from "./img/Sullyvhan.png";

let cont = 0;

function App() {
  
  const Bosses = [
    { src: Friede, matched: false },
    { src: Godfrey, matched: false },
    { src: malenia, matched: false },
    { src: Malenia, matched: false },
    { src: Manus, matched: false },
    { src: Radagon, matched: false },
    { src: Radhann, matched: false },
    { src: Sullyvhan, matched: false },
  ];
  const [Won, setWon] = React.useState(false);
  const [Cards, setCards] = React.useState([]);
  const [Moves, setMoves] = React.useState(0);
  const [CardA, setCardA] = React.useState(null);
  const [CardB, setCardB] = React.useState(null);
  const [found, setfound] = React.useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...Bosses, ...Bosses].sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random() }));
    setCardA(null);
    setCardB(null);
    setCards(shuffledCards);
    setMoves(0);
  };

  React.useEffect(() => {
    shuffleCards();
  }, []);

  const Click = (card) => {
    setMoves((prevMoves) => prevMoves + 1);
    CardA ? setCardB(card)  : setCardA(card);
  };

  const unFlip = () => {
    setCardA(null);
    setCardB(null);
    setfound(false);
  };

  React.useEffect(() => {
    //console.log("Aqui estoy")
    if (CardA && CardB) {
      setfound(true);
      if (CardA.src === CardB.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === CardA.src) {
              console.log("Lleguè a casa")
              cont++;
              console.log(cont)
              return { ...card, matched: true };
            }
            return card;
          });
        });
        unFlip();
      } else {
        setTimeout(() => unFlip(), 1000);
      }
    }
  }, [CardA, CardB]);


  if (cont == Bosses.length*2){
    return(
      <div className="Won">
        <h1>Ha ganado</h1>
      </div>
    )
  }
  else{
  return (
    <div className="App">
      <div className="Title">
        <h1>Elden Ring</h1>
      </div>
      <div className="Moves_cont">
        <p className="Moves">Moves: {Moves}</p>
      </div>
      <div className="Cards">
        {Cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            Click={Click}
            Flip={card === CardA || card === CardB || card.matched}
            found={found}/>
        ))}
      </div>
    </div>
  );
  }
}

export default App;
