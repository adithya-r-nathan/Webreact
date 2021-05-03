import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddGenModal} from './AddGenModal';
import {EditGenModal} from './EditGenModal';

export class Genre extends Component{

    constructor(props){
        super(props);
        this.state={gens:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'genre')
        .then(response=>response.json())
        .then(data=>{
            this.setState({gens:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteGen(genid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'genre/'+genid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {gens, genid,genname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>GenreId</th>
                        <th>GenreName</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gens.map(gen=>
                            <tr key={gen.GenreId}>
                                <td>{gen.GenreId}</td>
                                <td>{gen.GenreName}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        genid:gen.GenreId,genname:gen.GenreName})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteGen(gen.GenreId)}>
            Delete
        </Button>

        <EditGenModal show={this.state.editModalShow}
        onHide={editModalClose}
        genid={genid}
        genname={genname}/>
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Genre</Button>

                    <AddGenModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}