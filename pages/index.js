import React from 'react'
import Head from 'next/head';

import Board from '../components/board.js'

class Game extends React.Component {
    render() {
        return (
            <div className="game">
            <Head>
                <link rel="stylesheet" type="text/css" href="./static/index.css" />
            </Head>
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

export default Game;
