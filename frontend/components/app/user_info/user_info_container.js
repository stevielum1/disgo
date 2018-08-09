import { connect } from 'react-redux';
import UserInfo from './user_info';
import { logout } from '../../../actions/session_actions';
import { closeModal } from '../../../actions/modal_actions';
import { updateUser, removeUserErrors } from '../../../actions/user_actions';

const mapStateToProps = state => ({
  currentUser: state.entities.users[state.session.id],
  errors: state.errors.userErrors
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  closeModal: () => dispatch(closeModal()),
  updateUser: formData => dispatch(updateUser(formData)),
  removeUserErrors: () => dispatch(removeUserErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
