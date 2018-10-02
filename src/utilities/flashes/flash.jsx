import { Translator } from 'orchestra';
import React, { Component } from 'react';

class Flash extends Component {
  constructor(props) {
    super(props);
    const notificationType = props.type;
    const notificationPosition = props.position || '';

    this.state = {
      notificationClasses: `site-notification show notification-${notificationType} ${notificationPosition}`,
      dismissed: false
    };
  }

  clearFlash() {
    this.setState({ dismissed: true });
    this.props.removeFlash(this.props.id);
  }

  dismiss() {
    if (!this.state.dismissed) {
      this.setState({
        notificationClasses: `${this.state.notificationClasses} remove`
      });

      if (this.flash) {
        this.flash.addEventListener('animationend', this.clearFlash.bind(this), false);
      }
    }
  }

  componentDidMount() {
    const isInGame = this.props.type === 'in-game';
    const hasTimeout = window.config.hasFlashDestroyTimer || isInGame;
    const timeout = hasTimeout ? this.props.timeout || 3000 : false;

    if (hasTimeout) {
      setTimeout(() => {
        this.dismiss();
      }, timeout);
    }
  }

  getFlashTitle() {
    const { titleTranslate, title } = this.props;

    return titleTranslate !== false ? Translator.translate(title) : title;
  }

  render() {
    const { dismissible = true, bodyTranslate } = this.props;
    const title = this.getFlashTitle();
    let { body } = this.props;
    body = bodyTranslate !== false ? `<p>${Translator.translate(body)}</p>` : body;

    return (
      <div className={this.state.notificationClasses} ref={ flash => { this.flash = flash; } }>
        <div className="flash-type">
          <svg><use xlinkHref={`#icon-notification-${this.props.type}`}/></svg>
        </div>
        <div className="flash-message" dangerouslySetInnerHTML={ { __html: body } }></div>
        {
          dismissible ?
          <div className="flash-close" onClick={this.dismiss.bind(this)}>
            <svg className="cross" viewBox="0 0 1 1"><use xlinkHref="#icon-cross"/></svg>
          </div> :
          null
        }
      </div>
    );
  }
}

export default Flash;
