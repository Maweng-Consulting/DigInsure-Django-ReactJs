import React from 'react'

const AgentsList = ({ agents, currentAgents, usersPerPage, usersCurrentPage, handleUsersPageChange, openAgentEditModal }) => {
  return (
    <div className="table-responsive small">
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date Joined</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Broker</th>
              <th scope="col" colSpan={3}></th>
            </tr>
          </thead>
          <tbody>
            {currentAgents.map((agent) => (
              <tr key={agent.id}>
                <td>{agent.id}</td>
                <td>{agent.date_created}</td>
                <td>{agent.name}</td>
                <td>{agent.email}</td>
                <td>{agent.broker_name}-({agent.brokerage_name})</td>
              
                <td>
                  <a href='#' className='btn btn-info btn-sm'>
                  <i className="bi bi-eye"></i>
                  </a>
                </td>
                <td>
                  <a href='#' className='btn btn-primary btn-sm' onClick={() => openAgentEditModal(agent)}>
                  <i className="bi bi-pencil-square"></i>
                  </a>
                </td>
    
              </tr>
            )
            )}
          </tbody>
        </table>
        <nav>
  <ul className="pagination">
          {[...Array(Math.ceil(agents.length / usersPerPage)).keys()].map((number) => (
            <li key={number + 1} className={`page-item ${number + 1 === usersCurrentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handleUsersPageChange(number + 1)}>
                {number + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      </div>
  )
}

export default AgentsList