import React from 'react';
import '../index.css';

const Message = props => {
  return (
    <div className="message">
      <div className="message-username">
        {props.username}
      </div>
      <div className="message-text">{props.text}</div>
    </div>
  );
};

export default Message;
