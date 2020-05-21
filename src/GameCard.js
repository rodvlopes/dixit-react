/* eslint 'react/prop-types' : 0 */
import React from "react";
import { Card, CardContent, CardActions, Button } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/AccountCircle";
import { connect } from "react-redux";
import { selectCard, voteCard } from "./store/actions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette }) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    "& img": {
      width: "100%",
    },
  },
  cardSt: {
    // border: '2px solid',
    // borderColor: palette.primary[palette.type],
    animation: "glowing 1s infinite",
    animationDirection: "alternate",
  },
  cardContent: {
    flexGrow: 1,
    paddingBottom: 0,
  },
  cardActions: {
    flexDirection: "column",
  },
}));

function GameCardPresentational({
  card,
  selectionRequired,
  electionRequired,
  electionFinished,
  storyTeller,
  revealVotes,
  selectCard,
  voteCard,
  voter,
}) {
  const classes = useStyles();
  let ElectionAction = null;
  let SelectAction = null;
  let Votes = null;
  const isStoryTellerCard = card.owner === storyTeller.index;
  const isOwnCard = card.owner === voter.index;

  if (selectionRequired) {
    SelectAction = (
      <CardActions className={classes.cardActions}>
        <Button
          variant="outlined"
          size="small"
          onClick={(ev) => selectCard(card)}
        >
          Selecionar Esta
        </Button>
      </CardActions>
    );
  }

  if (electionRequired && !isOwnCard) {
    ElectionAction = (
      <CardActions className={classes.cardActions}>
        <Button
          variant="outlined"
          size="small"
          onClick={(ev) => voteCard(card, voter)}
        >
          Votar Nesta
        </Button>
      </CardActions>
    );
  }

  if (revealVotes) {
    Votes = (
      <CardActions>
        {card.votes.map((v) => (
          <PersonIcon key={v.index} className={v.color} />
        ))}
      </CardActions>
    );
  }

  return (
    <Card
      className={`${classes.card} ${
        isStoryTellerCard && electionFinished ? classes.cardSt : ""
      }`}
    >
      <CardContent className={classes.cardContent}>
        <img src={`cards/card_${card.index}.png`} />
      </CardContent>
      {SelectAction}
      {ElectionAction}
      {Votes}
    </Card>
  );
}

const GameCard = connect(
  (state) => ({
    voter: state.game.loggedInUser,
    storyTeller: state.game.storyTeller,
  }),
  (dispatch) => ({
    selectCard: (card) => dispatch(selectCard(card)),
    voteCard: (card, voter) => dispatch(voteCard(card, voter)),
  })
)(GameCardPresentational);

export default GameCard;
