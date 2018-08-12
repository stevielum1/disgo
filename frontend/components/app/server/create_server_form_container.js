import { connect } from 'react-redux';
import CreateServerForm from './create_server_form';
import { createServer, removeServerErrors } from '../../../actions/server_actions';
import { closeModal } from '../../../actions/modal_actions';
import { createMembership } from '../../../actions/server_membership_actions';
import { createChannel } from '../../../actions/channel_actions';

const mapStateToProps = state => ({
  errors: state.errors.serverErrors,
  currentUser: state.entities.users[state.session.id]
});

const mapDispatchToProps = dispatch => ({
  createServer: server => dispatch(createServer(server)),
  removeServerErrors: () => dispatch(removeServerErrors()),
  closeModal: () => dispatch(closeModal()),
  createMembership: serverId => dispatch(createMembership(serverId)),
  createChannel: channel => dispatch(createChannel(channel))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateServerForm);
