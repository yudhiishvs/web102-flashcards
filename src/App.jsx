import { useState } from 'react'
import { cards, pickNextIndex } from './cards.js'

function Flashcard({ card, flipped, onFlip }) {
  return (
    <button
      className={`flashcard flashcard--${card.category.toLowerCase()}${flipped ? ' flashcard--flipped' : ''}`}
      type="button"
      onClick={onFlip}
      aria-label={`${flipped ? 'Answer' : 'Question'}: ${flipped ? card.answer : card.question}. Click to flip.`}
    >
      <span className="flashcard__topline">
        <span className="flashcard__eyebrow">{flipped ? 'THE ANSWER' : 'THE QUESTION'}</span>
        <span className="flashcard__category">{card.category}</span>
      </span>
      <span className="flashcard__content" key={`${card.question}-${flipped}`}>
        {flipped ? card.answer : card.question}
      </span>
      <span className="flashcard__bottomline">
        <span>CLICK TO FLIP</span>
        <span aria-hidden="true">↻</span>
      </span>
    </button>
  )
}

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const card = cards[currentIndex]

  function showNextCard() {
    setCurrentIndex((index) => pickNextIndex(index, cards.length))
    setFlipped(false)
  }

  return (
    <main className="page">
      <div className="shell">
        <header className="site-header">
          <div className="brand"><span className="brand__mark">F.</span><span>FLASH / STUDY</span></div>
          <span className="site-header__edition">THE MINI STUDY SERIES <span>№ 02</span></span>
        </header>

        <section className="intro" aria-labelledby="deck-title">
          <div className="intro__copy">
            <div className="section-label"><span className="section-label__dot" /> YOUR STUDY DECK</div>
            <h1 id="deck-title">Web Development<br /><em>Essentials.</em></h1>
            <p>Small cards, big ideas. Flip through the building blocks of the web and see what you know.</p>
          </div>
          <div className="deck-stat" aria-label={`${cards.length} cards in this deck`}>
            <span className="deck-stat__number">{String(cards.length).padStart(2, '0')}</span>
            <span className="deck-stat__label">CARDS<br />IN THIS DECK</span>
          </div>
        </section>

        <section className="study-area" aria-label="Flashcard study area">
          <div className="study-area__heading">
            <span>NOW STUDYING</span>
            <span>ONE CARD AT A TIME <span className="study-area__asterisk">✳</span></span>
          </div>
          <div className="card-frame">
            <span className="card-frame__index">CARD {String(currentIndex + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}</span>
            <Flashcard card={card} flipped={flipped} onFlip={() => setFlipped((value) => !value)} />
          </div>
          <div className="study-controls">
            <p><span className="study-controls__sparkle">✦</span> Tap the card to reveal the answer.</p>
            <button className="next-button" type="button" onClick={showNextCard}>
              NEXT RANDOM CARD <span aria-hidden="true">↗</span>
            </button>
          </div>
        </section>

        <footer className="footer"><span>LEARN SOMETHING NEW TODAY.</span><span>WEB102 · PROJECT 2</span></footer>
      </div>
    </main>
  )
}
