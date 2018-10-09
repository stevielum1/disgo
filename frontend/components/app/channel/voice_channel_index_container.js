import { connect } from 'react-redux';
import VoiceChannelIndex from './voice_channel_index';

const mapStateToProps = state => ({
  users: state.entities.users,
  voiceUsers: state.ui.voice
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(VoiceChannelIndex);