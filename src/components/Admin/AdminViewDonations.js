import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Axios from 'axios'
import NavBarAdmin from '../NavBarAdmin'

export default class AdminViewDonations extends Component {
  constructor(props){

    super(props)

    this.state = {
      donatebloods: [],
      donationId:'',
      weight: '',
      bloodGroup:'',
      country: '',
      state: '',
      district: '',
      city: '',
      street: '',
      location: '',
      status: '',
        config: {
            headers: { 'Authorization': localStorage.getItem('token') }
        }
    }
  }

  handleDelete = (id) => {
    if(window.confirm('Are you sure to remove this donation from the list?'))
	Axios.delete('http://localhost:3000/api/DonateBlood/' + id, this.state.config)
	.then((res)=> {
		const filteredDonateBlood = this.state.donatebloods.filter(req => {
			return req._id !== id;
		});
		console.log(filteredDonateBlood);
		this.setState({
			donatebloods: filteredDonateBlood
		});
	 
	}).catch(err => console.log(err.response));
  }

  handleUpdateClick = (id) => {
	  console.log(id)
	  this.props.history.push(`/admindashboard/updatedonationstatus/${id}`);
  }

componentDidMount(){
  Axios.get('http://localhost:3000/api/admin/donations', this.state.config)
  .then((res)=> {
    console.log(res.data)
    this.setState({
      donatebloods: res.data
    })
  }).catch(err => console.log(err.response));
}

render() {
  return (
    <div>
    <NavBarAdmin history = {this.props.history}/>
    <div className='container'>
       
       <div className="py-4">
      <h1>Donation List</h1>
      <table class="table border shadow">
        <thead class="thead-dark">
          <tr>
          <th scope="col">#</th>
            <th scope="col">Bloodgroup</th>
            <th scope="col">Full Address</th>
            <th scope="col"> Weight</th>
            <th scope="col"> Prefer Location</th>
            <th scope="col"> Blood Status</th>
      
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.state.donatebloods.map(donation => (
            <tr key= {donation._id}>
              <th scope="row"></th>
          <td>{donation.bloodGroup}</td>
          <td>{donation.country},
          {donation.state}, {donation.district},
          {donation.city}, {donation.street}
          </td>
          <td>{donation.weight}</td>
          <td>{donation.location}</td>
              <td>{donation.status}</td>
              <td>
              
                <Link class="btn btn-outline-primary mr-2"
                onClick={() => this.handleUpdateClick(donation._id)}>
                  Edit
                </Link>
                <Link class="btn btn-danger"
                onClick={() => this.handleDelete(donation._id)}>Delete</Link>
              </td>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  )
}
}






