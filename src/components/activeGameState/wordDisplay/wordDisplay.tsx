import React, {Component} from 'react';
import {Team, WordList} from "../../../event-model/eventTypes";

type Props = {
    team: Team,
    playerTeam: Team,
    wordList: WordList
}

export default class WordDisplay extends Component<Props> {

    getClassName(team: Team) : string {
        if(team === "RED_TEAM") {
            return "header-red";
        } else {
            return "header-blue"
        }
    }

    render() {
        return(
            <div>
                <table className={"table word-display"}>
                    <tbody>
                    {[0, 1, 2, 3].map(ix => {
                        return <tr key={"wordList-" + ix}>
                            {this.props.team === this.props.playerTeam && <th className={this.getClassName(this.props.team)}>{this.props.wordList.wordList[ix]}</th>}
                            {this.props.team !== this.props.playerTeam && <th className={this.getClassName(this.props.team)}>#{ix + 1}</th>}
                            <td key={this.props.team + "-" + ix}><ul>
                                {this.props.wordList.publicClues[ix].map((w, jx) => <li key={"w-" + ix + "-" + jx}>{w}</li>)}
                            </ul></td>
                            </tr>
                    })}
                    </tbody>

                    {/*<thead className={"header-section " + this.getClassName(this.props.team)}><tr>*/}
                        {/*{this.props.team === this.props.playerTeam &&*/}
                            {/*this.props.wordList.wordList.map(word => (<td key={word}>{word}</td>))}*/}

                        {/*{this.props.team !== this.props.playerTeam &&*/}
                            {/*this.props.wordList.wordList.map((word, ix) => (<td key={word}></td>))}*/}

                    {/*</tr></thead>*/}
                    {/*<tbody>*/}
                    {/*<tr>*/}
                        {/*{[0, 1, 2, 3].map(ix => <td key={this.props.team + "-" + ix}>{this.props.wordList.publicClues[ix].join(", ")}</td>)}*/}
                    {/*</tr>*/}
                    {/*</tbody>*/}
                </table>
            </div>
        )
    }

}
