// GameContainer.tsx
import React, { useState } from 'react';
import Referee from '../Referee/Referee';
import Camera from '../Camera/Camera';
import './GameContainer.css'; // Import the CSS file
import WebSocketComponent from '../WebSocket/WebSocketComponent';

interface GameContainerProps {
    gameId: string;
}

const GameContainer: React.FC<GameContainerProps> = ({ gameId }) => {
    const [allowCamera, setAllowCamera] = useState<boolean>(false);
    const [gameState, setGameState] = useState<any>({}); // Update with your actual game state type

    const toggleCamera = () => {
        setAllowCamera((prev) => !prev);
    };

    const handleWebSocketMessage=(message:string) => {
        
    }
    return (
        <div className="game-container">
            <div className="game-content">
                <Referee />
            </div>
            <WebSocketComponent gameID={gameId} onMessage={(message) => console.log(message)} />
            {allowCamera && (
                <div className="camera-container">
                    <Camera />
                    <button className="camera-btn" onClick={toggleCamera}>
                        Turn off camera
                    </button>
                </div>
            )}

            {!allowCamera && (
                <button className="camera-btn" onClick={toggleCamera}>
                    Turn on camera
                </button>
            )}

            <p className="game-id">Game ID: {gameId}</p>
        </div>
    );
};

export default GameContainer;
