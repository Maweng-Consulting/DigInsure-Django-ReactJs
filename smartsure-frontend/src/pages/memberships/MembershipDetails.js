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
    const [member, setMember] = useState(null)

    const { membership, scheme_group } = useParams()

    let headersList = {
        "Accept": "*/*"
    }

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
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
  <h1 class="h2">Member Details</h1>
  <div class="btn-toolbar mb-2 mb-md-0">
    <div class="btn-group me-2">
      <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
      <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
    </div>
    <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1">

      This week
    </button>
  </div>
</div>
<div className='row'>
    <div className='col'>
        <p>ID: {member?.id}</p>
        <p>Name: {member?.name}</p>
        <p>Premium: {member?.premium}</p>
        <p>Cover Amount: {member?.cover_amount}</p>
    </div>
    <div className='col'>
        <a href={`${member?.membership_certificate}`} className='btn btn-warning'>View Membership Certficate</a>
    </div>
</div>
<hr/>

<h4>Family Members</h4>
<div class="table-responsive small">
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

<h4 className='mt-4'>Extended Family Members</h4>
<div class="table-responsive small">
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

<h4 className='mt-4'>Beneficiaries</h4>
<div class="table-responsive small">
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
</Wrapper>
  )
}

export default MembershipDetails