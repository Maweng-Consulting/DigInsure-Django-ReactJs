import React from 'react'

const EditSalesAgent = ({closeModal}) => {
  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title fs-5">Delete Agent</h5>
          <button type="button" className="button-close btn btn-danger" data-dismiss="modal" onClick={closeModal} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className='row mb-3'>
              <div className='col'>
                <p>Are you sure you want to delete:</p>
              </div>
            </div>
            <input type='number' hidden name="scheme_id" id="scheme_id" readOnly/> 

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

export default EditSalesAgent