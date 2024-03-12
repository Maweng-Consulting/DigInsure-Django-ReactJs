import React, {useEffect, useState} from 'react';
import Wrapper from '../../components/Wrapper';
import { BACKEND_URL } from '../../services/constants';

import EditUser from './EditUser';
import DeleteUser from './DeleteUser';
import UserFilter from './UserFilter';

//User Components
import UsersList from './components/UsersList';

const Users = () => {
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
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

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

  console.log(`Selected User Type: ${selectedUserType}`)

  return (
    <Wrapper>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Users</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <UserFilter onSelectUserType={userType => setSelectedUserType(userType)} />
        </div>
      </div>

      <UsersList 
          users={users} 
          currentUsers={currentUsers}
          usersPerPage={usersPerPage} 
          usersCurrentPage ={usersCurrentPage} 
          handleUsersPageChange={handleUsersPageChange}
          openUserEditModal={openUserEditModal} 
          openUserDeleteModal={openUserDeleteModal} 
      />
    
      
      {showUserEditModal && <EditUser user={selectedUser} closeUserEditModal={closeUserEditModal} />}
      {showUserDeleteModal && <DeleteUser user={userToDelete} closeModal={closeUserDeleteModal} />}
  
    </main>
    
    </Wrapper>
  )
}

export default Users