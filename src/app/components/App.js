import React from 'react';
import PlayerBoard from './PlayerBoard';
import GameBoard from './GameBoard';

export default class App extends React.Component {
  render() {
    return (
      <div>
          <div className="header">
            <h2>Roguelike Dungeon crawler</h2>
          </div>
          <div className="container">
            <PlayerBoard />
            <GameBoard />
          </div>
      </div>
    )
  }
}
