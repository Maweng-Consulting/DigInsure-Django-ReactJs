import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import { BACKEND_URL } from '../../services/constants';

const SchemeGroupsList = () => {
  const [schemeGroups, setSchemeGroups] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getSchemeGroups = async() => {
      let headersList = {
        "Accept": "*/*",
       }
       
       let response = await fetch(`${BACKEND_URL}/schemes/scheme-groups/?scheme_id=${id}`, { 
         method: "GET",
         headers: headersList
       });
       
       let data = await response.json();
       console.log(data);
       setSchemeGroups(data);
    };
    getSchemeGroups();
  }, [])

  const [schemeGroupsCurrentPage, setSchemeGroupsCurrentPage] = useState(1);
  const schemeGroupsPerPage = 10;
  const indexOfLastSchemeGroup = schemeGroupsCurrentPage * schemeGroupsPerPage;
  const indexOfFirstSchemeGroup = indexOfLastSchemeGroup - schemeGroupsPerPage;
  const currentSchemeGroups = schemeGroups.slice(indexOfFirstSchemeGroup, indexOfLastSchemeGroup);

     // Change page
  const handleSchemeGroupsPageChange = (pageNumber) => {
      setSchemeGroupsCurrentPage(pageNumber);
  };

  return (
    <Wrapper>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Scheme Groups</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">

          </div>
          <a href='' className='btn btn-primary'>New Scheme Group</a>
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
                <td>
                  <a href={`/policies/${scheme_group.policy}`}>{scheme_group.policy_number}</a>
                </td>
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
        <nav>
  <ul className="pagination">
          {[...Array(Math.ceil(schemeGroups.length / schemeGroupsPerPage)).keys()].map((number) => (
            <li key={number + 1} className={`page-item ${number + 1 === schemeGroupsCurrentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handleSchemeGroupsPageChange(number + 1)}>
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

export default SchemeGroupsList