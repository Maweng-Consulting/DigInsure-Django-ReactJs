import React, { useState, useEffect } from 'react';
import Wrapper from '../../components/Wrapper';


const Schemes = () => {
  const [schemes, setSchemes] = useState([])
  

  useEffect(() => {
    let getSchemes = async()=> {
      let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
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
  }, []);

  const [schemesCurrentPage, setSchemesCurrentPage] = useState(1);
  const schemesPerPage = 10;
  const indexOfLastScheme = schemesCurrentPage * schemesPerPage;
  const indexOfFirstScheme = indexOfLastScheme - schemesPerPage;
  const currentSchemes = schemes.slice(indexOfFirstScheme, indexOfLastScheme);

     // Change page
  const handleSchemesPageChange = (pageNumber) => {
      setSchemesCurrentPage(pageNumber);
  };

  return (
    <Wrapper>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Schemes</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">

          </div>
          <a href='/new-scheme' className='btn btn-primary'>New Scheme</a>
        </div>
      </div>

    
      <div className="table-responsive small">
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Max No. of People</th>
              <th scope="col" colSpan={3}></th>
            </tr>
          </thead>
          <tbody>
            
              {currentSchemes.map((scheme) => (
                <tr key={scheme.id}>
                <td>{scheme.id}</td>
                <td>{scheme.name}</td>
                <td>{scheme.scheme_type}</td>
                <td>{scheme.max_number_of_people}</td>
                <td>
                  <a href='#' className='btn btn-info btn-sm'>
                  <i className="bi bi-eye"></i>
                  </a>
                </td>
                <td>
                  <a href={`/schemes/edit/${scheme.id}`} className='btn btn-primary btn-sm'>
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
          {[...Array(Math.ceil(schemes.length / schemesPerPage)).keys()].map((number) => (
            <li key={number + 1} className={`page-item ${number + 1 === schemesCurrentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handleSchemesPageChange(number + 1)}>
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


export default Schemes