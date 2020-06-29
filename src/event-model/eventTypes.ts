export type EventType =
    "AllocatePlayer" | "ArchivePublicGuesses" | "AssignNewCodePhrases" |
    "BeginGame" | "BeginTurn" | "CheckForVictory" | "ClearDownModel" |
    "CreateWaitingGame" | "EndGame" | "GenerateWordLists" | "MarkGuesses" |
    "MoveGameOutOfWaiting" | "ProvideGuess" | "ProvideGuessWord" | "RegisterPlayer" |
    "SetTurnOrder" | "StartTurn" | "TransitionToEndOfTurn" |
    "TransitionToAwaitingAcknowledgements" | "AcknowledgeResults" | "MigrateToNewGuess";

export type State = "Waiting" | "Generating" | "Started" | "Between Turns" | "Awaiting Codewords" | "Awaiting Guesses" |
    "Checking for Victory" | "Completed" | "Awaiting Acknowledgements";
export type Team = "RED_TEAM" | "BLUE_TEAM";
export type Parity = "OPPOSITION" | "FRIENDLY";

export type Codephrase = number[];
export type PublicClues = {
    [key: number]: string[]
};

export type Scores = {
    miscommunications: number,
    interceptions: number
};

export type TeamRoster = {
    clueGiver: string,
    guessGiver: string,
    teamRoster: string[],
    wordList: WordList,
    codePhrase: Codephrase,
    guessWords: string[],
    score: Scores,
    guesses: {
        FRIENDLY: number[],
        OPPOSITION: number[]
    }
}

export type OutstandingActions = {
    [T in Team]: {
    provideWords: boolean,
    provideFriendlyGuess: boolean,
    provideOppositionGuess: boolean
}
    }

export type GameState = {
    turnNumber: number,
    gameState: State,
    playerList: string[],
    RED_TEAM: TeamRoster,
    BLUE_TEAM: TeamRoster,
    outstandingActions: OutstandingActions,
    shouldDisplayMarks : boolean,
    awaitingPlayers: string[],
    defaultWordShow: Team | Parity
};

export type WordList = {
    wordList: string[],
    publicClues: PublicClues
}

export function emptyRemoteState(): GameState {
    return {
        turnNumber: -1,
        gameState: "Waiting",
        playerList: [],
        shouldDisplayMarks: false,
        RED_TEAM: {
            clueGiver: "",
            guessGiver: "",
            teamRoster: [],
            wordList: {
                wordList: [],
                publicClues: {0: [], 1: [], 2: [], 3: []},
            },
            codePhrase: [],
            guessWords: [],
            score: {
                miscommunications: 0,
                interceptions: 0
            },
            guesses: {
                FRIENDLY: [],
                OPPOSITION: []
            }
        },
        BLUE_TEAM: {
            clueGiver: "",
            guessGiver: "",
            teamRoster: [],
            wordList: {
                wordList: [],
                publicClues: {0: [], 1: [], 2: [], 3: []},
            },
            codePhrase: [],
            guessWords: [],
            score: {
                miscommunications: 0,
                interceptions: 0
            },
            guesses: {
                FRIENDLY: [],
                OPPOSITION: []
            }
        },
        outstandingActions: {
            RED_TEAM: {
                provideWords: false,
                provideFriendlyGuess: false,
                provideOppositionGuess: false
            },
            BLUE_TEAM: {
                provideWords: false,
                provideFriendlyGuess: false,
                provideOppositionGuess: false
            }
        },
        awaitingPlayers: [],
        defaultWordShow: "RED_TEAM"
    };
}

export interface GameStateEvent {
    eventName: EventType
}

export interface RegisterPlayerEvent extends GameStateEvent {
    eventName: "RegisterPlayer",
    playerName: string
}

export interface BackendPlayer {
    name: string,
    team: Team
}

export interface BackendCodePhrase {
    underlying: number[]
}

export interface BackendScore {
    redTeamInterceptions: number,
    redTeamMiscommunications: number,
    blueTeamInterceptions: number,
    blueTeamMiscommunications: number
}

export interface BackendClueWord {
    word: string,
    team: Team,
    wordIndex: number,
}

export interface AllocatePlayerEvent extends GameStateEvent {
    eventName: "AllocatePlayer",
    team: Team,
    player: BackendPlayer
}

export interface SetTurnOrder extends GameStateEvent {
    eventName: "SetTurnOrder",
    redTurnOrder: BackendPlayer[],
    blueTurnOrder: BackendPlayer[]
}

export interface GenerateWordLists extends GameStateEvent {
    eventName: "GenerateWordLists",
    teamOneWordlist: WordList,
    teamTwoWordlist: WordList,
}

export interface AssignNewCodePhrases extends GameStateEvent {
    eventName: "AssignNewCodePhrases",
    team: Team,
    codePhrase: BackendCodePhrase
}

export interface ProvideGuessWord extends GameStateEvent {
    eventName: "ProvideGuessWord",
    playerName: string,
    guessWords: string[],
    team: Team
}

export interface ProvideGuess extends GameStateEvent {
    eventName: "ProvideGuess",
    playerName: string,
    guesses: number[]
    team: Team,
    parity: Parity
}

export interface MarkGuesses extends GameStateEvent {
    eventName: "MarkGuesses",
    score: BackendScore
}

export interface ArchivePublicGuesses extends GameStateEvent {
    eventName: "ArchivePublicGuesses",
    clueWord: BackendClueWord
}

export interface AcknowledgeResults extends GameStateEvent {
    eventName: "AcknowledgeResults",
    playerName: string
}

export interface MigrateToNewGuess extends GameStateEvent {
    eventName: "MigrateToNewGuess",
    team: Team,
    parity: Parity
}