import { connect } from 'react-redux';
import ChannelForm from './channel_form';
import { updateChannel, deleteChannel } from '../../../actions/channel_actions';
import { closeModal } from '../../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => ({
  formType: "edit",
  errors: state.errors.channelErrors,
  channel: state.entities.channels[ownProps.match.params.channelId],
  owner: state.entities.servers[ownProps.match.params.serverId].ownerId === state.session.id
});

const mapDispatchToProps = dispatch => ({
  processForm: channel => dispatch(updateChannel(channel)),
  deleteChannel: id => dispatch(deleteChannel(id)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelForm);
