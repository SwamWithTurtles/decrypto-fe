import React, {Component, FormEvent} from 'react';
import {Parity, Team} from "../../../event-model/eventTypes";
import {submitPlayersGuesses} from "../../../be-gateway/gateway";

type Props = {
    wordList: string[],
    changeHandler: (event: FormEvent<HTMLSelectElement>) => void
}

type WordGuessState = {
    guess: string
}


class SingleWordGuess extends Component<Props, WordGuessState> {

    constructor(props: Props) {
        super(props);

        this.state = {
            guess: "1"
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: FormEvent<HTMLSelectElement>): void {
        this.setState({
            guess: event.currentTarget.value
        });
        this.props.changeHandler(event)
    }

    render() {
        return <select className="form-control" value={this.state.guess} onChange={this.handleChange}>
            <option value="1">#1 {this.props.wordList[0]}</option>
            <option value="2">#2 {this.props.wordList[1]}</option>
            <option value="3">#3 {this.props.wordList[2]}</option>
            <option value="4">#4 {this.props.wordList[3]}</option>
        </select>
    }
}

type SubmitGuessesProps = {
    guesswordList: string[],
    wordList: string[],
    playerName: string,
    playerTeam: Team
    teamName: Team,
    targetOfGuess: Team,
    gameId: string
    whoCanGuess: string
}

type SubmitGuessFormState = {
    guess1: string,
    guess2: string
    guess3: string
}

type TeamNameMap = {
    [T in Team]: string
    }

export default class SubmitGuesses extends Component<SubmitGuessesProps, SubmitGuessFormState> {

    constructor(props: SubmitGuessesProps) {
        super(props);

        this.state = {
            guess1: "1",
            guess2: "1",
            guess3: "1"
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChildChange = this.handleChildChange.bind(this);
    }

    postGuesses(): void {
        const body = {
            "playerName": this.props.playerName,
            "guess": [this.state.guess1, this.state.guess2, this.state.guess3],
            "team": this.props.teamName,
            "parity": (this.props.teamName === this.props.targetOfGuess ? "FRIENDLY" : "OPPOSITION") as Parity
        };

        submitPlayersGuesses(this.props.gameId, body)
            .then(res => {
                console.log("Guesses Submitted");
            })
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.postGuesses()
    }

    handleChildChange(event: FormEvent<HTMLSelectElement>, childIx: number) {
        const newState = {
            guess1: childIx === 0 ? event.currentTarget.value : this.state.guess1,
            guess2: childIx === 1 ? event.currentTarget.value : this.state.guess2,
            guess3: childIx === 2 ? event.currentTarget.value : this.state.guess3
        };

        this.setState(newState)
    }

    render() {
        const friendly = this.props.teamName === this.props.targetOfGuess;

        if(this.props.playerTeam !== this.props.teamName) {
            return (<div className="code-name">
                <p>The other team are {friendly ? "decyphering their own communication" : "attempting to intercept your communicating"}.<br/>
                    <b>{this.props.guesswordList.join(", ")}</b></p>
                <p><b>{this.props.whoCanGuess}</b> is submitting their guesses.</p>
            </div>)
        }

        if (this.props.playerName !== this.props.whoCanGuess) {
            return (<div className="code-name">
                <p>The message you have {friendly ? "received" : "intercepted"} is:<br/>
                    <b>{this.props.guesswordList.join(", ")}</b></p>
                <p><b>{this.props.whoCanGuess}</b> will submit your guesses.</p>
            </div>)
        }

        const friendlyTeamNames: TeamNameMap = {
            "RED_TEAM": "Red Team",
            "BLUE_TEAM": "Blue Team"
        };

        const possiblyRedactedWordList: string[] =
            friendly ? this.props.wordList : ["", "", "", ""];

        return <div>
            <h3>Guess Codewords for {friendlyTeamNames[this.props.targetOfGuess]}'s CodePhrase</h3>
            <form onSubmit={this.handleSubmit}>
                <p className="code-name">The message you
                    have {friendly ? "received" : "intercepted"} is <b>{this.props.guesswordList.join(", ")}</b></p>

                {this.props.guesswordList.map((word, ix) => {
                    return <p><label key={word}>Guess for word {word}
                        <SingleWordGuess wordList={possiblyRedactedWordList}
                                         changeHandler={(change: FormEvent<HTMLSelectElement>) => {
                                             this.handleChildChange(change, ix)
                                         }}/>
                    </label></p>
                })}
                <input className="btn btn-primary" type="submit" value="Submit Guesses"/>
            </form>
        </div>
    }
}