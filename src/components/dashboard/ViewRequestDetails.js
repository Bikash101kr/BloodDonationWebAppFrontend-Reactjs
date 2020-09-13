import React, {Component} from 'react'
import { Form, FormGroup, Label, Input,} from 'reactstrap'
import axios from 'axios'
import { useParams } from 'react-router-dom'


export default function ViewRequestDetails(props) {
	let {id} = useParams();
	return (
		<div>
			<h1>{id}</h1>
			<UpdateForm id={id}/>
		</div>
	)

}

 class UpdateForm extends Component{
    constructor(props) {
        super(props)

        this.state = {
			id: this.props.id,
            patientName: '',
            patientAge: '',
            bloodGroup:'',
            country: '',
            state: '',
            district: '',
            city: '',
            street: '',
            hospitalName:'',
            location: '',
            needUnit: '',
            requirement:'',
            requirementReason:'',
			requireBefore:'',
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
	componentDidMount = () => {
		axios.get('http://localhost:3000/api/RequestBlood/' +  this.state.id, this.state.config)
		.then((res) => {
			console.log(res);
			this.setState({
				patientName: res.data.patientName,
				patientAge: res.data.patientAge,
				bloodGroup: res.data.bloodGroup,
				country: res.data.country,
				state: res.data.state,
				district: res.data.district,
				city: res.data.city,
				street: res.data.street,
				hospitalName:res.data.hospitalName,
				location: res.data.location,
				needUnit: res.data.needUnit,
				requirement:res.data.requirement,
				requirementReason:res.data.requirementReason,
				requireBefore:res.data.requireBefore,
				
			})
		}).catch(err => console.log(err.response.data));
	}

    render(){
        return(
            
            <div className='container'>
                <h1>Donation List</h1>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
            <th scope="row">#</th>
              <th scope="row">Full Address</th>
              <th scope="row"> Weight</th>
              <th scope="row"> Prefer Location</th>
              <th scope="row"> Blood Status</th>
        
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
              <tr >
                <th scope="col"></th>
            <td>
            </td>
        <td>{this.state.patientAge}</td>
            <td></td>
                <td></td>
            
              </tr>
            
          </tbody>
        </table>
            <Form>
                <FormGroup>
                    <Label for="patientName">Patient Name</Label>
                    <Input type='text' name='patientName' id='patientName'
                     value ={this.state.patientName}
                     onChange={this.handleChange}
                     />
                </FormGroup>
                <FormGroup>
                    <Label for='patientAge'>Patient Age </Label>
                    <Input type='text' name='patientAge' id='patientAge'
                     value ={this.state.patientAge}
                     onChange={this.handleChange}
                        
                    />
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
                </FormGroup>
                    <FormGroup>
                    <Label for='hospitalName'>Hospital Name</Label>
                    <Input type='text' name='hospitalName' id='hospitalName'
                     value ={this.state.hospitalName}
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
            <FormGroup>
                    <Label for='needUnit'>Need Unit</Label>
                    <Input type='text' name='needUnit' id='needUnit'
                     value ={this.state.needUnit}
                     onChange={this.handleChange}
                    />
                </FormGroup>
                 
        </FormGroup>
                <FormGroup>
                <Label for='requirement'>Requirement Type</Label>
                <Input type='select' name='requirement' id='requirement'
                value ={this.state.requirement}
                onChange={this.handleChange}
                >
                    <option value=''>Select Requirement Type</option>
                    <option value='fresh'>fresh</option>
                    <option value='stored'>stored</option>
                    <option value='any of above'>any of above</option>
                </Input>
            </FormGroup>
                <FormGroup>
                    <Label for='requirementReason'>Requirement Reason</Label>
                    <Input type='text' name='requirementReason' id='requirementReason'
                     value ={this.state.requirementReason}
                     onChange={this.handleChange}
                     />
                    </FormGroup>
                    <FormGroup>
                    <Label for='requireBefore'>Require Before</Label>
                    <Input type='datetime-local' name='requireBefore' id='requireBefore'
                     value ={this.state.requireBefore}
                     onChange={this.handleChange}
                         />
                    </FormGroup>

            </Form>
        </div>
        )
    }
    
}

