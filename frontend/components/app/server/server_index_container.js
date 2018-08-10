import { connect } from 'react-redux';
import ServerIndex from './server_index';
import { fetchServers } from '../../../actions/server_actions';
import { openModal } from '../../../actions/modal_actions';

const mapStateToProps = state => ({
  servers: Object.values(state.entities.servers),
  currentUser: state.entities.users[state.session.id],
  memberships: Object.values(state.entities.serverMemberships)
});

const mapDispatchToProps = dispatch => ({
  fetchServers: () => dispatch(fetchServers()),
  openModal: modal => dispatch(openModal(modal))
});

export default connect(mapStateToProps, mapDispatchToProps)(ServerIndex);
