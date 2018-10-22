import { connect } from 'react-redux';
import ChannelForm from './channel_form';
import { createChannel, removeChannelErrors } from '../../../actions/channel_actions';
import { closeModal } from '../../../actions/modal_actions';
import { updateLoading } from '../../../actions/loading_actions';

const mapStateToProps = (state, ownProps) => ({
  formType: "create",
  channelType: "voice",
  errors: state.errors.channelErrors,
  channel: {
    name: "",
    server_id: ownProps.match.params.serverId,
    destructible: true,
    channel_type: 1
  }
});

const mapDispatchToProps = dispatch => ({
  processForm: channel => dispatch(createChannel(channel)),
  removeChannelErrors: () => dispatch(removeChannelErrors()),
  closeModal: () => dispatch(closeModal()),
  updateLoading: loading => dispatch(updateLoading(loading))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelForm);
