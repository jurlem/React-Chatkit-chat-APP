import React from 'react';
import '../index.css';

const RoomList = props => {
  return (
    <div className="rooms-list">
      <ul>
        <h3>Your rooms:</h3>
        {props.rooms.map (room => {
          return (
            <li key={room.id} className="room">
              <a
                onClick={() => props.subscribeToRoomMultipart (room.id)}
                href="#"
              >
                # {room.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RoomList;
