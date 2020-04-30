import React from 'react';
import {dealCards} from '../src/store/helper';

test('Given 3 players. Each one has to have 6 dealt cards.', () => {

  const cards = Array(84).fill({owner: null, votes: null, selected: false })
  const players = [{name: 'a'}, {name: 'b'}, {name: 'c'}]
  const cardsDealt = dealCards(cards, players)
  expect(cardsDealt.length).toEqual(84)
  // console.log(cardsDealt)
  expect(cardsDealt.length).toEqual(84)
  expect(cardsDealt.filter(c => c.owner === 0).length).toEqual(6)
  expect(cardsDealt.filter(c => c.owner === 1).length).toEqual(6)
  expect(cardsDealt.filter(c => c.owner === 2).length).toEqual(6)
  expect(cardsDealt.filter(c => c.owner === undefined).length).toEqual(84-(6+6+6))

});

test('Given 6 players. Each one has to have 6 dealt cards.', () => {

  const cards = Array(84).fill({owner: null, votes: null, selected: false })
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
  expect(cardsDealt.filter(c => c.owner === undefined).length).toEqual(84-(6+6+6+6+6+6))

});