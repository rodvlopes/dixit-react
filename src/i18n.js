const EN = "en";
const PT = "pt";
const DEAFULT = EN;

const allMessages = {
  [EN]: {},
  [PT]: {},
};

export function setMessage(id, msgEn, msgPt) {
  if (arguments.length !== Object.keys(allMessages).length + 1) {
    throw Error(
      `The definitions for '${id}' must be provided for every language.`
    );
  }

  allMessages[EN][id] = msgEn;
  allMessages[PT][id] = msgPt;
}

const i18n = () => {
  const lang = (navigator.language || DEAFULT).replace(/-\w+/, "");
  const l = Object.prototype.hasOwnProperty.call(allMessages, lang)
    ? lang
    : DEAFULT;
  const messages = allMessages[l];
  return (id, ...rest) => {
    const msg = Object.prototype.hasOwnProperty.call(messages, id)
      ? messages[id]
      : "i18n: no message defined";

    return rest.length ? msg(rest) : msg;
  };
};

export default i18n();

setMessage("Enter", "Enter", "Entrar");

setMessage(
  "NameShouldBeUpTo4CharsLong",
  "Choose a name up to 4 chars long.",
  "Escolha um nome com até 4 caracteres."
);

setMessage(
  "WantToCreateNewRoom?",
  "Do you want to create a new room?",
  "Deseja criar uma nova sala?"
);

setMessage("FullRoom", "ROOM IS FULL!", "SALA LOTADA!");

setMessage("Nickname", "Name/Nickname", "Nome/Apelido");

setMessage("CreateRoom", "Create Room", "Criar Sala");

setMessage(
  "NumOfPlayerInRoom",
  (num) => `Players in room: ${num} of 6.`,
  (num) => `Jogadores presente nesta sala: ${num} de 6.`
);

setMessage(
  "WaitOthersPlayersThenPressStart",
  "After everyone is present, press the button to start the game.",
  "Depois que todos os jogadors estiverem presentes, pressione o botão para iniciar."
);

setMessage("StartTheGame", "Start The Game", "Iniciar o Jogo");

setMessage("MinimumNumPlayers", "Minimun: 3 Players.", "Mínimo: 3 jogadores.");

setMessage(
  "WaitingStoryTellerToSelect",
  (name) => `Waiting storyteller (${name}) to select a card and tell the CLUE.`,
  (name) => `Aguardando o narrador (${name}) selecionar a carta e dar a DICA.`
);

setMessage("MyCards", "My Cards", "Minhas Cartas");

setMessage("ScoreBoard", "Score Board", "Tabuleiro de Pontuação");

setMessage("SelectThisOne", "Select This One", "Selecionar Esta");

setMessage("VoteForThis", "Vote For This One", "Votar Nesta");

setMessage(
  "WaitingListenersToSelect",
  "Waiting for players to choose a card:",
  "Aguardando os jogadores a selecionarem a carta:"
);

setMessage("WaitingVoters", "Waiting:", "Aguardando:");

setMessage("StartNextRound", "Start Next Round", "Inicar Próxima Rodada");

setMessage("EndOfMatch", "End of Match!", "Fim de Jogo!");

setMessage(
  "WaitingServer",
  "Connecting to server...",
  "Conectando-se ao servidor..."
);
