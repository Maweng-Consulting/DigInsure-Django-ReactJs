import React, { useState, useEffect } from 'react';
import { BACKEND_URL } from '../../services/constants';

const EditBroker = ({broker, closeBrokerEditModal}) => {
    const [brokerages, setBrokerages] = useState([])

    const [firstName, setFirstName] = useState(broker.first_name);
    const [lastName, setLastName] = useState(broker.last_name);
    const [idNumber, setIdNumber] = useState(broker.id_number);
    const [phoneNumber, setPhoneNumber] = useState(broker.phone_number);
    const [gender, setGender] = useState(broker.gender);
    const [email, setEmail] = useState(broker.email);
    const [username, setUsername] = useState(broker.username);
    const [brokerage, setBrokerage] = useState(broker.brokerage);
    const [postalAddress, setPostalAddress] = useState(broker.postal_address);
    const [physicalAddress, setPhysicalAddress] = useState(broker.physical_address);
    const [city, setCity] = useState(broker.city);
    const [country, setCountry] = useState(broker.country);
    const [role, setRole] = useState("Broker")
    const [dateOfBirth, setDateOfBirth] = useState(broker.date_of_birth);

    useEffect(() => {
      const getBrokerages = async() => {
          let response = await fetch(`${BACKEND_URL}/users/brokerages/`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json"
              }
          })
          const data = await response.json();
          setBrokerages(data)
          console.log(data)
  
      };
      getBrokerages();
  }, []);


  return (
    <div className="modal bg-secondary-subtle" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title fs-5">Edit Broker</h5>
          <button type="button" className="button-close btn btn-danger" data-dismiss="modal" onClick={closeBrokerEditModal} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form>
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
            <label htmlFor="exampleInputEmail1" className="form-label">Brokerage</label>
            <select className='form-select' name='brokerage' id='brokerage' onChange={(e) => setBrokerage(e.target.value)}>
                <option>{broker.brokerage}</option>
                {brokerages.map((brokerage) => (
                  <option value={brokerage.id} key={brokerage.id}>{brokerage.name}</option>
                ))}
            </select>
          </div>
          
        </div>
            <div className='text-center'>
              <button type="submit" className="btn btn-primary">Yes, Update Broker!</button>
            </div>  
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default EditBroker