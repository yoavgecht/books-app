const initialState = {
  modalType: null,
  modalProps: {}
}

export default function(state = null, action) {
    switch(action.type) {
       case 'SHOW_EDIT_MODAL':
            return action

        case 'SHOW_ADD_MODAL':
            return action
         
       case 'CLOSE_MODAL':
            return initialState

       case 'UPDATE_BOOK_MODAL':
            return initialState

       case 'SAVE_BOOK_MODAL':
            return initialState

       case 'SHOW_DELETE_BOOK_MODAL':
            return action;

       case 'DELETE_BOOK_MODAL':
            return initialState
    }
    return state;
}