import React from 'react'
import Head from 'next/head';

import Board from '../components/board.js'
import calculateWinner from '../functions/calculateWinner'

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                `Go to move #${move}` :
                `Restart game`;
            return (
                <li>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    <style jsx>{`
                        button {
                            background:transparent;
                            border:none;
                            font-style:italic;
                            text-align:left;
                            padding:0;
                        }
                    `}</style>
                </li>
            );
        });

        let status;
        if (winner) {
            status = `Wait! ${winner} just won.....`;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
        }

        return (
            <div className="game">
                <Head>
                    <title>Tic-Tac-Toe | Powered by React, totally just did the tutoral and didn't really code any of this.</title>
                    <meta property="og:description" content="I mean I did code this in Next.js, and had to break up the components and so forth, but I didn't really change anything." />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link href="https://fonts.googleapis.com/css?family=Nunito&display=swap" rel="stylesheet" />
                </Head>
                <div className="game-info">
                    <h1>{status}</h1>
                </div>
                <div className="game-container">
                    <div className="game-board">
                        <Board 
                            squares={current.squares}
                            onClick={(i) => this.handleClick(i)}
                            />
                    </div>
                    <div className="game-moves">
                        <h2>Game Moves:</h2>
                        <ol>{moves}</ol>
                    </div>
                </div>
                <style jsx global>{`
                    body {
                        font-family: 'Nunito', sans-serif;
                        margin: 0px;
                    }
                    ol, ul {
                        padding-left: 30px;
                    }
                `}</style>
                <style jsx>{`
                    .game {
                        display: flex;
                        flex-direction:column;
                        align-items:start;
                        padding:1em;
                        background:#efefef;
                        min-height:calc(100vh - 2em);
                    }
                    .game-info {
                        width:100%;
                    }
                    .game-container {
                        width:100%;
                        display:flex;
                        justify-content:space-between;

                    }
                    .game-board {
                        width:calc(70% - 3em);
                        overflow:hidden;
                        border-radius:.3em;
                        background:#fefefe;
                        padding:1.5em;
                    }
                    .game-moves {
                        width:25%;
                    }
                    ol {
                        list-style:none;
                        margin:none;
                        padding:0;
                    }
                    h2 {
                        font-size:.9em;
                        margin-top:0;
                    }
                `}</style>
            </div>
        );
    }
}

export default Game;
