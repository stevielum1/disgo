import { connect } from 'react-redux';
import Search from './search';
import { getUsersWithoutCurrentUser } from '../../../reducers/selectors';
import { createServer } from '../../../actions/server_actions';
import { createMembership } from '../../../actions/server_membership_actions';
import { createChannel } from '../../../actions/channel_actions';

const mapStateToProps = state => ({
  loading: state.ui.loading,
  users: getUsersWithoutCurrentUser(state, state.session.id),
  currentUser: state.entities.users[state.session.id],
  memberships: Object.values(state.entities.serverMemberships),
  servers: state.entities.servers,
  channels: Object.values(state.entities.channels)
});

const mapDispatchToProps = dispatch => ({
  createServer: server => dispatch(createServer(server)),
  createMembership: membership => dispatch(createMembership(membership)),
  createChannel: channel => dispatch(createChannel(channel))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
