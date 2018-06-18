import axios from 'axios';

export function getBooksList(searchTerm) {
  return dispatch => {
    return dispatch({
      type: 'GET_BOOKS_LIST',
      payload: axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
        .then( (response) =>  {
            dispatch(setBooksList(response))      
         }).catch(error => {
           console.log(error);
        })
    })
  }
}

export function openEditBookModal(id) {
  return dispatch => {
    return dispatch({
      type: 'SHOW_EDIT_MODAL',
      modalType: 'EDIT_BOOK_MODAL',
      modalProps: {
        bookId: id
      }
    })
  }
}

export function openAddBookModal() {
  return dispatch => {
    return dispatch({
      type: 'SHOW_ADD_MODAL',
      modalType: 'ADD_BOOK_MODAL'
    })
  }
}

export function closeModal() {
  return dispatch => {
    return dispatch({
      type: 'CLOSE_MODAL',
      modalType: 'EDIT_BOOK',
    })
  }
}

export function updateBook(book, bookId) {
  return dispatch => {
    return dispatch({
      type: 'UPDATE_BOOK_MODAL',
      modalType: 'EDIT_BOOK',
      modalProps: {
        book: book,
        bookId: bookId
      },
      payload: dispatch(setUpdatedBook(book, bookId)) 
    })
  }
}

export function saveNewBook(book, bookId) {
  return dispatch => {
    return dispatch({
      type: 'SAVE_BOOK_MODAL',
      modalType: 'ADD_BOOK',
      modalProps: {
        book: book,
        bookId: bookId
      },
      payload: dispatch(setNewBook(book, bookId)) 
    })
  }
}

export function setUpdatedBook(book, bookId) {
  return dispatch => {
    return dispatch({
      type: 'SET_UPDATED_BOOK',
      book,
      bookId
      })
  }
}

export function setNewBook(newBook) {
  return dispatch => {
    return dispatch({
      type: 'SET_NEW_BOOK',
      newBook
      })
  }
}


export function setBooksList(booksList) {
  return dispatch => {
    return dispatch({
      type: 'SET_BOOKS_LIST',
      booksList,
      })
  }
}

export function openDeleteBookModal(id) {
  return dispatch => {
    return dispatch({
      type: 'SHOW_DELETE_BOOK_MODAL',
      modalType: 'DELETE_BOOK_MODAL',
      modalProps: {
          bookId: id
        }
    })
  }
}

export function deleteBook(bookId) {
  return dispatch => {
    return dispatch({
       type: 'DELETE_BOOK_MODAL',
       modalType: 'DELETE_BOOK',
       modalProps: {
        bookId: bookId
      },
      payload: dispatch(setNewBooksArray(bookId)) 
    })
  }
}

export function setNewBooksArray(bookId) {
    return dispatch => {
    return dispatch({
      type: 'DELETE_BOOK',
      bookId
      })
   }
}





