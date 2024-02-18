import React, { useEffect, useState } from 'react';
import Wrapper from '../../components/Wrapper';

const Premiums = () => {
  const [premiums, setPremiums] = useState([]);

  useEffect(() => {
    const getPolicyPremiums = async() => {
      let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
       }
       
       let response = await fetch("http://127.0.0.1:8000/payments/premiums/", { 
         method: "GET",
         headers: headersList
       });
       
       let data = await response.json();
       console.log(data);
       setPremiums(data)
       
    };
    getPolicyPremiums();
  }, [])

  return (
    <Wrapper>
          <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Premiums</h1>
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
              <th scope="col" colSpan={3}></th>
            </tr>
          </thead>
          <tbody>
            {premiums.map((premium) => (
              <tr key={premium.id}>
                <td>{premium.id}</td>
                <td>{premium.member}</td>
                <td>{premium.amount}</td>
                <td>{premium.expected_date}</td>
                <td>{premium.status}</td>
                <td>
                  <a href='#' className='btn btn-info btn-sm'>
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
      </div>
    </main>
    </Wrapper>
  )
}

export default Premiums