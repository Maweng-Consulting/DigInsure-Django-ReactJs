import React, {useEffect, useState} from 'react';
import Wrapper from '../../components/Wrapper';
import { BACKEND_URL } from '../../services/constants';

const User = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async(e) => {
      let headersList = {
        "Accept": "*/*"
       }
       
       let response = await fetch(`${BACKEND_URL}/users/`, { 
         method: "GET",
         headers: headersList
       });
       
       let data = await response.json();
       //console.log(data);
       setUsers(data)
    };
    getUsers();
  }, [])

  console.log(users)

  const [usersCurrentPage, setUsersCurrentPage] = useState(1);
  const usersPerPage = 10;
  const indexOfLastUser = usersCurrentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

     // Change page
  const handleUsersPageChange = (pageNumber) => {
      setUsersCurrentPage(pageNumber);
  };


  return (
    <Wrapper>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Users</h1>
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
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
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
            )
            )}
          </tbody>
        </table>
        <nav>
  <ul className="pagination">
          {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map((number) => (
            <li key={number + 1} className={`page-item ${number + 1 === usersCurrentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handleUsersPageChange(number + 1)}>
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

export default User