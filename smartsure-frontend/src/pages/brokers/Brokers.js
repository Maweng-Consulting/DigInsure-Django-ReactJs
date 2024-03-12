import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../services/constants';
import Wrapper from '../../components/Wrapper';

import EditBroker from './EditBroker';
import DeleteBroker from './DeleteBroker';

const Brokers = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [brokerages, setBrokerages] = useState([])

    const [selectedBroker, setSelectedBroker] = useState(null);
    const [showBrokerEditModal, setShowBrokerEditModal] = useState(false);

    const [brokerToDelete, setBrokerToDelete] = useState(null);
    const [showBrokerDeleteModal, setShowBrokerDeleteModal] = useState(false);

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [idNumber, setIdNumber] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [gender, setGender] = useState(null);
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [brokerage, setBrokerage] = useState(null);
    const [postalAddress, setPostalAddress] = useState(null);
    const [physicalAddress, setPhysicalAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [country, setCountry] = useState(null);
    const [role, setRole] = useState("Broker")
    const [dateOfBirth, setDateOfBirth] = useState(null);


    const openBrokerEditModal = (broker) => {
      setShowBrokerEditModal(true);
      setSelectedBroker(broker);
    }

    const closeBrokerEditModal = () => {
      setShowBrokerEditModal(false);
    }


  useEffect(() => {
    const getUsers = async(e) => {
      let headersList = {
        "Accept": "*/*"
       }

       let response = await fetch(`${BACKEND_URL}/users/brokers/`, { 
         method: "GET",
         headers: headersList
       });
       
       let data = await response.json();
       //console.log(data);
       setUsers(data)
    };
    getUsers();
  }, []);

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

  console.log(users)

  const [usersCurrentPage, setUsersCurrentPage] = useState(1);
  const usersPerPage = 10;
  const indexOfLastUser = usersCurrentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

     // Change page
  const handleUsersPageChange = (pageNumber) => {
      setUsersCurrentPage(pageNumber);
  };

  const handleSubmit =async(e)=> {
    e.preventDefault()

    const broker = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      username: username,
      brokerage: brokerage,
      id_number: idNumber,
      phone_number: phoneNumber,
      gender: gender,
      postal_address: postalAddress,
      physical_address: physicalAddress,
      city: city,
      country: country,
      date_of_birth: dateOfBirth,
      role: role
    }

    console.log(broker)

    const response = await fetch(`${BACKEND_URL}/users/create-broker/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(broker)
    });

    if(response.ok) {
      //navigate("/users/brokers")
      window.location.reload()
    } else {
      alert("Something went wrong when creating broker")
    }

  }
  return (
    <Wrapper>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Brokers</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
          </div>
          <a className='btn btn-primary fw-bold' data-bs-toggle="modal" data-bs-target="#newBrokerModal">
            New Broker
          </a>
        </div>
      </div>

    
      <div className="table-responsive small">
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date Joined</th>
              <th scope="col">Name</th>
              <th scope="col">Brokerage</th>
              <th scope="col">Email</th>

              <th scope="col" colSpan={3}></th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((broker) => (
              <tr key={broker.id}>
                <td>{broker.id}</td>
                <td>{broker.date_created}</td>
                <td>{broker.name}</td>
                <td>{broker.brokerage_name}</td>
                <td>{broker.email}</td>
                <td>
                  <a href='#' className='btn btn-info btn-sm'>
                  <i className="bi bi-eye"></i>
                  </a>
                </td>
                <td>
                  <a href='#' className='btn btn-primary btn-sm' onClick={() => openBrokerEditModal(broker)}>
                  <i className="bi bi-pencil-square"></i>
                  </a>
                </td>
          
              </tr>
            )
            )}
          </tbody>
        </table>
        <nav>
  <ul className="pagination">
          {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map((number) => (
            <li key={number + 1} className={`page-item ${number + 1 === usersCurrentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handleUsersPageChange(number + 1)}>
                {number + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      </div>
    </main>

    <div className="modal fade" id="newBrokerModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="text-center fs-5" id="exampleModalLabel">New Broker</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form onSubmit={handleSubmit}>
        <div className='row mb-3'>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
            <input type="text" className="form-control" id="first_name" name='first_name' onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
            <input type="text" className="form-control" id="first_name" name='first_name' onChange={(e) => setLastName(e.target.value)} />
          </div>
        </div>

        <div className='row mb-3'>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">ID Number</label>
            <input type="text" className="form-control" id="id_number" name='id_number' onChange={(e) => setIdNumber(e.target.value)} />
          </div>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Phone Number</label>
            <input type="text" className="form-control" id="phone_number" name='phone_number' onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
        </div>

        <div className='row mb-3'>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" name='email' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" name='username' onChange={(e) => setUsername(e.target.value)} />
          </div>
        </div>
          
        <div className='row mb-3'>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Gender</label>
            <select className='form-select' name='gender' id='gender' onChange={(e) => setGender(e.target.value)}>
                <option>Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Date of Birth</label>
            <input type="date" className="form-control" id="date_of_birth" name='date_of_birth' onChange={(e) => setDateOfBirth(e.target.value)} />
          </div>
        </div>

        <div className='row mb-3'>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Postal Address</label>
            <input type="text" className="form-control" id="postal_address" name='postal_address' onChange={(e) => setPostalAddress(e.target.value)} />
          </div>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Physical Address</label>
            <input type="text" className="form-control" id="physical_address" name='physical_address' onChange={(e) => setPhysicalAddress(e.target.value)} />
          </div>
        </div>
        <div className='row mb-3'>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">City/Town</label>
            <input type="text" className="form-control" id="city" name='city' onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Country</label>
            <input type="text" className="form-control" id="country" name='country' onChange={(e) => setCountry(e.target.value)} />
          </div>
        </div>
        <div className='row mb-3'>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Brokerage</label>
            <select className='form-select' name='brokerage' id='brokerage' onChange={(e) => setBrokerage(e.target.value)}>
                <option value="">Select</option>
                {brokerages.map((brokerage) => (
                  <option value={brokerage.id} key={brokerage.id}>{brokerage.name}</option>
                ))}
            </select>
          </div>
        </div>

      
        <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary">Save changes</button>
      </div>
</form>
      </div>

    </div>
  </div>
</div>

{showBrokerEditModal && <EditBroker broker={selectedBroker} closeBrokerEditModal={closeBrokerEditModal} />}
  
    </Wrapper>
  )
}

export default Brokers