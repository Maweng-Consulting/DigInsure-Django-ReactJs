import React from 'react'

const DeleteAgent = ({agent, closeDeleteModal}) => {
  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title fs-5">Delete Sales Agent</h5>
          <button type="button" className="button-close btn btn-danger" data-dismiss="modal" onClick={closeDeleteModal} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className='row mb-3'>
              <div className='col'>
                <p>Are you sure you want to delete agent: {agent.first_name} {agent.last_name}</p>
              </div>
            </div>
            <input type='number' hidden name="agent_id" id="agent_id" value={agent.id} readOnly/> 

            <div className='text-center'>
              <button type="submit" className="btn btn-primary">Yes, Delete!</button>
            </div>  
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default DeleteAgent