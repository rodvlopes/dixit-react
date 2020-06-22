/* eslint 'no-prototype-builtins' : 0 */

export function generateSimpleId(length = 3) {
  return [...Array(length)]
    .map(() => ((Math.random() * 32) | 0).toString(32))
    .join("");
}

export function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

export function randomUpTo(num) {
  /* [0,num-1] */
  return Math.floor(Math.random() * num);
}

export function calcRoundScore(allPlayers, cards, storyTeller) {
  const players = allPlayers.filter((p) => p.name);
  const storyTellerCard = cards.find((c) => c.owner === storyTeller.index);
  const storyTellerGotAllVotes =
    storyTellerCard.votes.length === players.length - 1;
  const storyTellerGotNoVotes = storyTellerCard.votes.length === 0;

  return players.map((p) => {
    const playerIsTheStoryTeller = p.index === storyTeller.index;
    const playerVotedToStoryTellerCard = storyTellerCard.votes.find(
      (v) => v.index === p.index
    );
    const playerCard = cards.find((c) => c.owner === p.index);
    const numVotesToPlayerCard = playerCard.votes.length;
    if (playerIsTheStoryTeller) {
      if (storyTellerGotAllVotes || storyTellerGotNoVotes) {
        return 0;
      }
      return numVotesToPlayerCard ? 3 : 0;
    } else {
      if (storyTellerGotAllVotes || storyTellerGotNoVotes) {
        return 2 + numVotesToPlayerCard;
      }
      return playerVotedToStoryTellerCard
        ? 3 + numVotesToPlayerCard
        : numVotesToPlayerCard;
    }
  });
}

/* initial deal cards */
export function dealCards(cards, players) {
  const numPlayers = players.filter((p) => p.name).length;
  const cardNumbersShuffled = shuffle(cards.map((c, i) => i));

  const dealt = Array(numPlayers)
    .fill()
    .map((x, playerIndex) => {
      return Array(6)
        .fill()
        .map((y, i) => [playerIndex, cardNumbersShuffled.pop()]);
    })
    .flat()
    .reduce((acc, [playerIndex, cardIndex]) => {
      acc[cardIndex] = playerIndex;
      return acc;
    }, {});

  return cards.map((c) => {
    return dealt[c.index] === undefined ? c : { ...c, owner: dealt[c.index] };
  });
}

function undiscard(cards) {
  return cards.map((c) => ({ ...c, discarded: false }));
}

function discardSelection(cards, selectedCards) {
  return cards
    .filter((c) => !selectedCards.find((s) => s.index === c.index))
    .concat(
      selectedCards.map((s) => ({
        ...s,
        owner: null,
        selected: false,
        votes: [],
        discarded: true,
      }))
    );
}

function filterDrawPile(cards) {
  return cards.filter((c) => c.owner === null && !c.discarded);
}

/* discard the cards selected on the current round and deal +1 */
export function discardSelectedAndDealMore({ cards, selectedCards }) {
  let newCards = cards;
  let drawPile = filterDrawPile(cards);
  const owners = selectedCards.map((s) => s.owner);

  if (drawPile.length < owners.length) {
    newCards = undiscard(cards);
    drawPile = filterDrawPile(newCards);
  }

  newCards = discardSelection(newCards, selectedCards);

  const dealt = owners.reduce((acc, o) => {
    const drawPileIndex = randomUpTo(drawPile.length);
    const card = drawPile[drawPileIndex];
    drawPile = drawPile.filter((c) => c !== card);
    acc[card.index] = o;
    return acc;
  }, {});

  return newCards.map((c) => {
    return dealt[c.index] === undefined ? c : { ...c, owner: dealt[c.index] };
  });
}

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

export const expansionConf = {
  original: {
    key: "original",
    name: "Original",
    fileExtension: "png",
    default: true,
  },
  memories: {
    key: "memories",
    name: "Memories",
    fileExtension: "jpg",
    default: false,
  },
};

export const defaultExpansion = Object.values(expansionConf).find(
  (it) => it.default
).key;

const ROOM_EXPANSION_SEPARATOR = "-";

export function composeRoomExpansion(id, expansion = defaultExpansion) {
  return `${id}${ROOM_EXPANSION_SEPARATOR}${expansion}`;
}

export function decomposeRoomExpansion(roomId) {
  return roomId.includes(ROOM_EXPANSION_SEPARATOR)
    ? roomId.split(ROOM_EXPANSION_SEPARATOR)[1]
    : defaultExpansion;
}
