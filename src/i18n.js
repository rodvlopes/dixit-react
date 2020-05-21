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
      : "i18n: no message defined"

    return rest.length ? msg(rest) : msg
  }
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

setMessage(
  "NumOfPlayerInRoom",
  (num) => `Players in room: ${num} of 6.`,
  (num) => `Jogadores presente nesta sala: ${num} de 6.`
);
