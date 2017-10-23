import React from 'react'
import { connect } from 'react-redux';
import { store } from '../store';

class Tile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isWall: this.props.mapArray[this.props.r][this.props.c],
      entity: this.props.gameArray[this.props.r][this.props.c]
    };
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({
        isWall: store.getState().mapArray[this.props.r][this.props.c],
        entity: store.getState().gameArray[this.props.r][this.props.c]
      });
    })
  }

  render() {
    let style = 'tile';
    if (this.state.isWall) {
      style = style + ' wall';
    }
    if (this.state.entity) {
      switch (this.state.entity.type) {
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