import { connect } from 'react-redux';
import Search from './search';

const mapStateToProps = state => ({
  loading: state.ui.loading,
  users: state.entities.users
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Search);