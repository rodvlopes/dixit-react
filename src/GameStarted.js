/* eslint 'react/prop-types' : 0 */
import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import AppHeader from './AppHeader'
import MyCards from './MyCards'
import GameBoard from './GameBoard'
import ScoreBoard from './ScoreBoard'
import { connect } from 'react-redux'
import { toggleProgressBoard, toggleMyCards } from './store/actions'

function GameStartedPresentational ({
  myCardsOpen,
  toggleMyCards,
  progressBoardOpen,
  toggleProgressBoard,
  cards
}) {
  return (
    <>
      <AppHeader
        openMyCards={toggleMyCards}
        openProgress={toggleProgressBoard}
      />
      <Drawer anchor='left' open={myCardsOpen} onClose={toggleMyCards}>
        <MyCards cards={cards} onClose={toggleMyCards} />
      </Drawer>
      <GameBoard cards={[6, 7, 8, 9, 10]}/>
      <Drawer anchor='right' open={progressBoardOpen} onClose={toggleProgressBoard}>
        <ScoreBoard onClose={toggleProgressBoard} />
      </Drawer>
    </>
  )
}

const mapStateToProps = state => ({
  myCardsOpen: state.myCardsOpen,
  cards: [1, 2, 3, 4, 5, 6],
  progressBoardOpen: state.progressBoardOpen
})

const mapDispatchToProps = dispatch => ({
  toggleProgressBoard: id => dispatch(toggleProgressBoard()),
  toggleMyCards: id => dispatch(toggleMyCards())
})

const GameStarted = connect(mapStateToProps, mapDispatchToProps)(GameStartedPresentational)

export default GameStarted
