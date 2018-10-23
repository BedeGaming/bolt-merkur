import React from 'react';
import { Translator } from 'orchestra';
import View from '@bedegaming/bolt/src/utilities/flashes/flash.jsx';

class Flash extends View {
  render() {
    const { dismissible = true, bodyTranslate } = this.props;
    let { body } = this.props;
    body =
      bodyTranslate !== false ? `<p>${Translator.translate(body)}</p>` : body;

    return (
      <div
        className={this.state.notificationClasses}
        ref={flash => {
          this.flash = flash;
        }}
      >
        <div className="flash-type">
          <svg>
            <use xlinkHref={`#icon-notification-${this.props.type}`} />
          </svg>
        </div>
        <div
          className="flash-message"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        {dismissible ? (
          <div className="flash-close" onClick={this.dismiss.bind(this)}>
            <svg className="cross" viewBox="0 0 1 1">
              <use xlinkHref="#icon-cross" />
            </svg>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Flash;
