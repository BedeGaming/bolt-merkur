import React, { Component } from 'react';
import ExtraInfo from 'widgets/game/list/itemV2/components/extraInfo/extraInfo.jsx';

/**
 * @param {string} friendlyUrlPrefix URL to the game – /game/game-name
 * @param {number} maxBet Max bet for game
 * @param {number} minBet Min bet for game
 * @param {number} numberOfLines Number of paylines for game
 * @param {number} rtp RTP of game
 * @param {boolean} showInfo Whether to show the link to game info page in this component
 * @param {boolean} showMoreButton Whether to show the `More` button to access extra info, i.e. on mobile
 */
export default class extraInfoContainer extends Component {
  constructor(props) {
    super(props);
    this.toggleExtraInfoClick = this.toggleExtraInfoClick.bind(this);
    this.state = {
      toggleExtraInfo: false
    };
  }

  // Used on mobile where we hide the info by default
  toggleExtraInfoClick() {
    this.setState({
      toggleClass: !this.state.toggleClass
    });
  }

  render() {
    const {
      friendlyUrlPrefix,
      maxBet,
      minBet,
      numberOfLines,
      rtp,
      showInfo,
      showMoreButton
    } = this.props;

    return (
      <ExtraInfo
        friendlyUrlPrefix={friendlyUrlPrefix}
        maxBet={maxBet}
        minBet={minBet}
        numberOfLines={numberOfLines}
        rtp={rtp}
        showInfo={showInfo}
        showMoreButton={showMoreButton}
        toggleClass={this.state.toggleClass}
        toggleExtraInfoClick={this.toggleExtraInfoClick}
      />
    );
  }
}
