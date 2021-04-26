import { useRef, useEffect, useState } from "react";

export function useRoom(setRoom) {
  useEffect(() => {
    const room = new URLSearchParams(window.location.search).get("room");
    setRoom(room);
  }, []);
}

export function useSyncServerState(
  username,
  gameState,
  receiveGameStateFromServer
) {
  const ws = useRef(null);
  const [reconnectCount, setReconnectCount] = useState(0);
  const [serverReady, setServerReady] = useState(false);
  const reconnect = () => setReconnectCount((prev) => prev + 1);

  useEffect(() => {
    const host = window.location.host.replace(/:\d+/, "");
    const room = gameState.room;
    console.log("Opening ws connections", username, room, reconnectCount);
    ws.current = new WebSocket(
      `wss://${host}:7000/?id=${username}&room=${room}`
    );

    ws.current.onmessage = function ({ data }) {
      if (!serverReady) {
        setServerReady(true);
      }

      if (typeof data === "string") {
        console.log("GameState received from server.");
        const receivedGameState = JSON.parse(data);
        receiveGameStateFromServer(receivedGameState);
      } else {
        console.log("The server sent a empty GameState.");
      }
    };

    ws.current.onclose = function (e) {
      setServerReady(false);
      console.log(
        "Socket is closed. Reconnect will be attempted in 2 seconds.",
        e.reason,
        reconnectCount
      );
      setTimeout(() => reconnect(), 2000);
    };

    ws.current.onerror = function (err) {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );
      // ws.current.close()
    };

    return () => ws.current.close();
  }, [reconnectCount]);

  useEffect(() => {
    // sendGameStateToServer
    console.log(
      "sendGameStateToServer called. Checking if it will send state to server..."
    );
    if (ws.current.readyState === WebSocket.OPEN) {
      if (!gameState.serverUpdated) {
        ws.current.send(JSON.stringify(gameState));
        console.log("GameState sent.");
      }
    }
  }, [gameState]);

  useEffect(() => {
    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(`id=${username}`);
      console.log("Identification sent.");
    }
  }, [username]);

  return serverReady;
}
