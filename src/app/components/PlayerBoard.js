import React from 'react'

export default class PlayerBoard extends React.Component {
  render() {
    return (
      <div className="player-board">
        <div className="player-icon">
          <img src="https://image.flaticon.com/icons/svg/17/17004.svg" alt="Player Icon" />
        </div>
        <div className="player-stats"></div>
        <div className="player-message">
          <div className="message-title">
            Your enemy says:
          </div>
        </div>
      </div>
    )
  }
}
