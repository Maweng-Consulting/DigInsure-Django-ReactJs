import React, { useState, useEffect } from 'react';

const ModalForm = ({ show, handleClose, handleSubmit, scheme }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (scheme) {
      setFormData(scheme);
    } else {
      setFormData({});
    }
  }, [scheme]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div>
      {show && (
        <div className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Scheme</h5>
                <button type="button" className="close" onClick={handleClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={(e) => handleSubmit(e, formData)}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={formData.name || ''} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email || ''} onChange={handleChange} />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalForm;
