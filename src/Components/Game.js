import React, {Component} from 'react';
import Board from './Board.js';

const victory = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

class Game extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nextSign: 'X',
            cells: Array(82).fill(null),
            statuses: Array(10).fill(),
            winner: null
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(index) {
        this.props.setNextSign(this.state.nextSign == 'X' ? 'O' : 'X');
        this.setSign(index);
        this.resetGridOverlays();
        this.checkGridWinner(index);
        this.checkGameWinner();
    }

    setSign(index) {
        if(this.state.cells[index] == null) {
            let temp = this.state.cells;
            temp[index] = this.state.nextSign;

            this.setState(state => ({
                cells: temp,
                nextSign: state.nextSign == 'X' ? 'O' : 'X'
            }));

        }
    }

    resetGridOverlays() {
        let temp = this.state.statuses;

        for(let i=1; i<=9; i++) {
            if(temp[i] == '') {
                temp[i] = null;
            }
        }

        this.setState(() => ({
            statuses: temp
        }));
    }

    containsArrayChecker = (arr, target) => target.every(v => arr.includes(v));

    checkGridWinner(index) {
        let temp = this.state.statuses;
        let i;

        let gridIndex = parseInt((index-1) / 9) + 1;
        let firstIndex = (gridIndex-1) * 9 + 1;
        let position = (index-1) % 9 + 1;

        let grid = [];
        let xs = [];
        let os = [];

        grid.push(null);

        for(i = firstIndex; i <= firstIndex+8; i++)
        {
            grid.push(this.state.cells[i]);
        }

        for(i = 1; i<=9; i++)
        {
            if(grid[i] == 'X')
                xs.push(i);
            if(grid[i] == 'O')
                os.push(i);
        }

        for(i = 0; i < 8; i++) {
            if( this.containsArrayChecker(xs, victory[i]) ) 
                temp[gridIndex] = 'X';            

            if( this.containsArrayChecker(os, victory[i]) ) 
                temp[gridIndex] = 'O';
        }

        for(i=1; i<=9; i++) 
            if( (i != position) && temp[i] == null ) 
                temp[i] = '';

        if ( (temp[position] == 'X') || (temp[position] == 'O') )
            for(i=1; i<=9; i++)
                if(temp[i] == '')
                    temp[i] = null;

        this.setState(() => ({
            statuses: temp
        }));
    }

    checkGameWinner() {
        let i;

        let xs = [];
        let os = [];

        let temp = this.state.statuses;

        for(i = 1; i<=9; i++)
        {
            if(temp[i] == 'X')
                xs.push(i);
            if(temp[i] == 'O')
                os.push(i);
        }

        for(i = 0; i < 8; i++) {

            if( this.containsArrayChecker(xs, victory[i]) ) {
                this.setState(() => ({
                    winner: 'X'
                }));

                this.props.setWinner('X');
            }
            
            if( this.containsArrayChecker(os, victory[i]) ) {
                this.setState(() => ({
                    winner: 'O'
                }));

                this.props.setWinner('O');
            }
            
        }
    }

    render() {

        return (
            <Board cells={this.state.cells} statuses={this.state.statuses} onClick={this.handleClick} color1={this.props.color1} color2={this.props.color2}/>
        );
    }
}

export default Game;