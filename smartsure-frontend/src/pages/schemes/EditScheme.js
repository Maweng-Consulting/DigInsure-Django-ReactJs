import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Wrapper from '../../components/Wrapper';

const EditScheme = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [scheme, setScheme] = useState({});

    const [name, setName] = useState(null);
    const [numberOfPeople, setNumberOfPeople] = useState(null);
    const [schemeType, setSchemeType] = useState(null);
    const [description, setDescription] = useState(null);

    useEffect(() => {
        const getScheme = async()=> {
            let headersList = {
                "Accept": "*/*",

               }
               
               let response = await fetch(`http://127.0.0.1:8000/schemes/${id}/`, { 
                 method: "GET",
                 headers: headersList
               });
               
               let data = await response.json();
               console.log(data);
               setScheme(data)
        };
        getScheme();
    }, [])


    const handleSubmit = async(e) => {
        e.preventDefault();

        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
           }
           
           let bodyContent = JSON.stringify({
               "name": name,
               "max_number_of_people": numberOfPeople,
               "scheme_type": schemeType,
               "description": description
           });
           
           let response = await fetch("http://127.0.0.1:8000/schemes/", { 
             method: "POST",
             body: bodyContent,
             headers: headersList
           });
           
           let data = await response.json();
           console.log(data);

           if (response.ok) {
                navigate("/schemes")
           } else {
            alert("The data you provided is invalid!!")
           }
    }

  return (
    <Wrapper>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
  
</div>

<div className='row'>
    <div className='col-3'></div>
    <div className='col-6'>
        <form onSubmit={handleSubmit}>
            <h4>Add New Scheme</h4>
            <hr/>
            <div className='row mb-3'>
            <label for="exampleInputEmail1" class="form-label">Scheme Name</label>
            <input type="text" class="form-control" id="name" name='name' onChange={(e) => setName(e.target.value)} placeholder={scheme.name} />
            </div>
            <div className='row mb-3'>
                <div className='col'>
                <label for="exampleInputEmail1" class="form-label">Scheme Type</label>
                <select className='form-select' name='scheme_type' id='scheme_type' onChange={(e) => setSchemeType(e.target.value)}>
                    <option>Select</option>
                    <option value="Car">Car</option>
                    <option value="Group">Group</option>
                    <option value="Funeral">Funeral</option>
                    <option value="Pet">Pet</option>
                    <option value="Retail">Retail</option>
                    <option value="Credit">Credit</option>
                </select>
                </div>
                <div className='col'>
                <label for="exampleInputEmail1" class="form-label">No. of People</label>
                    <input type="number" class="form-control" id="max_number_of_people" name='max_number_of_people' onChange={(e) => setNumberOfPeople(e.target.value)} />
                </div>
            </div>
            <div className='row mb-3'>
            <textarea class="form-control" name='description' id='description' placeholder="Scheme description" onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div className='text-center'>
                <button className='btn btn-primary'>Submit</button>
            </div>
        </form>
    </div>
    <div className='col'></div>
</div>

</main>
</Wrapper>
  )
}

export default EditScheme