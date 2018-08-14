import { connect } from 'react-redux';
import ServerInfo from './server_info';
import { openModal } from '../../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    server: state.entities.servers[ownProps.match.params.serverId],
    loading: state.ui.loading
  };
};

const mapDispatchToProps = dispatch => ({
  openModal: modal => dispatch(openModal(modal))
});

export default connect(mapStateToProps, mapDispatchToProps)(ServerInfo);
