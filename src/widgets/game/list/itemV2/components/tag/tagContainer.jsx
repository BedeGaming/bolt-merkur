import React, { Component } from 'react';
import Tag from 'widgets/game/list/itemV2/components/tag/tag.jsx';
import ContextService from 'services/context/index.js';

/**
 * @param {number} isNativeAppGame If the game is a native app game
 * @param {array} tags Tags the game has
 */
export default class TagContainer extends Component {
  findFeaturedTags({ tags, isNativeAppGame }) {
    const featuredTagsToFind = window.config.games.tagsToHighlight;
    let featuredTag = '';

    if (featuredTagsToFind) {
      featuredTag = featuredTagsToFind.find(tag => tags.includes(tag));
    }

    const appTag = !!isNativeAppGame && ContextService.isMobile() && !ContextService.isNativeApp();

    return featuredTag || appTag;
  }

  render() {
    const tag = this.findFeaturedTags({
      tags: this.props.tags,
      isNativeAppGame: this.props.isNativeAppGame
    });

    return (
      <Tag tag={tag} />
    );
  }
}
