import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,} from 'react-bootstrap';

export class AddBookModal extends Component{
    constructor(props){
        super(props);
        this.state={gens:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        
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
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                BookId:null,
                BookName:event.target.BookName.value,
                Author:event.target.Author.value,
                Availability:event.target.Availability.value,
                

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
            Add Book
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="BookName">
                        <Form.Label>BookName</Form.Label>
                        <Form.Control type="text" name="BookName" required 
                        placeholder="BookName"/>
                    </Form.Group>

                    <Form.Group controlId="Author">
                        <Form.Label>Author</Form.Label>
                        <Form.Control as="select">
                        {this.state.gens.map(gen=>
                            <option key={gen.GenreId}>{gen.GenreName}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="Availability">
                        <Form.Label>Availability</Form.Label>
                        <Form.Control 
                        type="char"
                        name="Availability"
                        required
                        placeholder="Availability"
                        />
                       
                        
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Add Book
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