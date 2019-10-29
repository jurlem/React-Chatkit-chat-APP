import React from 'react';
import '../index.css';

const DUMMY_DATA = [
  {
    senderId: 'per',
    text: 'Hei, how are you?',
  },
  {
    senderId: 'janedoe',
    text: 'Great, and you?',
  },
  {
    senderId: 'per',
    text: 'Nice, im also fantastic!!',
  },
];

class MessageList extends React.Component {
  state = {};

  render () {
    return (
      <div className="message-list">
        {DUMMY_DATA.map ((message, index) => {
          return (
            <div key={index} className="message">
              <div className="message-username">
                {message.senderId.toUpperCase ()}
              </div>
              <div className="message-text">{message.text}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default MessageList;
