import React, {Component} from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import axios from 'axios'
import NavBar from '../NavBar'
import jwt_decode from 'jwt-decode'

export default class AddDonation extends Component{

   constructor(props) {
        super(props)

        this.state = {
            weight: '',
            country: '',
            state: '',
            district: '',
            city: '',
            street: '',
            location: '',
            bloodGroup:'',
            config: {
                headers: { 'Authorization': localStorage.getItem('token') }
            }
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
            
        }, ( ) => console.log(this.state))
    }
    componentDidMount= ()=> {
        const token = localStorage.getItem('token')
        const decoded=jwt_decode(token)
         axios.get('http://localhost:3000/api/profile/' + decoded.id ,  this.state.config)
         .then((res)=> {
             console.log(res.data)
             this.setState({
                 bloodGroup: res.data.bloodGroup,        
             })
    
         })
    }    
    handleSubmit = (event) => {
        if(window.confirm('Are you ready to donate blood?'))
        event.preventDefault();
        axios.post('http://localhost:3000/api/DonateBlood', this.state,this.state.config)
            .then((res) => {
                console.log(res)
                this.props.history.push('/userdashboard/viewdonations')
            }).catch(err => console.log(err.response.data))
            
    }
    render(){
        
        return(
            <div>
            <NavBar history = {this.props.history}/>
            
            <div className='container'>
            <FormGroup>
            <Label for='bloodGroup'>Blood Group</Label>
            <Input type='select' name='bloodGroup' id='bloodGroup' 
            value ={this.state.bloodGroup}
            onChange={this.handleChange} >
            <option value='' >Select Blood Group </option>
            <option value='A+'>A+</option>
            <option value='B+'>B+</option>
            <option value='AB+'>AB+</option>
            <option value='O+'>O+</option>
            <option value='A-'>A-</option>
            <option value='B-'>B-</option>
            <option value='AB-'>AB-</option>
            <option value='O-'>O-</option>
        
            </Input>
            </FormGroup>
                
            <Form>
                <FormGroup>
                    <Label for="weight">Weight (in kg)</Label>
                    <Input type='number' name='weight' id='weight'
                    value ={this.state.weight}
                    onChange={this.handleChange}
                         />
                </FormGroup>
              
                <FormGroup>
                    <Label for='country'>Country</Label>
                    <Input type='text' name='country' id='country'
                    value ={this.state.country}
                    onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='state'>State</Label>
                    <Input type='text' name='state' id='state'
                    value ={this.state.state}
                    onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='district'>District</Label>
                    <Input type='text' name='district' id='district'
                    value ={this.state.district}
                    onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='city'>City</Label>
                    <Input type='text' name='city' id='city'
                 value ={this.state.city}
                 onChange={this.handleChange}
                    />
                    </FormGroup>
                    <FormGroup>
                    <Label for='street'>Street</Label>
                    <Input type='text' name='street' id='street'
                    value ={this.state.street}
                    onChange={this.handleChange}
                    />
                
                </FormGroup>
                <FormGroup>
                    <Label for='location'>Location</Label>
                    <Input type='text' name='location' id='location'
                        value ={this.state.location}
                        onChange={this.handleChange} 
                        />
                    </FormGroup>
 
                <Button block color="primary" onClick={this.handleSubmit}>Submit</Button>
                <Button block color='danger' onClick={() => this.props.history.push('/userdash/nav')}>Cancel</Button>
            </Form>
        </div>
        </div>
        )
    }
    
}


