import { connect } from 'react-redux';
import ServerIndex from './server_index';
import { fetchServers } from '../../../actions/server_actions';
import { openModal } from '../../../actions/modal_actions';
import { updateLoading } from '../../../actions/loading_actions';

const mapStateToProps = state => ({
  servers: Object.values(state.entities.servers),
  currentUser: state.entities.users[state.session.id],
  memberships: Object.values(state.entities.serverMemberships),
  channels: Object.values(state.entities.channels),
  loading: state.ui.loading
});

const mapDispatchToProps = dispatch => ({
  fetchServers: () => dispatch(fetchServers()),
  openModal: modal => dispatch(openModal(modal)),
  updateLoading: loading => dispatch(updateLoading(loading))
});

export default connect(mapStateToProps, mapDispatchToProps)(ServerIndex);
