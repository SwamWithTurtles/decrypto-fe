import React, {FormEvent} from "react";
import {registerPlayer} from "../../../be-gateway/gateway";

type RegisterPlayerHandler = {
    gameId: string,
    playerHandler: (playerName : string) => void
}

type RegisterPlayerForm = {
    value : string
};

class RegisterPlayer extends React.Component<RegisterPlayerHandler, RegisterPlayerForm> {

    constructor(props : RegisterPlayerHandler) {
        super(props);

        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event : FormEvent<HTMLInputElement>) {
        this.setState({value: (event.target as HTMLInputElement).value});
    }

    handleSubmit(event : FormEvent<HTMLFormElement>) {
        this.register_player(this.props.gameId, this.state.value);
        event.preventDefault();
    }

    register_player(gameId : string, playerName : string) {
        registerPlayer(gameId, playerName)
            .then(resText => {
                this.props.playerHandler(playerName);
            });
    }

    render() {
        return <div className="alert alert-secondary">
            <b>Join The Game</b>

            <form onSubmit={this.handleSubmit}>
                <div className="input-group mb-3">
                    <input className="form-control" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Your Name"/>
                        <div className="input-group-append">
                            <input className="btn btn-outline-primary" type="submit" value="Join!"/>
                        </div>

                </div>
            </form>
        </div>
    }
}

export default RegisterPlayer;