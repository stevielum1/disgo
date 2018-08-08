import { connect } from 'react-redux';
import CreateServerForm from './create_server_form';
import { createServer } from '../../../actions/server_actions';
import { openModal, closeModal } from '../../../actions/modal_actions';

const mapDispatchToProps = dispatch => ({
  createServer: server => dispatch(createServer(server))
});

export default connect(null, mapDispatchToProps)(CreateServerForm);
