import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../../actions/modal_actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Route } from 'react-router-dom';

import Server from '../server/new_server';
import CreateChannelContainer from '../channel/create_channel_container';
import EditChannelContainer from '../channel/edit_channel_container';
import UserInfoFormContainer from '../user_info/user_info_form_container';
import ServerInfoFormContainer from '../server/server_info_form_container';

const Modal = ({ modal, closeModal }) => {
  if (!modal) return null;
  let component;
  switch (modal) {
    case 'newServer':
      component = <NewServer />;
      break;
    case 'createChannel':
      component = <Route path="/channels/:serverId/" component={CreateChannelContainer} />;
      break;
    case 'editChannel':
      component = <Route path="/channels/:serverId/:channelId" component={EditChannelContainer} />;
      break;
    case 'userInfo':
      component = <UserInfoFormContainer />;
      break;
    case 'serverInfo':
      component = <Route path="/channels/:serverId" component={ServerInfoFormContainer} />;
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <ReactCSSTransitionGroup
        transitionName="modal"
        transitionAppear={true}
        transitionAppearTimeout={250}
        transitionEnter={false}
        transitionLeave={false} >
        <div className="modal-child" onClick={e => e.stopPropagation()}>
          {component}
        </div>
      </ReactCSSTransitionGroup>
    </div>
  )
}

const mapStateToProps = state => ({
  modal: state.ui.modal
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps,mapDispatchToProps)(Modal);
