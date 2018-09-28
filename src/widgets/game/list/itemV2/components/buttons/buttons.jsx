import React from 'react';
import Button from 'components/button.jsx';
/**
 * @param {function} playClickHandler Function to run on click of the item
 */
export default ({ playClickHandler }) => (
  <Button className="btn-play btn btn-primary play" onClick={playClickHandler} text="play" />
);
