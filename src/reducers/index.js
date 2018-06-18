//wire the reducer to the app
import { combineReducers } from 'redux';
import BooksReducer from './reducer_books';
import ModalReducer from './reducer_modal';

//books - state
const rootReducer = combineReducers({
    books: BooksReducer,
    modal: ModalReducer
});

export default rootReducer;