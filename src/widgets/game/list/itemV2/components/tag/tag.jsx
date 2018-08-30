import React from 'react';
import { Translator } from 'orchestra';

/**
 * @param {string} tag The tag to display
 */
export default ({ tag }) => {
  if (tag) {
    return (
      <div className="featured-tag">
        <span>{Translator.translate(tag)}</span>
      </div>
    );
  }

  return null;
};
