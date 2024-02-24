import React from 'react'

const Beneficiaries = ({ currentBeneficiaries }) => {
  return (
    <table class="table table-sm">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Relationship</th>
        <th scope="col">Email</th>
        <th scope="col">ID Number</th>
        <th scope="col">Gender</th>
        <th scope="col">Phone Number</th>
        <th scope="col">D.O.B</th>
        <th scope="col" colSpan={3}></th>
      </tr>
    </thead>
    <tbody>
        {currentBeneficiaries.map((beneficiary) => (
             <tr key={beneficiary.id}>
             <td>{beneficiary.id}</td>
             <td>{beneficiary.first_name} {beneficiary.last_name}</td>
             <td>{beneficiary.relationship}</td>
             <td>{beneficiary.email}</td>
             <td>{beneficiary.id_number}</td>
             <td>{beneficiary.gender}</td>
             <td>{beneficiary.phone_number}</td>
             <td>{beneficiary.date_of_birth}</td>
             <td>
               <a href='#' className='btn btn-info btn-sm'>
               <i class="bi bi-eye"></i>
               </a>
             </td>
             <td>
               <a href='#' className='btn btn-primary btn-sm'>
               <i class="bi bi-pencil-square"></i>
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
  )
}

export default Beneficiaries