from fastapi import FastAPI, WebSocketDisconnect, WebSocket
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional

import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Class to represent a game
class Game:
    def __init__(self):
        self.players = []
        self.websockets = set()

# Dictionary to store game state and player information
games = {}

@app.post("/create_game")
def create_game():
    game_id = str(uuid.uuid4())
    games[game_id] = Game()
    return {"game_id": game_id}

@app.post("/join_game/{game_id}")
def join_game(game_id: str):
    if game_id in games:
        games[game_id].players.append("Player2")
        return {"message": "Player2 joined the game"}
    else:
        return {"error": "No game found"}

@app.websocket("/ws/{game_id}")
async def websocket_endpoint(websocket: WebSocket, game_id: str):
    await websocket.accept()

    if game_id in games:
        games[game_id].websockets.add(websocket)
        try:
            while True:
                data = await websocket.receive_text()
                # Implement logic to handle WebSocket messages
                for ws in games[game_id].websockets:
                    await ws.send_text(data)
        except WebSocketDisconnect:
            pass
        finally:
            games[game_id].websockets.remove(websocket)
    else:
        await websocket.close()

@app.post("/make_move/{game_id}")
async def make_move(game_id: str, moves: List[str]):  # Use List for multiple moves
    if game_id in games:
        # Validate moves and update the game state
        # For simplicity, just broadcast the moves for now
        for ws in games[game_id].websockets:
            await ws.send_text(f"Moves made in game {game_id}: {moves}")
        return {"message": f"Moves made in game {game_id}: {moves}"}
    else:
        return {"error": "Game not found"}
