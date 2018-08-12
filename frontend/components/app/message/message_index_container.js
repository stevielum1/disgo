import { connect } from 'react-redux';
import MessageIndex from './message_index';
import { getMessages } from '../../../reducers/selectors';
import { createMessage } from '../../../actions/message_actions';

const mapStateToProps = (state, ownProps) => ({
  messages: getMessages(state, parseInt(ownProps.match.params.channelId)),
  channel: state.entities.channels[ownProps.match.params.channelId],
  users: state.entities.users
});

const mapDispatchToProps = dispatch => ({
  createMessage: message => dispatch(createMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageIndex);
