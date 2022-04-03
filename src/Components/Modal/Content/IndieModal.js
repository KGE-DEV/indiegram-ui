import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import '../assets/Modal.scss';
import indieAnnouncement from './assets/img/indie_announcement.png';

const IndieModal = (props) => {
  const { handleClose } = props;

  const saveViewedIndieModal = () => {
    localStorage.indie = true;
  }
  return (
    <>
      <FontAwesomeIcon
        className='modal__close'
        icon={faTimesCircle} onClick={() => { handleClose(); saveViewedIndieModal(); }}
      />
      <div className="indie">
        <h2 className="indie__title">Have You Met My Sister?</h2>
        <img src={indieAnnouncement} alt="" className="indie__img" />
        <p className="indie__message">I think she is pretty great and I know you are going to think so too!</p>
        <a className="indie__link" href="https://indie.elsiegram.com" onClick={saveViewedIndieModal}>Come see her here!</a>
      </div>
    </>
  )
}

export default IndieModal;
