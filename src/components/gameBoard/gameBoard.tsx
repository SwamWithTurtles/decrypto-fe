import React, {Component} from 'react';
import {scan} from 'rxjs/operators'
import WebsocketHandler from "../../event-model/websocketHandler";
import buildState from "../../event-model/buildState"
import {Observable} from "rxjs/index";
import {emptyRemoteState, GameState, GameStateEvent, Team} from "../../event-model/eventTypes";
import WaitingGamePortal from "../waitingGamePortal/waitingGamePortal";
import ActiveGameState from "../activeGameState/activeGameState";
import LogInAgain from "../activeGameState/logInAgain/logInAgain";
import GameOverState from "../gameOverState/gameOverState";

type GameBoardProperties = {
    gameId: string
}

type GameBoardState = {
    localState : LocalState,
    remoteState : GameState
}

type LocalState = {
    playerName : string | null
}

export default class GameBoard extends Component<GameBoardProperties, GameBoardState> {

    constructor(props : GameBoardProperties) {
        super(props);

        this.state = {
            localState: {
                playerName: null
            },
            remoteState: emptyRemoteState()
        };


        const events$ : Observable<GameStateEvent> = new WebsocketHandler().getSubscription(this.props.gameId);

        const fullModel$ : Observable<GameState> = events$.pipe(scan(buildState, emptyRemoteState()));

        fullModel$.subscribe(newState => {
            this.setState({
                localState: this.state.localState || {},
                remoteState: newState
            })
        });

        this.handlePlayerRegister = this.handlePlayerRegister.bind(this);
    }

    handlePlayerRegister(playerName : string) : void {
        this.setState({
            localState: {
                playerName: playerName
            },
            remoteState: this.state.remoteState
        });
    }

    getPlayerTeam() : (Team | null) {
        if(!this.state.localState.playerName) {
            return null;
        }

        if(this.state.remoteState.RED_TEAM.teamRoster.includes(this.state.localState.playerName)) {
            return "RED_TEAM"
        } else {
            return "BLUE_TEAM"
        }
    }

    render() {

        return <div className="gameBoard">
            {this.state.remoteState.gameState === "Waiting" &&
                <WaitingGamePortal gameId={this.props.gameId}
                                   playerList={this.state.remoteState.playerList}
                                   handlePlayerRegister={this.handlePlayerRegister}
                                   isRegistered={!!this.state.localState.playerName} />
            }

            {this.state.remoteState.gameState !== "Waiting" && this.state.remoteState.gameState !== "Generating" &&
                !this.state.localState.playerName &&
                <LogInAgain playerList={this.state.remoteState.playerList}
                                handlePlayerRegister={this.handlePlayerRegister}/>
            }

            {this.state.remoteState.gameState === "Completed" && this.state.localState.playerName &&
                <GameOverState gameState={this.state.remoteState}/>
            }

            {this.state.remoteState.gameState !== "Waiting" && this.state.remoteState.gameState !== "Generating" &&
                this.state.localState.playerName &&
                <ActiveGameState playerName={this.state.localState.playerName}
                                 playerTeam={this.getPlayerTeam()}
                                 gameState={this.state.remoteState}
                                 gameId={this.props.gameId}/>
            }


        </div>
    }

}