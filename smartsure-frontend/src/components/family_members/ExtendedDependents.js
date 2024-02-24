import React from 'react'

const ExtendedDependents = ({ currentExtendedDependents }) => {
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
        <th scope="col">Premium</th>
        <th scope="col">Cover</th>
        <th scope="col" colSpan={3}></th>
      </tr>
    </thead>
    <tbody>
    {currentExtendedDependents.map((dependent) => (
            <tr key={dependent.id}>
            <td>{dependent.id}</td>
            <td>{dependent.first_name} {dependent.last_name}</td>
            <td>{dependent.dependent_type}</td>
            <td>{dependent.email}</td>
            <td>{dependent.id_number}</td>
            <td>{dependent.gender}</td>
            <td>{dependent.premium}</td>
            <td>{dependent.cover_amount}</td>
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

export default ExtendedDependents