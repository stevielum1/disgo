import { connect } from 'react-redux';
import ChannelForm from './channel_form';
import { updateChannel, deleteChannel, removeChannelErrors } from '../../../actions/channel_actions';
import { closeModal } from '../../../actions/modal_actions';
import { getFirstChannel } from '../../../reducers/selectors';
import { updateLoading } from '../../../actions/loading_actions';

const mapStateToProps = (state, ownProps) => ({
  formType: "edit",
  channelType: "text",
  errors: state.errors.channelErrors,
  channel: state.entities.channels[ownProps.match.params.channelId],
  firstChannel: getFirstChannel(state, parseInt(ownProps.match.params.serverId)),
  loading: state.ui.loading
});

const mapDispatchToProps = dispatch => ({
  processForm: channel => dispatch(updateChannel(channel)),
  deleteChannel: id => dispatch(deleteChannel(id)),
  removeChannelErrors: () => dispatch(removeChannelErrors()),
  closeModal: () => dispatch(closeModal()),
  updateLoading: loading => dispatch(updateLoading(loading))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelForm);
