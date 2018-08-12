import { connect } from 'react-redux';
import ChannelForm from './channel_form';
import { createChannel } from '../../../actions/channel_actions';
import { closeModal } from '../../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => ({
  formType: "create",
  errors: state.errors.channelErrors,
  channel: {
    name: "",
    server_id: ownProps.match.params.serverId,
    destructible: true
  },
  owner: state.entities.servers[ownProps.match.params.serverId].ownerId === state.session.id
});

const mapDispatchToProps = dispatch => ({
  processForm: channel => dispatch(createChannel(channel)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelForm);
