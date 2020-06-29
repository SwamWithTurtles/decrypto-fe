import React, {Component} from 'react';
import {GameState, Team} from "../../event-model/eventTypes";
import WordDisplay from "./wordDisplay/wordDisplay";
import TeamRoster from "./teamRoster/teamRoster";
import SubmitWords from "./submitWords/submitWords";
import DisplayActions from './displayActions/displayActions';
import SubmitGuesses from "./submitGuesses/submitGuesses";
import AcknowledgeResults from "./acknowledgeResults/acknowledgeResults";

type Props = {
    gameId: string,
    playerName: string,
    playerTeam: Team | null,
    gameState: GameState
}

type State = {
    wordsToShow: Team
}

export default class ActiveGameState extends Component<Props, State> {

    constructor(props : Props) {
        super(props);

        this.state = {
            wordsToShow: this.props.playerTeam ? this.props.playerTeam : "RED_TEAM"
        };

        this.showRedWords = this.showRedWords.bind(this);
        this.showBlueWords = this.showBlueWords.bind(this);
    }

    showRedWords() {
        this.setState({
            wordsToShow: "RED_TEAM"
        })
    }

    showBlueWords() {
        this.setState({
            wordsToShow: "BLUE_TEAM"
        })
    }

    render() {
        if (this.props.playerTeam === null) {
            return <span>Log in</span>
        }

        const playerTeam: Team = this.props.playerTeam;


        return (<div className="activeGameState">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                        <p className="code-name">Turn: {this.props.gameState.turnNumber + 1}</p>
                        <TeamRoster redClueGiver={this.props.gameState.RED_TEAM.clueGiver}
                                    blueClueGiver={this.props.gameState.BLUE_TEAM.clueGiver}
                                    redTeamPlayerList={this.props.gameState.RED_TEAM.teamRoster}
                                    blueTeamPlayerList={this.props.gameState.BLUE_TEAM.teamRoster}
                                    redTeamScore={this.props.gameState.RED_TEAM.score}
                                    blueTeamScore={this.props.gameState.BLUE_TEAM.score}/>
                    </div>

                    <div className="col-sm-6">
                        <DisplayActions actions={this.props.gameState.outstandingActions}
                                        awaitingAcks={this.props.gameState.awaitingPlayers}
                                        playerName={this.props.playerName}
                                        status={this.props.gameState.gameState}
                                        state={this.props.gameState}/>
                    </div>
                </div>

                <div className="row">
                    <div className={this.state.wordsToShow === "RED_TEAM" ? "words border border-danger" : "words border border-primary"}>
                        <button type="button" className="btn btn-light red" onClick={this.showRedWords}>See Red Words</button>&nbsp;
                        <button type="button" className="btn btn-light blue" onClick={this.showBlueWords}>See Blue Words</button>


                    <div className="col">
                        <b className="code-name">{this.state.wordsToShow === "RED_TEAM" ? "Red" : "Blue"} Team Words</b>
                        <WordDisplay team={this.state.wordsToShow}
                                     playerTeam={this.props.playerTeam}
                                     wordList={this.props.gameState[this.state.wordsToShow].wordList}/>
                    </div>
                    </div>
                </div>

            </div>

            {this.props.gameState.gameState === "Awaiting Codewords"
            && this.props.gameState.outstandingActions[playerTeam].provideWords
            && this.props.gameState[playerTeam].clueGiver === this.props.playerName
            && <SubmitWords gameId={this.props.gameId}
                            wordList={this.props.gameState[playerTeam].wordList}
                            codePhrase={this.props.gameState[playerTeam].codePhrase}
                            playerName={this.props.playerName}
                            playerTeam={this.props.playerTeam}/>}

            {this.props.gameState.gameState === "Awaiting Guesses"
            && this.props.gameState.outstandingActions.RED_TEAM.provideFriendlyGuess
            && <SubmitGuesses guesswordList={this.props.gameState.RED_TEAM.guessWords}
                              wordList={this.props.gameState.RED_TEAM.wordList.wordList}
                              playerName={this.props.playerName}
                              playerTeam={this.props.playerTeam}
                              teamName="RED_TEAM"
                              targetOfGuess="RED_TEAM"
                              gameId={this.props.gameId}
                              whoCanGuess={this.props.gameState.RED_TEAM.guessGiver}/>}

            {this.props.gameState.gameState === "Awaiting Guesses"
            && this.props.gameState.outstandingActions.BLUE_TEAM.provideFriendlyGuess
            && <SubmitGuesses guesswordList={this.props.gameState.BLUE_TEAM.guessWords}
                              wordList={this.props.gameState.BLUE_TEAM.wordList.wordList}
                              playerName={this.props.playerName}
                              playerTeam={this.props.playerTeam}
                              teamName="BLUE_TEAM"
                              targetOfGuess="BLUE_TEAM"
                              gameId={this.props.gameId}
                              whoCanGuess={this.props.gameState.BLUE_TEAM.guessGiver}/>}

            {this.props.gameState.gameState === "Awaiting Guesses"
            && this.props.gameState.outstandingActions.BLUE_TEAM.provideOppositionGuess
            && <SubmitGuesses guesswordList={this.props.gameState.RED_TEAM.guessWords}
                              wordList={this.props.gameState.RED_TEAM.wordList.wordList}
                              playerName={this.props.playerName}
                              playerTeam={this.props.playerTeam}
                              teamName="BLUE_TEAM"
                              targetOfGuess="RED_TEAM"
                              gameId={this.props.gameId}
                              whoCanGuess={this.props.gameState.BLUE_TEAM.guessGiver}/>}

            {this.props.gameState.gameState === "Awaiting Guesses"
            && this.props.gameState.outstandingActions.RED_TEAM.provideOppositionGuess
            && <SubmitGuesses guesswordList={this.props.gameState.BLUE_TEAM.guessWords}
                              wordList={this.props.gameState.BLUE_TEAM.wordList.wordList}
                              playerName={this.props.playerName}
                              playerTeam={this.props.playerTeam}
                              teamName="RED_TEAM"
                              targetOfGuess="BLUE_TEAM"
                              gameId={this.props.gameId}
                              whoCanGuess={this.props.gameState.RED_TEAM.guessGiver}/>}


            {(this.props.gameState.gameState === "Awaiting Acknowledgements" || this.props.gameState.gameState === "Completed") &&
            <AcknowledgeResults
                gameId={this.props.gameId}
                playerName={this.props.playerName}
                awaitingPlayers={this.props.gameState.awaitingPlayers}
                gameState={this.props.gameState}/>}
        </div>);
    }

}
