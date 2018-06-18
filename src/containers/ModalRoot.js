import React, { Component } from 'react';
import { connect } from "react-redux";

import EditBookModal from './EditBookModal';
import AddBookModal from './AddBookModal';
import DeleteBookModal from './DeleteBookModal';

const MODAL_COMPONENTS = {
  'EDIT_BOOK_MODAL': EditBookModal,
  'ADD_BOOK_MODAL' : AddBookModal,
  'DELETE_BOOK_MODAL': DeleteBookModal
  /* other modals */
}

const ModalRoot = ({ modalType, modalProps, checkValidation, errors }) => {
  if (!modalType) {
    return <div/> // after React v15 you can return null here
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return <SpecificModal {...modalProps} checkValidation={checkValidation} errors={errors} />
}

export default connect(state => state.modal)(ModalRoot)