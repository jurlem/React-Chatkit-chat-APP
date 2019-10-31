import React from 'react';
// import Chatkit from '@pusher/chatkit';
import Chatkit from '@pusher/chatkit-client';
import './index.css';
import MessageList from './components/MessageList';
import NewRoomForm from './components/NewRoomForm';
import RoomList from './components/RoomList';
import SendMessageForm from './components/SendMessageForm';

import {tokenUrl, instanceLocator} from './config';

class App extends React.Component {
  state = {
    messages: [],
    joinableRooms: [],
    joinedRooms: [],
    roomId: null,
  };

  componentDidMount () {
    const chatManager = new Chatkit.ChatManager ({
      instanceLocator,
      userId: 'merleChat',
      tokenProvider: new Chatkit.TokenProvider ({
        url: tokenUrl,
      }),
    });

    chatManager
      .connect ()
      .then (currentUser => {
        this.currentUser = currentUser;
        this.getRooms ();
      })
      .catch (error => {
        console.error ('error on connecting', error);
      });
  }

  sendMessage = text => {
    this.currentUser.sendMessage ({
      text,
      roomId: this.state.roomId,
    });
  };

  subscribeToRoomMultipart = roomId => {
    this.setState ({messages: []});
    this.currentUser
      .subscribeToRoomMultipart ({
        roomId: roomId,
        messageLimit: 10,
        hooks: {
          onMessage: message => {
            console.log (
              this.currentUser.id,
              message.parts[0].payload.content,
              message.createdAt
            );
            this.setState ({messages: [...this.state.messages, message]});
          },
        },
      })
      .then (room => {
        this.setState ({
          roomId: room.id,
        });
        this.getRooms ();
      })
      .catch (err => console.log ('error on subscribing to room', err));
  };

  getRooms = () => {
    this.currentUser
      .getJoinableRooms ()
      .then (joinableRooms => {
        this.setState ({
          joinableRooms,
          joinedRooms: this.currentUser.rooms,
        });
      })
      .catch (error => console.log (error, 'error on joinableRooms'));
  };

  render () {
    console.log (this.currentUser);
    return (
      <div className="app">
        <RoomList
          subscribeToRoomMultipart={this.subscribeToRoomMultipart}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
        />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
        <NewRoomForm />
      </div>
    );
  }
}

export default App;
