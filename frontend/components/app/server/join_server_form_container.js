import { connect } from 'react-redux';
import JoinServerForm from './join_server_form';
import { createMembership, removeMembershipErrors } from '../../../actions/server_membership_actions';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  createMembership: serverId => dispatch(createMembership(serverId)),
  removeMembershipErrors: () => dispatch(removeMembershipErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinServerForm);
