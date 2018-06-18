import React, { Component } from 'react';
import ModalRoot from '../containers/ModalRoot'
import { connect } from "react-redux";
import moment from 'moment'; 
import _ from 'lodash';
import { getBooksList, openEditBookModal, openAddBookModal, openDeleteBookModal} from '../actions/index';
import { bindActionCreators } from 'redux';

class BookList extends Component {
    constructor(props) {
        super(props);
        
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this); 
        this.checkValidation = this.checkValidation.bind(this); 
        this.state = { bookItem: 0,  books: null, modalType: '',  errors: {}};
   }
    componentWillMount() {
        this.props.getBooksList('potter');
    }

    showEditModal(index) {
       this.setState({modalType: "EDIT_BOOK_MODAL"})
       this.props.openEditBookModal(index);
    }

     showAddModal() {
       this.setState({modalType: "ADD_BOOK_MODAL"})
       this.props.openAddBookModal();
    }

    showDeleteModal(index) {
        this.setState({modalType: "DELETE_BOOK_MODAL"});
        this.props.openDeleteBookModal(index);
    }

    checkValidation(book) {
         let errors = {};
         let isValid = true;
         const pattern = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
         let dateFormat = pattern.test(book.publishedDate);

         if (book.title === '') {
            errors.title = "Can't Be empty";
            isValid = false
         }

         if(book.title.length < 2 && book.title !== '') {
             errors.title = "Title must be more then 1 char";
             isValid = false
         }

         if (book.author === '') {
              errors.author = "Can't Be empty";
              isValid = false
         }

         if(book.author.length < 2 && book.author !== '') {
             errors.author = "Author must be more then 1 char";
             isValid = false
         }

         if (book.publishedDate === '') {
              errors.publishedDate = "Can't Be empty";
              isValid = false
         }

         if(!dateFormat && book.publishedDate !== ''){
            errors.publishedDate = "Date Must be DD/MM/YYYY format";
            isValid = false
         }
         

         this.setState({errors});
         return isValid;
    }

    

    onInputChangeHandler(term) {
        if(!term) return false;
        this.props.getBooksList(term);
    }
    
    renderList(){
        return this.props.books.map((book, index) => {
            return (
                <div key={book.id} className="col-sm-12 col-md-4">
                    <div className="card text-center">
                        <div className="card-header">
                            <i className="fa fa-close" data-toggle="modal" data-target="#booksModal" onClick={() => this.showDeleteModal(index)}></i>
                        </div>
                         <div className="card-body">
                            {book.volumeInfo && <h3 className="card-title">{book.volumeInfo.title}</h3>}
                            {book.volumeInfo.imageLinks ? <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title}/> : <img src="https://store.lexisnexis.com/__data/assets/image/0003/26571/dummy_cover.jpg" alt={book.volumeInfo.title} width="128" height="203" />}
                            <br/><br/>
                            <h6>Published Date:</h6>
                            {book.volumeInfo && <h5>{moment(book.volumeInfo.publishedDate).format("DD/MM/YYYY")}</h5>}
                         </div>
                        <button className="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#booksModal" onClick={() => this.showEditModal(index)}>Edit Book</button>
                    </div>
                </div>
            )
        })
    }
    render() {
        const search = _.debounce((term) => {this.onInputChangeHandler(term)}, 300)
        return (
            <div className="container">
                 <div className="row">
                    <div className="col-sm-12">
                         <input className="form-control" type="text" placeholder="Search a book"  onChange={(e) => this.onInputChangeHandler(search(e.target.value))} />
                    </div>
                  </div>
                  <div className="row">
                        {this.props.books ? this.renderList(): null}
                    </div> 
                {this.props.books && <div className="row">
                    <div className="col-sm-12">
                        <button className="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#booksModal" onClick={() => this.showAddModal()}>Add Book</button>                        
                    </div>
                </div> }
                   
               
                {this.props.modal ? <ModalRoot modalType={this.state.modalType} checkValidation={this.checkValidation} errors={this.state.errors} /> : null}
            </div>
           
        )
    }
}

function mapStateToProps(state) {
    return {
        books: state.books,
        modal: state.modal
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ getBooksList, openEditBookModal, openAddBookModal, openDeleteBookModal}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);