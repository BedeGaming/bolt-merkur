import React from 'react';
import Buttons from 'widgets/game/list/itemV2/components/buttons/buttons.jsx';
import Details from 'widgets/game/list/itemV2/components/details/details.jsx';
import ExtraInfoContainer from 'widgets/game/list/itemV2/components/extraInfo/extraInfoContainer.jsx';
import ImageContainer from 'widgets/game/list/itemV2/components/image/imageContainer.jsx';
import Info from 'widgets/game/list/itemV2/components/info/info.jsx';
import JackpotContainer from 'widgets/game/list/itemV2/components/jackpot/jackpotContainer.jsx';
import TagContainer from 'widgets/game/list/itemV2/components/tag/tagContainer.jsx';

/**
 * @param {string} displayName Display name of the game
 * @param {string} friendlyUrlPrefix URL to the game – /game/game-name
 * @param {string} id Model ID of the game – /game/game-name
 * @param {array} images Array of images for the game
 * @param {number} isNativeAppGame If the game is a native app game
 * @param {string} jackpotId Jackpot ID of the game if applicable
 * @param {number} maxBet Max bet for game
 * @param {number} minBet Min bet for game
 * @param {number} numberOfLines Number of paylines for game
 * @param {number} rtp RTP of game
 * @param {array} tags Tags the game has
 * @param {Mn Model} model Mn model of the game
 */
export default ({
  displayName,
  friendlyUrlPrefix,
  id,
  images,
  isNativeApp: isNativeAppGame,
  jackpotId,
  maxBet,
  minBet,
  numberOfLines,
  options,
  playClickHandler,
  fullItemHandler,
  rtp,
  tags,
  model
}) => (
  <div className={options.showExtraInfo ? 'info-enabled item-container' : 'item-container'} onClick={fullItemHandler}>
    <TagContainer
      isNativeAppGame={isNativeAppGame}
      tags={tags}
    />
    <div className="image-container">
      <Info friendlyUrlPrefix={friendlyUrlPrefix} />
      <ImageContainer
        displayName={displayName}
        id={id}
        images={images}
        model={model}
        options={options}
        playClickHandler={playClickHandler}
      />
    </div>
    <JackpotContainer jackpotId={jackpotId}></JackpotContainer>
    <div className="display-name-container">
      <Details
        displayName={displayName}
        friendlyUrlPrefix={friendlyUrlPrefix}
      />
      <Buttons playClickHandler={playClickHandler} />
    </div>
    <ExtraInfoContainer
      friendlyUrlPrefix={friendlyUrlPrefix}
      minBet={minBet}
      maxBet={maxBet}
      numberOfLines={numberOfLines}
      rtp={rtp}
      showInfo={true}
      showMoreButton={true}
      fullItemHandler={fullItemHandler}
    />
  </div>
);
