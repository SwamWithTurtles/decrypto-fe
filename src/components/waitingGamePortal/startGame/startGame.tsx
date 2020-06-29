import React, {Component, FormEvent} from 'react';
import {startGame} from "../../../be-gateway/gateway";

type Props = {
    gameId: string
}

export default class StartGame extends Component<Props, {}> {

    constructor(props : Props) {
        super(props);

        this.handleStartGamePress = this.handleStartGamePress.bind(this);
    }

    startGame(gameId : string) : void {
        startGame(gameId)
            .then(resText => {
                console.log("Game Started")
            })
    }

    handleStartGamePress(event : FormEvent<HTMLButtonElement>) {
        this.startGame(this.props.gameId);
    }

    render() {
        return (<div className="startGame">
            <button className="btn btn-primary" onClick={this.handleStartGamePress}>Start Game</button>
        </div>);
    }

}
