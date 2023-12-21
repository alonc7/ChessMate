// App.js
import React, { useState } from 'react';
import GameContainer from './Components/GameContainer/GameContainer';
import MainMenu from './Components/MainMenu/MainMenu';
import './App.css'
const App: React.FC = () => {
  const [gameId, setGameId] = useState<string>('');

  const handleGameCreated = (newGameId: string) => {
    setGameId(newGameId);
  };

  return (
    <div>
      {!gameId ? (
        <MainMenu onGameCreated={handleGameCreated} />
      ) : (
        <GameContainer gameId={gameId} />
      )}
    </div>
  );
};

export default App;
