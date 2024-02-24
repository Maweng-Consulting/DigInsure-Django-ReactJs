import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import { BACKEND_URL } from '../../services/constants';

import Beneficiaries from '../../components/family_members/Beneficiaries';
import ExtendedDependents from '../../components/family_members/ExtendedDependents';
import Dependents from '../../components/family_members/Dependents';

const MembershipDetails = () => {
    const [dependents, setDependents] = useState([])
    const [extendedDependents, setExtendedDependents] = useState([])
    const [beneficiaries, setBeneficiaries] = useState([])
    const [familyTypes, setFamilyTypes] = useState([])
    const [member, setMember] = useState(null)

    const [showNewDependentForm, setShowNewDependentForm] = useState(false);

    const { membership, scheme_group } = useParams()

    let headersList = {
        "Accept": "*/*"
    }

    useEffect(() => {
      const getFamilyTypes = async() => {
        let response = await fetch(`${BACKEND_URL}/family/family-member-types/`, {
          method: "GET",
          headers: headersList
        })
        let data = await response.json()
        setFamilyTypes(data)
      };
      getFamilyTypes();
    }, [])

    useEffect(() => {
        const getMember = async()=> {
            let response = await fetch(`${BACKEND_URL}/users/memberships/${membership}/`, {
                method: "GET",
                headers: headersList
            })
            let data = await response.json()
            setMember(data)
        };
        getMember()
    }, [])


    useEffect(() => {
        const getDependents = async() => {
            try {
                let response = await fetch(`${BACKEND_URL}/family/dependents/?membership=${membership}&scheme_group=${scheme_group}`)
                
                const data = await response.json()

                if (response.ok) {
                    console.log(data)
                    setDependents(data)
                } else {
                    console.log("An error occured fetching data")
                }

            } catch (error) {
                console.log(error)
            }
        };
        getDependents();
    }, [])

    const [dependentsCurrentPage, setDependentsCurrentPage] = useState(1);
    const dependentsPerPage = 5;
    const indexOfLastDependent = dependentsCurrentPage * dependentsPerPage;
    const indexOfFirstDependent = indexOfLastDependent - dependentsPerPage;
    const currentDependents = dependents.slice(indexOfFirstDependent, indexOfLastDependent);

     // Change page
     const handleDependentsPageChange = (pageNumber) => {
        setDependentsCurrentPage(pageNumber);
    };


    useEffect(() => {
        const getExtendedDependents = async() => {
            try {
                let response = await fetch(`${BACKEND_URL}/family/extended-dependents/?membership=${membership}&scheme_group=${scheme_group}`)
                
                const data = await response.json()

                if (response.ok) {
                    console.log(data)
                    setExtendedDependents(data)
                } else {
                    console.log("An error occured fetching data")
                }

            } catch (error) {
                console.log(error)
            }
        };
        getExtendedDependents();
    }, [])

    const [extendedDependentsCurrentPage, setExtendedDependentsCurrentPage] = useState(1);
    const extendedDependentsPerPage = 5;
    const indexOfLastExtendedDependent = extendedDependentsCurrentPage * extendedDependentsPerPage;
    const indexOfFirstExtendedDependent = indexOfLastExtendedDependent - extendedDependentsPerPage;
    const currentExtendedDependents = extendedDependents.slice(indexOfFirstExtendedDependent, indexOfLastExtendedDependent);

     // Change page
     const handleExtendedDependentsPageChange = (pageNumber) => {
        setExtendedDependentsCurrentPage(pageNumber);
    };

    useEffect(() => {
        const getBeneficiaries = async() => {
            try {
                let response = await fetch(`${BACKEND_URL}/family/beneficiaries/?membership=${membership}&scheme_group=${scheme_group}`)
                
                const data = await response.json()

                if (response.ok) {
                    console.log(data)
                    setBeneficiaries(data)
                } else {
                    console.log("An error occured fetching data")
                }

            } catch (error) {
                console.log(error)
            }
        };
        getBeneficiaries();
    }, [])


    const [beneficiariesCurrentPage, setBeneficiariesCurrentPage] = useState(1);
    const beneficiariesPerPage = 5;
    const indexOfLastBeneficiary = beneficiariesCurrentPage * beneficiariesPerPage;
    const indexOfFirstBeneficiary = indexOfLastBeneficiary - beneficiariesPerPage;
    const currentBeneficiaries = beneficiaries.slice(indexOfFirstBeneficiary, indexOfLastBeneficiary);

     // Change page
     const handleBeneficiariesPageChange = (pageNumber) => {
        setBeneficiariesCurrentPage(pageNumber);
    };

  return (
    
    <Wrapper>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Member Details</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
              <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
            </div>
            <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1">
        
              This week
            </button>
          </div>
        </div>
        <div className='row'>
            <div className='col'>
                <p><b>ID:</b> {member?.id}</p>
                <p><b>Name:</b> {member?.name}</p>
                <p><b>Premium:</b> {member?.premium}</p>
                <p><b>Cover Amount:</b> {member?.cover_amount}</p>
            </div>
            <div className='col'>
              
              <p>
              <a href={`${member?.membership_certificate}`} className='btn btn-primary'>View Membership Certficate</a>
              </p>
              <p>
              <a href={`/membership-premiums/${member?.id}/${member?.scheme_group}`} className='btn btn-primary'>View Member Premiums</a>
              </p>
              <p><b>Created On:</b> {member?.date_created}</p>
              <p><b>Last Update:</b> {member?.date_modified}</p>
            </div>
        </div>
        <hr/>
        
        <div className='row'>
          <div className='col'><h4>Family Members</h4></div>
          <div className='col text-center'>
            <a href='' className='btn btn-primary fw-bold' style={{border: ''}}>New Dependent</a>
          </div>
        </div>
        <div className="table-responsive small">
        
          <Dependents currentDependents={currentDependents} />
          <nav>
          <ul className="pagination">
                  {[...Array(Math.ceil(dependents.length / dependentsPerPage)).keys()].map((number) => (
                    <li key={number + 1} className={`page-item ${number + 1 === dependentsCurrentPage ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => handleDependentsPageChange(number + 1)}>
                        {number + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
        </div>
        
        <div className='row'>
          <div className='col'><h4>Extended Family Members</h4></div>
          <div className='col text-center'>
            <a href='' className='btn btn-primary fw-bold' data-bs-toggle="modal" data-bs-target="#exampleModal">New Extended Family Member</a>
            
          </div>
        </div>
        <div className="table-responsive small">
            <ExtendedDependents currentExtendedDependents={currentExtendedDependents} />
          <nav>
          <ul className="pagination">
                  {[...Array(Math.ceil(extendedDependents.length / extendedDependentsPerPage)).keys()].map((number) => (
                    <li key={number + 1} className={`page-item ${number + 1 === extendedDependentsCurrentPage ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => handleExtendedDependentsPageChange(number + 1)}>
                        {number + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
        </div>
        
        <div className='row'>
          <div className='col'><h4>Beneficiaries</h4></div>
          <div className='col text-center'>
            <a href='' className='btn btn-primary fw-bold' style={{border: ''}}>New Beneficiary</a>
          </div>
        </div>
        <div className="table-responsive small">
        <Beneficiaries currentBeneficiaries={currentBeneficiaries} />
          <nav>
          <ul className="pagination">
                  {[...Array(Math.ceil(beneficiaries.length / beneficiariesPerPage)).keys()].map((number) => (
                    <li key={number + 1} className={`page-item ${number + 1 === beneficiariesCurrentPage ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => handleBeneficiariesPageChange(number + 1)}>
                        {number + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
        </div>
        </main>
      
        
<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
        <div className='row mb-3'>
          <div className="col">
            <label for="exampleInputEmail1" className="form-label">First Name</label>
            <input type="text" className="form-control" id="first_name" name="first_name" />
          </div>
          <div className="col">
            <label for="exampleInputEmail1" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="last_name" name="last_name" />
          </div>
        </div>
        <div className='row mb-3'>
          <div className="col">
            <label for="exampleInputEmail1" className="form-label">Phone Number</label>
            <input type="text" className="form-control" id="phone_number" name="phone_number" />
          </div>
          <div className="col">
            <label for="exampleInputEmail1" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" name="email" />
          </div>
        </div>

        <div className='row mb-3'>
          <div className="col">
            <label for="exampleInputEmail1" className="form-label">ID Number</label>
            <input type="text" className="form-control" id="id_number" name="id_number" />
          </div>
          <div className="col">
            <label for="exampleInputEmail1" className="form-label">Date of Birth</label>
            <input type="date" className="form-control" id="date_of_birth" name="date_of_birth" />
          </div>
        </div>
        <div className='row mb-3'>
          <div className="col">
            <label for="exampleInputEmail1" className="form-label">Gender</label>
            <select className='form-select' id='gender' name='gender'>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
          </div>
          <div className="col">
            <label for="exampleInputEmail1" className="form-label">Relationship</label>
            <select className='form-select' id='dependent_type' name='dependent_type'>
              {familyTypes.map((family) => (
                <option key={family.id} value={family.name}>{family.name}</option>
              ))}
              
            </select>
          </div>
        </div>

        <div className='row mb-3'>
          <div className="col">
            <label for="exampleInputEmail1" className="form-label">Cover Amount</label>
            <select className='form-select'>Hello</select>
          </div>
          <div className="col">
            <label for="exampleInputEmail1" className="form-label">Premium</label>
            <input type="number" className="form-control" id="premium" name="premium" />
          </div>
        </div>
        
        <div className='row mb-3'>
          <div className="col">
            <label for="exampleInputEmail1" className="form-label">Address</label>
            <input type="text" className="form-control" id="address" name="first_name" />
          </div>
          <div className="col">
            <label for="exampleInputEmail1" className="form-label">City/Town</label>
            <input type="text" className="form-control" id="city" name="city" />
          </div>
          <div className="col">
            <label for="exampleInputEmail1" className="form-label">Country</label>
            <input type="text" className="form-control" id="country" name="country" />
          </div>
        </div>
 
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" />
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</Wrapper>
  )
}

export default MembershipDetails