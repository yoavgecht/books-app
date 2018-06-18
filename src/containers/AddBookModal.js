import React, { Component } from 'react';
import { connect } from "react-redux";
import { closeModal, saveNewBook } from '../actions'
import moment from 'moment'; 
import $ from 'jquery';

class AddBookModal extends Component {
    constructor(props) {
        super(props); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { 
            newBook: {
                title: '', 
                author: '',
                publishedDate: ''
                },
                errors: {}     
        }
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
       this.props.dispatch(closeModal())
    }

      handleChange(e) {
        var inputValue = e.target.value;
        var key = e.target.name;

        if(this.state.errors[e.target.name]) {
            var errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState(prevState => ({
                newBook: {
                  ...prevState.newBook,
                  [key]: inputValue
                },
                errors
            }))
        } else {
           this.setState(prevState => ({
                newBook: {
                  ...prevState.newBook,
                  [key]: inputValue
                }
            }))
        }   
    }

     handleSubmit(e) {
        e.preventDefault();
        
        if ( this.props.checkValidation(this.state.newBook) ) {
            this.props.dispatch(saveNewBook(this.state.newBook))
        } 
     }

    render() {
        return (
          <div className="modal fade" id="booksModal" tabIndex="-1" role="dialog" aria-labelledby="booksModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">Add Book</h2>
                    </div>
                    <div className="modal-body">
                    <form onSubmit={this.handleSubmit}>
                 <div>
                    <label htmlFor="title">Title:</label>
                    <input  className="form-control" type="text" name="title" id="title" value={this.state.newBook.title} onChange={(e) => this.handleChange(e)}/>
                     {this.state.errors.title && <div className="alert alert-danger" role="alert">
                        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span>{this.state.errors.title}</span>
                    </div>}
                </div>
                 <div>
                    <label htmlFor="author">Author:</label>
                    <input className="form-control" type="text" name="author" id="author" value={this.state.newBook.author} onChange={(e) => this.handleChange(e)}/>
                     {this.state.errors.author && <div className="alert alert-danger" role="alert">
                        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span>{this.state.errors.author}</span>
                    </div>}
                </div>
                 <div>
                    <label htmlFor="publishedDate">Published Date:</label>
                    <input className="form-control" type="text" name="publishedDate" id="publishedDate" value={this.state.newBook.publishedDate} onChange={(e) => this.handleChange(e)}/>
                    {this.state.errors.publishedDate && <div className="alert alert-danger" role="alert">
                        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span>{this.state.errors.publishedDate}</span>
                    </div>}
                    
                </div>
                 <button type="submit" className="btn btn-primary">Save</button>
                 <button className="btn btn-primary" onClick={() => this.props.dispatch(closeModal())}>Cancel</button>
                 </form>
                 </div>
                 </div>
                 </div>
            </div>
        )
    }
}

export default connect((state, ownProps) => ({newBook: state.newBook}))(AddBookModal)