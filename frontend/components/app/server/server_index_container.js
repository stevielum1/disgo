import { connect } from 'react-redux';
import ServerIndex from './server_index';
import { fetchServers } from '../../../actions/server_actions';

const mapStateToProps = state => ({
  servers: Object.values(state.entities.servers)
});

const mapDispatchToProps = dispatch => ({
  fetchServers: () => dispatch(fetchServers())
});

export default connect(mapStateToProps, mapDispatchToProps)(ServerIndex);
