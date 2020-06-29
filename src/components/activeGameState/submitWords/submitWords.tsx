import React, {Component, FormEvent} from 'react';
import {Codephrase, Team, WordList} from "../../../event-model/eventTypes";
import {submitPlayersWords} from "../../../be-gateway/gateway";

type Props = {
    gameId: string
    wordList: WordList,
    codePhrase: Codephrase | null
    playerName: string,
    playerTeam: Team
}

type SubmitWordsState = {
    word0: string,
    word1: string,
    word2: string
}

export default class SubmitWords extends Component<Props, SubmitWordsState> {

    constructor(props: Props) {
        super(props);

        this.state = {
            word0: "",
            word1: "",
            word2: ""
        };

        this.handleChangeWord0 = this.handleChangeWord0.bind(this);
        this.handleChangeWord1 = this.handleChangeWord1.bind(this);
        this.handleChangeWord2 = this.handleChangeWord2.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeWord0(event: FormEvent<HTMLInputElement>): void {
        this.setState({
            word0: (event.target as HTMLInputElement).value,
            word1: this.state.word1,
            word2: this.state.word2
        });
    }

    handleChangeWord1(event: FormEvent<HTMLInputElement>): void {
        this.setState({
            word0: this.state.word0,
            word1: (event.target as HTMLInputElement).value,
            word2: this.state.word2
        });
    }

    handleChangeWord2(event: FormEvent<HTMLInputElement>): void {
        this.setState({
            word0: this.state.word0,
            word1: this.state.word1,
            word2: (event.target as HTMLInputElement).value,
        });
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        this.postGuesses();
        event.preventDefault();
    }

    postGuesses(): void {
        const body = {
            playerName: this.props.playerName,
            guessWords: [this.state.word0, this.state.word1, this.state.word2],
            team: this.props.playerTeam
        }

        submitPlayersWords(this.props.gameId, body)
            .then(res => {
                console.log("Guesses Submitted");
            })
    }

    render() {
        if (this.props.codePhrase === null) {
            return <span>No codephrase :(</span>
        }

        return (<div><h2>Submit Codewords</h2>
                <p><span className={"code-name red"}>{this.props.playerName}, please submit the codephrase <b>{this.props.codePhrase.join(".")}</b> without being caught!</span></p>
                <form onSubmit={this.handleSubmit}>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"
                                  id="basic-addon1">#{this.props.codePhrase[0]}: {this.props.wordList.wordList[this.props.codePhrase[0] - 1]}</span>
                        </div>
                        <input className="form-control" type="text" value={this.state.word0}
                               onChange={this.handleChangeWord0} placeholder="Codeword"/>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"
                                  id="basic-addon1">#{this.props.codePhrase[1]}: {this.props.wordList.wordList[this.props.codePhrase[1] - 1]}</span>
                        </div>
                        <input className="form-control" type="text" value={this.state.word1}
                               onChange={this.handleChangeWord1} placeholder="Codeword"/>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"
                                  id="basic-addon1">#{this.props.codePhrase[2]}: {this.props.wordList.wordList[this.props.codePhrase[2] - 1]}</span>
                        </div>
                        <input className="form-control" type="text" value={this.state.word2}
                               onChange={this.handleChangeWord2} placeholder="Codeword"/>
                    </div>

                    <input className="btn btn-primary" type="submit" value="Submit Codewords"/>
                </form>
            </div>

        );


    }

}
