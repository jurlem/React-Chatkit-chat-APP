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
  };

  componentDidMount () {
    // const chatManager = new Chatkit.ChatManager ({
    //   instanceLocator,
    //   userId: 'merleChat',
    //   tokenProvider: new Chatkit.TokenProvider ({
    //     url: tokenUrl,
    //   }),
    // });

    // chatManager
    //   .connect ()
    //   .then (currentUser => {
    //     currentUser.sendSimpleMessage ({
    //       text: '',
    //       roomId: '8b1aee9a-ae14-4740-ac6b-81f54a454a10',
    //     }), currentUser.subscribeToRoomMultipart ({
    //       roomId: '8b1aee9a-ae14-4740-ac6b-81f54a454a10',
    //       messageLimit: 20,
    //       hooks: {
    //         onMessage: message => {
    //           console.log (
    //             currentUser.id,
    //             message.parts[0].payload.content,
    //             message.createdAt,
    //             message.text
    //           );
    //         },
    //       },
    //     });
    //   })
    //   .catch (error => {
    //     console.error ('error', error);
    //   });

    // SIIT ALGAB

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
        console.log ('Connected as user ', currentUser);
        // this.currentUser.sendSimpleMessage ({
        //   text: 'messageToSend',
        //   roomId: '8b1aee9a-ae14-4740-ac6b-81f54a454a10',
        // }),
        this.currentUser.subscribeToRoomMultipart ({
          roomId: '8b1aee9a-ae14-4740-ac6b-81f54a454a10',
          messageLimit: 10,
          hooks: {
            onMessage: message => {
              console.log (
                currentUser.id,
                message.parts[0].payload.content,
                message.createdAt
              );
              this.setState ({messages: [...this.state.messages, message]});
            },
          },
        });
      })
      .catch (error => {
        console.error ('error:', error);
      });
  }

  sendMessage = text => {
    this.currentUser.sendMessage ({
      text,
      roomId: '8b1aee9a-ae14-4740-ac6b-81f54a454a10',
    });
  };

  render () {
    return (
      <div className="app">
        <RoomList />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
        <NewRoomForm />
      </div>
    );
  }
}

export default App;
