import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signup, clearSessionErrors } from '../../actions/session_actions';

const mapStateToProps = state => ({
  formType: "Signup",
  errors: state.errors.sessionErrors
});

const mapDispatchToProps = dispatch => ({
  processForm: user => dispatch(signup(user)),
  clearSessionErrors: () => dispatch(clearSessionErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
