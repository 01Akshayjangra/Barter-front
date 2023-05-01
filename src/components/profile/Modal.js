import React from 'react'
import { useState } from 'react';
import "./css/Modal.css"
import MyModal from './MyModal';

const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <button className='modal-container-button' onClick={() => setShowModal(true)} >Open modal</button>
      <h1>h<br/><br/><br/><br/><br/><br/><br/><br/>h<br/><br/><br/><br/><br/><br/><br/><br/>h<br/><br/><br/><br/><br/><br/>vh<br/><br/><br/>asdhgs<br/><br/></h1>
      {showModal && <MyModal closeModal={closeModal} />}
    </>
  )
}

export default Modal
