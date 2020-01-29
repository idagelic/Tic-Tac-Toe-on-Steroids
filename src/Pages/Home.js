import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const allColors = ['Odaberi boju', 'Plava', 'Crvena', 'Zelena', 'Žuta', 'Ljubičasta', 'Smeđa'];
const colorsHex = {
    'Odaberi boju': '#000000',
    'Plava': '#288ff7',
    'Crvena': '#ff2b2b',
    'Zelena': '#2bff6e',
    'Žuta': '#cccc00',
    'Ljubičasta': '#af3afc',
    'Smeđa': '#733e02'
};

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            colorsX: ['Odaberi boju', 'Plava', 'Zelena', 'Žuta', 'Ljubičasta', 'Smeđa'],
            colorsO: ['Odaberi boju', 'Crvena', 'Zelena', 'Žuta', 'Ljubičasta', 'Smeđa'],
            color1: 'Plava',
            color2: 'Crvena',
            player1: null,
            player2: null
        };

        
        this.props.setColor1(this.state.color1);
        this.props.setColor2(this.state.color2);

        this.handleChangePlayer1 = this.handleChangePlayer1.bind(this);
        this.handleChangePlayer2 = this.handleChangePlayer2.bind(this);
        this.handleChangeColor1 = this.handleChangeColor1.bind(this);
        this.handleChangeColor2 = this.handleChangeColor2.bind(this);
    }

    handleChangePlayer1(event) {
        let name = event.target.value;
        this.props.setPlayer1(event.target.value);
        this.setState(() => ({
            player1: name
        }));
    }

    handleChangePlayer2(event) {
        let name = event.target.value;
        this.props.setPlayer2(event.target.value);
        this.setState(() => ({
            player2: name
        }));
    }

    handleChangeColor1(event) {
        let colors = JSON.parse(JSON.stringify(allColors));
        let picked = event.target.value;

        const index = colors.indexOf(event.target.value);

        if (index > -1) {
            colors.splice(index, 1);
        }

        this.props.setColor1(picked);

        this.setState(() => ({
            color1: picked,
            colorsO: colors
        }));
    }

    handleChangeColor2(event) {
        let colors = JSON.parse(JSON.stringify(allColors));
        let picked = event.target.value;

        const index = colors.indexOf(event.target.value);

        if (index > -1) {
            colors.splice(index, 1);
        }
        
        this.props.setColor2(picked);

        this.setState(() => ({
            color2: picked,
            colorsX: colors
        }));
    }

    renderOptions(array) {
        let returnArray = [];

        for(let i=0; i<array.length; i++){
            returnArray.push(<option>{array[i]}</option>);
        }

        return returnArray;
    }

    render() {
        let required = true;
        if(this.state.player1 && this.state.player2) required = false;

        return (
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="home-wrapper">
                                <div className="home-heading">Tic Tac Toe</div>
                                <div className="home-heading home-heading-smaller">on Steroids</div>

                                <div className="home-box">
                                    <div className="home-subheading">Prvi igrač</div>
                                    <div className="home-subheading">Drugi igrač</div>

                                    <div style={{color: colorsHex[this.state.color1]}} className="home-sign">X</div>
                                    <div style={{color: colorsHex[this.state.color2]}} className="home-sign">O</div>
                                    
                                    <input className="player-input" name="player1" onChange={this.handleChangePlayer1}></input>
                                    <input className="player-input" name="player2" onChange={this.handleChangePlayer2}></input>
                                    
                                    <select ref="player-color1" onChange={this.handleChangeColor1} className="player-color">
                                        {this.renderOptions(this.state.colorsX)}
                                    </select>

                                    <select ref="player-color2" onChange={this.handleChangeColor2} className="player-color">
                                        {this.renderOptions(this.state.colorsO)}
                                    </select>

                                    <Link to="/play">
                                        <button className="home-button" disabled={required}>
                                            KRENI
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Home;