import React, { useState, useEffect } from 'react';
import Wrapper from '../../components/Wrapper';
import { BACKEND_URL } from '../../services/constants';

const MemberPremiums = () => {
    const [premiums, setPremiums] = useState([]);

    useEffect(() => {
      const getPolicyPremiums = async() => {
        let headersList = {
          "Accept": "*/*"
         }
         
         let response = await fetch(`${BACKEND_URL}/payments/premiums/`, { 
           method: "GET",
           headers: headersList
         });
         
         let data = await response.json();
         console.log(data);
         setPremiums(data)
         
      };
      getPolicyPremiums();
    }, [])

    const [premiumsCurrentPage, setPremiumsCurrentPage] = useState(1);
    const premiumsPerPage = 10;
    const indexOfLastPremium = premiumsCurrentPage * premiumsPerPage;
    const indexOfFirstPremium = indexOfLastPremium - premiumsPerPage;
    const currentPremiums = premiums.slice(indexOfFirstPremium, indexOfLastPremium);

     // Change page
     const handlePremiumsPageChange = (pageNumber) => {
        setPremiumsCurrentPage(pageNumber);
    };

  return (
    <Wrapper>
          <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Member Premiums</h1>
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
              <th scope="col">Member</th>
              <th scope="col">Amount</th>
              <th scope="col">Expected Date</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {currentPremiums.map((premium) => (
              <tr key={premium.id}>
                <td>{premium.id}</td>
                <td>{premium.member}</td>
                <td>{premium.amount}</td>
                <td>{premium.expected_date}</td>
                <td>{premium.status}</td>
                <td>
                  <a href='#' className='btn btn-danger btn-sm'>
                  <i className="bi bi-x-lg"></i>
                  </a>
                </td>
            </tr>
            ))}
            
          </tbody>
        </table>
        <nav>
  <ul className="pagination">
          {[...Array(Math.ceil(premiums.length / premiumsPerPage)).keys()].map((number) => (
            <li key={number + 1} className={`page-item ${number + 1 === premiumsCurrentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePremiumsPageChange(number + 1)}>
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

export default MemberPremiums