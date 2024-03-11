import React, {useEffect, useState} from 'react';
import Wrapper from '../../components/Wrapper';
import { BACKEND_URL } from '../../services/constants';

import EditUser from './EditUser';
import DeleteUser from './DeleteUser';
import UserFilter from './UserFilter';

const User = () => {
  const [users, setUsers] = useState([])
  const [selectedUserType, setSelectedUserType] = useState(null);


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

  const filteredUsers = selectedUserType ? users.filter(user => user.role === selectedUserType) : users

  const [usersCurrentPage, setUsersCurrentPage] = useState(1);
  const usersPerPage = 10;
  const indexOfLastUser = usersCurrentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

     // Change page
  const handleUsersPageChange = (pageNumber) => {
      setUsersCurrentPage(pageNumber);
  };

  //User Edit Modal
  const [showUserEditModal, setShowUserEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const openUserEditModal = (user) => {
    setSelectedUser(user);
    setShowUserEditModal(true)
  };

  const closeUserEditModal = () => {
    setShowUserEditModal(false)
  };

  // User to Delete
  const [showUserDeleteModal, setShowUserDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const openUserDeleteModal = (user) => {
    setUserToDelete(user);
    setShowUserDeleteModal(true);
  }

  const closeUserDeleteModal = () => {
    setShowUserDeleteModal(false);
  }

  return (
    <Wrapper>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Users</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <UserFilter  />
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
                  <a href='#' className='btn btn-primary btn-sm' onClick={() => openUserEditModal(user)}>
                  <i className="bi bi-pencil-square"></i>
                  </a>
                </td>
                <td>
                  <a href='#' className='btn btn-danger btn-sm' onClick={() => openUserDeleteModal(user)}>
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
      {showUserEditModal && <EditUser user={selectedUser} closeUserEditModal={closeUserEditModal} />}
      {showUserDeleteModal && <DeleteUser user={userToDelete} closeModal={closeUserDeleteModal} />}
    </main>
    
    </Wrapper>
  )
}

export default User