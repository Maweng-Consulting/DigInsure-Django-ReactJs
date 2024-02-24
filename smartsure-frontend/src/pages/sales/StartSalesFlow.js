import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';

const StartSalesFlow = () => {
    const navigate = useNavigate()
    const [schemes, setSchemes] = useState([]);

    useEffect(() => {
        let getSchemes = async()=> {
            let response = await fetch("http://127.0.0.1:8000/schemes/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            let data = await response.json()
            setSchemes(data)
        };
        getSchemes();
    }, [])

    const collectScheme = async(id, scheme_name) => {
       console.log(`Scheme ID: ${id}, Scheme Name: ${scheme_name}`)

       sessionStorage.setItem("scheme_details", JSON.stringify({"id": id, "scheme_name": scheme_name}))
        navigate("/sales-flow/plans")
    }

  return (
    <Wrapper>
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 className="h2">Claims</h1>
    <div className="btn-toolbar mb-2 mb-md-0">
        <div className="btn-group me-2">
        <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
        <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
        </div>
        <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1">

        This week
        </button>
    </div>
    </div>
<div className='row'>
    {schemes.map((scheme) => (
        <div className="card m-2" style={{width: '16rem'}} key={scheme.id}>
            <div className="card-body">
              <h5 className="card-title">{scheme.name}</h5>
              <hr/>
              <a href="#" className='btn btn-info' onClick={()=> collectScheme(scheme.id, scheme.name)}>Choose</a>
            </div>
          </div>
    ))}
    
</div>

</main>
</Wrapper>
  )
}

export default StartSalesFlow