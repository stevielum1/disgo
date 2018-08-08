import React from 'react';
import { connect } from 'react-redux';
import CreateServerFormContainer from './create_server_form_container';

const ServerModal = ({ modal, closeModal }) => {
  if (!modal) return null;
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        <CreateServerFormContainer />
      </div>
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
