import React from 'react';
import { connect } from 'react-redux';

import Tile from './Tile';

const Row = (props) => {
  let row = [];
  for (let i = 0; i < 50; i++) {
    row.push(<Tile key={ i } r={ props.row } c = { i } />)
  }
  return (
    <div className="row">{ row }</div>
  );
}

class GameBoard extends React.Component {
  render() {
    let tiles = [];
    // Looping through the rows in the mapArray
    for (let i = 0; i < this.props.mapArray.length; i++) {
      tiles.push(<Row key={ i } row={ i } />)
    }

    return (
      <div className="game-board">
        { tiles }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mapArray: state.mapArray,
    entitesArray: state.entitesArray
  }
}

export default connect(mapStateToProps)(GameBoard);
