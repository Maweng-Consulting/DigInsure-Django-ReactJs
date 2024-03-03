import React, { useState, useEffect } from 'react'
const ModalForm = ({ scheme, closeModal }) => {
  const [name, setName] = useState(scheme.name);
  const [scheme_type, setSchemeType] = useState(scheme.scheme_type);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle submitting the form, for example, updating the student in your state or sending it to the server
    closeModal();
  };

  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Scheme</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Age</label>
                <input type="number" className="form-control" value={scheme_type} onChange={(e) => setSchemeType(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;