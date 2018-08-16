import { connect } from 'react-redux';
import MembershipIndex from './membership_index';
import { getMembers } from '../../../reducers/selectors';
import { createServer } from '../../../actions/server_actions';
import { createMembership } from '../../../actions/server_membership_actions';
import { createChannel } from '../../../actions/channel_actions';
import { userLoggedIn, userLoggedOut } from '../../../actions/online_actions';

const mapStateToProps = (state, ownProps) => ({
  members: getMembers(state, parseInt(ownProps.match.params.serverId)),
  server: state.entities.servers[ownProps.match.params.serverId],
  loading: state.ui.loading,
  currentUser: state.entities.users[state.session.id],
  memberships: Object.values(state.entities.serverMemberships),
  servers: state.entities.servers,
  channels: Object.values(state.entities.channels),
  onlineUsers: state.ui.online
});

const mapDispatchToProps = dispatch => ({
  createServer: server => dispatch(createServer(server)),
  createMembership: membership => dispatch(createMembership(membership)),
  createChannel: channel => dispatch(createChannel(channel)),
  userLoggedIn: id => dispatch(userLoggedIn(id)),
  userLoggedOut: id => dispatch(userLoggedOut(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MembershipIndex);
