import { connect } from 'react-redux';
import ChannelForm from './channel_form';
import { updateChannel, deleteChannel, removeChannelErrors } from '../../../actions/channel_actions';
import { closeModal } from '../../../actions/modal_actions';
import { getFirstChannel } from '../../../reducers/selectors';

const mapStateToProps = (state, ownProps) => ({
  formType: "edit",
  errors: state.errors.channelErrors,
  channel: state.entities.channels[ownProps.match.params.channelId],
  firstChannel: getFirstChannel(state, parseInt(ownProps.match.params.serverId))
});

const mapDispatchToProps = dispatch => ({
  processForm: channel => dispatch(updateChannel(channel)),
  deleteChannel: id => dispatch(deleteChannel(id)),
  removeChannelErrors: () => dispatch(removeChannelErrors()),
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelForm);
