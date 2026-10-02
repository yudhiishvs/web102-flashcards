import test from 'node:test'
import assert from 'node:assert/strict'
import * as study from '../src/cards.js'

const { cards } = study

test('the study deck contains complete question and answer pairs', () => {
  assert.ok(cards.length >= 8)
  for (const card of cards) {
    assert.ok(card.question)
    assert.ok(card.answer)
    assert.ok(card.category)
  }
})

test('answers accept case, punctuation, and curated partial phrases', () => {
  assert.equal(study.isCorrectGuess('HYPERTEXT MARKUP LANGUAGE!', cards[0]), true)
  assert.equal(study.isCorrectGuess('main', cards[1]), true)
  assert.equal(study.isCorrectGuess('text alternative', cards[2]), true)
  assert.equal(study.isCorrectGuess('event listener', cards[7]), true)
})

test('answers reject empty and unrelated guesses', () => {
  assert.equal(study.isCorrectGuess('   ', cards[0]), false)
  assert.equal(study.isCorrectGuess('JavaScript', cards[0]), false)
  assert.equal(study.isCorrectGuess('flex', cards[4]), false)
})

test('shuffle changes the sequence without mutating the original order', () => {
  const original = [0, 1, 2, 3]
  assert.deepEqual(study.shuffleOrder(original, () => 0), [1, 2, 3, 0])
  assert.deepEqual(original, [0, 1, 2, 3])
  assert.notDeepEqual(study.shuffleOrder(original, () => 0.999), original)
  assert.deepEqual(study.shuffleOrder([0], () => 0), [0])
})

test('ordered navigation stops at the first and last card', () => {
  assert.equal(study.moveIndex(0, 4, -1), 0)
  assert.equal(study.moveIndex(0, 4, 1), 1)
  assert.equal(study.moveIndex(3, 4, 1), 3)
  assert.equal(study.moveIndex(0, 0, 1), 0)
})

test('mastering a card removes it and keeps the next available card selected', () => {
  assert.deepEqual(study.removeMastered([0, 1, 2, 3], 1, 1), { order: [0, 2, 3], index: 1 })
  assert.deepEqual(study.removeMastered([0, 1, 2, 3], 3, 3), { order: [0, 1, 2], index: 2 })
  assert.deepEqual(study.removeMastered([0], 0, 0), { order: [], index: 0 })
})

test('streaks increment on correct guesses and reset on incorrect guesses', () => {
  assert.deepEqual(study.updateStreak(2, 3, true), { current: 3, longest: 3 })
  assert.deepEqual(study.updateStreak(3, 3, true), { current: 4, longest: 4 })
  assert.deepEqual(study.updateStreak(3, 4, false), { current: 0, longest: 4 })
})
