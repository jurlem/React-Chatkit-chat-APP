import React, {Component} from 'react';
import '../index.css';

class NewRoomForm extends Component {
  state = {};
  render () {
    return (
      <div className="new-room-form">
        <form>
          <input type="text" placeholder="NewRoomForm" required />
          <button id="create-room-btn" type="submit">+</button>
        </form>
      </div>
    );
  }
}

export default NewRoomForm;
