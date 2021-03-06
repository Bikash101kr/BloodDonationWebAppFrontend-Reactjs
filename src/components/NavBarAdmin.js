import React from 'react'
import { Navbar, NavItem, NavbarText, Button, Nav,  } from 'reactstrap';
import { NavLink, Switch, Link, Route } from 'react-router-dom'
import Login from './Login';


export default function NavBarAdmin(props) {
    const handleLogout = () => {
        if(window.confirm('Do you want to logout from serve humanity ?'))
        localStorage.removeItem('token');
        props.history.push('/');
        
    }

    return (

        <div>
            <Navbar color='dark' dark expand='md'>
            <Nav id="nav" className='mr-auto' >
                    <ul id="navul">
                    <NavItem id="navitem">
                            <Link to='/admindash/nav'>Dashboard</Link>                            
                        </NavItem>
                       <NavItem id="navitem">
                            <Link to='/admindash/nav'>Admin Profile</Link>
                            <ul>
                                <Link to='/admindashboard/viewprofile' id="navlist">View Profile</Link>
                                <Link to='/admindashboard/updateprofile' id="navlist">Edit Profile</Link>
                            </ul>
                        </NavItem>
                        <NavItem id="navitem">
                            <NavLink to='/admindashboard/adminviewusers'>Users List</NavLink>
                        </NavItem >
                        <NavItem id="navitem">
                            <NavLink to='/admindashboard/adminviewdonations'>Donations List</NavLink>
                        </NavItem >
                        <NavItem id="navitem">
                            <NavLink to='/admindashboard/adminviewrequests'>Requests List</NavLink>
                        </NavItem>
                        <NavItem id="navitem">
                            <NavLink to='/admindash/nav'>Blood Bank</NavLink>
                            <ul>
                                <Link to='/admindashboard/adminaddbloodbank' id="navlist">Add Blood Bank</Link>
                                <Link to='/admindashboard/adminbloodbanks' id="navlist">View Blood Banks</Link>
                            </ul>
                        </NavItem>
                    </ul>
                </Nav>
                <NavbarText>
                    <Button id="btn-logout" className=" btn btn-primary btn-customized"  onClick= {handleLogout} color='danger'  > Logout</Button>
                </NavbarText>
            </Navbar>
            <Switch>


               <Route path = '/login' component={Login}/>
              
            </Switch>
        </div>
    )
}

