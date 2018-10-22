import { connect } from 'react-redux';
import VoiceChannelIndex from './voice_channel_index';
import { userJoined, userLeft } from '../../../actions/voice_actions';

const mapStateToProps = state => ({
  users: state.entities.users,
  voiceUsers: state.ui.voice,
  currentUserId: state.session.id,
  loading: state.loading
});

const mapDispatchToProps = dispatch => ({
  userJoined: data => dispatch(userJoined(data)),
  userLeft: id => dispatch(userLeft(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(VoiceChannelIndex);