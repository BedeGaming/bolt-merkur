import React from 'react';

/**
 * @param {string} displayName Display name of the game
 * @param {string} friendlyUrlPrefix URL to the game – /game/game-name
 */
export default ({ displayName, friendlyUrlPrefix }) => (
  <a href={friendlyUrlPrefix} className="display-name">{displayName}</a>
);
