import React from "react";

const UsersList = ({
  users,
  currentUsers,
  usersPerPage,
  usersCurrentPage,
  handleUsersPageChange,
  openUserEditModal,
  openUserDeleteModal,
}) => {
  return (
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
              <td>
                {user.first_name} {user.last_name}
              </td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <a href="#" className="btn btn-info btn-sm">
                  <i className="bi bi-eye"></i>
                </a>
              </td>
              <td>
                <a
                  href="#"
                  className="btn btn-primary btn-sm"
                  onClick={() => openUserEditModal(user)}
                >
                  <i className="bi bi-pencil-square"></i>
                </a>
              </td>
              <td>
                <a
                  href="#"
                  className="btn btn-danger btn-sm"
                  onClick={() => openUserDeleteModal(user)}
                >
                  <i className="bi bi-trash"></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map(
            (number) => (
              <li
                key={number + 1}
                className={`page-item ${
                  number + 1 === usersCurrentPage ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handleUsersPageChange(number + 1)}
                >
                  {number + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    </div>
  );
};

export default UsersList;
