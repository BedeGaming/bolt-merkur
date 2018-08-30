/**
 * This component can be used for what we currently do on list view and game overlay on UK Casino
 * By passing false for a specific item such as `rtp` it will be omitted - useful for UK use case
 * Whereas list view will want everything passing through and showInfo/showMoreButton set to true
 * This component could be overwritten in UK to show the min/max bet on the thumb
 */

import React from 'react';
import Info from 'widgets/game/list/itemV2/components/info/info.jsx';
import InfoItem from 'widgets/game/list/itemV2/components/extraInfo/infoItem.jsx';

const getInfoComponent = (showInfo, url) => {
  if (showInfo) {
    return <Info friendlyUrlPrefix={url} />;
  }

  return null;
};

const getMoreButton = (showMoreButton, toggleExtraInfoClick) => {
  if (showMoreButton) {
    return (
      <button className="more" onClick={toggleExtraInfoClick}>
        <span>
          <svg viewBox="0 0 32 32">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </span>
      </button>
    );
  }

  return null;
};

/**
 * @param {string} friendlyUrlPrefix URL to the game – /game/game-name
 * @param {number} maxBet Max bet for game
 * @param {number} minBet Min bet for game
 * @param {number} numberOfLines Number of paylines for game
 * @param {number} rtp RTP of game
 * @param {boolean} showInfo Whether to show the link to game info page in this component
 * @param {boolean} showMoreButton Whether to show the `More` button to access extra info, i.e. on mobile
 * @param {boolean} toggleClass true if extra info is toggled open else false
 * @param {function} toggleExtraInfoClick Function to run on toggle click
 */
export default ({
  friendlyUrlPrefix,
  maxBet = 0,
  minBet = 0,
  numberOfLines = 0,
  rtp = 0,
  showInfo,
  showMoreButton,
  toggleClass,
  toggleExtraInfoClick
}) => {
  const stateClass = toggleClass ? ' show-details' : '';
  const className = `more-details${stateClass}`;
  const infoComponent = getInfoComponent(showInfo, friendlyUrlPrefix);
  const moreButton = getMoreButton(showMoreButton, toggleExtraInfoClick);

  return (
    <div className={className}>
      {moreButton}
      <div className="extra-info">
        <ul>
          <InfoItem title="paylines" name="paylines" value={numberOfLines} />
          <InfoItem title="rtp" name="rtp" value={rtp} />
          <InfoItem title="min_bet" name="min" value={minBet} currency={true} />
          <InfoItem title="max_bet" name="max" value={maxBet} currency={true} />
        </ul>
        {infoComponent}
      </div>
    </div>
  );
};
