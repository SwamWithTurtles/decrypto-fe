import React, {Component, FormEvent} from 'react';

type Props = {
    playerList: string[],
    handlePlayerRegister: (playerName: string) => void
}


type RegisterPlayerForm = {
    value: string
};

export default class LogInAgain extends Component<Props, RegisterPlayerForm> {

    constructor(props: Props) {
        super(props);

        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: FormEvent<HTMLInputElement>) {
        this.setState({value: (event.target as HTMLInputElement).value});
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (this.props.playerList.includes(this.state.value)) {
            this.props.handlePlayerRegister(this.state.value);
        } else {
            alert("Player doesn't exist in game.")
        }

    }

    render() {
        return <div className="alert alert-secondary">
            <h2>Log In Again</h2>
            <form onSubmit={this.handleSubmit}>
                <div className="input-group mb-3">

                    <input className="form-control" type="text" value={this.state.value} onChange={this.handleChange}
                           placeholder="Your Name"/>
                    <div className="input-group-append">
                        <input className="btn btn-outline-primary" type="submit" value="Log In Again!"/>
                    </div>

                </div>
            </form>

        </div>
    }
}
