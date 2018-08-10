import { connect } from 'react-redux';
import JoinServerForm from './join_server_form';
import { createMembership, removeMembershipErrors } from '../../../actions/server_membership_actions';
import { closeModal } from '../../../actions/modal_actions';
import { fetchServers } from '../../../actions/server_actions';

const mapStateToProps = state => ({
  errors: state.errors.membershipErrors
});

const mapDispatchToProps = dispatch => ({
  createMembership: serverId => dispatch(createMembership(serverId)),
  removeMembershipErrors: () => dispatch(removeMembershipErrors()),
  closeModal: () => dispatch(closeModal()),
  fetchServers: () => dispatch(fetchServers())
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinServerForm);
