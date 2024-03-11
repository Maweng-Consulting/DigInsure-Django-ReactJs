import React, { useState, useEffect } from 'react'

const DeleteBroker = ({ broker, closeBrokerDeleteModal }) => {
  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title fs-5">Delete Sales Agent</h5>
          <button type="button" className="button-close btn btn-danger" data-dismiss="modal" onClick={closeBrokerDeleteModal} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className='row mb-3'>
              <div className='col'>
                <p>Are you sure you want to delete broker: {broker.first_name} {broker.last_name}</p>
              </div>
            </div>
            <input type='number' hidden name="agent_id" id="agent_id" value={broker.id} readOnly/> 

            <div className='text-center'>
              <button type="submit" className="btn btn-danger">Yes, Delete!</button>
            </div>  
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default DeleteBroker