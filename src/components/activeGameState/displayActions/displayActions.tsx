import React, {Component} from 'react';
import {GameState, OutstandingActions, State} from "../../../event-model/eventTypes";

type Props = {
    playerName: string
    actions: OutstandingActions
    awaitingAcks: string[],
    status: State,
    state: GameState
}

export default class DisplayActions extends Component<Props, {}> {

    classForAction(playerWhoMustAct : string) : string {
        if(playerWhoMustAct === this.props.playerName) {
            return "alert alert-warning"
        } else {
            return "alert alert-secondary"
        }

    }

    render() {


        if(this.props.awaitingAcks.length !== 0 && this.props.status === "Awaiting Acknowledgements") {
            const alertType = "alert alert-" + (this.props.awaitingAcks.includes(this.props.playerName) ? "warning" : "secondary");

            return (<div>
                <h2>Waiting for...</h2>
                <div className={alertType}>Awaiting acknowledgement from: {this.props.awaitingAcks.join(", ")}</div>
            </div>)
        }

        return (<div>
                {this.props.actions.BLUE_TEAM.provideWords && <div className={this.classForAction(this.props.state.BLUE_TEAM.clueGiver)} role="alert">
                    <b>{this.props.state.BLUE_TEAM.clueGiver}</b> must provide clues for the blue team
                </div>}
                {this.props.actions.RED_TEAM.provideWords && <div className={this.classForAction(this.props.state.RED_TEAM.clueGiver)} role="alert">
                    <b>{this.props.state.RED_TEAM.clueGiver}</b> must provide clues for the red team
                </div>}

                {this.props.actions.BLUE_TEAM.provideFriendlyGuess && <div className={this.classForAction(this.props.state.BLUE_TEAM.guessGiver)} role="alert">
                    <b>{this.props.state.BLUE_TEAM.guessGiver}</b> (Blue Team) must guess their own code phrase
                </div>}
                {this.props.actions.RED_TEAM.provideFriendlyGuess && <div className={this.classForAction(this.props.state.RED_TEAM.guessGiver)} role="alert">
                    <b>{this.props.state.RED_TEAM.guessGiver}</b> (Red Team) must guess their own code phrase
                </div>}

                {this.props.actions.BLUE_TEAM.provideOppositionGuess && <div className={this.classForAction(this.props.state.BLUE_TEAM.guessGiver)} role="alert">
                    <b>{this.props.state.BLUE_TEAM.guessGiver}</b> (Blue Team) must guess the red team's code phrase
                </div>}
                {this.props.actions.RED_TEAM.provideOppositionGuess && <div className={this.classForAction(this.props.state.RED_TEAM.guessGiver)} role="alert">
                    <b>{this.props.state.RED_TEAM.guessGiver}</b> (Red Team) must guess the blue team's code phrase
                </div>}
        </div>)
    }
}