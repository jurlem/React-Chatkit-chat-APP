import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
import '../index.css';

class MessageList extends React.Component {
  componentWillUpdate () {
    const node = ReactDOM.findDOMNode (this);
    this.shouldScrollToBottom =
      node.scollTop + node.clientHeight + 100 >= node.scrollHeight;
  }

  componentDidUpdate () {
    if (this.shouldScrollToBottom) {
      const node = ReactDOM.findDOMNode (this);
      node.scollTop = node.scrollHeight;
    }
  }

  render () {
    return (
      <div className="message-list">
        {this.props.messages.map ((message, index) => {
          return (
            <Message
              key={index}
              username={message.senderId}
              text={message.parts[0].payload.content}
            />
          );
        })}
      </div>
    );
  }
}

export default MessageList;
