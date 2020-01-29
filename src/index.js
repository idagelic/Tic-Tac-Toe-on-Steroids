import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Home from './Pages/Home';
import Play from './Pages/Play';
import Scores from './Pages/Scores';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player1: null,
            player2: null,
            color1: null,
            color2: null,
            winner: null,
            winnerIsDecided: 0
        };
    }
    
    componentDidUpdate() {
        if(this.state.winner && !this.state.winnerIsDecided) {
            this.updateScores();
            this.setState(() => ({
                winnerIsDecided: 1
            }));     
        }
    }
    

    updateScores() {
        let winner;
        if(this.state.winner == 'X') winner = this.state.player1;
        if(this.state.winner == 'O') winner = this.state.player2;

        let w = '0';
        if(winner == this.state.player1) w = '1';

        fetch('http://localhost:5000/api/scores/add?name=' + this.state.player1 + '&sign=X&win=' + w )
        .catch(err => console.error(err));
                
        if(winner == this.state.player2) w = '1';
        else w = '0';

        fetch('http://localhost:5000/api/scores/add?name=' + this.state.player2 + '&sign=O&win=' + w)
        .catch(err => console.error(err));
    }

    setPlayer1 = (name) => {
        this.setState(() => ({
            player1: name
        }));
    }

    setPlayer2 = (name) => {
        this.setState(() => ({
            player2: name
        }));
    }

    setColor1 = (color) => {
        this.setState(() => ({
            color1: color
        }));        
    }

    setColor2 = (color) => {
        this.setState(() => ({
            color2: color
        }));        
    }
    
    setWinner = (a) => {
        this.setState(() => ({
            winner: a
        }));
    }


    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/home" render={(props) => <Home setColor1={this.setColor1} setColor2={this.setColor2} setPlayer1={this.setPlayer1} setPlayer2={this.setPlayer2} {...props} />}/>
                    <Route path="/play" render={(props) => <Play setWinner={this.setWinner} color1={this.state.color1} color2={this.state.color2} player1={this.state.player1} player2={this.state.player2} {...props} />}/>
                    <Route path="/scores" render={(props) => <Scores player1={this.state.player1} player2={this.state.player2} winner={this.state.winner} {...props} />}>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));