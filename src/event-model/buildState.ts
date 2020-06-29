import {
    AcknowledgeResults,
    AllocatePlayerEvent, ArchivePublicGuesses, AssignNewCodePhrases, GameState, GameStateEvent, GenerateWordLists,
    MarkGuesses, MigrateToNewGuess, ProvideGuess,
    ProvideGuessWord,
    RegisterPlayerEvent,
    SetTurnOrder
} from "./eventTypes";

export default function buildState(oldState : GameState, event: GameStateEvent) : GameState {

    let newState : GameState = JSON.parse(JSON.stringify(oldState));

    switch(event.eventName) {

        case "RegisterPlayer":
            let newPlayerList = (oldState.playerList && Array.isArray(oldState.playerList)) ? oldState.playerList : [];
            newPlayerList.push((event as RegisterPlayerEvent).playerName);
            newState.playerList = newPlayerList;

            return newState;

        case "MoveGameOutOfWaiting":
            newState.gameState = "Generating";
            return newState;

        case "AllocatePlayer":
            const allocatePlayer = event as AllocatePlayerEvent;
            (newState[allocatePlayer.team].teamRoster || []).push(allocatePlayer.player.name);
            return newState;

        case "SetTurnOrder":
            const setTurnOrder = event as SetTurnOrder;
            newState.RED_TEAM.teamRoster = setTurnOrder.redTurnOrder.map(player => player.name);
            newState.BLUE_TEAM.teamRoster = setTurnOrder.blueTurnOrder.map(player => player.name);
            return newState;

        case "GenerateWordLists":
            const generateWordLists = event as GenerateWordLists;
            newState.RED_TEAM.wordList = generateWordLists.teamOneWordlist;
            newState.BLUE_TEAM.wordList = generateWordLists.teamTwoWordlist;
            return newState;

        case "BeginGame":
            newState.gameState = "Started";
            return newState;

        case "BeginTurn":
            newState.turnNumber++;
            newState.gameState = "Between Turns";
            newState.RED_TEAM.clueGiver = newState.RED_TEAM.teamRoster[newState.turnNumber % newState.RED_TEAM.teamRoster.length]
            newState.BLUE_TEAM.clueGiver = newState.BLUE_TEAM.teamRoster[newState.turnNumber % newState.BLUE_TEAM.teamRoster.length]
            newState.RED_TEAM.guessGiver = newState.RED_TEAM.teamRoster[(newState.turnNumber + 1) % newState.RED_TEAM.teamRoster.length]
            newState.BLUE_TEAM.guessGiver = newState.BLUE_TEAM.teamRoster[(newState.turnNumber + 1) % newState.BLUE_TEAM.teamRoster.length]
            return newState;

        case "AssignNewCodePhrases":
            const assignNewCodePhrases = event as AssignNewCodePhrases;
            newState[assignNewCodePhrases.team].codePhrase = assignNewCodePhrases.codePhrase.underlying;
            return newState;

        case "StartTurn":
            newState.gameState = "Awaiting Codewords";

            newState.outstandingActions.BLUE_TEAM.provideWords = true;
            newState.outstandingActions.RED_TEAM.provideWords = true;

            newState.awaitingPlayers = newState.playerList;

            newState.defaultWordShow = "FRIENDLY";

            return newState;

        case "ProvideGuessWord":
            const provideGuessWord = event as ProvideGuessWord;
            newState.outstandingActions[provideGuessWord.team].provideWords = false;

            newState[provideGuessWord.team].guessWords = provideGuessWord.guessWords;

            return newState;

        case "MigrateToNewGuess":
            const migrateToNewGuess = event as MigrateToNewGuess;
            const actionToPromote = migrateToNewGuess.parity === "OPPOSITION" ? "provideOppositionGuess" : "provideFriendlyGuess";

            newState.outstandingActions[migrateToNewGuess.team][actionToPromote] = true;

            newState.gameState = "Awaiting Guesses";

            newState.defaultWordShow = migrateToNewGuess.team;

            return newState;

        case "ProvideGuess":
            const provideGuess = event as ProvideGuess;
            const actionToDemote = provideGuess.parity === "OPPOSITION" ? "provideOppositionGuess" : "provideFriendlyGuess";

            newState[provideGuess.team].guesses[provideGuess.parity] = provideGuess.guesses;

            newState.outstandingActions[provideGuess.team][actionToDemote] = false;
            return newState;

        case "TransitionToEndOfTurn":
            newState.gameState = "Between Turns";
            return newState;

        case "MarkGuesses":
            const markGuesses = event as MarkGuesses;

            newState.BLUE_TEAM.score.interceptions = markGuesses.score.blueTeamInterceptions;
            newState.BLUE_TEAM.score.miscommunications = markGuesses.score.blueTeamMiscommunications;
            newState.RED_TEAM.score.interceptions = markGuesses.score.redTeamInterceptions;
            newState.RED_TEAM.score.miscommunications = markGuesses.score.redTeamMiscommunications;

            newState.shouldDisplayMarks = true;

            return newState;

        case "ArchivePublicGuesses":
            const archivePublicGuesses = event as ArchivePublicGuesses;
            let newWordList = newState[archivePublicGuesses.clueWord.team]
                .wordList
                .publicClues[archivePublicGuesses.clueWord.wordIndex - 1];

            if(!newWordList.includes(archivePublicGuesses.clueWord.word)) {
                newWordList.push(archivePublicGuesses.clueWord.word);
            }

            newState[archivePublicGuesses.clueWord.team]
                .wordList
                .publicClues[archivePublicGuesses.clueWord.wordIndex - 1] = newWordList;

            return newState;

        case "CheckForVictory":
            newState.gameState = "Checking for Victory";
            return newState;

        case "TransitionToAwaitingAcknowledgements":
            newState.gameState = "Awaiting Acknowledgements";
            return newState;

        case "AcknowledgeResults":
            const acknowledgeResults = event as AcknowledgeResults;

            newState.awaitingPlayers = newState.awaitingPlayers.filter(p => p !== acknowledgeResults.playerName);
            return newState;

        case "EndGame":
            newState.gameState = "Completed";
            return newState;

        default:
            return oldState;
    }

}