export function shuffle (arr) {
  return arr.sort(() => Math.random() - 0.5)
}

export function dealCards (cards, players) {
  const numPlayers = players.filter(p => p.name).length
  const cardNumbersShuffled = shuffle(cards.map((c, i) => i))

  const owners = Array(numPlayers).fill().map((x, playerIndex) => {
    return Array(6).fill().map((y, i) => [playerIndex, cardNumbersShuffled.pop()])
  })
    .flat()
    .reduce((acc, [playerIndex, cardIndex]) => {
      acc[cardIndex] = playerIndex; return acc
    }, {})

  return cards.map((card, cardIndex) => {
    return { ...card, owner: owners[cardIndex] }
  })
}
