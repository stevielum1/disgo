import { connect } from 'react-redux';
import MessageIndex from './message_index';
import { getMessages } from '../../../reducers/selectors';
import { receiveMessage, updateMessage, deleteMessage } from '../../../actions/message_actions';
import { fetchServers } from '../../../actions/server_actions';
import { openModal } from '../../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => ({
  messages: getMessages(state, parseInt(ownProps.match.params.channelId)),
  channel: state.entities.channels[ownProps.match.params.channelId],
  users: state.entities.users,
  currentUserId: state.session.id,
  loading: state.ui.loading
});

const mapDispatchToProps = dispatch => ({
  receiveMessage: message => dispatch(receiveMessage(message)),
  fetchServers: () => dispatch(fetchServers()),
  openModal: modal => dispatch(openModal(modal)),
  updateMessage: message => dispatch(updateMessage(message)),
  deleteMessage: id => dispatch(deleteMessage(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageIndex);
