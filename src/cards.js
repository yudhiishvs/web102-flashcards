export const cards = [
  { question: 'What does HTML stand for?', answer: 'HyperText Markup Language', category: 'HTML' },
  { question: 'Which HTML element contains the main content of a page?', answer: '<main>', category: 'HTML' },
  { question: 'What is the purpose of the alt attribute on an image?', answer: 'It provides a text alternative for the image.', category: 'HTML' },
  { question: 'What does CSS stand for?', answer: 'Cascading Style Sheets', category: 'CSS' },
  { question: 'Which CSS property controls the space inside an element’s border?', answer: 'padding', category: 'CSS' },
  { question: 'What does display: flex do?', answer: 'It makes an element a flex container for arranging its children.', category: 'CSS' },
  { question: 'What is a JavaScript array?', answer: 'An ordered collection of values.', category: 'JavaScript' },
  { question: 'What does addEventListener let you do?', answer: 'Run a function when a specified event occurs.', category: 'JavaScript' },
  { question: 'What does useState return in React?', answer: 'The current state value and a function to update it.', category: 'React' },
  { question: 'What are props in React?', answer: 'Values passed from a parent component to a child component.', category: 'React' },
]

export function pickNextIndex(currentIndex, count, random = Math.random) {
  if (count <= 1) return 0
  const offset = Math.floor(random() * (count - 1)) + 1
  return (currentIndex + offset) % count
}
