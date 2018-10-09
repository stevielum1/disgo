import React from 'react';
import { Link } from 'react-router-dom';

class VoiceChannelIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { channel, openModal, owner } = this.props;

    const editVoiceButton = owner ? (
      <i onClick={() => openModal(`editVoiceChannel_${channel.id}`)} className="fas fa-cog edit-channel-icon"></i>
    ) : null;

    return (
      <li>
        <Link
          className="voice-channel-link channel-link"
          to={"#"}>
          <div>
            <div>
              <span><i className="fas fa-volume-up"></i> <span className="voice-channel-name">{channel.name}</span>
              </span>
            </div>
            {editVoiceButton}
          </div>
        </Link>
      </li>
    );
  }
}

export default VoiceChannelIndex;