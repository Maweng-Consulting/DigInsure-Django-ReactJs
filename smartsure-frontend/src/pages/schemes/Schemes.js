import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import { BACKEND_URL } from '../../services/constants';



const Schemes = () => {
  const navigate = useNavigate();
  const [schemes, setSchemes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(false);
  const [selectScheme, setSelectScheme] = useState(false);

  


  const [name, setName] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState(null);
  const [schemeType, setSchemeType] = useState(null);
  const [description, setDescription] = useState(null);

  const openModal = (scheme) => {
    setSelectedScheme(scheme);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openDeleteModal = (scheme) => {
    setSelectScheme(scheme);
    setShowDeleteModal(true);
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  }
  

  useEffect(() => {
    let getSchemes = async()=> {
      let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
       }
       
       let response = await fetch("http://127.0.0.1:8000/schemes/", { 
         method: "GET",
         headers: headersList
       });
       
       let data = await response.json();
       console.log(data);
       setSchemes(data)
    };
    getSchemes()
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();

    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({
           "name": name,
           "max_number_of_people": numberOfPeople,
           "scheme_type": schemeType,
           "description": description
       });
       
       let response = await fetch(`${BACKEND_URL}/schemes/`, { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.json();
       console.log(data);

       if (response.ok) {
            window.location.reload()
       } else {
        alert("The data you provided is invalid!!")
       }
}

  const [schemesCurrentPage, setSchemesCurrentPage] = useState(1);
  const schemesPerPage = 10;
  const indexOfLastScheme = schemesCurrentPage * schemesPerPage;
  const indexOfFirstScheme = indexOfLastScheme - schemesPerPage;
  const currentSchemes = schemes.slice(indexOfFirstScheme, indexOfLastScheme);

     // Change page
  const handleSchemesPageChange = (pageNumber) => {
      setSchemesCurrentPage(pageNumber);
  };

 

  return (
    <Wrapper>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Schemes</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">

          </div>
          <a href='' className='btn btn-primary fw-bold' data-bs-toggle="modal" data-bs-target="#newSchemeModal">New Scheme</a>
        </div>
      </div>

    
      <div className="table-responsive small">
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Max No. of People</th>
              <th scope="col" colSpan={3}></th>
            </tr>
          </thead>
          <tbody>
            
              {currentSchemes.map((scheme) => (
                <tr key={scheme.id}>
                <td>{scheme.id}</td>
                <td>{scheme.name}</td>
                <td>{scheme.scheme_type}</td>
                <td>{scheme.max_number_of_people}</td>
                <td>
                  <a href='#' className='btn btn-info btn-sm'>
                  <i className="bi bi-eye"></i>
                  </a>
                </td>
                
                <td>
                <button className="btn btn-primary" onClick={() => openModal(scheme)}>
                <i className="bi bi-pencil-square"></i>
                </button>
                </td>
                <td>
                  <button className='btn btn-danger btn-sm' onClick={() => openDeleteModal(scheme)}>
                  <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
              ))}
            
          </tbody>
        </table>
        <nav>
  <ul className="pagination">
          {[...Array(Math.ceil(schemes.length / schemesPerPage)).keys()].map((number) => (
            <li key={number + 1} className={`page-item ${number + 1 === schemesCurrentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handleSchemesPageChange(number + 1)}>
                {number + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      </div>
    </main>


{/* Delete Scheme */}



{/* New Scheme Form*/}

<div className="modal fade" id="newSchemeModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">New Scheme</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form onSubmit={handleSubmit}>
        <div className='row mb-3'>
          <div className="col">
            <label for="exampleInputEmail1" className="form-label">Scheme Name</label>
            <input type="text" class="form-control" id="name" name='name' onChange={(e) => setName(e.target.value)} />
          </div>
  
        </div>
        <div className='row mb-3'>
          <div className="col">
            <label for="exampleInputEmail1" className="form-label">Scheme Type</label>
            <select className='form-select' name='scheme_type' id='scheme_type' onChange={(e) => setSchemeType(e.target.value)}>
            <option>Select</option>
                    <option value="Car">Car</option>
                    <option value="Group">Group</option>
                    <option value="Funeral">Funeral</option>
                    <option value="Pet">Pet</option>
                    <option value="Retail">Retail</option>
                    <option value="Credit">Credit</option>
            </select>
          </div>
        </div>

        <div className='row mb-3'>
          <div className="col">
            <label for="exampleInputEmail1" className="form-label">Max. Number of People</label>
            <input type="number" class="form-control" id="max_number_of_people" name='max_number_of_people' onChange={(e) => setNumberOfPeople(e.target.value)} />
          </div>

        </div>
       
        <div className='row mb-3'>
        <label for="exampleInputEmail1" className="form-label">Scheme Description</label>
        <textarea class="form-control" name='description' id='description' placeholder="Scheme description" onChange={(e) => setDescription(e.target.value)}></textarea>
          
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
{showModal && <EditSchemeModal scheme={selectedScheme} closeModal={closeModal} />}
{showDeleteModal && <DeleteSchemeModal scheme={selectScheme} closeDeleteModal={closeDeleteModal} />}
    </Wrapper>
  )
}


const DeleteSchemeModal = ({scheme, closeDeleteModal}) => {
  const [schemeID, setSchemeID] = useState(null);

  const handleSchemeDelete = async(e) => {
    e.preventDefault();

    console.log(e.target.scheme_id.value)

    /*
    let response = await fetch(`${BACKEND_URL}/schemes/${schemeID}/`, {
      method: "DELETE",
      headers: headersList,
    });
    if(response.ok) {
      window.location.reload()
    } else {
      alert("Something went wrong!!");
    }
    */
  }

  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fs-5">Delete {scheme.name}</h5>
            <button type="button" className="button-close btn btn-danger" data-dismiss="modal" aria-label="Close" onClick={closeDeleteModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body bg-light">
            <form onSubmit={handleSchemeDelete}>
              <div className='row mb-3'>
                <div className='col'>
                  <p>Are you sure you want to delete: {scheme.name}</p>
                </div>
              </div>
              <input type='number' name="scheme_id" id="scheme_id" value={scheme.id} readOnly/> 

              <div className='text-center'>
                <button type="submit" className="btn btn-primary">Yes, Delete!</button>
              </div>  
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const EditSchemeModal = ({ scheme, closeModal }) => {
  const [name, setName] = useState(scheme.name);
  const [scheme_type, setSchemeType] = useState(scheme.scheme_type);
  const [description, setDescription] = useState(scheme.description);
  const [numberOfPeople, setNumberOfPeople] = useState(scheme.max_number_of_people);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle submitting the form, for example, updating the student in your state or sending it to the server
    closeModal();
  };

  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fs-5">Edit {name}</h5>
            <button type="button" className="button-close btn btn-danger" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body bg-light">
            <form onSubmit={handleSubmit}>
              <div className='row mb-3'>
                <div className='col'>
                <label className='form-label fw-bold'>Scheme Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
              </div>

              <div className='row mb-3'>
              <div className="col">
                <label for="exampleInputEmail1" className="form-label fw-bold">Scheme Type</label>
                <select className='form-select' name='scheme_type' id='scheme_type' onChange={(e) => setSchemeType(e.target.value)}>
                <option>Select</option>
                        <option value="Car">Car</option>
                        <option value="Group">Group</option>
                        <option value="Funeral">Funeral</option>
                        <option value="Pet">Pet</option>
                        <option value="Retail">Retail</option>
                        <option value="Credit">Credit</option>
                </select>
              </div>
            </div>
            <div className='row mb-3'>
          <div className="col">
            <label for="exampleInputEmail1" className="form-label fw-bold">Max. Number of People</label>
            <input type="number" class="form-control" id="max_number_of_people" name='max_number_of_people' value={numberOfPeople} onChange={(e) => setNumberOfPeople(e.target.value)} />
          </div>

        </div>
       
        <div className='row mb-3'>
        <label for="exampleInputEmail1" className="form-label fw-bold">Scheme Description</label>
        <textarea class="form-control" name='description' id='description' placeholder="Scheme description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          
        </div>
              <div className='text-center'>
                <button type="submit" className="btn btn-primary">Save Details</button>
              </div>  
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schemes