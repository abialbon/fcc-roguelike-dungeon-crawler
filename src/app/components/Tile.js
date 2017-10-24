import React from 'react'
import { connect } from 'react-redux';
import { store } from '../store';

class Tile extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let style = 'tile';
    let y = this.props.r;
    let x = this.props.c;
    let isWall = this.props.mapArray[y][x];
    let entity = this.props.entitesArray[y][x];
    
    if (this.props.mapArray[y][x]) {
      style = style + ' wall';
    }

    if (entity) {
      switch (entity.type) {
        case 'player':
          style = style + ' player';
          break;
  
        case 'enemy':
          style = style + ' enemy';
          break;

        case 'health':
          style = style + ' health';
      }
    }

    if (!this.props.shadowArray[y][x]) {
      style = style + ' dark';
    }
    
    return (
      <div className={ style }>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mapArray: state.mapArray,
    entitesArray: state.entitesArray,
    shadowArray: state.shadowArray
  }
}

export default connect(mapStateToProps)(Tile);