import React, { useState, useEffect } from 'react';
import Wrapper from '../../../components/Wrapper';

const Plans = () => {
    const [pricingPlans, setPricingPlans] = useState([]);
    
    const scheme_details = JSON.parse(sessionStorage.getItem("scheme_details" || '{}'))
    console.log(scheme_details)

    useEffect(() => {
      let getPricingPlans = async() => {
        let headersList = {
          "Accept": "*/*"
         }
         
         let response = await fetch(`http://127.0.0.1:8000/schemes/scheme-pricing-plans/?scheme_id=${scheme_details.id}`, { 
           method: "GET",
           headers: headersList
         });
         
         let data = await response.json();
         console.log(data);
         setPricingPlans(data)
      };
      getPricingPlans();
    }, [])
  return (
    <Wrapper>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Claims</h1>
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
    <div className="table-responsive small">
  <table className="table table-sm">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Scheme</th>
        <th scope="col">Base Premium</th>
        <th scope="col">VAT</th>
        <th scope="col">Total Premium</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      {pricingPlans.map((plan) => (
        <tr key={plan.id}>
          <td>{plan.id}</td>
          <td>{plan.name}</td>
          <td>{plan.scheme_name}</td>
          <td>{plan.base_premium}</td>
          <td>{plan.vat}</td>
          <td>{plan.total_premium}</td>
          <td>
            <a href='#' className='btn btn-primary btn-sm'>
            Choose Plan
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

export default Plans