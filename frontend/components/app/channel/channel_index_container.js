import { connect } from 'react-redux';
import ChannelIndex from './channel_index';
import { getChannels } from '../../../reducers/selectors';
import { openModal } from '../../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => ({
  channels: getChannels(state, parseInt(ownProps.match.params.serverId)),
  currentUser: state.entities.users[state.session.id],
  server: state.entities.servers[ownProps.match.params.serverId],
  loading: state.ui.loading
});

const mapDispatchToProps = dispatch => ({
  openModal: modal => dispatch(openModal(modal))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelIndex);
