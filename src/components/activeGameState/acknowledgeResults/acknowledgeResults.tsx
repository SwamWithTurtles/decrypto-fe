import React, {Component} from 'react';
import {acknowledgeResults} from "../../../be-gateway/gateway";
import {GameState} from "../../../event-model/eventTypes";

type Props = {
    gameId: string,
    playerName: string
    awaitingPlayers: string[],
    gameState: GameState
}

export default class AcknowledgeResults extends Component<Props, {}> {

    constructor(props: Props) {
        super(props);

        this.acknowledge = this.acknowledge.bind(this);
    }

    acknowledge() {
        acknowledgeResults(this.props.gameId, {
            playerName: this.props.playerName
        }).then(() => {
            console.log("Ack");
        });
    }

    render() {

        const redMis = this.props.gameState.RED_TEAM.codePhrase.join(".") !== this.props.gameState.RED_TEAM.guesses.FRIENDLY.join(".");
        const blueInt = this.props.gameState.RED_TEAM.codePhrase.join(".") === this.props.gameState.BLUE_TEAM.guesses.OPPOSITION.join(".");
        const blueMis = this.props.gameState.BLUE_TEAM.codePhrase.join(".") !== this.props.gameState.BLUE_TEAM.guesses.FRIENDLY.join(".");
        const redInt = this.props.gameState.BLUE_TEAM.codePhrase.join(".") === this.props.gameState.RED_TEAM.guesses.OPPOSITION.join(".");


        return (<div>{this.props.awaitingPlayers.includes(this.props.playerName) && <div className="acknowledgeResults">
            <div className="code-name red">
                <h4>Red Codephrase</h4>
                <p>{this.props.gameState.RED_TEAM.clueGiver} had to
                    communicate {this.props.gameState.RED_TEAM.codePhrase.join(".")}.</p>
                <p>Red team guessed {this.props.gameState.RED_TEAM.guesses.FRIENDLY.join(".")}. {redMis ?
                    <b>Miscommunication.</b> : "Communicated successfully."}</p>
                {
                    this.props.gameState.turnNumber > 0 &&
                    <p>Blue team guessed {this.props.gameState.BLUE_TEAM.guesses.OPPOSITION.join(".")}. {blueInt ?
                        <b>Interception.</b> : "Did not intercept."}</p>
                }
            </div>

            <div className="code-name blue">
                <h4>Blue Codephrase</h4>
                <p>{this.props.gameState.BLUE_TEAM.clueGiver} had to
                    communicate {this.props.gameState.BLUE_TEAM.codePhrase.join(".")}.</p>
                <p>Blue team guessed {this.props.gameState.BLUE_TEAM.guesses.FRIENDLY.join(".")}. {blueMis ?
                    <b>Miscommunication.</b> : "Communicated successfully."}</p>
                {this.props.gameState.turnNumber > 0 &&
                <p>Red team guessed {this.props.gameState.RED_TEAM.guesses.OPPOSITION.join(".")}. {redInt ?
                    <b>Interception.</b> : "Did not intercept."}</p>
                }
            </div>

            {this.props.gameState.turnNumber === 0 &&
            <div className="code-name">
                <p>Remember - next turn the enemy spies will be listening in.</p>
            </div>}

            {this.props.gameState.gameState !== "Completed" &&
            <button type="button" className="btn btn-primary" onClick={this.acknowledge}>Acknowledge</button>
            }
        </div>}</div>);
    }

}
