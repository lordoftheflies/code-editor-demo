import React from 'react';
import ChatContainer from './ChatContainer.jsx';
import ChatInput from './ChatInput.jsx';
import ChatMessage from './ChatMessage.jsx';
import {autobind} from 'core-decorators';

export default class GroupChatPane extends React.Component {

  static propTypes = {
    chatRoom: React.PropTypes.object.isRequired,
    username: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    this.props.chatRoom.on("message", this._onRemoteMessage);
  }

  componentWillUnmount() {
    this.props.chatRoom.off("message", this._onRemoteMessage);
  }

  @autobind
  _onRemoteMessage(event) {
    const messages = this.state.messages.slice(0);
    messages.push(
      <ChatMessage
        username={event.username}
        color={"blue"}
        message={event.message}
        timestamp={new Date(event.timestamp)}
        key={this.state.messages.length}
        local={false}
      />
    );
    this.setState({messages: messages});
  }

  @autobind
  handleChatSubmit(message) {
    const messages = this.state.messages.slice(0);
    messages.push(
      <ChatMessage
        username={this.props.username}
        color="#66D9EF"
        message={message}
        timestamp={new Date()}
        local
        key={this.state.messages.length}
      />
    );

    this.setState({messages: messages});
    this.props.chatRoom.send(message);
  }

  render() {
    return (
      <div className="group-chat">
        <ChatContainer
          chatRoom={this.props.chatRoom}
          messages={this.state.messages}
        />
        <ChatInput
          chatRoom={this.props.chatRoom}
          onSubmit={this.handleChatSubmit}
        />
      </div>
    );
  }
}
