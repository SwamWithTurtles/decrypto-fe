import React, {Component} from "react";

type PlayerListProps = {
    playerList: string[]
};

type PlayerName = {
    playerName: string
};

class Player extends Component<PlayerName, {}> {
    render() {
        return <li key = {this.props.playerName}>{this.props.playerName}</li>
    }
}

export default class PlayerList extends Component<PlayerListProps, {}> {

    render() {
        const { playerList } = this.props;

        return <div>
            <h3>Players</h3>
            {playerList &&
                <ul>
                    {playerList.map((player : string) => <Player key={player} playerName = {player} />)}
                </ul>
            }
            {!playerList &&
                <span>No players currently registered</span>
            }
        </div>
    }
}