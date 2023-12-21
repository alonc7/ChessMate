import { useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import './MainMenu.css';

type Props = {
    onGameCreated: (gameId: string) => void;
};

const MainMenu = ({ onGameCreated }: Props) => {
    const [gameId, setGameId] = useState('');
    const [joinGameId, setJoinGameId] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateOrUpdateGame = async (apiEndpoint: string, successMessage: string) => {
        try {
            setLoading(true);
            const response = await axios.post(apiEndpoint);
            const { game_id } = response.data;
            setGameId(game_id);
            onGameCreated(game_id);
            console.log(successMessage, game_id);
        } catch (error) {
            console.error(`Error ${successMessage.toLowerCase()}:`, error);
        } finally {
            setLoading(false);
        }
    };

    const createNewGame = () => {
        handleCreateOrUpdateGame('http://localhost:8000/create_game', 'Game created with ID:');
    };

    const joinExistingGame = () => {
        handleCreateOrUpdateGame(`http://localhost:8000/join_game/${joinGameId}`, 'Joined game with ID:');
    };

    const renderMainMenu = () => (
        <div className='container'>
            <div className='inner-container'>
                <h1>Main Menu</h1>
                <div className='buttons-container'>
                    <button onClick={createNewGame} disabled={loading}>
                        {loading ? 'Creating Game...' : 'Create New Game'}
                    </button>
                    <button onClick={joinExistingGame} disabled={loading}>
                        {loading ? 'Joining Game...' : 'Join Existing Game'}
                    </button>
                    <label>
                        Join Existing Game ID:
                        <input type="text" value={joinGameId} onChange={(e) => setJoinGameId(e.target.value)} />
                    </label>
                </div>
                {gameId && !loading && <p>Your Game ID: {gameId}</p>}
            </div>
        </div>
    );

    const renderLoader = () => (
        <div id='loader-container'>
            <Loader />
        </div>
    );

    return loading ? renderLoader() : renderMainMenu();
};

export default MainMenu;
