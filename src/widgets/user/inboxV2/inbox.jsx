import React from 'react';
import InboxPagination from './pagination.jsx';
import Header from './header.jsx';
import InboxControls from '../../../../node_modules/@bedegaming/bolt/src/widgets/user/inboxV2/controls.jsx';
// eslint-disable-next-line max-len
import InboxMessageList from '../../../../node_modules/@bedegaming/bolt/src/widgets/user/inboxV2/messages/message-list.jsx';

export default function (state) {
  const { state: props } = state;
  const messages = props.messages;
  const unread = props.meta.unread;
  const { loadMessages } = state.actions;

  const handler = forward => {
    window.scrollTo(0, 0);
    loadMessages({ forward });
  };

  return (
    <div className="inbox-container">
      <h1 className="inbox-header" >Messages</h1>
      {unread > 0 ? <Header unread={unread} /> : null}
      {messages.length ? <InboxControls {...state} /> : null}
      <div className="inbox-area">
        <InboxMessageList {...state} />
        {messages.length ? (
          <InboxPagination
            onNextClickHandler={() => handler(true)}
            onPrevClickHandler={() => handler(false)}
            {...props.meta}
          />
        ) : null}
      </div>
    </div>
  );
}
