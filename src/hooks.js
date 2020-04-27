import { useRef, useEffect } from 'react'

export function useRoomChange (setRoom) {
  const onHashChanged = () => {
    console.log('hashchange', window.location.hash)
    setRoom(document.location.hash)
  }

  useEffect(() => {
    if (document.location.hash) {
      setRoom(document.location.hash)
    }

    window.addEventListener('hashchange', onHashChanged)
    return () => window.removeEventListener('hashchange', onHashChanged)
  }, [])
}

export function useWebsocket (username, gameState, receiveGameStateFromServer) {
  const ws = useRef(null)

  useEffect(() => {
    const host = window.location.host.replace(/:\d+/, '')
    const room = gameState.room.replace('#', '')
    ws.current = new WebSocket(`ws://${host}:7000/?id=${username}&room=${room}`)
    ws.current.onmessage = function (event) {
      if (event.data) {
        console.log('Estado recebido do servidor:', event.data)
        const serverGameState = JSON.parse(event.data)
        receiveGameStateFromServer(serverGameState)
      } else {
        console.log('Nenhum estado no servidor ainda.')
      }
    }

    return () => ws.current.close()
  }, [])

  useEffect(() => {
    // sendGameStateToServer
    console.log('sendGameStateToServer called')
    if (ws.current.readyState === WebSocket.OPEN) {
      if (!gameState.serverUpdated) {
        console.log('sending state to server...')
        ws.current.send(JSON.stringify(gameState))
      }
    }
  }, [gameState])

  return null
}
