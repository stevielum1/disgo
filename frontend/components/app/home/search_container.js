import { connect } from 'react-redux';
import Search from './search';

const mapStateToProps = state => ({
  loading: state.ui.loading,
  users: Object.values(state.entities.users),
  currentUser: state.entities.users[state.session.id]
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
