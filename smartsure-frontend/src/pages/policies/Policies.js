import React, { useState, useEffect } from 'react';
import Wrapper from '../../components/Wrapper';

const Policies = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const getPolicies = async() => {
      let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
       }
       
       let response = await fetch("http://127.0.0.1:8000/policies/", { 
         method: "GET",
         headers: headersList
       });
       
       let data = await response.json();
       console.log(data);
       setPolicies(data)
    };
    getPolicies();
  }, []);

  const [policiesCurrentPage, setPoliciesCurrentPage] = useState(1);
  const policiesPerPage = 10;
  const indexOfLastPolicy = policiesCurrentPage * policiesPerPage;
  const indexOfFirstPolicy = indexOfLastPolicy - policiesPerPage;
  const currentPolicies = policies.slice(indexOfFirstPolicy, indexOfLastPolicy);

     // Change page
  const handlePoliciesPageChange = (pageNumber) => {
      setPoliciesCurrentPage(pageNumber);
  };

  return (
    <Wrapper>
          <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Policies</h1>
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

    
      <div class="table-responsive small">
        <table class="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date Created</th>
              <th scope="col">Policy No.</th>
              <th scope="col">Start Date</th>
              <th scope="col">Activation</th>
              <th scope="col">Status</th>
              <th scope="col" colSpan={3}></th>
            </tr>
          </thead>
          <tbody>
            {currentPolicies.map((policy) => (
                <tr key={policy.id}>
                  <td>{policy.id}</td>
                  <td>{policy.created}</td>
                  <td>{policy.policy_number}</td>
                  <td>{policy.start_date}</td>
                  <td>{policy.activation_date}</td>
                  <td>{policy.status}</td>
                  <td>
                    <a href={`/policies/${policy.id}`} className='btn btn-info btn-sm'>
                    <i class="bi bi-eye"></i>
                    </a>
                  </td>
                  <td>
                    <a href='#' className='btn btn-primary btn-sm'>
                    <i class="bi bi-pencil-square"></i>
                    </a>
                  </td>
                  <td>
                    <a href='#' className='btn btn-danger btn-sm'>
                    <i className="bi bi-trash"></i>
                    </a>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
        <nav>
  <ul className="pagination">
          {[...Array(Math.ceil(policies.length / policiesPerPage)).keys()].map((number) => (
            <li key={number + 1} className={`page-item ${number + 1 === policiesCurrentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePoliciesPageChange(number + 1)}>
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

export default Policies