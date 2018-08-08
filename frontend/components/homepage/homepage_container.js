import { connect } from 'react-redux';
import Homepage from './homepage';

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.id)
});

export default connect(mapStateToProps, null)(Homepage);
