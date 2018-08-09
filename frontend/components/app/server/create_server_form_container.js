import { connect } from 'react-redux';
import CreateServerForm from './create_server_form';
import { createServer, removeServerErrors } from '../../../actions/server_actions';
import { openModal, closeModal } from '../../../actions/modal_actions';

const mapStateToProps = state => ({
  errors: state.errors.serverErrors
});

const mapDispatchToProps = dispatch => ({
  createServer: server => dispatch(createServer(server)),
  removeServerErrors: () => dispatch(removeServerErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateServerForm);
