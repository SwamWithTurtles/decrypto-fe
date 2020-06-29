import React, {Component} from 'react';
import {GameState} from "../../../event-model/eventTypes";

type Props = {
    gameState: GameState
}

type Result = "RED_WIN" | "BLUE_WIN" | "TIE";

export default class DisplayWinners extends Component<Props, {}> {
    whoWon(): Result {
        const blueMis = this.props.gameState.BLUE_TEAM.score.miscommunications;
        const redMis = this.props.gameState.RED_TEAM.score.miscommunications;
        const blueInt = this.props.gameState.BLUE_TEAM.score.interceptions;
        const redInt = this.props.gameState.RED_TEAM.score.interceptions;

        let blueVictory: boolean = false;
        let redVictory: boolean = false;

        if (redInt >= 2 || blueMis >= 2) {
            redVictory = true;
        }

        if (blueInt >= 2 || redMis >= 2) {
            blueVictory = true;
        }

        if (redVictory === blueVictory) {
            if ((redInt - redMis) > (blueInt - blueMis)) {
                redVictory = true;
            } else if ((redInt - redMis) < (blueInt - blueMis)) {
                blueVictory = true;
            } else {
                return "TIE";
            }
        }

        if (blueVictory) {
            return "BLUE_WIN"
        } else if (redVictory) {
            return "RED_WIN"
        }

        return "TIE";
    }

    render() {
        if (this.whoWon() === "BLUE_WIN") {
            return (<div className="alert alert-primary" role="alert">
                Congratulations <b>Blue Team</b> for your victory!
            </div>);
        } else if (this.whoWon() === "RED_WIN") {
            return (<div className="alert alert-danger" role="alert">
                Congratulations <b>Red Team</b> for your victory!
            </div>);
        } else {
            return (<div className="alert alert-secondary" role="alert">
                <b>Tie Game!</b>
            </div>);
        }
    }

}
