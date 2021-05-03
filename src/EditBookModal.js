import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class EditBookModal extends Component{
    constructor(props){
        super(props);
        this.state={gens:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'genre')
        .then(response=>response.json())
        .then(data=>{
            this.setState({gens:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'book',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                BookId:event.target.BookId.value,
                BookName:event.target.BookName.value,
                Author:event.target.Author.value,
                Availability:event.target.Avaibility.value,
                

            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }


        render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Edit Book
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="BookId">
                        <Form.Label>BookId</Form.Label>
                        <Form.Control type="text" name="BookId" required 
                        placeholder="BookId"
                        disabled
                        defaultValue={this.props.bookid}/>
                    </Form.Group>

                    <Form.Group controlId="BookName">
                        <Form.Label>BookName</Form.Label>
                        <Form.Control type="text" name="BookName" required 
                        defaultValue={this.props.bookname}
                        placeholder="BookName"/>
                    </Form.Group>

                    <Form.Group controlId="Author">
                        <Form.Label>Author</Form.Label>
                        <Form.Control as="select" defaultValue={this.props.auth}>
                        {this.state.gens.map(gen=>
                            <option key={gen.genreId}>{gen.GenreName}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="Availability">
                        <Form.Label>Availability</Form.Label>
                        <Form.Control 
                        type="char"
                        name="Availability"
                        required
                        placeholder="Availability"
                        defaultValue={this.props.ava}
                        />
                       
                        
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Book
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

            
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}

