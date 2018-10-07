import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../../actions/modal_actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Route } from 'react-router-dom';

import NewServer from '../server/new_server';
import CreateTextChannelContainer from '../channel/create_text_channel_container';
import CreateVoiceChannelContainer from '../channel/create_voice_channel_container';
import EditTextChannelContainer from '../channel/edit_text_channel_container';
import EditVoiceChannelContainer from '../channel/edit_voice_channel_container';
import UserInfoFormContainer from '../user_info/user_info_form_container';
import ServerInfoFormContainer from '../server/server_info_form_container';

const Modal = ({ modal, closeModal }) => {
  if (!modal) return null;
  let component;
  switch (modal) {
    case 'newServer':
      component = <NewServer />;
      break;
    case 'createTextChannel':
      component = <Route path="/channels/:serverId/" component={CreateTextChannelContainer} />;
      break;
    case 'createVoiceChannel':
      component = <Route path="/channels/:serverId/" component={CreateVoiceChannelContainer} />;
      break;
    case 'editTextChannel':
      component = <Route path="/channels/:serverId/:channelId" component={EditTextChannelContainer} />;
      break;
    case 'editVoiceChannel':
      component = <Route path="/channels/:serverId/:channelId" component={EditVoiceChannelContainer} />;
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
