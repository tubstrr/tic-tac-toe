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
            stepNumber:0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);;
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
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber:step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                `Move #${move}` :
                `RESET`;
            return (
                <li key={step}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    <style jsx>{`
                        button {
                            border:none;
                            text-align:left;
                            padding:1em;
                            width:100%;
                            border-radius:.3em;
                            text-align:center;
                            margin-bottom:1em;
                            background:#dedede;
                            transition:375ms;
                        }
                        button:focus{
                            outline:none;
                        }
                        button:active,button:hover {
                            transform:scale(.9);
                            opacity:.7
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
                    <meta charset='utf-8' />
                    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
                    <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
                    <meta name='description' content='Description' />
                    <meta name='keywords' content='Keywords' />
                    <title>Tic-Tac-Toe | Powered by React, totally just did the tutoral and didn't really code any of this.</title>
                    <meta property="og:description" content="I mean I did code this in Next.js, and had to break up the components and so forth, but I didn't really change anything." />

                    <link rel="manifest" href="/manifest.json" />
                    <link href='/favi.png' rel='icon' type='image/png' sizes='16x16' />
                    <link href='/favi.png' rel='icon' type='image/png' sizes='32x32' />
                    <link rel="apple-touch-icon" href="/favi.png"></link>
                    <link rel="shortcut icon" href="/favi.png" />
                    <meta name="theme-color" content="#000000"/>

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
                        <h2>Game Log:</h2>
                        <ol>{moves}</ol>
                    </div>
                </div>
                <style jsx global>{`
                    body {
                        font-family: 'Nunito', sans-serif;
                        margin: 0px;
                        background:#efefef;
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
                        max-width:600px;
                        width:80%;
                        margin:auto;
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
                    @media(max-width:767px) {
                        .game-container {
                            flex-wrap:wrap;
                        }
                        .game-board {
                            width:100%;
                        }
                        .game-moves {
                            width:100%;
                            margin-top:3em;
                        }
                    }
                `}</style>
            </div>
        );
    }
}

export default Game;
