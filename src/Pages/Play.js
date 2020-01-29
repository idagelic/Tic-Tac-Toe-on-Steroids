import React, {Component} from 'react';
import Game from '../Components/Game.js';
import {Link} from 'react-router-dom';
import '../App.css';

const colorsHex = {
  'Odaberi boju': '#000000',
  'Plava': '#288ff7',
  'Crvena': '#ff2b2b',
  'Zelena': '#2bff6e',
  'Žuta': '#cccc00',
  'Ljubičasta': '#af3afc',
  'Smeđa': '#733e02'
};

class Play extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nextSign: "X",
      p1: "Sime",
      p2: "Mate",
      winner: null
    };

    this.setNextSign = this.setNextSign.bind(this);
    this.setWinner = this.setWinner.bind(this);
  }

  setNextSign(a) {
      this.setState(() => ({
        nextSign: a
    }));
  }

  setWinner(a) {
    this.setState(() => ({
      winner: a
    }));

    this.props.setWinner(a);
  }

  render() {
    let className = 'gg-wrapper overlay-game-over';

    let color1 = null, color2 = null, color3 = null;

    color1 = this.props.color1;
    color2 = this.props.color2;
    
    if(this.state.nextSign == 'X') color3 = color1;
    if(this.state.nextSign == 'O') color3 = color2;

    
    if(this.state.winner == null) className = 'gg-wrapper display-none';

    return (
      <div className="container">
        <div class="row">
          <div className="col-lg-2">
            <div className="play-info">
              <div className="play-name-title">IGRAČ X: </div> 
              <div style={{color: colorsHex[color1]}} className="play-info-name">
                {this.props.player1}
              </div>
            </div>             
          </div>

          <div className="col-lg-8">
            <div className={className}>
                <div className="gg-heading">
                  Game over
                </div>
                <div className="gg-winner">
                  Pobjednik: {this.state.winner}
                </div>
                <Link className="gg-scores" to="/scores">
                  <button className="gg-button">
                    REZULTATI
                  </button>
                  </Link>
            </div>
            <Game color1={this.props.color1} color2={this.props.color2} setWinner={this.setWinner} setNextSign={this.setNextSign}/>
          </div>

          <div className="col-lg-2">
            <div className="play-info">
              <div className="play-name-title">IGRAČ O: </div> 
              <div style={{color: colorsHex[color2]}} className="play-info-name">
                {this.props.player2}
              </div>
            </div>             
          </div>

        </div>
        <div class="row">
          <div class="col-lg-2 offset-lg-10">
            Sljedeći potez: <span style={{color: colorsHex[color3], fontWeight: 800}}>{this.state.nextSign}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Play;
