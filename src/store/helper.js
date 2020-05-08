/* eslint 'no-prototype-builtins' : 0 */

export function shuffle (arr) {
  return arr.sort(() => Math.random() - 0.5)
}

export function randomUpTo (num) { /* [0,num-1] */
  return Math.floor(Math.random() * num)
}

export function calcRoundScore (allPlayers, cards, storyTeller) {
  const players = allPlayers.filter(p => p.name)
  const storyTellerCard = cards.find(c => c.owner === storyTeller.index)
  const storyTellerGotAllVotes =
    storyTellerCard.votes.length === (players.length - 1)
  const storyTellerGotNoVotes =
    storyTellerCard.votes.length === 0

  return players.map(p => {
    const playerIsTheStoryTeller = p.index === storyTeller.index
    const playerVotedToStoryTellerCard = storyTellerCard.votes.find(v => v.index === p.index)
    const playerCard = cards.find(c => c.owner === p.index)
    const numVotesToPlayerCard = playerCard.votes.length
    if (playerIsTheStoryTeller) {
      if (storyTellerGotAllVotes || storyTellerGotNoVotes) {
        return 0
      }
      return numVotesToPlayerCard ? 3 : 0
    } else {
      if (storyTellerGotAllVotes || storyTellerGotNoVotes) {
        return 2 + numVotesToPlayerCard
      }
      return playerVotedToStoryTellerCard ? (3 + numVotesToPlayerCard) : numVotesToPlayerCard
    }
  })
}

/* initial deal cards */
export function dealCards (cards, players) {
  const numPlayers = players.filter(p => p.name).length
  const cardNumbersShuffled = shuffle(cards.map((c, i) => i))

  const dealt = Array(numPlayers).fill().map((x, playerIndex) => {
    return Array(6).fill().map((y, i) => [playerIndex, cardNumbersShuffled.pop()])
  })
    .flat()
    .reduce((acc, [playerIndex, cardIndex]) => {
      acc[cardIndex] = playerIndex; return acc
    }, {})

  return cards.map(c => {
    return dealt[c.index] === undefined ? c : { ...c, owner: dealt[c.index] }
  })
}

/* discard the cards selected on the current round and deal +1 */
export function discardSelectedAndDealMore ({ cards, selectedCards }) {
  const owners = selectedCards.map(s => s.owner)

  const newCards = cards
    .filter(c => !selectedCards.find(s => s.index === c.index))
    .concat(selectedCards.map(s => (
      { ...s, owner: null, selected: false, votes: [], discarded: true }
    )))

  let drawPile = newCards.filter(c => c.owner === null && !c.discarded)

  const dealt = owners.reduce((acc, o) => {
    const drawPileIndex = randomUpTo(drawPile.length)
    const card = drawPile[drawPileIndex]
    drawPile = drawPile.filter(c => c !== card)
    acc[card.index] = o
    return acc
  }, {})

  return newCards
    .map(c => {
      return dealt[c.index] === undefined ? c : { ...c, owner: dealt[c.index] }
    })
}

export function createReducer (initialState, handlers) {
  return function reducer (state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
