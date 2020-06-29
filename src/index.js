import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Create from './Create'
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <div className="App">
                <ul className="nav">
                    <li className="nav-item">
                        <b className="nav-link nav-title">Decrypto</b>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link active" to="/create-game">Create Game</Link>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link active" href="https://www.ultraboardgames.com/decrypto/game-rules.php">Rules</a>
                    </li>
                </ul>

                <div className="main-page">
                    <Switch>
                        <Route path="/create-game">
                            <Create/>
                        </Route>
                        <Route path="/play-game/:gameId">
                            <App/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();