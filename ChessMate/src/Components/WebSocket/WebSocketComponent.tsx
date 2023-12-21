import React, { useEffect, useRef } from 'react'

interface WebSocketComponentProps {
  gameID: string;
  onMessage: (message: any) => void;
}
const WebSocketComponent: React.FC<WebSocketComponentProps> = ({ gameID, onMessage }) => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Create a WebSocket connection when the component mounts
    socketRef.current = new WebSocket(`ws://127.0.0.1:8000/ws/${gameID}`);
    // Event listener for when the connection is established
    socketRef.current.addEventListener('open', () => {
      console.log('WebSocket connection established');
    });

    // Event listener for receiving messages
    socketRef.current.addEventListener('message', event => {

      const message = JSON.parse(event.data);
      onMessage(message);
    });

    // Cleanup function to close the connection when the component unmounts
    return () => {
      if (socketRef.current) {
        console.log('WebSocket connection closed');

        socketRef.current.close();
      }
    };
  }, [gameID, onMessage]);

  // Function to send a message to the server

  const sendMessage = (message: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    }
  };
  return (
    <div className="websocket-component">WebSocketComponent</div>
  )
}

export default WebSocketComponent