import { connect } from 'react-redux';
import ServerInfoForm from './server_info_form';
import { updateServer, removeServerErrors } from '../../../actions/server_actions';
import { closeModal } from '../../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => ({
  server: state.entities.servers[ownProps.match.params.serverId],
  errors: state.errors.serverErrors
});

const mapDispatchToProps = dispatch => ({
  updateServer: formData => dispatch(updateServer(formData)),
  removeServerErrors: () => dispatch(removeServerErrors()),
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(ServerInfoForm);
