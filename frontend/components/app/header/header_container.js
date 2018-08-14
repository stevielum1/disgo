import { connect } from 'react-redux';
import Header from './header';

const mapStateToProps = (state, ownProps) => ({
  channel: state.entities.channels[ownProps.match.params.channelId],
  loading: state.ui.loading
});

export default connect(mapStateToProps, null)(Header);
