import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import { BACKEND_URL } from '../../services/constants';

const NewBeneficiary = () => {
    const headersList = {
        "Content-Type": "application/json",
        "Authentication": `Token`
    }
    const navigate = useNavigate();
    

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [email, setEmail] = useState(null);
    const [gender, setGender] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [relationhip, setRelationship] = useState(null);
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [country, setCountry] = useState(null);
    const [idNumber, setIdNumber] = useState(null);


    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("Hello World")

        const response = await fetch(`${BACKEND_URL}/family/beneficiaries/`, {
            method: "GET",
            headers: headersList,
            body: JSON.stringify({
                id_number: idNumber,
                first_name: firstName,
                last_name: lastName,
                date_of_birth: dateOfBirth,
                email: email,
                gender: gender,
                phone_number: phoneNumber,
                relationhip: relationhip,
                address: address,
                city: city,
                country: country
            })
        })

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
    <h3 className="text-center">New Beneficiary</h3>
    <div className='row mb-3'>
      <div className='col'>
      <label for="exampleInputEmail1" class="form-label">Plan Name</label>
      <input type="text" name='name' id='name' class="form-control"/>
      </div>
    </div>
    <div className='row mb-3'>
      <div className='col'>
      <label for="exampleInputEmail1" class="form-label">Scheme</label>
      <select className='form-select' id='scheme' name='scheme'>
          <option>Select</option>
          <option>Hello World</option>
        </select>
      </div>
      <div className='col'>
      <label for="exampleInputEmail1" class="form-label">Plan Type</label>
        <select className='form-select' id='plan_type' name='plan_type'>
          <option>Select</option>
          <option value='Long Term'>Long Term</option>
          <option value='Short Term'>Short Term</option>
        </select>
      </div>
    </div>
    <div className='row mb-3'>
      <div className='col'>
      <label for="exampleInputEmail1" class="form-label">Base Premium</label>
      <input type="number" name='base_premium' id='base_premium' class="form-control" />
      </div>
      <div className='col'>
      <label for="exampleInputEmail1" class="form-label">VAT</label>
      <input type="number" name='vat' id='vat' class="form-control" />
      </div>
    </div>
    <div className='row mb-3'>
      <div className='col'>
      <label for="exampleInputEmail1" class="form-label">Total Premium</label>
      <input type="number" name='total_premium' id='total_premium' class="form-control" />
      </div>
      <div className='col'>
      <label for="exampleInputEmail1" class="form-label">Cover Amount</label>
      <input type="number" name='cover_amount' id='cover_amount' class="form-control" />
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

export default NewBeneficiary