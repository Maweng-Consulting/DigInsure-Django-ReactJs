import React, { useState, useEffect } from 'react';
import Wrapper from '../../components/Wrapper';

const SchemeGroups = () => {
  const [schemeGroups, setSchemeGroups] = useState([]);

  useEffect(() => {
    const getSchemeGroups = async() => {
      let headersList = {
        "Accept": "*/*",
       }
       
       let response = await fetch("http://127.0.0.1:8000/schemes/scheme-groups/", { 
         method: "GET",
         headers: headersList
       });
       
       let data = await response.json();
       console.log(data);
       setSchemeGroups(data);
    };
    getSchemeGroups();
  }, [])

  return (
    <Wrapper>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Scheme Groups</h1>
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

  
      <div className="table-responsive small">
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Scheme</th>
              <th scope="col">Pricing Plan</th>
              <th scope="col">Policy</th>
              <th scope="col" colSpan={3}></th>
            </tr>
          </thead>
          <tbody>
            {schemeGroups.map((scheme_group) => (
               <tr key={scheme_group.id}>
                <td>{scheme_group.id}</td>
                <td>{scheme_group.name}</td>
                <td>{scheme_group.scheme_name}</td>
                <td>{scheme_group.pricing_plan_name}</td>
                <td>{scheme_group.policy_number}</td>
                <td>
                  <a href={`/scheme-groups/${scheme_group.id}`} className='btn btn-info btn-sm'>
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
      </div>
    </main>
    </Wrapper>
  )
}

export default SchemeGroups