import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from '../../services/constants';

const EditUser = ({ user, closeUserEditModal }) => {
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [idNumber, setIdNumber] = useState(user.id_number);
    const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
    const [gender, setGender] = useState(user.gender);
    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.username);
    const [postalAddress, setPostalAddress] = useState(user.postal_address);
    const [physicalAddress, setPhysicalAddress] = useState(user.physical_address);
    const [city, setCity] = useState(user.city);
    const [country, setCountry] = useState(user.country);
    const [role, setRole] = useState(user.role)
    const [dateOfBirth, setDateOfBirth] = useState(user.date_of_birth);

    const handleSubmit = async(e)=> {
      e.preventDefault();
      const userEditObject = {
        first_name: firstName,
        last_name: lastName,
        username: username,
        id_number: idNumber,
        phone_number: phoneNumber,
        gender: gender,
        email: email,
        postal_address: postalAddress,
        physical_address: physicalAddress,
        city: city,
        country: country,
        role: role,
        date_of_birth: dateOfBirth
      }

      const response = await fetch(`${BACKEND_URL}/users/${user.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userEditObject)
      })

      if (response.ok) {
        //alert("User has been updated successfully!!")
        window.location.reload();
      } else {
        alert("Something went wrong!")
      }

      console.log(userEditObject)
    }

  return (
    <div className="modal bg-success" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title fs-5">Edit Broker</h5>
          <button type="button" className="button-close btn btn-danger" data-dismiss="modal" onClick={closeUserEditModal} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
          <div className='row mb-3'>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
            <input type="text" className="form-control" id="first_name" name='first_name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="first_name" name='first_name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          </div>
        </div>

        <div className='row mb-3'>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">ID Number</label>
            <input type="text" className="form-control" id="id_number" name='id_number' value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
          </div>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Phone Number</label>
            <input type="text" className="form-control" id="phone_number" name='phone_number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
        </div>

        <div className='row mb-3'>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
        </div>
          
        <div className='row mb-3'>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Gender</label>
            <select className='form-select' name='gender' id='gender' value={gender} onChange={(e) => setGender(e.target.value)}>
                <option>Select</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Date of Birth</label>
            <input type="date" className="form-control" id="date_of_birth" name='date_of_birth' value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/>
          </div>
        </div>
        <div className='row mb-3'>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Postal Address</label>
            <input type="text" className="form-control" id="postal_address" name='postal_address' value={postalAddress} onChange={(e) => setPostalAddress(e.target.value)} />
          </div>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Physical Address</label>
            <input type="text" className="form-control" id="physical_address" name='physical_address' value={physicalAddress} onChange={(e) => setPhysicalAddress(e.target.value)} />
          </div>
        </div>

        <div className='row mb-3'>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">City/Town</label>
            <input type="text" className="form-control" id="city" name='city' value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Country</label>
            <input type="text" className="form-control" id="country" name='country' value={country} onChange={(e) => setCountry(e.target.value)} />
          </div>
        </div>
        <div className='row mb-3'>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Role</label>
            <select className='form-select' name='role' id='role' value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="Customer">Customer</option>
                <option value="Agent">Sales Agent</option>
                <option value="Broker">Broker</option>
                <option value="Admin">Admin</option>
            </select>
          </div>
          
        </div>
            <div className='text-center'>
              <button type="submit" className="btn btn-primary">Yes, Update User!</button>
            </div>  
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default EditUser