import React from 'react';
import {
  dealCards, 
  calcRoundScore, 
  discardSelectedAndDealMore, 
  generateSimpleId 
} from '../src/store/helper';

describe("generateSimpleId", () => {
  test('Should generate a 3 character random word', () => {
    for (let i=0; i++<100;)
      expect(generateSimpleId()).toMatch(/\w\w\w/);
  })
})

describe("dealCards", () => {
  const cards = Array(84).fill().map((u, i) => ({owner: null, votes: null, selected: false, index: i }))

  test('Given 3 players. Each one has to have 6 dealt cards.', () => {
    const players = [{name: 'a'}, {name: 'b'}, {name: 'c'}]
    const cardsDealt = dealCards(cards, players)
    expect(cardsDealt.length).toEqual(84)
    // console.log(cardsDealt)
    expect(cardsDealt.length).toEqual(84)
    expect(cardsDealt.filter(c => c.owner === 0).length).toEqual(6)
    expect(cardsDealt.filter(c => c.owner === 1).length).toEqual(6)
    expect(cardsDealt.filter(c => c.owner === 2).length).toEqual(6)
    expect(cardsDealt.filter(c => c.owner === null).length).toEqual(84-(6+6+6))

  })

  test('Given 6 players. Each one has to have 6 dealt cards.', () => {
    const players = [{name: 'a'}, {name: 'b'}, {name: 'c'},{name: 'd'}, {name: 'e'}, {name: 'f'}]
    const cardsDealt = dealCards(cards, players)
    expect(cardsDealt.length).toEqual(84)
    // console.log(cardsDealt)
    expect(cardsDealt.length).toEqual(84)
    expect(cardsDealt.filter(c => c.owner === 0).length).toEqual(6)
    expect(cardsDealt.filter(c => c.owner === 1).length).toEqual(6)
    expect(cardsDealt.filter(c => c.owner === 2).length).toEqual(6)
    expect(cardsDealt.filter(c => c.owner === 3).length).toEqual(6)
    expect(cardsDealt.filter(c => c.owner === 4).length).toEqual(6)
    expect(cardsDealt.filter(c => c.owner === 5).length).toEqual(6)
    expect(cardsDealt.filter(c => c.owner === null).length).toEqual(84-(6+6+6+6+6+6))
  })
})

describe("calcRoundScore", () => {
  test('StoryTeller has some votes. He scores 3. Others: 3 (+ 1 each votes won)', () => {
    const players = [
      {index: 0, name: 'a', score: 10},
      {index: 1, name: 'b', score: 0},
      {index: 2, name: 'c', score: 1},
      {index: 3, name: 'd', score: 0},
    ]
    const storyTeller = players[0]
    const cards = [
      {index: 40, owner: 0, votes: [{index: 1}, {index: 2}] },
      {index: 41, owner: 1, votes: [{index: 3}]},
      {index: 41, owner: 2, votes: []},
      {index: 41, owner: 3, votes: []},
    ]
    const result = calcRoundScore(players, cards, storyTeller)
    expect(result.length).toEqual(players.length)
    expect(result).toEqual([3, 4, 3, 0])
  })

  test('StoryTeller has all votes. He scores 0. Others 2.', () => {
    const players = [
      {index: 0, name: 'a', score: 10},
      {index: 1, name: 'b', score: 0},
      {index: 2, name: 'c', score: 1},
      {index: 3, name: 'd', score: 0},
    ]
    const storyTeller = players[0]
    const cards = [
      {index: 40, owner: 0, votes: [{index: 1}, {index: 2}, {index: 3}] },
      {index: 41, owner: 1, votes: []},
      {index: 41, owner: 2, votes: []},
      {index: 41, owner: 3, votes: []},
    ]
    const result = calcRoundScore(players, cards, storyTeller)
    expect(result.length).toEqual(players.length)
    expect(result).toEqual([0, 2, 2, 2])
  })

  test('StoryTeller has no votes. He scores 0. Others 2 +1*numVotos', () => {
    const players = [
      {index: 0, name: 'a', score: 10},
      {index: 1, name: 'b', score: 0},
      {index: 2, name: 'c', score: 1},
      {index: 3, name: 'd', score: 0},
    ]
    const storyTeller = players[0]
    const cards = [
      {index: 40, owner: 0, votes: [] },
      {index: 41, owner: 1, votes: []},
      {index: 41, owner: 2, votes: [{index: 3}]},
      {index: 41, owner: 3, votes: [{index: 1}, {index: 2}]},
    ]
    const result = calcRoundScore(players, cards, storyTeller)
    expect(result.length).toEqual(players.length)
    expect(result).toEqual([0, 2, 3, 4])
  })
})

describe("discardSelectedAndDealMore", () => {
  test('Discard 2. Check 1 new card is dealt to both players.', () => {
    const cards = [
      {index: 0, owner: 0, votes: [], selected: false},
      {index: 1, owner: 0, votes: [], selected: false},
      {index: 2, owner: 1, votes: [], selected: false},
      {index: 3, owner: 1, votes: [], selected: false},
      {index: 4, owner: null, votes: [], selected: false},
      {index: 5, owner: null, votes: [], selected: false},
      {index: 6, owner: null, votes: [], selected: false},
    ]

    const selectedCards =[
      {index: 0, owner: 0, votes: [1], selected: true},
      {index: 2, owner: 1, votes: [0], selected: true}
    ]

    const result = discardSelectedAndDealMore ({ cards, selectedCards })
    const owner0Cards = result.filter(c => c.owner === 0)
    const owner1Cards = result.filter(c => c.owner === 1)

    expect(result.length).toEqual(7)
    expect(owner0Cards.length).toEqual(2)
    expect(owner1Cards.length).toEqual(2)
    expect(owner0Cards.map(c => c.index)).toEqual(
      expect.not.arrayContaining([0,2,3])
    )
    expect(owner1Cards.map(c => c.index)).toEqual(
      expect.not.arrayContaining([2,0,1])
    )
    expect(result.filter(c=>c.discarded).length).toEqual(2)
  })

  test('Undiscard all (expect currently selected) when the draw pile is smaller then the num of players', () => {
    const cards = [
      {index: 0, owner: 0, votes: [], selected: false, discarded: false},
      {index: 1, owner: 0, votes: [], selected: false, discarded: false},
      {index: 2, owner: 1, votes: [], selected: false, discarded: false},
      {index: 3, owner: 1, votes: [], selected: false, discarded: false},
      {index: 4, owner: null, votes: [], selected: false, discarded: true}, /**/
      {index: 5, owner: null, votes: [], selected: false, discarded: true}, /**/
      {index: 6, owner: null, votes: [], selected: false, discarded: true}, /**/
    ]

    const selectedCards =[
      {index: 0, owner: 0, votes: [1], selected: true, discarded: false},
      {index: 2, owner: 1, votes: [0], selected: true, discarded: false}
    ]

    const result = discardSelectedAndDealMore ({ cards, selectedCards })
    const owner0Cards = result.filter(c => c.owner === 0)
    const owner1Cards = result.filter(c => c.owner === 1)
    const discardeds = result.filter(c=>c.discarded)

    expect(result.length).toEqual(7)
    expect(owner0Cards.length).toEqual(2)
    expect(owner1Cards.length).toEqual(2)
    expect(owner0Cards.map(c => c.index)).toEqual(
      expect.not.arrayContaining([0,2,3])
    )
    expect(owner1Cards.map(c => c.index)).toEqual(
      expect.not.arrayContaining([2,0,1])
    )
    expect(discardeds.map(c => c.index)).toEqual([0,2])
  })
})