import React, {Component} from 'react'
import { Form, FormGroup, Label, Input, Button} from 'reactstrap'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import NavBarAdmin from '../NavBarAdmin'

export default function UpdateBloodBank(props) {
	let {id} = useParams();
	return (
		<div>
			<UpdateForm id={id}/>
		</div>
	)

}

 class UpdateForm extends Component{
    constructor(props) {
        super(props)

        this.state = {
			id: this.props.id,
            BloodBankName: '',
            availableBloodGroup: '',
            config: {
                headers: { 'Authorization': localStorage.getItem('token') }
            }
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) => {
        if(window.confirm('Are you sure to update the current status?'))
        event.preventDefault();
		axios.put('http://localhost:3000/api/BloodBank/' + this.props.id, this.state, this.state.config)
		.then((res) => {
			console.log(res)
		}).catch(err => console.log(err.response.data));
            
    }

	
	componentDidMount = () => {
		axios.get('http://localhost:3000/api/BloodBank/' + this.state.id, this.state.config)
		.then((res) => {
			console.log(res);
			this.setState({
				BloodBankName: res.data.BloodBankName,
				availableBloodGroup: res.data.availableBloodGroup,
				
				
			})
		}).catch(err => console.log(err.response.data));
	}

    render(){
        return(
            <div>
                <NavBarAdmin history = {this.props.history}/>
            
            <div className='container'>
            <Form>
                <FormGroup>
                    <Label for="BloodBankName">Blood Bank Name</Label>
                    <Input type='text' name='BloodBankName' id='BloodBankName'
                    value ={this.state.BloodBankName}
                    onChange={this.handleChange}
                         />
                </FormGroup>
                <FormGroup>
                    <Label for='availableBloodGroup'>Available Blood Group</Label>
                    <Input type='text' name='availableBloodGroup' id='availableBloodGroup'
                    value ={this.state.availableBloodGroup}
                    onChange={this.handleChange}
                    />
                </FormGroup>
               
                <Button block color="primary" onClick={this.handleSubmit}>Submit</Button>
                <Button block color='danger' onClick={() => this.props.history.push('/admindash/adminviewdonations')}>Cancel</Button>
            </Form>
        </div>
        </div>
        )
    }
    
}


