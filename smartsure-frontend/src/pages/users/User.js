import React, {useEffect, useState} from 'react';
import Wrapper from '../../components/Wrapper';

const User = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async(e) => {
      let headersList = {
        "Accept": "*/*"
       }
       
       let response = await fetch("http://127.0.0.1:8000/users/", { 
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

  const students = [
    {
      "id": 1,
      "name": "James Doe",
      "gender": "Male"
    },
    {
      "id": 2,
      "name": "John Doe",
      "gender": "Male"
    }
  ]

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
            {users.map((user) => (
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
      </div>
    </main>
    </Wrapper>
  )
}

export default User