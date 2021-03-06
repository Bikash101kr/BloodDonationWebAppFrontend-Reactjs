import React, {Component} from 'react'
import NavBarAdmin from '../NavBarAdmin'
import jwt_decode from 'jwt-decode'
import bloodbank from '../css/images/bloodbank.png'
import users from '../css/images/users.png'
import bloodgroup from '../css/images/bloodgroups.jpg'
import BloodBankList from './BloodBankList';
import AdminUserList from './AdminUserList';
import AvailableBlood from './AvailableBlood'
export default class AdminDashboard extends Component{
    constructor(props) {
        super(props)

        this.state = {
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
        email:decoded.email ,
        dateOfBirth: decoded.dateOfBirth,
        gender: decoded.gender,
        bloodGroup: decoded.bloodGroup,
        lastDonation:decoded.lastDonation,
        image:decoded.image,
        UserId: decoded.id,
      })
    }
    
    
    render() {
        return(
            <div>
                <NavBarAdmin history = {this.props.history}/>
                <div id="main" class="wrapper style1">
                <section class="container">
                    <header class="major">
                        <h2>Hello : {this.state.firstName} {this.state.lastName}</h2>
                        <span class="byline">This is Serve Humanity Admin Dashboard</span>
                    </header>
                    <div class="row no-collapse-1">
                        <section class="4u">   
                                                 
                            <a href="!#" class="image feature"></a>
                            <img src={users} alt="Users" />
                            <h3>Users List </h3>
                            <AdminUserList/>
                        </section>
                        <section class="4u">                            
                            <a href="/!#" class="image feature"></a>
                            <img src={bloodbank} alt="bloodbank" />
                            <h3>Blood Bank</h3>
                            <BloodBankList/>
                    
                        </section>
                        <section class="4u">
                            <a href="/!#" class="image feature"></a>
                            <img src={bloodgroup} alt="bloodgroup" />
                            <h3>Blood Groups</h3>
                           <AvailableBlood/>
                        </section>

                    </div>
                </section> 
                </div>
            </div>
        )
    }
    

}



