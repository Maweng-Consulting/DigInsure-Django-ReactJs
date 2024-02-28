import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';

const PricingPlans = () => {
  const [pricingPlans, setPricingPlans] = useState([]);

  useEffect(() => {
    let getPricingPlans = async() => {
      let headersList = {
        "Accept": "*/*"
       }
       
       let response = await fetch("http://127.0.0.1:8000/pricing/pricing-plans/", { 
         method: "GET",
         headers: headersList
       });
       
       let data = await response.json();
       console.log(data);
       setPricingPlans(data)
    };
    getPricingPlans();
  }, []);

  const [pricingPlansCurrentPage, setPricingPlansCurrentPage] = useState(1);
  const pricingPlansPerPage = 5;
  const indexOfLastPricingPlan = pricingPlansCurrentPage * pricingPlansPerPage;
  const indexOfFirstPricingPlan = indexOfLastPricingPlan - pricingPlansPerPage;
  const currentPricingPlans = pricingPlans.slice(indexOfFirstPricingPlan, indexOfLastPricingPlan);

     // Change page
  const handlePricingPlansPageChange = (pageNumber) => {
      setPricingPlansCurrentPage(pageNumber);
  };

  return (
    <Wrapper>
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
  <h1 className="h2">Pricing Plans</h1>
  <div className="btn-toolbar mb-2 mb-md-0">
    <div className="btn-group me-2">

    </div>
    <a href='/new-pricing-plan' className='btn btn-primary'>New Pricing Plan</a>
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
        <th scope="col" colSpan={3}></th>
      </tr>
    </thead>
    <tbody>
      {currentPricingPlans.map((plan) => (
        <tr key={plan.id}>
          <td>{plan.id}</td>
          <td>{plan.name}</td>
          <td>{plan.scheme_name}</td>
          <td>{plan.base_premium}</td>
          <td>{plan.vat}</td>
          <td>{plan.total_premium}</td>
          <td>
            <a href={`pricing-plans/${plan.id}`} className='btn btn-info btn-sm'>
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
      ))}
      
      
    </tbody>
  </table>
  <nav>
  <ul className="pagination">
          {[...Array(Math.ceil(pricingPlans.length / pricingPlansPerPage)).keys()].map((number) => (
            <li key={number + 1} className={`page-item ${number + 1 === pricingPlansCurrentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePricingPlansPageChange(number + 1)}>
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

export default PricingPlans