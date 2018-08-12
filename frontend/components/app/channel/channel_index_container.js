import { connect } from 'react-redux';
import ChannelIndex from './channel_index';
import { getChannels } from '../../../reducers/selectors';

const mapStateToProps = (state, ownProps) => ({
  channels: getChannels(state, parseInt(ownProps.match.params.serverId))
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelIndex);
