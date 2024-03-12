import React from 'react'

const UserFilter = ({onSelectUserType}) => {
  return (
    <form>
      <select className='form-select' onChange={(e) => onSelectUserType(e.target.value)}>
          <option value="">Filter Users</option>
          <option value="Customer">Customer</option>
          <option value="Agent">Sales Agent</option>
          <option value="Broker">Broker</option>
          <option value="Admin">Admin</option>
      </select>
  </form>
  )
}

export default UserFilter