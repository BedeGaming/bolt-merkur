import React from 'react';

/**
 * @param {string} friendlyUrlPrefix URL to the game – /game/game-name
 */
export default ({ friendlyUrlPrefix }) => {
  const gamesConfig = window.config.games;
  const rel = gamesConfig.gameItemInfoRel ? gamesConfig.gameItemInfoRel : '';
  return (
    <a className="info" href={`${friendlyUrlPrefix}`} rel={rel}>
      <svg viewBox="0 0 32 32">
        <use xlinkHref="#icon-info"/>
      </svg>
    </a>
  );
};
