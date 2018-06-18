import React, { Component } from 'react';
import { connect } from "react-redux";
import { closeModal, updateBook } from '../actions';
import $ from 'jquery';
import moment from 'moment'; 

class EditBookModal extends Component {
    constructor(props) {
        super(props); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);  
        this.state = { 
            book: { 
                title: this.props.book[this.props.bookId].volumeInfo.title, 
                author: this.props.book[this.props.bookId].volumeInfo.authors[0],
                publishedDate: moment(this.props.book[this.props.bookId].volumeInfo.publishedDate).format("DD/MM/YYYY") 
            },
            errors: {}       
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({errors: nextProps.errors})
    }

    componentDidMount(){
        $('#booksModal').modal({backdrop: 'static'});
        $('#booksModal').modal('show'); 
    }

      componentWillUnmount(){
       $('#booksModal').modal('hide'); 
       this.closeEditBookModal() 
    }

    handleChange(e) {
        var inputValue = e.target.value;
        var key = e.target.name;

        if(this.state.errors[e.target.name]) {
            var errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState(prevState => ({
                book: {
                  ...prevState.book,
                  [key]: inputValue
                },
                errors
            }))
        } else {
           this.setState(prevState => ({
                book: {
                  ...prevState.book,
                  [key]: inputValue
                }
            }))
        }   
    }


    closeEditBookModal() {
        this.props.dispatch(closeModal());
    }

    
    handleSubmit(e) {
        e.preventDefault();
        
        if ( this.props.checkValidation(this.state.book) ) {
            this.props.dispatch(updateBook(this.state.book, this.props.bookId));
        } 
     }


    render() {
        return (
         <div className="modal fade" id="booksModal" tabIndex="-1" role="dialog" aria-labelledby="booksModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title" id="exampleModalLongTitle">Edit Book</h2>
                    </div>
                    <div className="modal-body">
                     <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="title">Title:</label>
                            <input className="form-control" type="text" id="title" name="title" value={this.state.book.title} onChange={(e) => this.handleChange(e)}/>
                            {this.state.errors.title && <div className="alert alert-danger" role="alert">
                                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span>{this.state.errors.title}</span>
                            </div>}
                        </div>
                        <div>
                            <label htmlFor="author">Author:</label>
                            <input  className="form-control" type="text" id="author" name="author" value={this.state.book.author} onChange={(e) => this.handleChange(e)}/>
                            {this.state.errors.author && <div className="alert alert-danger" role="alert">
                                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span>{this.state.errors.author}</span>
                            </div>}
                        </div>
                        <div>
                            <label htmlFor="publisheDate">Published Date</label>
                            <input  className="form-control" type="text" id="publishedDate" name="publishedDate" value={this.state.book.publishedDate} onChange={(e) => this.handleChange(e)}/>
                           {this.state.errors.publishedDate && <div className="alert alert-danger" role="alert">
                                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span>{this.state.errors.publishedDate}</span>
                            </div>}
                        </div>
                        <button className="btn btn-primary" data-dismiss="modal" aria-label="Cancel" onClick={() => this.closeEditBookModal()}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
                </div>
              </div>
          </div>        
        )
    }
}

export default connect((state, ownProps) => ({book: state.books}))(EditBookModal)