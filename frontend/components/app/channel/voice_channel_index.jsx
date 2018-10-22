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
    
    // DOM Elements
    this.audioContainerRef = React.createRef();
    
    // Objects
    this.pcPeers = {};
  }
  
  componentCleanup() {
    //handle page refreshes
    this.props.userLeft(this.props.currentUserId);
    this.voice.destroy(this.props.currentUserId);
    this.voice.unsubscribe();
    if (this.voiceSession) this.voiceSession.unsubscribe();
  }
  
  componentDidMount() {
    this.createSocket();
    if (this.state.connected) this.handleJoinSession();
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

  handleJoinSession() {
    let that = this;

    let cable = ActionCable.createConsumer(`ws://${location.host}/cable`);

    navigator.mediaDevices.getUserMedia({audio : true})
      .then(stream => {
        that.localStream = stream;
        
        that.voiceSession = cable.subscriptions.create({
          channel: "VoiceSessionChannel",
          channel_id: that.props.channel.id
        }, {
          connected: () => {
            that.voiceSession.broadcastData({
              type: "JOIN_ROOM",
              from: that.props.currentUserId
            });
          },
          disconnected: () => {},
          received: data => {
            console.log("received", data);
            switch(data.type) {
              case "JOIN_ROOM":
              return that.joinRoom(data);
              case "EXCHANGE":
              if (data.to !== that.props.currentUserId) return;
              return that.exchange(data);
              case "REMOVE_USER":
              return that.removeUser(data);
              default:
              return;
            }
          },
          broadcastData: function(data) {
            this.perform("broadcast", { channelId: that.props.channel.id, data });
          }
        });
      });
  }

  handleLeaveSession() {
    for (let user in this.pcPeers) {
      this.pcPeers[user].close();
    }

    this.pcPeers = {};
  
    this.voiceSession.unsubscribe();
  
    this.audioContainerRef.current.innerHTML = "";
  
    this.voiceSession.broadcastData({
      type: "REMOVE_USER",
      from: this.props.currentUserId
    });
  }

  joinRoom(data) {
    this.createPC(data.from, true);
  }

  removeUser(data) {
    console.log("removing user", data.from);
    let video = document.getElementById(`remoteVideoContainer+${data.from}`);
    if (video) video.remove();
    delete this.pcPeers[data.from];
  }

  createPC(userId, isOffer) {
    let pc = new RTCPeerConnection(null);
    this.pcPeers[userId] = pc;
    pc.addStream(this.localStream);
  
    if (isOffer) {
      pc.createOffer()
        .then(offer => {
          pc.setLocalDescription(offer);
          this.voiceSession.broadcastData({
            type: "EXCHANGE",
            from: this.props.currentUserId,
            to: userId,
            sdp: JSON.stringify(pc.localDescription)
          });
        })
        .catch(console.warn);
    }
  
    pc.onicecandidate = event => {
      if (event.candidate) {
        this.voiceSession.broadcastData({
          type: "EXCHANGE",
          from: this.props.currentUserId,
          to: userId,
          candidate: JSON.stringify(event.candidate)
        });
      }
    };
  
    pc.onaddstream = event => {
      const element = document.createElement("video");
      element.id = `remoteVideoContainer+${userId}`;
      element.autoplay = "autoplay";
      element.srcObject = event.stream;
      element.classList.add("audio-container");
      this.audioContainerRef.current.appendChild(element);
    };
  
    pc.oniceconnectionstatechange = event => {
      if (pc.iceConnectionState == "disconnected") {
        console.log("Disconnected:", userId);
        this.voiceSession.broadcastData({
          type: "REMOVE_USER",
          from: userId
        });
      }
    };
  
    return pc;
  }

  exchange(data) {
    const that = this;

    let pc;

    if (!this.pcPeers[data.from]) {
      pc = this.createPC(data.from, false);
    } else {
      pc = this.pcPeers[data.from];
    }

    if (data.candidate) {
      pc.addIceCandidate(new RTCIceCandidate(JSON.parse(data.candidate)))
        .then(() => console.log("Ice candidate added"))
        .catch(console.warn);
    }

    if (data.sdp) {
      const sdp = JSON.parse(data.sdp);
      pc.setRemoteDescription(new RTCSessionDescription(sdp))
        .then(() => {
          if (sdp.type === "offer") {
            pc.createAnswer().then(answer => {
              pc.setLocalDescription(answer);
              that.voiceSession.broadcastData({
                type: "EXCHANGE",
                from: this.props.currentUserId,
                to: data.from,
                sdp: JSON.stringify(pc.localDescription)
              });
            });
          }
        })
        .catch(console.warn);
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
        destroy: function(userId) {
          this.perform('destroy', { userId });
          that.setState({ connected: false });
        }
      }
    );
  }

  handleClick(channelId) {
    return e => {
      if (this.state.connected === false) {
        this.handleJoinSession();
        this.voice.create({ userId: this.props.currentUserId, channelId });
      } else {
        if (this.state.voiceUsers[this.props.currentUserId] === channelId) {
          this.handleLeaveSession();
          this.voice.destroy(this.props.currentUserId);
        } else {
          this.handleLeaveSession();
          this.voice.destroy(this.props.currentUserId);

          this.handleJoinSession();
          this.voice.create({ userId: this.props.currentUserId, channelId });
        }
      }
    };
  }

  render() {
    if (this.props.loading) return null;

    const { channel, openModal, owner, users } = this.props;

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