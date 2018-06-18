

export default function(state = null, action) {
    switch(action.type) {
        case 'SET_BOOKS_LIST':
            return action.booksList.data.items; 
        
        case 'SET_UPDATED_BOOK':
            let updatedBook = state[action.bookId];
            updatedBook.volumeInfo.title = action.book.title;
            updatedBook.volumeInfo.publishedDate = action.book.publishedDate;
            updatedBook.volumeInfo.authors[0] = action.book.author;
            let updatedBooksArray = [
            ...state.slice(0, action.bookId),
               updatedBook,
            ...state.slice(action.bookId + 1)
            ];
            return updatedBooksArray 

        case 'SET_NEW_BOOK':
            let newBook = {
                volumeInfo: {
                    title: null,
                    authors: [],
                    publishedDate: null
                },  
            };
            
            newBook.volumeInfo.title = action.newBook.title;
            newBook.volumeInfo.authors[0] = action.newBook.author;
            newBook.volumeInfo.publishedDate = action.newBook.publishedDate;

            let newBooksArray = [
                ...state, newBook
            ];
            return newBooksArray 

            case 'DELETE_BOOK':
                let deletedBook = state[action.bookId];
                let newBooksArr = [
            ...state.slice(0, action.bookId),
            ...state.slice(action.bookId + 1)
            ];
            return newBooksArr 

    }

    return state;
}