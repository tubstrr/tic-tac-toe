import React from 'react'

import Square from '../components/square'
import calculateWinner from '../functions/calculateWinner'

class Board extends React.Component {

    handelClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return (
            <Square 
                value={this.props.squares[i]} 
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div className="boardContainer">
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <style jsx>{`
                    .boardContainer {
                        width:100%;
                        display:flex;
                        flex-wrap:wrap;
                    }
                    .status {
                        margin-bottom: 15px;
                        width:100%;
                        font-size:2.5em;
                    }
                    .board-row {
                        width:100%;
                        position:relative;
                        display:flex;
                    }
                `}</style>
            </div>
        );
    }
}

export default Board;