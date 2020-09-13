import React, {Component} from 'react'
import { Button } from 'reactstrap'
import NavBar from '../NavBar'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import bloodbank from '../css/images/bloodbank.png'
import users from '../css/images/users.png'
import bloodgroup from '../css/images/bloodgroups.jpg'


export default class Dashboard extends Component{
    constructor(props) {
        super(props)

        this.state = {
            id:0,
            username: '',
            firstName: '',
            lastName:'',
            phone:'',
            role:'',
            email: '',
            dateOfBirth: '',
            gender: '',
            bloodGroup: '',
            lastDonation:'',
            config: {
                headers: { 'Authorization': localStorage.getItem('token') }
            }
        }
    }
    componentDidMount(){
    const token = localStorage.getItem('token')
    const decoded=jwt_decode(token)
      this.setState({
                username: decoded.username,
                firstName: decoded.firstName,
                lastName: decoded.lastName,
                phone: decoded.phone,
                role: decoded.role,
      })
        axios.get('http://localhost:3000/api/profile/{_id}', this.state, this.state.config)
        .then ((res) => {
            this.setState({
                profiles: res.data,
                id:0,
                email:'',
                dateOfBirth: '',
                gender: '',
                bloodGroup: '',
                lastDonation:''
                

            })
           
        }).catch(err => console.log(err.response));
    }
    

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, ( ) => console.log(this.state))
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/api/Profile', this.state, this.state.config )
            .then((res) => {
                console.log(res)
            }).catch(err => console.log(err.response.data))
    }

    
    render() {
        return(
            <div>
                <NavBar/>
                <div id="main" class="wrapper style1">
                <section class="container">
                    <header class="major">
                        <h2>Hello : {this.state.firstName} {this.state.lastName}</h2>
                        <span class="byline">This is Serve Humanity Dashboard</span>
                    </header>
                    <div class="row no-collapse-1">
                        <section class="4u">   
                                                 
                            <a href="!#" class="image feature"></a>
                            <img src={users} alt="Users" />
                            <h3>Update Your Profile</h3>
                            <p>First Name : <i>{this.state.firstName}</i></p>
                            <p>Last Name : <i>{this.state.lastName}</i></p>
                            <p>Phone Number: <i>{this.state.phone}</i></p>
                            <Button color="primary" >Update Your Info</Button>
                        </section>
                        <section class="4u">                            
                            <a href="/!#" class="image feature"></a>
                            <img src={bloodbank} alt="bloodbank" />
                            <h3>Blood Bank</h3>
                            <p>Available blood bank will be displayed here</p>
                    
                        </section>
                        <section class="4u">
                            <a href="/!#" class="image feature"></a>
                            <img src={bloodgroup} alt="bloodgroup" />
                            <h3>Blood Groups</h3>
                            <p>Available blood groups will be displayed here</p>
                        </section>

                    </div>
                </section> 
                </div>
            </div>
        )
    }

}
    

