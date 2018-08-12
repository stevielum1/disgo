import React from 'react';
import ChannelIndexItem from './channel_index_item';

class ChannelIndex extends React.Component {
  render() {
    const textChannels = this.props.channels.filter(channel => (
      channel.type === "TEXT"
    ));
    const voiceChannels = this.props.channels.filter(channel => (
      channel.type === "VOICE"
    ));


    return (
      <div>
        <div className="text-channels-container">
          <h2>Text channels</h2>
          <ul>
            {
              textChannels.map(channel => (
                <ChannelIndexItem
                  key={channel.id}
                  channel={channel} />
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default ChannelIndex;
