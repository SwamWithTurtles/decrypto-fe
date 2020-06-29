import React from 'react';
import './App.css';
import GameBoard from "./components/gameBoard/gameBoard";
import {useParams} from "react-router-dom";

function App() {

    const { gameId } = useParams();

return (
    <GameBoard gameId = {gameId}/>
);

}

export default App;
