import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login, clearErrors } from '../../actions/session_actions';

const mapStateToProps = state => ({
  formType: "Login",
  errors: state.errors.sessionErrors
});

const mapDispatchToProps = dispatch => ({
  processForm: user => dispatch(login(user)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
