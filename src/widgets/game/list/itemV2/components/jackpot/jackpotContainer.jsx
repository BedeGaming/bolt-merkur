import React, { Component } from 'react';
import { Currency } from 'orchestra';
import FeedService from 'services/feed/index.js';

/**
 * @param {string} jackpotId Jackpot ID of the game if applicable
 */
export default class Jackpot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0
    };
  }

  componentDidMount() {
    if (this.props.jackpotId) {
      this.getJackpotData();
      this.pollJackpots();
    }
  }

  pollJackpots() {
    window.setInterval(() => {
      this.getJackpotData();
    }, window.config.feeds.pollingInterval || 300000);
  }

  getJackpotData() {
    return FeedService.request('findJackpot', this.props.jackpotId).then(data => this.setJackpot(data));
  }

  setJackpot(data) {
    const { amount = 0, currency } = data;
    const val = Currency.format(amount, 0);
    this.setState({
      amount: val,
      currency
    });
  }

  render() {
    if (this.state.amount) {
      return (
        <div className="jackpot-amount">
          <span className="jackpot-value">{this.state.amount}</span>
        </div>
      );
    }

    return null;
  }
}
