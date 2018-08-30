import React, { Component } from 'react';
import { _ } from 'orchestra';

/**
 * @param {string} altText Alt text for image
 * @param {string} id Model ID of the game – /game/game-name
 * @param {object} observer Images intersection observer
 * @param {function} onError Function to run on error
 * @param {function} onLoadHandler Function to run on load
 * @param {function} playClickHandler Function to run on click of the item
 * @param {boolean} preventPreload Whether to prevent preload or not
 * @param {string} thumb The image path
 */

 // TODO: QRK-5100 - interesection observer
export default class Image extends Component {
  createProps() {
    const props = {
      'data-id': this.props.id,
      alt: this.props.altText,
      className: 'game-thumb',
      onError: this.props.onError,
      onLoad: this.props.onLoadHandler,
      src: '/assets/images/svgSprites/fallback.svg'
    };

    props.src = this.props.thumb;

    return props;
  }

  getImage() {
    if (this.props.thumb) {
      return <img {...this.createProps()} />;
    }

    return (
      <svg viewBox="0 0 32 20" className="fallback-thumb game-thumb">
        <use xlinkHref="#icon-fallback"/>
      </svg>
    );
  }

  /**
  *  Lazy loading - Looking for any images with data-src,
  *  when they come into view, their src will be populated with the data from data-src
  */
  observe(type, ref) {
    const dataImg = ref.querySelector(`[data-id="${this.props.id}"]`);

    if (dataImg && this.props.preventPreload) {
      try {
        this.props.observer.unobserve(dataImg);
      } catch (e) {
        _.noop(e);
      }
    } else if (dataImg) {
      this.props.observer.observe(dataImg);
    }
  }

  render() {
    const img = this.getImage();
    // ref={this.observe.bind(this, 'observe')}
    return (
      <figure
        className={this.props.className}
        onClick={this.props.playClickHandler}
      >
        {img}
      </figure>
    );
  }
}
