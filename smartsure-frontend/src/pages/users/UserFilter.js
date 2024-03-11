import React from 'react'

const UserFilter = () => {
  return (
    <form>
    <select className='form-select'>
    <option value="Customer">Customer</option>
        <option value="Agent">Sales Agent</option>
        <option value="Broker">Broker</option>
        <option value="Admin">Admin</option>
    </select>
  </form>
  )
}

export default UserFilter