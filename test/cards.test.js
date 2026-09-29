import test from 'node:test'
import assert from 'node:assert/strict'
import { cards, pickNextIndex } from '../src/cards.js'

test('the study deck contains complete question and answer pairs', () => {
  assert.ok(cards.length >= 8)
  for (const card of cards) {
    assert.ok(card.question)
    assert.ok(card.answer)
    assert.ok(card.category)
  }
})

test('next card is different when multiple cards exist', () => {
  for (let current = 0; current < 10; current++) {
    for (const random of [0, 0.25, 0.99]) {
      const next = pickNextIndex(current, 10, () => random)
      assert.ok(next >= 0 && next < 10)
      assert.notEqual(next, current)
    }
  }
})

test('next card varies with random input', () => {
  assert.notEqual(pickNextIndex(0, 10, () => 0), pickNextIndex(0, 10, () => 0.99))
})
