import React from 'react';
import { connect } from 'react-redux'; 

class PlayerBoard extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="player-board">
        <div className="player-icon">
          <img src="https://image.flaticon.com/icons/svg/17/17004.svg" alt="Player Icon" />
        </div>
        <div className="player-stats">
          <p>Health: { this.props.health }</p>
          <p>Weapon: { this.props.weapon }</p>
          <p>XP: { this.props.xp }</p>
          <p>Level: { this.props.level }</p>
          <p>Dungeon: { this.props.dungeon }</p>
          <button onClick={ this.props.toggleDark }>Toggle Darkness</button>
        </div>
        <div className="player-message">
          <div className="message-title">
            Your enemy says: <br />
            { this.props.message }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    health: state.health,
    xp: state.xp,
    level: state.level,
    weapon: state.weapon,
    dungeon: state.dungeon,
    message: state.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDark: () => {
      console.log('Toggled!')
      dispatch({
        type: 'TOGGLE_DARK'
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerBoard);
