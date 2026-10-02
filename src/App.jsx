import React, { useState } from 'react'
import { cards, isCorrectGuess, moveIndex, removeMastered, shuffleOrder, updateStreak } from './cards.js'

const originalOrder = cards.map((_, index) => index)

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

function PracticePanel({ card, guess, feedback, currentStreak, longestStreak, onGuessChange, onSubmit, onMaster }) {
  return (
    <aside className="practice-panel" aria-label="Practice your answer">
      <div className="section-label"><span className="section-label__dot" /> TEST YOURSELF</div>
      <h2>Know this one?</h2>
      <p className="practice-panel__hint">Write your answer before you flip the card. Close answers count too.</p>

      <form className="guess-form" onSubmit={onSubmit}>
        <label htmlFor="guess">Your guess</label>
        <input
          id="guess"
          name="guess"
          type="text"
          value={guess}
          onChange={(event) => onGuessChange(event.target.value)}
          placeholder="Type your answer here"
          autoComplete="off"
          disabled={feedback === 'correct'}
          className={feedback ? `guess-form__input guess-form__input--${feedback}` : 'guess-form__input'}
          aria-describedby="guess-feedback"
        />
        <button className="submit-button" type="submit" disabled={!guess.trim() || feedback === 'correct'}>
          CHECK ANSWER <span aria-hidden="true">↗</span>
        </button>
        <p
          id="guess-feedback"
          className={`guess-form__feedback${feedback ? ` guess-form__feedback--${feedback}` : ''}`}
          role="status"
        >
          {feedback === 'correct' && 'That’s right. Nice work!'}
          {feedback === 'incorrect' && 'Not quite. Give it another try.'}
          {!feedback && 'Punctuation and capital letters do not matter.'}
        </p>
      </form>

      <div className="practice-panel__bottom">
        <div className="streaks" aria-label="Answer streaks">
          <div><strong>{currentStreak}</strong><span>CURRENT STREAK</span></div>
          <div><strong>{longestStreak}</strong><span>BEST STREAK</span></div>
        </div>
        <button className="master-button" type="button" onClick={onMaster}>
          <span aria-hidden="true">✓</span> MARK AS MASTERED
        </button>
      </div>
    </aside>
  )
}

export default function App() {
  const [order, setOrder] = useState(originalOrder)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [guess, setGuess] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)
  const [masteredIds, setMasteredIds] = useState([])
  const card = cards[order[currentIndex]]

  function resetCard() {
    setFlipped(false)
    setGuess('')
    setFeedback(null)
  }

  function changeCard(step) {
    setCurrentIndex((index) => moveIndex(index, order.length, step))
    resetCard()
  }

  function submitGuess(event) {
    event.preventDefault()
    if (!card || !guess.trim() || feedback === 'correct') return

    const correct = isCorrectGuess(guess, card)
    setFeedback(correct ? 'correct' : 'incorrect')
    const nextStreak = updateStreak(currentStreak, longestStreak, correct)
    setCurrentStreak(nextStreak.current)
    setLongestStreak(nextStreak.longest)
  }

  function masterCard() {
    if (!card) return
    const cardId = order[currentIndex]
    const remaining = removeMastered(order, cardId, currentIndex)
    setOrder(remaining.order)
    setCurrentIndex(remaining.index)
    setMasteredIds((ids) => [...ids, cardId])
    resetCard()
  }

  function shuffleCards() {
    setOrder((currentOrder) => shuffleOrder(currentOrder))
    setCurrentIndex(0)
    resetCard()
  }

  function restoreDeck() {
    setOrder(originalOrder)
    setCurrentIndex(0)
    setMasteredIds([])
    setCurrentStreak(0)
    resetCard()
  }

  return (
    <main className="page">
      <div className="shell">
        <header className="site-header">
          <div className="brand"><span className="brand__mark">F.</span><span>FLASH / STUDY</span></div>
          <span className="site-header__edition">THE MINI STUDY SERIES <span>№ 03</span></span>
        </header>

        <section className="intro" aria-labelledby="deck-title">
          <div className="intro__copy">
            <div className="section-label"><span className="section-label__dot" /> YOUR STUDY DECK</div>
            <h1 id="deck-title">Web Development <em>Essentials.</em></h1>
            <p>Ten quick questions on HTML, CSS, JavaScript, and React. Make a guess, check it, then keep going.</p>
          </div>
          <div className="deck-stat" aria-label={`${order.length} ${order.length === 1 ? 'card' : 'cards'} left to study`}>
            <span className="deck-stat__number">{String(order.length).padStart(2, '0')}</span>
            <span className="deck-stat__label">{order.length === 1 ? 'CARD LEFT' : 'CARDS LEFT'}<br />TO STUDY</span>
          </div>
        </section>

        <section className="study-area" aria-label="Flashcard study area">
          <div className="study-area__heading">
            <span>NOW STUDYING <span className="study-area__asterisk">✳</span></span>
            <button className="shuffle-button" type="button" onClick={shuffleCards} disabled={order.length < 2}>
              <span aria-hidden="true">⇄</span> SHUFFLE CARDS
            </button>
          </div>

          <div className={`study-layout${card ? '' : ' study-layout--empty'}`}>
            <div className="card-column">
              {card ? (
                <>
                  <div className={`card-frame${flipped ? ' card-frame--flipped' : ''}`}>
                    <span className="card-frame__index">CARD {String(currentIndex + 1).padStart(2, '0')} / {String(order.length).padStart(2, '0')}</span>
                    <Flashcard card={card} flipped={flipped} onFlip={() => setFlipped((value) => !value)} />
                  </div>
                  <div className="card-navigation" aria-label="Card navigation">
                    <button type="button" onClick={() => changeCard(-1)} disabled={currentIndex === 0}>
                      <span aria-hidden="true">←</span> PREVIOUS
                    </button>
                    <span>Move through the deck at your own pace.</span>
                    <button type="button" onClick={() => changeCard(1)} disabled={currentIndex === order.length - 1}>
                      NEXT <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="empty-state">
                  <span className="empty-state__icon" aria-hidden="true">✳</span>
                  <h2>All cards mastered.</h2>
                  <p>You made it through the deck. Want to go again?</p>
                  <button type="button" onClick={restoreDeck}>RESTORE DECK <span aria-hidden="true">↗</span></button>
                </div>
              )}
            </div>

            {card && (
              <PracticePanel
                guess={guess}
                feedback={feedback}
                currentStreak={currentStreak}
                longestStreak={longestStreak}
                onGuessChange={(value) => {
                  setGuess(value)
                  if (feedback === 'incorrect') setFeedback(null)
                }}
                onSubmit={submitGuess}
                onMaster={masterCard}
              />
            )}
          </div>
        </section>

        {masteredIds.length > 0 && (
          <section className="mastered-list" aria-labelledby="mastered-title">
            <div className="mastered-list__heading">
              <h2 id="mastered-title">Mastered cards</h2>
              <span>{masteredIds.length} / {cards.length}</span>
            </div>
            <ul>
              {masteredIds.map((id) => <li key={id}><span>✓</span>{cards[id].question}</li>)}
            </ul>
          </section>
        )}

        <footer className="footer"><span>KEEP PRACTICING.</span><span>WEB102 · PROJECT 3</span></footer>
      </div>
    </main>
  )
}
