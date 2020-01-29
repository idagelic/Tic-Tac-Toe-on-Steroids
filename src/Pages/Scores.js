import React, {Component} from 'react';

class Scores extends Component {

    constructor(props) {
        super(props);

        this.state = {
            scores: [],
            winner: null
        };
    }

    componentDidMount() {
        if(this.props.winner == 'X') 
            this.setState(() => ({winner: this.props.player1}));
        if(this.props.winner == 'O') 
            this.setState(() => ({winner: this.props.player2}));

        this.getScores();
    }

    getScores = () => {
        fetch('http://localhost:5000/api/scores')
        .then(response => response.json())
        .then(response => this.setState({ scores: response.data }))
        .catch(err => console.error(err));
    }

renderRow = ({ id, name, wins, losses, games_as_x, games_as_o }) => 

<tr key={id}>
    <td>{name}</td>
    <td>{wins}</td>
    <td>{losses}</td>
    <td>{games_as_x}</td>
    <td>{games_as_o}</td>        
</tr>

    render() {
        const {scores} = this.state;
        return (
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="scores-wrapper">
                                <div className="scores-heading">
                                    REZULTATI
                                </div>
                                <table className="scores-table">
                                    <tr>
                                        <th>IME</th>    
                                        <th>POBJEDE</th>
                                        <th>PORAZI</th>
                                        <th>KRIŽIĆ IGARA</th>
                                        <th>KRUŽIĆ IGARA</th>
                                    </tr>
                                    {scores.map(this.renderRow)}
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-2 offset-lg-10">
                            
                            <a href="/home" className="scores-link">
                                <button>
                                    IGRAJ OPET
                                </button>
                            </a>
                            
                        </div>
                    </div>
                </div>
        );
    }
}

export default Scores;