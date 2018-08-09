import React from 'react';
import { connect } from 'react-redux';
import CreateServerFormContainer from './create_server_form_container';
import { closeModal } from '../../../actions/modal_actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const ServerModal = ({ modal, closeModal }) => {
  if (!modal) return null;
  return (
    <div className="modal-background" onClick={closeModal}>
      <ReactCSSTransitionGroup
        transitionName="create-server-form"
        transitionAppear={true}
        transitionAppearTimeout={250}
        transitionEnter={false}
        transitionLeave={false} >
        <div className="modal-child" onClick={e => e.stopPropagation()}>
          <CreateServerFormContainer />
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

export default connect(mapStateToProps,mapDispatchToProps)(ServerModal);
