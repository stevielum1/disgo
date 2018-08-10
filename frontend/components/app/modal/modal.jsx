import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../../actions/modal_actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import CreateServerFormContainer from '../server/create_server_form_container';
import UserInfoFormContainer from '../user_info/user_info_form_container';

const Modal = ({ modal, closeModal }) => {
  if (!modal) return null;
  let component;
  switch (modal) {
    case 'createServer':
      component = <CreateServerFormContainer />;
      break;
    case 'userInfo':
      component = <UserInfoFormContainer />;
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
