import React from 'react'

const DeleteUser = ({user, closeModal}) => {
  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title fs-5">Delete User</h5>
          <button type="button" className="button-close btn btn-danger" data-dismiss="modal" onClick={closeModal} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className='row mb-3'>
              <div className='col'>
                <p>Are you sure you want to delete user: {user.first_name} {user.last_name}</p>
              </div>
            </div>
            <input type='number' hidden name="user_id" id="user_id" value={user.id} readOnly/> 

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

export default DeleteUser