import { connect } from 'react-redux';
import ServerInfoForm from './server_info_form';
import {
  updateServer,
  deleteServer,
  removeServerErrors
} from '../../../actions/server_actions';
import { closeModal } from '../../../actions/modal_actions';
import { deleteMembership } from '../../../actions/server_membership_actions';
import { getMembership } from '../../../reducers/selectors';
import { updateLoading } from '../../../actions/loading_actions';

const mapStateToProps = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id],
    server: state.entities.servers[ownProps.match.params.serverId],
    membership: getMembership(state, state.session.id, parseInt(ownProps.match.params.serverId)),
    errors: state.errors.serverErrors
});

const mapDispatchToProps = dispatch => ({
  updateServer: formData => dispatch(updateServer(formData)),
  deleteServer: id => dispatch(deleteServer(id)),
  removeServerErrors: () => dispatch(removeServerErrors()),
  closeModal: () => dispatch(closeModal()),
  deleteMembership: data => dispatch(deleteMembership(data)),
  updateLoading: loading => dispatch(updateLoading(loading))
});

export default connect(mapStateToProps, mapDispatchToProps)(ServerInfoForm);
