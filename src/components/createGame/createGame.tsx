import React from 'react';
import {createGame} from "../../be-gateway/gateway";

type CreateGameState = {
    gameId: string | null
}

function copyText(): void {
    /* Get the text field */
    let copyText : HTMLInputElement | null = document.getElementById("gameUrl") as HTMLInputElement;

    if(!copyText) {
        return;
    }

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");
}


export default class CreateGame extends React.Component<{}, CreateGameState> {

    constructor(props: CreateGameState) {
        super(props);
        this.state = {
            gameId: null
        };
    }

    create_game(self: CreateGame) {
        createGame().then(resText => {
            self.setState({
                gameId: resText.substring(1, resText.length - 1)
            });
        });
    }

    render() {

        if (this.state.gameId) {
            const getUrl = window.location;
            const baseUrl = getUrl.protocol + "//" + getUrl.host;

            return (<div>
                <p>Share this link with your friends: <input type="text" readOnly
                                                             id="gameUrl"
                                                             value={`${baseUrl}/play-game/${this.state.gameId}`}/>
                    <button className="btn btn-secondary" onClick={copyText}>Copy</button></p>
                <p><a href={`/play-game/${this.state.gameId}`}>Click here to join yourself</a></p>
            </div>)
        } else {
            return (
                <div>
                    <button className="btn btn-info" onClick={() => this.create_game(this)}>Create a Game!</button>
                </div>
            );
        }
    }

}