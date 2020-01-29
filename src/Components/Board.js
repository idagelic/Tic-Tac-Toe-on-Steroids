import React, {Component} from 'react';
import Grid from './Grid.js';

class Board extends Component {
    
    createBoardReturn(){
        let boardReturn = [];
        for(let i=1; i<=9; i++){
            boardReturn.push(<Grid first={9*(i-1)} status={this.props.statuses[i]} cells={this.props.cells} onClick={this.props.onClick} color1={this.props.color1} color2={this.props.color2}/>);
        }
        return boardReturn;
    }

    render() {
        let returnHtml = this.createBoardReturn();

        return (
            <div className='board'>
                {returnHtml}
            </div>
        );
    }
}

export default Board;