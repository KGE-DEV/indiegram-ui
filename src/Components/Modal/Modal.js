import React, { Component } from 'react';

import './assets/Modal.scss';

class Modal extends Component {

  render() {
    const { children } = this.props;

  return (
    <div className="modal-cont">
      <div className="modal">
        {children}
      </div>
    </div>
    )
  }
}

export default Modal;
