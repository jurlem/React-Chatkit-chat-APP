import React from 'react';
import '../index.css';

const RoomList = props => {
  //orderedrooms to make sure that the order of Rooms in list is a->z
  // and not change location on UI
  const orderedRooms = [...props.rooms].sort ((a, b) => a.id - b.id);
  return (
    <div className="rooms-list">
      <ul>
        <h3>Your rooms:</h3>
        {orderedRooms.map (room => {
          const active = props.roomId === room.id ? 'active' : '';
          return (
            <li key={room.id} className={'room' + active}>
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
