import React, { useState, useEffect } from 'react';
import { BACKEND_URL } from '../../services/constants';

const EditSalesAgent = ({agent, closeModal}) => {
    const [brokerages, setBrokerages] = useState([]);
    const[brokers, setBrokers] = useState([]);

    const [agentId, setAgentID] = useState(agent.id);
    const [brokerage, setBrokerage] = useState(agent.brokerage);
    const [broker, setBroker] = useState(agent.broker);
   

    useEffect(() => {
      const getBrokerages = async() => {
          let response = await fetch(`${BACKEND_URL}/users/brokerages/`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json"
              }
          })
          const data = await response.json();
          setBrokerages(data)
          //console.log(data)
  
      };
      getBrokerages();
  }, []);

  useEffect(() => {
    const getBrokerageBrokers = async() => {
        let response = await fetch(`${BACKEND_URL}/users/brokers/?brokerage=${brokerage}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        setBrokers(data)
        console.log(data)
    };
    getBrokerageBrokers();
  },[brokerage]);

  const handleSubmit = async(e) => {
    e.preventDefault();

    const agentObject = {
      user: agentId,
      broker: broker,
      brokerage: brokerage,
    }
    console.log(agentObject)

    const response = await fetch(`${BACKEND_URL}/users/sales-agent-edit/${agent.sales_agent}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(agentObject)
    });

    if (response.ok) {
      window.location.reload();
    } else {
      alert("Something Went Wrong");
    }

  }

  return (
    <div className="modal bg-success" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title fs-5">Update SalesAgent</h5>
          <button type="button" className="button-close btn btn-danger" data-dismiss="modal" onClick={closeModal} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
        
        <div className='row mb-3'>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Brokerage</label>
            <select className='form-select' name='brokerage' id='brokerage' value={brokerage} onChange={(e) => setBrokerage(e.target.value)}>
                <option>{agent.brokerage_name}</option>
                {brokerages.map((brokerage) => (
                  <option value={brokerage.id} key={brokerage.id}>{brokerage.name}</option>
                ))}
            </select>
          </div>
          </div>
          <div className='row mb-3'>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">Broker</label>
            <select className='form-select' name='broker' id='broker' value={broker} onChange={(e) => setBroker(e.target.value)}>
                <option>{agent.broker_name}</option>
                {brokers.map((broker) => (
                  <option value={broker.id} key={broker.id}>{broker.first_name} {broker.last_name}</option>
                ))}
                
            </select>
          </div>
        </div>
            <div className='text-center'>
              <button type="submit" className="btn btn-primary">Yes, Update Agent!</button>
            </div>  
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default EditSalesAgent