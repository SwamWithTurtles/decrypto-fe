import React, {Component} from 'react';
import StartGame from "./startGame/startGame";
import RegisterPlayer from "./registerPlayer/registerPlayer";
import PlayerList from "./playerList/playerList";

type Props = {
    gameId: string,
    playerList: string[],
    isRegistered: boolean,
    handlePlayerRegister: (playerName : string) => void
}

export default class WaitingGamePortal extends Component<Props, {}> {

    render() {
        return <div>
            <PlayerList playerList={this.props.playerList}/>
            {!this.props.isRegistered &&
            <RegisterPlayer gameId={this.props.gameId} playerHandler={this.props.handlePlayerRegister}/>
            }
            {this.props.isRegistered && this.props.playerList.length >= 4 &&
            <StartGame gameId={this.props.gameId}/>}

            {this.props.isRegistered && this.props.playerList.length < 4 &&
            <div className="alert alert-warning" role="alert">
                Waiting for four people before we can start the game
            </div>}
        </div>
    }
}