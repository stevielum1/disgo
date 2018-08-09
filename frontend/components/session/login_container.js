import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login, clearSessionErrors } from '../../actions/session_actions';

const mapStateToProps = state => ({
  formType: "Login",
  errors: state.errors.sessionErrors
});

const mapDispatchToProps = dispatch => ({
  processForm: user => dispatch(login(user)),
  clearSessionErrors: () => dispatch(clearSessionErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
