import React, { Component } from 'react';
import GameStore from 'services/game/store.js';
import { Translator, Model } from 'orchestra';
import GameService from 'services/game/index.js';
import Image from 'widgets/game/list/itemV2/components/image/image.jsx';

/**
 * @param {string} displayName Display name of the game
 * @param {string} id Model ID of the game – /game/game-name
 * @param {array} images Array of images for the game
 * @param {Mn Model} model Mn model of the game
 * @param {object} options Options passed from View
 * @param {function} playClickHandler Function to run on click of the item
 */
export default class ImageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preventPreload: props.model.get('preventPreload') || false,
      imgError: false,
      className: ''
    };

    this.observer = (this.props.options && this.props.options.observer) || null;

    this.onLoadHandler = this.onLoadHandler.bind(this);
  }

  componentDidMount() {
    if (!this.observer) {
      this.setState({
        preventPreload: true
      });
    }

    this.setFeatured();
  }

  setFeatured() {
    if (this.props.model.get('isFeaturedGame')) {
      this.setState({
        className: 'featured-no-thumb'
      });
    }
  }

  getThumbs(images) {
    return GameService.getImages(new Model({ images }), ['featured-thumb', 'thumb']);
  }

  getThumb(images) {
    const thumbs = this.getThumbs(images);
    let thumbType = 'thumb';

    if (this.props.model.get('isFeaturedGame')) {
      if (thumbs['featured-thumbs']) {
        thumbType = 'featured-thumb';
      }
    }

    return thumbs[thumbType];
  }

  handleThumbError() {
    this.setState({
      imgError: true
    });
  }

  render() {
    const {
      id,
      images,
      displayName,
      playClickHandler
    } = this.props;

    const thumb = this.state.imgError ? '/assets/images/svgSprites/fallback.svg' : this.getThumb(images);
    const altText = `${Translator.translate('play')} ${displayName}`;

    return (
      <Image
        altText={altText}
        id={id}
        observer={this.observer}
        onError={this.handleThumbError.bind(this)}
        onLoadHandler={this.onLoadHandler}
        playClickHandler={playClickHandler}
        preventPreload={this.state.preventPreload}
        thumb={thumb}
        className={this.state.className}
      >
        {this.props.children}
      </Image>
    );
  }

  onLoadHandler() {
    // This is so we have immutable state, this would be redux
    this.props.model.set('preventPreload', true);
    this.setState({
      preventPreload: true
    });

    GameStore.find(this.props.model.get('gameId')).then(model => {
      model.set('preventPreload', true);
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    // We change state on image load, no point re-rendering as it has no impact
    return !nextState.preventPreload;
  }
}
