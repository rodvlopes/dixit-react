import { /* useState, */ useEffect } from 'react'

export function useRoomChange (setRoomId) {
  const onHashChanged = () => {
    console.log('hashchange', window.location.hash)
    setRoomId(document.location.hash)
  }

  useEffect(() => {
    if (document.location.hash) {
      setRoomId(document.location.hash)
    }

    window.addEventListener('hashchange', onHashChanged)
    return () => window.removeEventListener('hashchange', onHashChanged)
  }, [])
}
