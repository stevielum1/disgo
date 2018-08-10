import * as MembershipApiUtil from '../util/server_membership_api_util';

export const RECEIVE_MEMBERSHIP = "RECEIVE_MEMBERSHIP";
export const REMOVE_MEMBERSHIP = "REMOVE_MEMBERSHIP";

export const RECEIVE_MEMBERSHIP_ERRORS = "RECEIVE_MEMBERSHIP_ERRORS";
export const CLEAR_MEMBERSHIP_ERRORS = "CLEAR_MEMBERSHIP_ERRORS";

const receiveMembership = membership => ({
  type: RECEIVE_MEMBERSHIP,
  membership
});

export const removeMembership = id => ({
  type: REMOVE_MEMBERSHIP,
  membershipId: id
});

const receiveMembershipErrors = errors => ({
  type: RECEIVE_MEMBERSHIP_ERRORS,
  errors
});

const clearMembershipErrors = () => ({
  type: CLEAR_MEMBERSHIP_ERRORS
});

export const createMembership = serverId => dispatch => (
  MembershipApiUtil.createMembership(serverId)
    .then(
      membership => dispatch(receiveMembership(membership)),
      err => dispatch(receiveMembershipErrors(err.responseJSON))
  )
);

export const deleteMembership = id => dispatch => (
  MembershipApiUtil.deleteMembership(id)
    .then(
      () => dispatch(removeMembership(id)),
      err => dispatch(receiveMembershipErrors(err))
    )
);

export const removeMembershipErrors = () => dispatch => (
  dispatch(clearMembershipErrors())
);
