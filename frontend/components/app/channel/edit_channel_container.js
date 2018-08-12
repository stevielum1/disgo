import { connect } from 'react-redux';
import ChannelForm from './channel_form';
import { updateChannel } from '../../../actions/channel_actions';

const mapStateToProps = (state, ownProps) => ({
  formType: "edit",
  channel: state.entities.channels[ownProps.match.params.channelId]
});

const mapDispatchToProps = dispatch => ({
  processForm: channel => dispatch(updateChannel(channel))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelForm);
