import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';

const SchemeGroupDetail = () => {
  const [members, setMembers] = useState([]);
  const [schemeGroup, setSchemeGroup] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const getMembers = async() => {
      let headersList = {
        "Accept": "*/*"
       }
       
       let response = await fetch(`http://127.0.0.1:8000/users/memberships/?scheme_group=${id}`, { 
         method: "GET",
         headers: headersList
       });
       
       let data = await response.json();
       console.log(data);
       setMembers(data)
    };
    getMembers();
  }, [])

  useEffect(() => {
    const getSchemeGroupDetail = async() => {
      let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
       }
       
       let response = await fetch("http://127.0.0.1:8000/schemes/scheme-groups/1/", { 
         method: "GET",
         headers: headersList
       });
       
       let data = await response.json();
       console.log(data);
       setSchemeGroup(data)
    };
    getSchemeGroupDetail()
  }, [])

  return (
    <Wrapper>
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
            
            </div>

        </div>
        </div>
    <div className='row'>
      <div className='col'>
      <p><b>ID:</b> {schemeGroup.id}</p>
      <p><b>Date Created: </b>{schemeGroup.date_created}</p>
        <p><b>Pricing Plan:</b> {schemeGroup.pricing_plan_name}</p>
        <p><b>Scheme:</b> {schemeGroup.scheme_name}</p>
      </div>
      <div className='col'>
      <p><b>Payment Frequency:</b> {schemeGroup.period_type}</p>
      <p><b>Payment Method:</b> {schemeGroup.payment_method}</p>
      <p><b>Premium: </b>{schemeGroup.premium}</p>
      <p><b>Policy Number: </b>{schemeGroup.policy_number}</p>
      </div>
    </div>
    <hr/>

    <h4 className='mt-3'>Members</h4>
    <div className="table-responsive small">
    <table className="table table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Cover Amount</th>
          <th scope="col">Premium</th>
          <th scope="col">Status</th>
          
          <th scope="col" colSpan={3}></th>
        </tr>
      </thead>
      <tbody>
        {members.map((member) => (
           <tr key={member.id}>
           <td>{member.id}</td>
           <td>{member.name}</td>
           <td>{member.cover_amount}</td>
           <td>{member.premium}</td>
           <td>{member.status}</td>
           <td>
             <a href={`/membership-details/${member.id}/${member.scheme_group}`} className='btn btn-info btn-sm'>
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

export default SchemeGroupDetail