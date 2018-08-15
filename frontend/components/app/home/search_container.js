import { connect } from 'react-redux';
import Search from './search';
import { getUsersWithoutCurrentUser } from '../../../reducers/selectors';

const mapStateToProps = state => ({
  loading: state.ui.loading,
  users: getUsersWithoutCurrentUser(state, state.session.id),
  currentUser: state.entities.users[state.session.id]
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
