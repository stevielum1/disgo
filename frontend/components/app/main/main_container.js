import { connect } from 'react-redux';
import Main from './main';

const mapStateToProps = state => ({
  loading: state.ui.loading
});

export default connect(mapStateToProps, null)(Main);
