import {GameStateEvent, Parity, Team} from "../event-model/eventTypes";
import {from, Observable} from "rxjs/index";
import {map, switchMap} from "rxjs/operators";
import {fromFetch} from "rxjs/fetch";

const BACKEND_URL = "http://35.228.57.234:8080/";

export function getBackendUrl() : string{
    return BACKEND_URL;
}

export function createGame(): Promise<string> {
    return fetch(`${BACKEND_URL}/game`, {
        method: 'POST'
    }).then(res => {
        return res.text()
    });
}

export function getHttpSubscribtion(gameId: string): Observable<GameStateEvent> {
    return fromFetch(`${BACKEND_URL}/game/${gameId}/events`)
        .pipe(switchMap(response => response.json()))
        .pipe(switchMap(eventArray => from(eventArray)))
        .pipe(map(event => event as GameStateEvent));
}

type SubmitGuessBody = {
    playerName: string,
    guess: string[],
    team: Team,
    parity: Parity
}

export function submitPlayersGuesses(gameId: string, body: SubmitGuessBody): Promise<string> {
    return fetch(`${BACKEND_URL}/game/${gameId}/guesses`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
        .then(res => res.text());
}


type AcknowledgeResults = {
    playerName: string
}

export function acknowledgeResults(gameId: string, body: AcknowledgeResults): Promise<string> {
    return fetch(`${BACKEND_URL}/game/${gameId}/turn-end`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
        .then(res => res.text());
}

type SubmitWordsBody = {
    playerName : string,
    guessWords : string[],
    team: Team
}

export function submitPlayersWords(gameId: string, body: SubmitWordsBody): Promise<string> {
    return fetch(`${BACKEND_URL}/game/${gameId}/guesswords`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then(res => res.text())
}

export function registerPlayer(gameId : string, playerName : string) : Promise<String> {
    return fetch(`${BACKEND_URL}/game/${gameId}/player/${playerName}`, {
        method: 'POST'
    }).then(res => res.text())
}

export function startGame(gameId : string) : Promise<String> {
    return fetch(`${BACKEND_URL}/game/${gameId}/start`, {
        method: 'POST'
    }).then(res => res.text());
}