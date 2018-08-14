import { connect } from 'react-redux';
import Home from './home';

const mapStateToProps = state => ({
  loading: state.ui.loading
});

export default connect(mapStateToProps, null)(Home);
