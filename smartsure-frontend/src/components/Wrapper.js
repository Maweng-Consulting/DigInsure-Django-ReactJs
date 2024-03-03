import React from 'react';


const Wrapper = (props) => {
  return (
    <>
        <header className="navbar sticky-top bg-dark flex-md-nowrap p-1 shadow" data-bs-theme="dark">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 py-2 fs-6 text-white" href="/">Smart Insure</a>
        <ul className="navbar-nav flex-row d-md-none">
            <li className="nav-item text-nowrap">
            <button className="nav-link px-3 text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSearch" aria-controls="navbarSearch" aria-expanded="false" aria-label="Toggle search">
                Collapse
            </button>
            </li>
            <li className="nav-item text-nowrap">
            <button className="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                Search
            </button>
            </li>
        </ul>

        <div id="navbarSearch" className="navbar-search w-100 collapse">
            <input className="form-control w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search" />
        </div>
        </header>
        <div className="container-fluid">
  <div className="row">
    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
      <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabIndex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2 active" aria-current="page" href="/">
                
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="/users">
              <i className="bi bi-people-fill"></i>
                Users
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="/users/agents">
              <i className="bi bi-people-fill"></i>
                Agents
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="/users/brokers">
              <i className="bi bi-people-fill"></i>
                Brokers
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="/users/brokerages">
              <i className="bi bi-people-fill"></i>
                Brokerages
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="/schemes">

                Schemes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="/policies">
                
                Policies
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="/scheme-groups">
                Scheme Groups
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="/pricing-plans">

                Pricing Plans
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="/claims">
                Claims
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="/premiums">

                Premiums
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="/payments">

                Payments
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="/start-sales-flow">
                Sales Flow
              </a>
            </li>
          </ul>

          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
            <span>Saved reports</span>
          
          </h6>
          <ul className="nav flex-column mb-auto">
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                
                Current month
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">

                Last quarter
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">

                Social engagement
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">

                Year-end sale
              </a>
            </li>
          </ul>

          <hr className="my-3" />

          <ul className="nav flex-column mb-auto">
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">

                Settings
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {props.children}
    {/* 
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
            <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
          </div>
          <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1">

            This week
          </button>
        </div>
      </div>

       <div className="table-responsive small">
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Username</th>
              <th scope="col">Role</th>
              <th scope="col" colSpan={3}></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1,001</td>
              <td>random</td>
              <td>data</td>
              <td>placeholder</td>
              <td>text</td>
              <td>
                <a href='#' className='btn btn-info btn-sm'>
                <i className="bi bi-eye"></i>
                </a>
              </td>
              <td>
                <a href='#' className='btn btn-primary btn-sm'>
                <i className="bi bi-pencil-square"></i>
                </a>
              </td>
              <td>
                <a href='#' className='btn btn-danger btn-sm'>
                <i className="bi bi-trash"></i>
                </a>
              </td>
            </tr>
            <tr>
              <td>1,002</td>
              <td>placeholder</td>
              <td>irrelevant</td>
              <td>visual</td>
              <td>layout</td>
              <td>
                <a href='#' className='btn btn-info btn-sm'>
                <i className="bi bi-eye"></i>
                </a>
              </td>
              <td>
                <a href='#' className='btn btn-primary btn-sm'>
                <i className="bi bi-pencil-square"></i>
                </a>
              </td>
              <td>
                <a href='#' className='btn btn-danger btn-sm'>
                <i className="bi bi-trash"></i>
                </a>
              </td>
            </tr>
            <tr>
              <td>1,003</td>
              <td>data</td>
              <td>rich</td>
              <td>dashboard</td>
              <td>tabular</td>
              <td>
                <a href='#' className='btn btn-info btn-sm'>
                <i className="bi bi-eye"></i>
                </a>
              </td>
              <td>
                <a href='#' className='btn btn-primary btn-sm'>
                <i className="bi bi-pencil-square"></i>
                </a>
              </td>
              <td>
                <a href='#' className='btn btn-danger btn-sm'>
                <i className="bi bi-trash"></i>
                </a>
              </td>
            </tr>
            <tr>
              <td>1,003</td>
              <td>information</td>
              <td>placeholder</td>
              <td>illustrative</td>
              <td>data</td>
              <td>
                <a href='#' className='btn btn-info btn-sm'>
                <i className="bi bi-eye"></i>
                </a>
              </td>
              <td>
                <a href='#' className='btn btn-primary btn-sm'>
                <i className="bi bi-pencil-square"></i>
                </a>
              </td>
              <td>
                <a href='#' className='btn btn-danger btn-sm'>
                <i className="bi bi-trash"></i>
                </a>
              </td>
            </tr>
            <tr>
              <td>1,004</td>
              <td>text</td>
              <td>random</td>
              <td>layout</td>
              <td>dashboard</td>
              <td>
                <a href='#' className='btn btn-info btn-sm'>
                <i className="bi bi-eye"></i>
                </a>
              </td>
              <td>
                <a href='#' className='btn btn-primary btn-sm'>
                <i className="bi bi-pencil-square"></i>
                </a>
              </td>
              <td>
                <a href='#' className='btn btn-danger btn-sm'>
                <i className="bi bi-trash"></i>
                </a>
              </td>
            </tr>
            <tr>
              <td>1,005</td>
              <td>dashboard</td>
              <td>irrelevant</td>
              <td>text</td>
              <td>placeholder</td>
              <td>
                <a href='#' className='btn btn-info btn-sm'>
                <i className="bi bi-eye"></i>
                </a>
              </td>
              <td>
                <a href='#' className='btn btn-primary btn-sm'>
                <i className="bi bi-pencil-square"></i>
                </a>
              </td>
              <td>
                <a href='#' className='btn btn-danger btn-sm'>
                <i className="bi bi-trash"></i>
                </a>
              </td>
            </tr>
            <tr>
              <td>1,006</td>
              <td>dashboard</td>
              <td>illustrative</td>
              <td>rich</td>
              <td>data</td>
              <td>
                <a href='#' className='btn btn-info btn-sm'>
                <i className="bi bi-eye"></i>
                </a>
              </td>
              <td>
                <a href='#' className='btn btn-primary btn-sm'>
                <i className="bi bi-pencil-square"></i>
                </a>
              </td>
              <td>
                <a href='#' className='btn btn-danger btn-sm'>
                <i className="bi bi-trash"></i>
                </a>
              </td>
            </tr>
            <tr>
              <td>1,007</td>
              <td>placeholder</td>
              <td>tabular</td>
              <td>information</td>
              <td>irrelevant</td>
              <td>
                <a href='#' className='btn btn-info btn-sm'>
                <i className="bi bi-eye"></i>
                </a>
              </td>
              <td>
                <a href='#' className='btn btn-primary btn-sm'>
                <i className="bi bi-pencil-square"></i>
                </a>
              </td>
              <td>
                <a href='#' className='btn btn-danger btn-sm'>
                <i className="bi bi-trash"></i>
                </a>
              </td>
            </tr>
            <tr>
              <td>1,008</td>
              <td>random</td>
              <td>data</td>
              <td>placeholder</td>
              <td>text</td>
              <td>
                <a href='#' className='btn btn-info btn-sm'>
                <i className="bi bi-eye"></i>
                </a>
              </td>
              <td>
                <a href='#' className='btn btn-primary btn-sm'>
                <i className="bi bi-pencil-square"></i>
                </a>
              </td>
              <td>
                <a href='#' className='btn btn-danger btn-sm'>
                <i className="bi bi-trash"></i>
                </a>
              </td>
            </tr>
            <tr>
              <td>1,015</td>
              <td>random</td>
              <td>tabular</td>
              <td>information</td>
              <td>text</td>
              <td>
                <a href='#' className='btn btn-info btn-sm'>
                <i className="bi bi-eye"></i>
                </a>
              </td>
              <td>
                <a href='#' className='btn btn-primary btn-sm'>
                <i className="bi bi-pencil-square"></i>
                </a>
              </td>
              <td>
                <a href='#' className='btn btn-danger btn-sm'>
                <i className="bi bi-trash"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
    */}
  </div>
</div>
    </>
  )
}

export default Wrapper