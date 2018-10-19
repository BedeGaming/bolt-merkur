import React from 'react';
import { Translator } from 'orchestra';
import Message from 'widgets/user/inboxV2/messages/message.jsx';

export default function({ state: props, actions }) {
  const { messages, pending, errors } = props;
  const emptyInbox = Translator.translate('inbox_empty');
  const errorMessage = Translator.translate('messages_fetch_failed');
  const messageList = messages.map(message => (
    <Message key={message.id} actions={actions} {...message} />
  ));
  const messagesErrors = errors.filter(msg => msg.messages);
  let listContent = null;

  const isPending = pending.messages;

  if (isPending && !messageList.length) {
    listContent = <div className="spinner" />;
  } else {
    if (messagesErrors.length) {
      listContent = <p>{errorMessage}</p>;
    } else {
      listContent = messages.length ? messageList : <p>{emptyInbox}</p>;
    }
  }

  return <div className="inbox-list">{listContent}</div>;
}
