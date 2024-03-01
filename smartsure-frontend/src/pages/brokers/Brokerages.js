import React, {useState, useEffect} from 'react';
import { BACKEND_URL } from '../../services/constants';
import Wrapper from '../../components/Wrapper';

const Brokerages = () => {
    const [brokerages, setBrokerages] = useState([]);

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [website, setWebsite] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [contactPerson, setContactPerson] = useState(null);
    const [brokerageType, setBrokerageType] = useState(null);
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [country, setCountry] = useState(null);


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

    const [brokeragesCurrentPage, setBrokeragesCurrentPage] = useState(1);
    const brokeragesPerPage = 10;
    const indexOfLastBrokerage= brokeragesCurrentPage * brokeragesPerPage;
    const indexOfFirstBrokerage = indexOfLastBrokerage - brokeragesPerPage;
    const currentBrokerages = brokerages.slice(indexOfFirstBrokerage, indexOfLastBrokerage);

     // Change page
  const handleBrokeragesPageChange = (pageNumber) => {
      setBrokeragesCurrentPage(pageNumber);
  };

  const handleSubmit =async(e) => {
    e.preventDefault();

    const brokerageObject = {
      name: name,
      email: email,
      website: website,
      contact_person: contactPerson,
      phone_number: phoneNumber,
      address: address,
      city: city,
      country: country,
      brokerage_type: brokerageType,
      "postal_address": address,
      "physical_address": address
    }

    const response = await fetch(`${BACKEND_URL}/users/brokerages/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(brokerageObject)
    });

    if(response.ok) {
      window.location.reload();
    } else {
      alert("Something went wrong!!!")
    }

    console.log("Hello World!!")
  }


  return (
    <Wrapper>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Brokerages</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
          </div>
          <a className='btn btn-primary fw-bold' data-bs-toggle="modal" data-bs-target="#newBrokerageModal">
            New Brokerage
          </a>
        </div>
      </div>
      <div className="table-responsive small">
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date Created</th>
              <th scope="col">Name</th>
              <th scope="col">Contact Person</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Address</th>
              <th scope="col" colSpan={3}></th>
            </tr>
          </thead>
          <tbody>
            {currentBrokerages.map((brokerage) => (
              <tr key={brokerage.id}>
                <td>{brokerage.id}</td>
                <td>{brokerage.date_created}</td>
                <td>{brokerage.name}</td>
                <td>{brokerage.contact_person}</td>
                <td>{brokerage.phone_number}</td>
                <td>{brokerage.postal_address},{brokerage.city}-{brokerage.country}</td>
                <td>
                  <a href='#' className='btn btn-info btn-sm'>
                  <i className="bi bi-eye"></i>
                  </a>
                </td>
                <td>
                  <a href='#' className='btn btn-primary btn-sm'>
                  <i className="bi bi-pencil-square"></i>
                  </a>
                </td>
                <td>
                  <a href='#' className='btn btn-danger btn-sm'>
                  <i className="bi bi-trash"></i>
                  </a>
                </td>
              </tr>
            )
            )}
          </tbody>
        </table>
        <nav>
  <ul className="pagination">
          {[...Array(Math.ceil(brokerages.length / brokeragesPerPage)).keys()].map((number) => (
            <li key={number + 1} className={`page-item ${number + 1 === brokeragesCurrentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handleBrokeragesPageChange(number + 1)}>
                {number + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      </div>
    </main>

    <div className="modal fade" id="newBrokerageModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="text-center fs-5" id="exampleModalLabel">New Brokerage</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form onSubmit={handleSubmit}>
        <div className='row mb-3'>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name='name' onChange={(e) => setName(e.target.value)} />
          </div>
        </div>

        <div className='row mb-3'>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Phone Number</label>
            <input type="text" className="form-control" id="phone_number" name='phone_number' onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
        </div>

        <div className='row mb-3'>
        <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" name='email' onChange={(e) => setEmail(e.target.value)}/>
          </div>
        </div>
        <div className='row mb-3'>
        <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Contact Person</label>
            <input type="text" className="form-control" id="contact_person" name='contact_person' onChange={(e) => setContactPerson(e.target.value)} />
          </div>
        </div>

        <div className='row mb-3'>
        <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Website</label>
            <input type="text" className="form-control" id="website" name='website' onChange={(e) => setWebsite(e.target.value)} />
          </div>
        </div>
          

        <div className='row mb-3'>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Brokerage Type</label>
            <select className='form-select' name='brokerage_type' id='brokerage_type' onChange={(e) => setBrokerageType(e.target.value)}>
                <option>Select</option>
                <option value="Internal">Internal</option>
                <option value="External">External/3rd Party</option>
            </select>
          </div>
        </div>

        <div className='row mb-3'>
        <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Address</label>
            <input type="text" className="form-control" id="address" name='address' onChange={(e) => setAddress(e.target.value)} />
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
 

        <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary">Save changes</button>
      </div>
</form>
      </div>

    </div>
  </div>
</div>
    </Wrapper>
  )
}

export default Brokerages