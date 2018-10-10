import React from 'react';
import { Link } from 'react-router-dom';
import VoiceChannelIndexItem from './voice_channel_index_item.jsx';

class VoiceChannelIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      voiceUsers: props.voiceUsers,
      connected: Boolean(props.voiceUsers[props.currentUserId])
    };
    this.handleClick = this.handleClick.bind(this);
    this.createSocket();
  }

  componentCleanup() {
    //handle page refreshes
    this.props.userLeft(this.props.currentUserId);
    this.voice.destroy();
    this.voice.unsubscribe();
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.componentCleanup);
  }

  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener("beforeunload", this.componentCleanup);
  }

  componentDidUpdate(prevProps, prevState) {
    if (Object.keys(this.props.voiceUsers).length !== Object.keys(prevProps.voiceUsers).length) {
      if (this.voice) {
        this.voice.unsubscribe();
      }
      this.createSocket();
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (Object.keys(props.voiceUsers).length !== Object.keys(state.voiceUsers).length) {
      return {
        voiceUsers: props.voiceUsers,
        connected: state.connected
      };
    } else {
      return state;
    }
  }

  createSocket() {
    let that = this;

    let cable = ActionCable.createConsumer(`ws://${location.host}/cable`);
    that.voice = cable.subscriptions.create({
      channel: "VoiceChannel",
      channel_id: that.props.channel.id 
    }, {
        connected: () => {},
        disconnected: () => {},
        received: data => {
          if (data.type === "join") {
            let voiceUsers = Object.assign({}, that.state.voiceUsers);
            voiceUsers[data.userId] = data.channelId;
            that.props.userJoined(data);
            that.setState({ voiceUsers });
          } else {
            let newVoiceUsers = Object.assign({}, that.state.voiceUsers);
            delete newVoiceUsers[data.userId];
            that.props.userLeft(data.userId);
            that.setState({ voiceUsers: newVoiceUsers });
          }
        },
        create: function(data) {
          this.perform('create', {
            userId: data.userId,
            channelId: data.channelId
          });
          that.setState({ connected: true });
        },
        destroy: function() {
          this.perform('destroy', {
            userId: that.props.currentUserId
          });
          that.setState({ connected: false });
        }
      }
    );
  }

  handleClick(channelId) {
    return e => {
      if (this.state.connected === false) {
        this.voice.create({ userId: this.props.currentUserId, channelId });
      } else {
        if (this.state.voiceUsers[this.props.currentUserId] === channelId) {
          this.voice.destroy();
        } else {
          this.voice.destroy();
          this.voice.create({ userId: this.props.currentUserId, channelId });
        }
      }
    };
  }

  render() {
    if (this.props.loading) return null;

    const { channel, openModal, owner, currentUserId, users } = this.props;

    const editVoiceButton = owner ? (
      <i onClick={() => openModal(`editVoiceChannel_${channel.id}`)} className="fas fa-cog edit-channel-icon"></i>
    ) : null;

    return (
      <li>
        <Link
          className="voice-channel-link channel-link"
          to={"#"}
          onClick={this.handleClick(channel.id)}>
          <div>
            <div>
              <span><i className="fas fa-volume-up"></i> <span className="voice-channel-name">{channel.name}</span>
              </span>
            </div>
            {editVoiceButton}
          </div>
        </Link>
        <ul>
          {
            Object.keys(this.state.voiceUsers).map(id => {
              if (this.state.voiceUsers[id] === channel.id) {
                return <VoiceChannelIndexItem key={id} user={users[id]} />;
              } else {
                return null;
              }
            })
          }
        </ul>
      </li>
    );
  }
}

export default VoiceChannelIndex;