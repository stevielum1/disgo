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
    this.audioContainerRef = React.createRef();
    this.pcPeers = {};
  }

  componentCleanup() {
    //handle page refreshes
    this.props.userLeft(this.props.currentUserId);
    this.voice.destroy(this.props.currentUserId);
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

  setLocalStream() {
    const that = this;
    navigator.mediaDevices.getUserMedia({audio : true})
      .then(stream => {
        that.localStream = stream;
      });
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
            that.createPeerConnection(data.userId, true);
            let voiceUsers = Object.assign({}, that.state.voiceUsers);
            voiceUsers[data.userId] = data.channelId;
            that.props.userJoined(data);
            that.setState({ voiceUsers });
          } else if (data.type === "exchange") {
            if (data.to !== that.props.currentUserId) return;
            that.exchange(data);
          } else {
            if (data.from === that.props.currentUserId) {
              that.closeAllPeerConnections();
            } else {
              that.closePeerConnection(data.from);
            }
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
          that.setLocalStream();
          that.setState({ connected: true });
        },
        destroy: function(userId) {
          this.perform('destroy', { userId });
          that.setState({ connected: false });
        },
        exchange: function(data) {
          this.perform('exchange', {
            channelId: that.props.channel.id,
            from: that.props.currentUserId,
            to: data.userId,
            sdp: data.sdp
          });
        }
      }
    );
  }

  createPeerConnection(userId, isOffer) {
    if (this.localStream === undefined) return;
    const that = this;

    let pc = new RTCPeerConnection(null);
    that.pcPeers[userId] = pc;
    pc.addStream(this.localStream);

    if (isOffer) {
      pc.createOffer().then(offer => {
        pc.setLocalDescription(offer);
        that.voice.exchange({
          userId,
          sdp: JSON.stringify(pc.localDescription)
        });
      })
      .catch(console.log);

      pc.onicecandidate = e => {
        if (e.candidate) {
          that.voice.exchange({
            userId,
            candidate: JSON.stringify(e.candidate)
          });
        }
      };

      pc.onaddstream = e => {
        const element = document.createElement("video");
        element.id = `remoteVideoContainer_${userId}`;
        element.autoplay = "autoplay";
        element.srcObject = e.stream;
        that.audioContainerRef.current.appendChild(element);
      };

      pc.oniceconnectionstatechange = e => {
        if (pc.iceConnectionState == "disconnected") {
          that.voice.destroy(userId);
        }
      };

      return pc;
    }
  }

  exchange(data) {
    const that = this;

    let pc;

    if (!this.pcPeers[data.from]) {
      pc = this.createPeerConnection(data.from, false);
    } else {
      pc = this.pcPeers[data.from];
    }

    if (data.candidate) {
      pc.addIceCandidate(new RTCIceCandidate(JSON.parse(data.candidate)))
        .then(console.log)
        .catch(console.log);
    }

    if (data.sdp) {
      const sdp = JSON.parse(data.sdp);
      pc.setRemoteDescription(new RTCSessionDescription(sdp))
        .then(() => {
          if (sdp.type === "offer") {
            pc.createAnswer().then(answer => {
              pc.setLocalDescription(answer);
              that.voice.exchange({
                userId: data.from,
                sdp: JSON.stringify(pc.localDescription)
              });
            });
          }
        })
        .catch(console.log);
    }
  }

  closeAllPeerConnections() {
    for (user in this.pcPeers) {
      this.pcPeers[user].close();
    }
    
    this.pcPeers = {};
  }

  closePeerConnection(userId) {
    const video = document.getElementById(`remoteVideoContainer_${userId}`);
    if (video) video.remove();
    delete this.pcPeers[userId];
  }

  handleClick(channelId) {
    return e => {
      if (this.state.connected === false) {
        this.voice.create({ userId: this.props.currentUserId, channelId });
      } else {
        if (this.state.voiceUsers[this.props.currentUserId] === channelId) {
          this.voice.destroy(this.props.currentUserId);
        } else {
          this.voice.destroy(this.props.currentUserId);
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
        <div ref={this.audioContainerRef}></div>
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