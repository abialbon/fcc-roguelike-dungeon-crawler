import React from 'react'
import { connect } from 'react-redux';
import { store } from '../store';

class Tile extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let style = 'tile';
    let isWall = this.props.mapArray[this.props.r][this.props.c];
    let entity = this.props.gameArray[this.props.r][this.props.c];
    
    if (this.props.mapArray[this.props.r][this.props.c]) {
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
      }
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
    gameArray: state.gameArray
  }
}

export default connect(mapStateToProps)(Tile);