import { connect } from 'react-redux';
import MembershipIndex from './membership_index';
import { getMembers } from '../../../reducers/selectors';

const mapStateToProps = (state, ownProps) => ({
  members: getMembers(state, parseInt(ownProps.match.params.serverId))
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MembershipIndex);
