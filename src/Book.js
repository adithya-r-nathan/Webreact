import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddBookModal} from './AddBookModal';
import {EditBookModal} from './EditBookModal';

export class Book extends Component{

    constructor(props){
        super(props);
        this.state={books:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'book')
        .then(response=>response.json())
        .then(data=>{
            this.setState({books:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deletebook(bookid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'book/'+bookid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {books, bookid,bookname,author,availability}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>BookId</th>
                        <th>BookName</th>
                        <th>Author</th>
                        <th>Availability</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book=>
                            <tr key={book.BookId}>
                                <td>{book.BookId}</td>
                                <td>{book.BookName}</td>
                                <td>{book.Author}</td>
                                <td>{book.Availability}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        bookid:book.BookId,bookname:book.BookName,auth:book.Author,
        ava:book.Availability})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deletebook(book.BookId)}>
            Delete
        </Button>

        <EditBookModal show={this.state.editModalShow}
        onHide={editModalClose}
        bookid={bookid}
        bookname={bookname}
        author={author}
        availability={availability}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Book</Button>

                    <AddBookModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}