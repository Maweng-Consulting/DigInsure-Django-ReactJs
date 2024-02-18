import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';

const NewPricingPlan = () => {
  const navigate = useNavigate()

  const [schemes, setSchemes] = useState([]);
  const [name, setName] = useState(null);
  const [scheme, setScheme] = useState(null);
  const [planType, setPlanType] = useState(null);
  const [basePremium, setBasePremium] = useState(null);
  const [vat, setVat] = useState(null);
  const [totalPremium, setTotalPremium] = useState(null);
  const [coverAmount, setCoverAmount] = useState(null);

  useEffect(() => {
    let getSchemes = async()=> {
      let headersList = {
        "Accept": "*/*",
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
  }, [])

  const handleSubmit = async(e) => {
    e.preventDefault();

    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
     }
     
     let bodyContent = JSON.stringify({
         "name": name,
         "base_premium": basePremium,
         "vat": vat,
         "total_premium": totalPremium,
         "plan_type": planType,
         "base_cover": coverAmount,
         "scheme": scheme
     });
     
     let response = await fetch("http://127.0.0.1:8000/pricing/pricing-plans/", { 
       method: "POST",
       body: bodyContent,
       headers: headersList
     });
     
     let data = await response.text();
     console.log(data);

     if (response.ok) {
      navigate("/pricing-plans")
     } else {
      alert("Alert The data you provided is invalid!!!!")
     }
  }

  return (
    <Wrapper>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
  
</div>
  <div className='row'>
    <div className='col'></div>
    <div className='col-6'>
    <form onSubmit={handleSubmit}>
    <h3 className="text-center">New Pricing Plan</h3>
    <div className='row mb-3'>
      <div className='col'>
      <label for="exampleInputEmail1" class="form-label">Plan Name</label>
      <input type="text" name='name' id='name' class="form-control" onChange={(e) => setName(e.target.value)} />
      </div>
    </div>
    <div className='row mb-3'>
      <div className='col'>
      <label for="exampleInputEmail1" class="form-label">Scheme</label>
      <select className='form-select' id='scheme' name='scheme' onChange={(e) => setScheme(e.target.value)}>
          <option>Select</option>
          {schemes.map((scheme) => (
            <option value={scheme.id}>{scheme.name}</option>
          ))}
        </select>
      </div>
      <div className='col'>
      <label for="exampleInputEmail1" class="form-label">Plan Type</label>
        <select className='form-select' id='plan_type' name='plan_type' onChange={(e) => setPlanType(e.target.value)}>
          <option>Select</option>
          <option value='Long Term'>Long Term</option>
          <option value='Short Term'>Short Term</option>
        </select>
      </div>
    </div>
    <div className='row mb-3'>
      <div className='col'>
      <label for="exampleInputEmail1" class="form-label">Base Premium</label>
      <input type="number" name='base_premium' id='base_premium' class="form-control" onChange={(e) => setBasePremium(e.target.value)} />
      </div>
      <div className='col'>
      <label for="exampleInputEmail1" class="form-label">VAT</label>
      <input type="number" name='vat' id='vat' class="form-control" onChange={(e) => setVat(e.target.value)} />
      </div>
    </div>
    <div className='row mb-3'>
      <div className='col'>
      <label for="exampleInputEmail1" class="form-label">Total Premium</label>
      <input type="number" name='total_premium' id='total_premium' class="form-control" onChange={(e) => setTotalPremium(e.target.value)} />
      </div>
      <div className='col'>
      <label for="exampleInputEmail1" class="form-label">Cover Amount</label>
      <input type="number" name='cover_amount' id='cover_amount' class="form-control" onChange={(e) => setCoverAmount(e.target.value)} />
      </div>
    </div>
    <div className='text-center'>
      <button className='btn btn-success'>Submit</button>
    </div>
  </form>
    </div>
    <div className='col'></div>
  </div>
  

</main>
</Wrapper>
  )
}

export default NewPricingPlan