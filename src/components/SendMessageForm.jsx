import React from 'react';
import '../index.css';

class SendMessageForm extends React.Component {
  state = {
    message: '',
  };

  handleChange = event => {
    const {value} = event.currentTarget;
    this.setState ({message: value});
  };

  handleSubmit = event => {
    event.preventDefault ();
    this.props.sendMessage (this.state.message);
    this.setState ({
      message: '',
    });
  };

  render () {
    return (
      <form
        action=""
        className="send-message-form"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          value={this.state.message}
          placeholder="Type your message and hit ENTER"
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default SendMessageForm;
