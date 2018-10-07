import React from 'react';
import ChannelIndexItem from './channel_index_item';

class ChannelIndex extends React.Component {
  render() {
    if (this.props.loading) return null;

    const { openModal, currentUser, server } = this.props;

    const owner = server.ownerId === currentUser.id;

    const createTextButton = owner ? (
      <i onClick={() => openModal('createTextChannel')} className="fas fa-plus"></i>
    ) : ( null );

    const createVoiceButton = owner ? (
      <i onClick={() => openModal('createVoiceChannel')} className="fas fa-plus"></i>
    ) : ( null );

    const textChannels = this.props.channels.filter(channel => (
      channel.type === "TEXT"
    ));
    const voiceChannels = this.props.channels.filter(channel => (
      channel.type === "VOICE"
    ));

    return (
      <div className="channels-container">
        <div className="text-channels-container">
          <div className="channels-heading">
            <h2>Text channels</h2>
            {createTextButton}
          </div>
          <ul>
            {
              textChannels.map(channel => (
                <ChannelIndexItem
                  key={channel.id}
                  channel={channel}
                  openModal={openModal}
                  owner={owner} />
              ))
            }
          </ul>
        </div>
        <div className="voice-channels-container">
          <div className="channels-heading">
            <h2>Voice channels</h2>
            {createVoiceButton}
          </div>
          <ul>
            {
              voiceChannels.map(channel => (
                <ChannelIndexItem
                  key={channel.id}
                  channel={channel}
                  openModal={openModal}
                  owner={owner} />
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default ChannelIndex;
