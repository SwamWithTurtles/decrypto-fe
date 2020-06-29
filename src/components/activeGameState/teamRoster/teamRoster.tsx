import React, {Component} from 'react';
import {Scores} from "../../../event-model/eventTypes";
import IconSpan from "../../util/iconSpan/iconSpan";

type Props = {
    redClueGiver: string,
    blueClueGiver: string,

    redTeamPlayerList: string[],
    blueTeamPlayerList: string[],

    redTeamScore : Scores,
    blueTeamScore : Scores
}

type PlayerDetails = {
    playerName : string,
    isClueGiver: boolean
}

class PlayerName extends Component<PlayerDetails, {}> {
    render() {
        const badgeColor = this.props.isClueGiver ? "badge-warning" : "badge-secondary";
        return <span className={"badge " + badgeColor}>{this.props.playerName}</span>
    }
}

export default class TeamRoster extends Component<Props, {}> {

    render() {
        return (
            <table className="team-roster" id={"team-roster"}>
                <tbody>
                <tr>
                <td className="header-red" rowSpan={2}>Red Team</td>
                    <td className="secondary-red">
                        <b>Players:</b> {this.props.redTeamPlayerList.map(player => {
                        return <PlayerName  key = {player}  playerName={player} isClueGiver={player === this.props.redClueGiver} />
                    })}</td>

                </tr>
                <tr>
                    <td className="secondary-red">
                        <b>Miscommunications:</b> <IconSpan
                        trueIcon="X"
                        falseIcon="_"
                        numbers={this.props.redTeamScore.miscommunications}
                        max={2} /> <br/>
                        <b>Interceptions:</b> <IconSpan
                        trueIcon="X"
                        falseIcon="_"
                        numbers={this.props.redTeamScore.interceptions}
                        max={2} />
                    </td>
                </tr>
                <tr>
                    <td className="header-blue" rowSpan={2}>Blue Team</td>
                    <td className="secondary-blue"><b>Players:</b> {this.props.blueTeamPlayerList.map(player => {
                        return <PlayerName key = {player} playerName={player} isClueGiver={player === this.props.blueClueGiver} />
                    })}</td>
                </tr>
                <tr>
                    <td className="secondary-blue">
                        <b>Miscommunications:</b> <IconSpan
                        trueIcon="X"
                        falseIcon="_"
                        numbers={this.props.blueTeamScore.miscommunications}
                        max={2} /> <br/>
                        <b>Interceptions:</b> <IconSpan
                        trueIcon="X"
                        falseIcon="_"
                        numbers={this.props.blueTeamScore.interceptions}
                        max={2} />
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}
