import React, { useState, useEffect } from 'react';
import Wrapper from '../../../components/Wrapper';
import { BACKEND_URL } from '../../../services/constants';

const Plans = () => {
    const [pricingPlans, setPricingPlans] = useState([]);
    
    const scheme_details = JSON.parse(sessionStorage.getItem("scheme_details" || '{}'))
    console.log(scheme_details)

    useEffect(() => {
      let getPricingPlans = async() => {
        let headersList = {
          "Accept": "*/*"
         }
         
         let response = await fetch(`${BACKEND_URL}/schemes/scheme-pricing-plans/?scheme_id=${scheme_details.id}`, { 
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
        <h1 class="h2">Pricing Plans</h1>
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
    {pricingPlans.map((plan) => (
        <div className="card m-2" style={{width: '26rem'}} key={plan.id}>
            <div className="card-body">
              <h5 className="card-title">{plan.name}</h5>
              <hr/>
              <h6>Dependent Plans</h6>
              <table className='table'>
                <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Dependent</th>
                  <th scope="col">Cover</th>
                  <th scope="col">Premium</th>
                </tr>
                </thead>
                <tbody>
                  {plan.dependent_prices.map((price) => (
                    <tr>
                      <td>{price.id}</td>
                      <td>{price.dependent_type}</td>
                      <td>{price.cover_amount}</td>
                      <td>{price.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h6>Extended Family Plans</h6>
              <a href="/sales-flow/family/sg" className='btn btn-info'>Choose</a>
            </div>
          </div>
    ))}
    
</div>

</main>
</Wrapper>
  )
}

export default Plans