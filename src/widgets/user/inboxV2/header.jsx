import { Translator } from 'orchestra';
import React from 'react';

export function extractInteger(text) {
  return parseInt(text.match(/\d+/g), 10);
}

export default function(props) {
  const unreadText = Translator.translate('unread_messages', [props.unread]);

  if (extractInteger(unreadText) === 1) {
    const singularText = `${unreadText.substring(0, unreadText.length - 2)})`;
    return <h2 className="unread-message-count">{singularText}</h2>;
  }

  return <h2 className="unread-message-count">{unreadText}</h2>;
}
