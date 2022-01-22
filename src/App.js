import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';


const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false)

  //Check a user choice (Right/False)
  useEffect(() => {
    if (choiceTwo) {

      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {

        setCards(prev => {
          return prev.map(card => {
            if (choiceTwo.src === card.src) {
              return { ...card, matched: true }
            }
            else return card
          })
        })

        console.log('Yes')
        resetTurn();
      }
      else {
        console.log('No')
        setTimeout(() => resetTurn(), 1000);
      }
      console.log('turn', turns, 'cards', cards);
    }
  }, [choiceTwo])


  useEffect(() => {
    schuffleCards()
  }, [])


  //shuffle the cards
  let schuffleCards = () => {
    let cardsSchuffled = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5)
      .map(card => { return { ...card, id: Math.random() } });

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(cardsSchuffled)
    setTurns(0)
  }

  //handle a user choice
  let handleChoice = card => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }


  //Reset choices and increase turn
  let resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prev => prev + 1);
    setDisabled(false)
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={schuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
