import { connect } from 'react-redux';
import MessageIndex from './message_index';
import { getMessages } from '../../../reducers/selectors';
import { receiveMessage } from '../../../actions/message_actions';
import { fetchServers } from '../../../actions/server_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    messages: getMessages(state, parseInt(ownProps.match.params.channelId)),
    channel: state.entities.channels[ownProps.match.params.channelId],
    users: state.entities.users,
    currentUserId: state.session.id
  };
};

const mapDispatchToProps = dispatch => ({
  receiveMessage: message => dispatch(receiveMessage(message)),
  fetchServers: () => dispatch(fetchServers())
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageIndex);
