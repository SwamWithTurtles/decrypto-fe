import React, {Component} from "react";
import {GameState} from "../../event-model/eventTypes";
import DisplayWinners from "./displayWinners/displayWinners";

type Props = {
    gameState : GameState
}

export default class GameOverState extends Component<Props, {}> {

    render() {
        return (<div>
            <h2>Game Over!</h2>
            <DisplayWinners gameState={this.props.gameState} />
        </div>);
    }
}