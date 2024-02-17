import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';

const PricingPlanDetail = () => {
    const { id } = useParams();
    const [dependentPrices, setDependentPrices] = useState([]);
    const [extendedPrices, setExtendedPrices] = useState([]);
    const [mainMemberPrices, setMainMemberPrices] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const dependentsPerPage = 3;
    const indexOfLastDependent = currentPage * dependentsPerPage;
    const indexOfFirstDependent = indexOfLastDependent - dependentsPerPage;
    const currentExtendentDependents = extendedPrices.slice(indexOfFirstDependent, indexOfLastDependent);

    // Change page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    let headersList = {
        "Accept": "*/*"
       }

    useEffect(() => {
        let getPricingPlanDetails = async() => {
            let response = await fetch(`http://127.0.0.1:8000/pricing/pricing-plans/${id}/`, {
                method: "GET",
                headers: headersList
            });

            let data = await response.json();
            setDependentPrices(data.dependent_prices);
            setExtendedPrices(data.extended_prices);
            setMainMemberPrices(data.main_member_prices);
        };
        getPricingPlanDetails()
    }, [])

  return (
    <Wrapper>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div className='row mt-3'>

    </div>

    <h5>Main Member Pricing</h5>
        <hr/>
      <div class="table-responsive small">
        <table class="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Dependent Type</th>
              <th scope="col">Premium</th>
              <th scope="col">Cover Amount</th>
              <th scope="col" colSpan={3}></th>
            </tr>
          </thead>
          <tbody>
            {mainMemberPrices.map((dp) => (
                <tr>
                <td>{dp.id}</td>
                <td>{dp.dependent_type}</td>
                <td>{dp.premium}</td>
                <td>{dp.cover_amount}</td>
                <td>
                  <a href='#' className='btn btn-info btn-sm'>
                  <i class="bi bi-eye"></i>
                  </a>
                </td>
                <td>
                  <a href='#' className='btn btn-primary btn-sm'>
                  <i class="bi bi-pencil-square"></i>
                  </a>
                </td>
                <td>
                  <a href='#' className='btn btn-danger btn-sm'>
                  <i className="bi bi-trash"></i>
                  </a>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>

        <h5>Dependent Pricing</h5>
        <hr/>
      <div class="table-responsive small">
        <table class="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Dependent Type</th>
              <th scope="col">Min Age.</th>
              <th scope="col">Max Age.</th>
              <th scope="col">Premium</th>
              <th scope="col">Cover Amount</th>
              <th scope="col" colSpan={3}></th>
            </tr>
          </thead>
          <tbody>
            {dependentPrices.map((dp) => (
                <tr>
                <td>{dp.id}</td>
                <td>{dp.dependent_type}</td>
                <td>{dp.min_age}</td>
                <td>{dp.max_age}</td>
                <td>{dp.premium}</td>
                <td>{dp.cover_amount}</td>
                <td>
                  <a href='#' className='btn btn-info btn-sm'>
                  <i class="bi bi-eye"></i>
                  </a>
                </td>
                <td>
                  <a href='#' className='btn btn-primary btn-sm'>
                  <i class="bi bi-pencil-square"></i>
                  </a>
                </td>
                <td>
                  <a href='#' className='btn btn-danger btn-sm'>
                  <i className="bi bi-trash"></i>
                  </a>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>


      <h5>Extended Pricing</h5>
        <hr/>
      <div class="table-responsive small">
        <table class="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Dependent Type</th>
              <th scope="col">Min Age.</th>
              <th scope="col">Max Age.</th>
              <th scope="col">Premium</th>
              <th scope="col">Cover Amount</th>
              <th scope="col" colSpan={3}></th>
            </tr>
          </thead>
          <tbody>
            {currentExtendentDependents.map((dp) => (
                <tr>
                <td>{dp.id}</td>
                <td>{dp.dependent_type}</td>
                <td>{dp.min_age}</td>
                <td>{dp.max_age}</td>
                <td>{dp.premium}</td>
                <td>{dp.cover_amount}</td>
                <td>
                  <a href='#' className='btn btn-info btn-sm'>
                  <i class="bi bi-eye"></i>
                  </a>
                </td>
                <td>
                  <a href='#' className='btn btn-primary btn-sm'>
                  <i class="bi bi-pencil-square"></i>
                  </a>
                </td>
                <td>
                  <a href='#' className='btn btn-danger btn-sm'>
                  <i className="bi bi-trash"></i>
                  </a>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
        <nav>
        <ul className="pagination">
          {[...Array(Math.ceil(extendedPrices.length / dependentsPerPage)).keys()].map((number) => (
            <li key={number + 1} className={`page-item ${number + 1 === currentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(number + 1)}>
                {number + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      </div>
    </main>
    </Wrapper>
  )
}

export default PricingPlanDetail