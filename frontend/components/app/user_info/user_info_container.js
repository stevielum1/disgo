import { connect } from 'react-redux';
import UserInfo from './user_info';
import { logout } from '../../../actions/session_actions';

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
