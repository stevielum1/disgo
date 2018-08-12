import { connect } from 'react-redux';
import ChannelForm from './channel_form';
import { createChannel } from '../../../actions/channel_actions';

const mapStateToProps = (state, ownProps) => ({
  formType: "create",
  channel: {
    name: "",
    server_id: ownProps.match.params.serverId
  }
});

const mapDispatchToProps = dispatch => ({
  processForm: channel => dispatch(createChannel(channel))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelForm);
