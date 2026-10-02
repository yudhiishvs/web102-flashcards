export const cards = [
  { question: 'What does HTML stand for?', answer: 'HyperText Markup Language', category: 'HTML' },
  { question: 'Which HTML element contains the main content of a page?', answer: '<main>', category: 'HTML' },
  { question: 'What is the purpose of the alt attribute on an image?', answer: 'It provides a text alternative for the image.', acceptedAnswers: ['text alternative', 'alternative text'], category: 'HTML' },
  { question: 'What does CSS stand for?', answer: 'Cascading Style Sheets', category: 'CSS' },
  { question: 'Which CSS property controls the space inside an element’s border?', answer: 'padding', category: 'CSS' },
  { question: 'What does display: flex do?', answer: 'It makes an element a flex container for arranging its children.', acceptedAnswers: ['flex container', 'flexbox'], category: 'CSS' },
  { question: 'What is a JavaScript array?', answer: 'An ordered collection of values.', acceptedAnswers: ['ordered collection', 'ordered list of values', 'list of values'], category: 'JavaScript' },
  { question: 'What does addEventListener let you do?', answer: 'Run a function when a specified event occurs.', acceptedAnswers: ['event listener', 'listen for events', 'run a function when an event occurs'], category: 'JavaScript' },
  { question: 'What does useState return in React?', answer: 'The current state value and a function to update it.', acceptedAnswers: ['state value and setter', 'state and setter', 'state value and update function'], category: 'React' },
  { question: 'What are props in React?', answer: 'Values passed from a parent component to a child component.', acceptedAnswers: ['data passed from parent to child', 'values passed from parent to child'], category: 'React' },
]

function normalizeAnswer(value) {
  return value.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
}

export function isCorrectGuess(guess, card) {
  const normalizedGuess = normalizeAnswer(guess)
  return normalizedGuess.length > 0 && [card.answer, ...(card.acceptedAnswers ?? [])]
    .some((answer) => normalizeAnswer(answer) === normalizedGuess)
}

export function shuffleOrder(order, random = Math.random) {
  const shuffled = [...order]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    const cardToSwap = shuffled[index]
    shuffled[index] = shuffled[swapIndex]
    shuffled[swapIndex] = cardToSwap
  }
  if (shuffled.length > 1 && shuffled.every((cardId, index) => cardId === order[index])) {
    const firstCard = shuffled[0]
    shuffled[0] = shuffled[1]
    shuffled[1] = firstCard
  }
  return shuffled
}

export function moveIndex(index, count, step) {
  return Math.min(Math.max(index + step, 0), Math.max(count - 1, 0))
}

export function removeMastered(order, cardId, currentIndex) {
  const remaining = order.filter((id) => id !== cardId)
  return { order: remaining, index: Math.min(currentIndex, Math.max(remaining.length - 1, 0)) }
}

export function updateStreak(current, longest, correct) {
  const nextCurrent = correct ? current + 1 : 0
  return { current: nextCurrent, longest: Math.max(longest, nextCurrent) }
}
