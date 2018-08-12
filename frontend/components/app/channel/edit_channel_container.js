import { connect } from 'react-redux';
import ChannelForm from './channel_form';
import { updateChannel } from '../../../actions/channel_actions';
import { closeModal } from '../../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => ({
  formType: "edit",
  errors: state.errors.channelErrors,
  channel: state.entities.channels[ownProps.match.params.channelId],
  owner: state.entities.servers[ownProps.match.params.serverId].ownerId === state.session.id
});

const mapDispatchToProps = dispatch => ({
  processForm: channel => dispatch(updateChannel(channel)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelForm);
