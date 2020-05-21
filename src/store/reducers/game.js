import {
  shuffle,
  dealCards,
  calcRoundScore,
  discardSelectedAndDealMore,
  createReducer,
} from "../helper";

import {
  SET_ROOM,
  ASSIGN_COLOR_TO_PLAYER,
  START_GAME,
  RECEIVE_GAME_STATE_FROM_SERVER,
  SELECT_CARD,
  VOTE_CARD,
  NEXT_ROUND,
} from "../actions";

// class Player {
//   constructor(color, name, score) {
//     Object.assign(this, {color, name, score})
//   }
// }

const initialGameState = {
  room: null,
  players: [
    { index: 0, color: "yellow", name: null, score: null },
    { index: 1, color: "red", name: null, score: null },
    { index: 2, color: "blue", name: null, score: null },
    { index: 3, color: "white", name: null, score: null },
    { index: 4, color: "black", name: null, score: null },
    { index: 5, color: "green", name: null, score: null },
  ],
  loggedInUser: null,
  started: false,
  storyTeller: null,
  listeners: [],
  serverUpdated: false,
  cards: Array(84)
    .fill()
    .map((u, i) => ({
      owner: null,
      votes: [],
      selected: false,
      index: i,
      discarded: false,
    })),
  selectedCards: [],
  storyTellerSelected: false,
  listenersSelected: false,
  endOfMatch: false,
};

function setRoom(state, { id }) {
  return { ...state, room: id };
}

function assignColorToPlayer(state, { username }) {
  let players = state.players;
  let colorAssignedToIndex = players.indexOf(
    players.find((p) => p.name === username.toUpperCase())
  );

  const playerWasNotInRoom = colorAssignedToIndex === -1;

  if (playerWasNotInRoom) {
    players = players.map((p, i) => {
      if ((colorAssignedToIndex === -1) & (p.name === null)) {
        colorAssignedToIndex = i;
        return { ...p, name: username.toUpperCase(), score: 0 };
      }
      return p;
    });
  }
  return {
    ...state,
    players,
    loggedInUser: players[colorAssignedToIndex],
    serverUpdated: false,
  };
}

function startGame(state) {
  const storyTeller = state.players[0];

  return {
    ...state,
    started: true,
    storyTeller,
    cards: dealCards(state.cards, state.players),
    listeners: state.players.filter(
      (p) => p.name && p.index !== storyTeller.index
    ),
    serverUpdated: false,
  };
}

function selectCard(state, { card }) {
  const cards = state.cards.map((c) =>
    c.index === card.index ? { ...card, selected: true } : c
  );
  const selectedCards = shuffle(cards.filter((c) => c.selected));

  return {
    ...state,
    cards,
    selectedCards,
    storyTellerSelected: selectedCards.filter(
      (c) => c.owner === state.storyTeller.index
    ).length,
    listenersSelected:
      selectedCards.filter((c) => c.owner !== state.storyTeller.index)
        .length === state.listeners.length,
    serverUpdated: false,
  };
}

function voteCard(state, { card, voter }) {
  const selectedCards = state.selectedCards.map((c) =>
    c.index === card.index ? { ...card, votes: [...card.votes, voter] } : c
  );

  return {
    ...state,
    selectedCards,
    serverUpdated: false,
  };
}

function updatePlayersScore({ players, selectedCards, storyTeller }) {
  const prevRndScore = calcRoundScore(players, selectedCards, storyTeller);

  return players.map((p) => {
    const prevS =
      prevRndScore[p.index] === undefined ? 0 : prevRndScore[p.index];
    return { ...p, score: p.score + prevS };
  });
}

function nextRound(state) {
  console.log("nextRound reducer");
  const players = updatePlayersScore(state);

  const storyTeller =
    players[
      (state.storyTeller.index + 1) % players.filter((p) => p.name).length
    ];

  return {
    ...state,
    cards: discardSelectedAndDealMore(state),
    selectedCards: [],
    storyTeller,
    players,
    listeners: players.filter((p) => p.name && p.index !== storyTeller.index),
    storyTellerSelected: false,
    listenersSelected: false,
    endOfMatch: !!players.find((p) => p.score >= 30),
    serverUpdated: false,
  };
}

function receiveGameStateFromServer(state, { gameState }) {
  return {
    ...gameState,
    loggedInUser: state.loggedInUser, // TODO: remove from shared game state (is it possible?)
    serverUpdated: true,
  };
}

const game = createReducer(initialGameState, {
  [SET_ROOM]: setRoom,
  [ASSIGN_COLOR_TO_PLAYER]: assignColorToPlayer,
  [START_GAME]: startGame,
  [SELECT_CARD]: selectCard,
  [VOTE_CARD]: voteCard,
  [NEXT_ROUND]: nextRound,
  [RECEIVE_GAME_STATE_FROM_SERVER]: receiveGameStateFromServer,
});

export default game;
