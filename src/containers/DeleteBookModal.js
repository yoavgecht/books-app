import React, { Component } from 'react';
import { connect } from "react-redux";
import { closeModal, deleteBook } from '../actions';
import $ from 'jquery';

class DeleteBookModal extends Component {
    constructor(props) {
        super(props);  
         this.state = { 
            book: { 
                title: this.props.book[this.props.bookId].volumeInfo.title,
                id: this.props.bookId
            }  
        };
    };

     componentDidMount(){
        $('#booksModal').modal({backdrop: 'static'});
        $('#booksModal').modal('show'); 
    }

      componentWillUnmount(){
        $('#booksModal').modal('hide'); 
        this.props.dispatch(closeModal())
    }

    render() {
        return (
            <div className="modal fade" id="booksModal" tabIndex="-1" role="dialog" aria-labelledby="booksModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">Delete Book</h2>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete {this.state.book.title}</p>
                        <button className="btn btn-primary" onClick={() => this.props.dispatch(closeModal())}>Cancel</button>
                        <button className="btn btn-danger" onClick={() => this.props.dispatch(deleteBook(this.state.book.id))}>Delete</button>
                    </div>
                </div>
            </div>
        </div>   
                
                

        )
    }
}

export default connect((state, ownProps) => ({book: state.books}))(DeleteBookModal)